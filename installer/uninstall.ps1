# 汽水音乐 AMLL 歌词插件 —— 卸载脚本
# 用 app.asar.orig 还原客户端，并删除插件文件。

[CmdletBinding()]
param(
  [string]$TargetDir
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

function Say  { param($t, $c = 'Gray') Write-Host $t -ForegroundColor $c }
function Step { param($t) Write-Host "==> $t" -ForegroundColor Cyan }
function Ok   { param($t) Write-Host "    $t" -ForegroundColor Green }
function Warn { param($t) Write-Host "    $t" -ForegroundColor Yellow }
function Die  { param($t) Write-Host "`n[失败] $t" -ForegroundColor Red; Write-Host ''; exit 1 }

function Test-Admin {
  $id = [Security.Principal.WindowsIdentity]::GetCurrent()
  return ([Security.Principal.WindowsPrincipal]$id).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-CanWrite {
  param([Parameter(Mandatory = $true)][string]$Path)
  try {
    $probe = Join-Path $Path ('.amll-probe-' + [guid]::NewGuid().ToString('N'))
    [System.IO.File]::WriteAllText($probe, 'x')
    Remove-Item -LiteralPath $probe -Force
    return $true
  } catch { return $false }
}

function Resolve-AppDir {
  param([string]$Path)
  if (-not $Path) { return $null }
  $p = $Path.Trim('"').Trim()
  if (-not (Test-Path -LiteralPath $p)) { return $null }
  $p = (Resolve-Path -LiteralPath $p).Path

  if (Test-Path -LiteralPath (Join-Path $p 'app.asar')) {
    $parent = Split-Path -Parent $p
    if ((Split-Path -Leaf $parent) -ieq 'resources') { return (Split-Path -Parent $parent) }
    return $parent
  }
  if (Test-Path -LiteralPath (Join-Path $p 'resources\app.asar')) { return $p }
  if (Test-Path -LiteralPath (Join-Path $p 'resources')) { return (Resolve-AppDir -Path (Join-Path $p 'resources')) }

  $subs = Get-ChildItem -LiteralPath $p -Directory -ErrorAction SilentlyContinue |
    Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'resources\app.asar') }
  if ($subs) {
    $best = $subs | Sort-Object -Property @{ Expression = { try { [version]$_.Name } catch { [version]'0.0.0' } } } -Descending | Select-Object -First 1
    return $best.FullName
  }
  return $null
}

Write-Host ''
Write-Host '  汽水音乐 AMLL 歌词插件 · 卸载程序' -ForegroundColor White
Write-Host '  ------------------------------------' -ForegroundColor DarkGray
Write-Host ''

Step '正在定位汽水音乐安装目录'
$appDir = Resolve-AppDir -Path $TargetDir

if (-not $appDir) {
  # 优先从安装时留下的记录里找
  $bases = @("$env:LOCALAPPDATA\Programs", $env:ProgramFiles, ${env:ProgramFiles(x86)})
  $found = @()
  foreach ($b in $bases) {
    if (-not $b) { continue }
    foreach ($n in @('Soda Music', 'SodaMusic', '汽水音乐', 'Soda Music AMLL')) {
      $d = Resolve-AppDir -Path (Join-Path $b $n)
      if ($d) { $found += $d }
    }
  }
  # 扫注册表
  foreach ($r in @('HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*', 'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*', 'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*')) {
    try {
      Get-ItemProperty $r -ErrorAction SilentlyContinue |
        Where-Object { $_.DisplayName -and ($_.DisplayName -match '汽水|Soda') -and $_.InstallLocation } |
        ForEach-Object {
          $d = Resolve-AppDir -Path $_.InstallLocation
          if ($d) { $found += $d }
        }
    } catch {}
  }
  $found = $found | Select-Object -Unique
  if ($found.Count -eq 1) { $appDir = $found[0] }
  elseif ($found.Count -gt 1) {
    Write-Host '  找到多个汽水音乐目录：' -ForegroundColor White
    for ($i = 0; $i -lt $found.Count; $i++) { Write-Host ("    [{0}] {1}" -f ($i + 1), $found[$i]) -ForegroundColor Gray }
    $pick = Read-Host '  请输入序号'
    $idx = 0
    if ([int]::TryParse($pick, [ref]$idx) -and $idx -ge 1 -and $idx -le $found.Count) { $appDir = $found[$idx - 1] }
  }
}

if (-not $appDir) {
  Write-Host ''
  Write-Host '  请把汽水音乐的安装目录粘贴进来，直接回车退出。' -ForegroundColor White
  $manual = Read-Host '  安装目录'
  if (-not $manual) { Die '未提供安装目录。' }
  $appDir = Resolve-AppDir -Path $manual
  if (-not $appDir) { Die "这个目录里没有找到 resources\app.asar：$manual" }
}
Ok $appDir

$resDir = Join-Path $appDir 'resources'
$asarPath = Join-Path $resDir 'app.asar'
$bakPath = "$asarPath.orig"

if (-not (Test-CanWrite -Path $resDir)) {
  if (-not (Test-Admin)) {
    Warn '目标目录需要管理员权限，正在请求提权…'
    $stage = Join-Path $env:LOCALAPPDATA 'SodaAMLL\installer'
    $stageScript = Join-Path $stage 'uninstall.ps1'
    if (-not (Test-Path -LiteralPath $stageScript)) {
      if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
      New-Item -ItemType Directory -Path $stage -Force | Out-Null
      Copy-Item -Path (Join-Path $here '*') -Destination $stage -Recurse -Force
      Ok "卸载器已暂存到 $stage"
    }
    $args = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$stageScript`"", '-TargetDir', "`"$appDir`"")
    Start-Process -FilePath 'powershell.exe' -ArgumentList $args -Verb RunAs
    exit
  }
  Die "没有写入权限：$resDir"
}

Step '还原客户端入口'
if (Test-Path -LiteralPath $bakPath) {
  Copy-Item -LiteralPath $bakPath -Destination $asarPath -Force
  Ok 'app.asar 已用 app.asar.orig 还原'
} else {
  Warn '没有找到 app.asar.orig，无法还原入口。'
  Warn '请通过汽水音乐自带的更新 / 修复功能重新安装客户端。'
}

Step '删除插件文件'
$amllDir = Join-Path $resDir 'amll'
$plugin = Join-Path $amllDir 'soda-amll.js'
if (Test-Path -LiteralPath $plugin) {
  Remove-Item -LiteralPath $plugin -Force
  Ok 'resources\amll\soda-amll.js 已删除'
}
$marker = Join-Path $amllDir 'install.json'
if (Test-Path -LiteralPath $marker) { Remove-Item -LiteralPath $marker -Force }
if ((Test-Path -LiteralPath $amllDir) -and -not (Get-ChildItem -LiteralPath $amllDir -Force | Select-Object -First 1)) {
  Remove-Item -LiteralPath $amllDir -Force
  Ok 'resources\amll 空目录已清理'
}

$running = Get-Process -Name 'SodaMusic' -ErrorAction SilentlyContinue
Write-Host ''
Write-Host '  卸载完成' -ForegroundColor Green
if ($running) { Write-Host '  汽水音乐正在运行，需要完全退出后重新打开才会生效。' -ForegroundColor Yellow }
Write-Host ''
