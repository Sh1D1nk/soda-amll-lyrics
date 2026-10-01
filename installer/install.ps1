# 汽水音乐 AMLL 歌词插件 —— 命令行安装脚本
#
#   powershell -ExecutionPolicy Bypass -File installer\install.ps1
#
# 逻辑都在 AmllCommon.ps1 里，这里只负责控制台交互与提权。
# 图形界面见同目录 Setup.ps1，卸载见 uninstall.ps1。

[CmdletBinding()]
param(
  [string]$TargetDir,
  # 由自解压安装包（Install.bat /sfx）传入：控制台是隐藏的，结果改用弹窗告知
  [switch]$Sfx
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $here 'AsarTool.ps1')
. (Join-Path $here 'AmllCommon.ps1')

# 目录结构里 payload\ 是一层子目录；自解压安装包（IExpress）不支持子目录，
# 会把所有文件平铺到同一层，所以这里两种布局都要认。
$PayloadDir = Join-Path $here 'payload'
if (-not (Test-Path -LiteralPath (Join-Path $PayloadDir 'entry.js'))) { $PayloadDir = $here }

function Warn { param($t) Write-Host "    $t" -ForegroundColor Yellow }

# 自解压包跑在隐藏控制台里，只能用弹窗把结果告诉用户
function Show-Gui {
  param([string]$Text, [string]$Kind = 'Info')
  if (-not $Sfx) { return }
  try {
    Add-Type -AssemblyName System.Windows.Forms
    $icon = if ($Kind -eq 'Error') { [System.Windows.Forms.MessageBoxIcon]::Error } else { [System.Windows.Forms.MessageBoxIcon]::Information }
    [System.Windows.Forms.MessageBox]::Show($Text, 'Soda AMLL Lyrics', [System.Windows.Forms.MessageBoxButtons]::OK, $icon) | Out-Null
  } catch {}
}

function Die { param($t) Write-Host "`n[失败] $t" -ForegroundColor Red; Write-Host ''; Show-Gui -Text $t -Kind 'Error'; exit 1 }

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
Write-Host '  汽水音乐 AMLL 歌词插件 · 安装程序' -ForegroundColor White
Write-Host '  ------------------------------------' -ForegroundColor DarkGray
Write-Host ''

Write-Host '==> 正在定位汽水音乐安装目录' -ForegroundColor Cyan
$appDir = Resolve-AppDir -Path $TargetDir
if (-not $appDir) { $appDir = @(Get-ClientCandidates) | Select-Object -First 1 }

if (-not $appDir) {
  Warn '没有自动找到汽水音乐。'
  # 自解压包的控制台是隐藏的，Read-Host 会永远卡住，直接报错退出
  if ($Sfx) { Die "没有自动找到汽水音乐。请改用 ZIP 包，解压后手动运行 Install.bat 并填写安装目录。" }
  Write-Host ''
  Write-Host '  请把汽水音乐的安装目录（里面能看到 resources 文件夹的那一层）粘贴进来，' -ForegroundColor White
  Write-Host '  直接回车退出。' -ForegroundColor White
  $manual = Read-Host '  安装目录'
  if (-not $manual) { Die '未提供安装目录。' }
  $appDir = Resolve-AppDir -Path $manual
  if (-not $appDir) { Die "这个目录里没有找到 resources\app.asar：$manual" }
}
Write-Host "    $appDir" -ForegroundColor Green

$resDir = Join-Path $appDir 'resources'

# 需要写权限时自动提权重来一次
if (-not (Test-CanWrite -Path $resDir)) {
  if (-not (Test-Admin)) {
    Warn '目标目录需要管理员权限，正在请求提权…'
    # 提权后的进程读不到压缩包临时目录，先把安装器落到一个稳定位置
    $stage = Start-AmllElevated -SourceDir $here -ScriptName 'install.ps1' -ExtraArgs (@('-TargetDir', ('"' + $appDir + '"')) + $(if ($Sfx) { @('-Sfx') } else { @() }))
    Write-Host "    安装器已暂存到 $stage" -ForegroundColor Green
    exit
  }
  Die "没有写入权限：$resDir"
}

if (-not (Invoke-AmllInstall -AppDir $appDir -PayloadDir $PayloadDir -Log $consoleLog)) {
  Die '安装未完成，详见上面的日志。'
}

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

$gui = "安装完成。`n`n打开汽水音乐播放任意歌曲，歌词页会自动使用 AMLL 渲染。`n右下角「AMLL 歌词」悬浮按钮或 Ctrl+Alt+L 开关，Esc 关闭。`n歌词页右键 → 设置，或应用设置页底部的「插件」标签页，都能调参数。"
if ($running) { $gui += "`n`n注意：汽水音乐正在运行，需要完全退出后重新打开才会生效。" }
$gui += "`n`n卸载：运行同目录下的 Uninstall.bat"
Show-Gui -Text $gui
