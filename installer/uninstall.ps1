# 汽水音乐 AMLL 歌词插件 —— 命令行卸载脚本
#
#   powershell -ExecutionPolicy Bypass -File installer\uninstall.ps1
#
# 用 app.asar.orig 还原客户端，并删除插件文件。
# 逻辑都在 AmllCommon.ps1 里，这里只负责控制台交互与提权。

[CmdletBinding()]
param(
  [string]$TargetDir
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $here 'AsarTool.ps1')
. (Join-Path $here 'AmllCommon.ps1')

function Warn { param($t) Write-Host "    $t" -ForegroundColor Yellow }
function Die  { param($t) Write-Host "`n[失败] $t" -ForegroundColor Red; Write-Host ''; exit 1 }

$consoleLog = {
  param($t, $l)
  switch ($l) {
    'ok'    { Write-Host "    $t" -ForegroundColor Green }
    'warn'  { Write-Host "    $t" -ForegroundColor Yellow }
    'error' { Write-Host "    $t" -ForegroundColor Red }
    'step'  { Write-Host "==> $t" -ForegroundColor Cyan }
    default { Write-Host "    $t" -ForegroundColor Gray }
  }
}

Write-Host ''
Write-Host '  汽水音乐 AMLL 歌词插件 · 卸载程序' -ForegroundColor White
Write-Host '  ------------------------------------' -ForegroundColor DarkGray
Write-Host ''

Write-Host '==> 正在定位汽水音乐安装目录' -ForegroundColor Cyan
$appDir = Resolve-AppDir -Path $TargetDir

if (-not $appDir) {
  $found = @(Get-ClientCandidates)
  if ($found.Count -eq 1) {
    $appDir = $found[0]
  } elseif ($found.Count -gt 1) {
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
Write-Host "    $appDir" -ForegroundColor Green

$resDir = Join-Path $appDir 'resources'

if (-not (Test-CanWrite -Path $resDir)) {
  if (-not (Test-Admin)) {
    Warn '目标目录需要管理员权限，正在请求提权…'
    $stage = Start-AmllElevated -SourceDir $here -ScriptName 'uninstall.ps1' -ExtraArgs @('-TargetDir', ('"' + $appDir + '"'))
    Write-Host "    卸载器已暂存到 $stage" -ForegroundColor Green
    exit
  }
  Die "没有写入权限：$resDir"
}

if (-not (Invoke-AmllUninstall -AppDir $appDir -Log $consoleLog)) {
  Die '卸载未完成，详见上面的日志。'
}

$running = Get-Process -Name 'SodaMusic' -ErrorAction SilentlyContinue
Write-Host ''
Write-Host '  卸载完成' -ForegroundColor Green
if ($running) { Write-Host '  汽水音乐正在运行，需要完全退出后重新打开才会生效。' -ForegroundColor Yellow }
Write-Host ''
