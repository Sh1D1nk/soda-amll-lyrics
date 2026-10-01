# 汽水音乐 AMLL 歌词插件 —— 安装脚本
# 做两件事：
#   1) 把 resources/app.asar 里的 /entry.js 换成插件入口（原文件备份为 app.asar.orig）
#   2) 把插件本体放到 resources/amll/soda-amll.js
# 卸载见同目录 uninstall.ps1，它会用 app.asar.orig 还原。

[CmdletBinding()]
param(
  [string]$TargetDir
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $here 'AsarTool.ps1')

# 目录结构里 payload\ 是一层子目录；自解压安装包（IExpress）不支持子目录，
# 会把所有文件平铺到同一层，所以这里两种布局都要认。
$PayloadDir = Join-Path $here 'payload'
if (-not (Test-Path -LiteralPath (Join-Path $PayloadDir 'entry.js'))) { $PayloadDir = $here }
$PayloadEntry = Join-Path $PayloadDir 'entry.js'
$PayloadPlugin = Join-Path $PayloadDir 'soda-amll.js'

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

# 传入的可能是任意一层目录，统一归一到「包含 resources\app.asar 的那一层」
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

  # 版本子目录（如 3.5.1）
  $subs = Get-ChildItem -LiteralPath $p -Directory -ErrorAction SilentlyContinue |
    Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'resources\app.asar') }
  if ($subs) {
    $best = $subs | Sort-Object -Property @{ Expression = { try { [version]$_.Name } catch { [version]'0.0.0' } } } -Descending | Select-Object -First 1
    return $best.FullName
  }
  return $null
}

function Find-InstalledApp {
  $candidates = New-Object System.Collections.ArrayList

  $regRoots = @(
    'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*',
    'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*',
    'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*'
  )
  foreach ($r in $regRoots) {
    try {
      Get-ItemProperty $r -ErrorAction SilentlyContinue |
        Where-Object { $_.DisplayName -and ($_.DisplayName -match '汽水|Soda') } |
        ForEach-Object {
          if ($_.InstallLocation) { $null = $candidates.Add($_.InstallLocation) }
          if ($_.DisplayIcon) {
            $icon = $_.DisplayIcon -replace '^"', '' -split '"' | Select-Object -First 1
            if ($icon) { $null = $candidates.Add((Split-Path -Parent $icon)) }
          }
        }
    } catch {}
  }

  $bases = @("$env:LOCALAPPDATA\Programs", $env:ProgramFiles, ${env:ProgramFiles(x86)})
  foreach ($b in $bases) {
    if (-not $b) { continue }
    foreach ($n in @('Soda Music', 'SodaMusic', '汽水音乐', 'Soda Music AMLL')) {
      $null = $candidates.Add((Join-Path $b $n))
    }
  }

  foreach ($c in $candidates) {
    $dir = Resolve-AppDir -Path $c
    if ($dir) { return $dir }
  }
  return $null
}

Write-Host ''
Write-Host '  汽水音乐 AMLL 歌词插件 · 安装程序' -ForegroundColor White
Write-Host '  ------------------------------------' -ForegroundColor DarkGray
Write-Host ''

foreach ($f in @($PayloadEntry, $PayloadPlugin)) {
  if (-not (Test-Path -LiteralPath $f)) { Die "安装包不完整，缺少文件：$f" }
}

Step '正在定位汽水音乐安装目录'
$appDir = Resolve-AppDir -Path $TargetDir
if (-not $appDir) { $appDir = Find-InstalledApp }

if (-not $appDir) {
  Warn '没有自动找到汽水音乐。'
  Write-Host ''
  Write-Host '  请把汽水音乐的安装目录（里面能看到 resources 文件夹的那一层）粘贴进来，' -ForegroundColor White
  Write-Host '  直接回车退出。' -ForegroundColor White
  $manual = Read-Host '  安装目录'
  if (-not $manual) { Die '未提供安装目录。' }
  $appDir = Resolve-AppDir -Path $manual
  if (-not $appDir) { Die "这个目录里没有找到 resources\app.asar：$manual" }
}
Ok $appDir

$resDir = Join-Path $appDir 'resources'
$asarPath = Join-Path $resDir 'app.asar'
$bakPath = "$asarPath.orig"

if (-not (Test-Path -LiteralPath $asarPath)) { Die "找不到 $asarPath" }

# 需要写权限时自动提权重来一次
if (-not (Test-CanWrite -Path $resDir)) {
  if (-not (Test-Admin)) {
    Warn '目标目录需要管理员权限，正在请求提权…'
    # 提权后的进程读不到压缩包临时目录，先把安装器落到一个稳定位置
    $stage = Join-Path $env:LOCALAPPDATA 'SodaAMLL\installer'
    $stageScript = Join-Path $stage 'install.ps1'
    if (-not (Test-Path -LiteralPath $stageScript)) {
      if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
      New-Item -ItemType Directory -Path $stage -Force | Out-Null
      Copy-Item -Path (Join-Path $here '*') -Destination $stage -Recurse -Force
      Ok "安装器已暂存到 $stage"
    }
    $args = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$stageScript`"", '-TargetDir', "`"$appDir`"")
    Start-Process -FilePath 'powershell.exe' -ArgumentList $args -Verb RunAs
    exit
  }
  Die "没有写入权限：$resDir"
}

Step '检查现有安装状态'
$arc = Read-AsarArchive -Path $asarPath
$entryInfo = Get-AsarFileList -Node $arc.Header | Where-Object { $_.Path -eq '/entry.js' }
if (-not $entryInfo) { Die 'app.asar 里没有 /entry.js，这个客户端结构不受支持。' }

$entryText = [System.Text.Encoding]::UTF8.GetString((Get-AsarContent -Archive $arc -Entry $entryInfo))
$already = $entryText -match '__amllAutoInject'
if ($already) {
  Ok '检测到已安装过插件，将直接覆盖更新。'
} elseif ($entryText -notmatch 'entry\.node') {
  Die "app.asar 的入口文件不是预期内容，为安全起见已中止。`n        如果你改过客户端，请先手动把 app.asar.orig 还原。"
} else {
  Ok '入口文件校验通过。'
}

if (-not (Test-Path -LiteralPath $bakPath)) {
  Step '备份原始 app.asar'
  Copy-Item -LiteralPath $asarPath -Destination $bakPath -Force
  Ok "已备份为 app.asar.orig"
} else {
  Step '备份已存在，跳过备份'
  Ok "$bakPath"
}

Step '写入插件入口（重打包 app.asar）'
$entryBytes = [System.IO.File]::ReadAllBytes($PayloadEntry)
$replace = @{}
$replace['/entry.js'] = $entryBytes
Write-AsarArchive -Archive $arc -Destination $asarPath -Replace $replace
Ok ("app.asar 已更新（{0:N0} 字节）" -f (Get-Item -LiteralPath $asarPath).Length)

Step '投放插件本体'
$amllDir = Join-Path $resDir 'amll'
if (-not (Test-Path -LiteralPath $amllDir)) { New-Item -ItemType Directory -Path $amllDir | Out-Null }
Copy-Item -LiteralPath $PayloadPlugin -Destination (Join-Path $amllDir 'soda-amll.js') -Force
Ok ("resources\amll\soda-amll.js（{0:N0} 字节）" -f (Get-Item -LiteralPath (Join-Path $amllDir 'soda-amll.js')).Length)

$marker = [pscustomobject]@{
  plugin    = 'soda-amll-lyrics'
  version   = '1.0.0'
  installed = (Get-Date).ToString('s')
  appDir    = $appDir
  asar      = $asarPath
}
$marker | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $amllDir 'install.json') -Encoding UTF8

$running = Get-Process -Name 'SodaMusic' -ErrorAction SilentlyContinue
Write-Host ''
Write-Host '  安装完成' -ForegroundColor Green
Write-Host '  ------------------------------------' -ForegroundColor DarkGray
Write-Host '  打开汽水音乐播放任意歌曲，歌词页会自动使用 AMLL 渲染。' -ForegroundColor Gray
Write-Host '  右下角「AMLL 歌词」悬浮按钮 或 Ctrl+Alt+L 可以开关，Esc 关闭。' -ForegroundColor Gray
Write-Host '  歌词页右键 → 设置，或应用设置页底部的「插件」标签页，都能调参数。' -ForegroundColor Gray
if ($running) {
  Write-Host ''
  Write-Host '  注意：汽水音乐正在运行，需要完全退出后重新打开才会生效。' -ForegroundColor Yellow
}
Write-Host ''
Write-Host ("  卸载：运行 Uninstall.bat，或用 uninstall.ps1 -TargetDir `"{0}`"" -f $appDir) -ForegroundColor DarkGray
Write-Host ''
