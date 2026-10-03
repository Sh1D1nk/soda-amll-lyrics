# 打包脚本：构建插件 → 组装安装目录 → 产出 ZIP 与自解压安装包
#
#   powershell -ExecutionPolicy Bypass -File scripts\build-package.ps1
#
# 产物在 release\ 下：
#   SodaAMLL-Lyrics-<版本>\          解压即用的安装目录
#   SodaAMLL-Lyrics-<版本>.zip       分发包
#   SodaAMLL-Lyrics-<版本>-Setup.exe 自解压安装包

[CmdletBinding()]
param(
  [string]$Version = '1.0.0',
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$installerSrc = Join-Path $root 'installer'
$distPlugin = Join-Path $root 'dist\soda-amll.js'
$releaseDir = Join-Path $root 'release'
$name = "SodaAMLL-Lyrics-$Version"
$stage = Join-Path $releaseDir $name
$zipPath = Join-Path $releaseDir "$name.zip"
$setupPath = Join-Path $releaseDir "$name-Setup.exe"
$iconPath = Join-Path $installerSrc 'assets\app.ico'
$setIconScript = Join-Path $root 'scripts\set-exe-icon.ps1'

function Step { param($t) Write-Host "==> $t" -ForegroundColor Cyan }
function Ok   { param($t) Write-Host "    $t" -ForegroundColor Green }

if (-not $SkipBuild) {
  Step '构建插件（esbuild）'
  Push-Location $root
  try {
    & node build.mjs
    if ($LASTEXITCODE -ne 0) { throw "构建失败，退出码 $LASTEXITCODE" }
  } finally { Pop-Location }
  Ok $distPlugin
}

if (-not (Test-Path -LiteralPath $distPlugin)) { throw "找不到构建产物：$distPlugin" }

Step '同步插件到 installer\payload'
Copy-Item -LiteralPath $distPlugin -Destination (Join-Path $installerSrc 'payload\soda-amll.js') -Force
Ok ("payload\soda-amll.js（{0:N0} 字节）" -f (Get-Item -LiteralPath $distPlugin).Length)

Step "组装 release\$name"
if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage -Force | Out-Null
foreach ($f in @('Setup.ps1', 'install.ps1', 'uninstall.ps1', 'AmllCommon.ps1', 'AsarTool.ps1', 'Install.bat', 'Uninstall.bat', 'README.txt')) {
  $src = Join-Path $installerSrc $f
  if (-not (Test-Path -LiteralPath $src)) { throw "缺少安装器文件：$src" }
  Copy-Item -LiteralPath $src -Destination $stage -Force
}
Copy-Item -LiteralPath (Join-Path $installerSrc 'payload') -Destination $stage -Recurse -Force
Ok ((Get-ChildItem -LiteralPath $stage -Recurse -File).Count.ToString() + ' 个文件')

Step '生成 ZIP'
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zipPath -CompressionLevel Optimal
Ok ("$zipPath（{0:N0} 字节）" -f (Get-Item -LiteralPath $zipPath).Length)

# ---- 自解压安装包 ----------------------------------------------------
# IExpress 会把内容解到 %TEMP%\IXPxxx.tmp 并在 Install.bat 结束后删除该目录，
# 所以 install.ps1 提权时会把安装器暂存到 %LOCALAPPDATA%\SodaAMLL\installer 再拉起。
# 它也不支持子目录，所以这里另建一份把 payload 平铺开的源目录。
Step '生成自解压安装包（IExpress）'
$iexpress = Join-Path $env:SystemRoot 'System32\iexpress.exe'
if (-not (Test-Path -LiteralPath $iexpress)) {
  Write-Host '    这台机器没有 iexpress.exe，跳过 exe，只保留 ZIP。' -ForegroundColor Yellow
} else {
  if (Test-Path -LiteralPath $setupPath) { Remove-Item -LiteralPath $setupPath -Force }

  $flat = Join-Path $releaseDir "$name-flat"
  if (Test-Path -LiteralPath $flat) { Remove-Item -LiteralPath $flat -Recurse -Force }
  New-Item -ItemType Directory -Path $flat -Force | Out-Null
  Copy-Item -Path (Join-Path $stage '*') -Destination $flat -Recurse -Force
  Copy-Item -Path (Join-Path $stage 'payload\*') -Destination $flat -Force
  Remove-Item -LiteralPath (Join-Path $flat 'payload') -Recurse -Force

  $files = @('Install.bat', 'Uninstall.bat', 'Setup.ps1', 'install.ps1', 'uninstall.ps1', 'AmllCommon.ps1', 'AsarTool.ps1', 'README.txt', 'entry.js', 'soda-amll.js')
  $strings = New-Object System.Collections.ArrayList
  $null = $strings.Add('[Strings]')
  $null = $strings.Add('InstallPrompt=')
  $null = $strings.Add('DisplayLicense=')
  $null = $strings.Add('FinishMessage=')
  $null = $strings.Add("TargetName=$setupPath")
  $null = $strings.Add('FriendlyName=Soda AMLL Lyrics')
  # 必须经 cmd.exe 启动：wextract 用 CreateProcess 执行 AppLaunched，
  # 而 CreateProcess 无法直接运行 .bat，会报「系统找不到指定的文件」。
  # Install.bat 会同步等图形界面关掉再退出，否则 wextract 会提前删掉解压目录。
  $null = $strings.Add('AppLaunched=cmd.exe /c Install.bat')
  $null = $strings.Add('PostInstallCmd=<None>')
  $null = $strings.Add('AdminQuietInstCmd=')
  $null = $strings.Add('UserQuietInstCmd=')
  for ($i = 0; $i -lt $files.Count; $i++) { $null = $strings.Add("FILE$i=`"$($files[$i])`"") }

  $sed = New-Object System.Collections.ArrayList
  $null = $sed.Add('[Version]')
  $null = $sed.Add('Class=IEXPRESS')
  $null = $sed.Add('SEDVersion=3')
  $null = $sed.Add('[Options]')
  $null = $sed.Add('PackagePurpose=InstallApp')
  $null = $sed.Add('ShowInstallProgramWindow=1')
  $null = $sed.Add('HideExtractAnimation=0')
  $null = $sed.Add('UseLongFileName=1')
  $null = $sed.Add('InsideCompressed=0')
  $null = $sed.Add('CAB_FixedSize=0')
  $null = $sed.Add('CAB_ResvCodeSigning=0')
  $null = $sed.Add('RebootMode=N')
  $null = $sed.Add('InstallPrompt=%InstallPrompt%')
  $null = $sed.Add('DisplayLicense=%DisplayLicense%')
  $null = $sed.Add('FinishMessage=%FinishMessage%')
  $null = $sed.Add('TargetName=%TargetName%')
  $null = $sed.Add('FriendlyName=%FriendlyName%')
  $null = $sed.Add('AppLaunched=%AppLaunched%')
  $null = $sed.Add('PostInstallCmd=%PostInstallCmd%')
  $null = $sed.Add('AdminQuietInstCmd=%AdminQuietInstCmd%')
  $null = $sed.Add('UserQuietInstCmd=%UserQuietInstCmd%')
  $null = $sed.Add('SourceFiles=SourceFiles')
  $null = $sed.AddRange($strings)
  $null = $sed.Add('[SourceFiles]')
  $null = $sed.Add("SourceFiles0=$flat\")
  $null = $sed.Add('[SourceFiles0]')
  for ($i = 0; $i -lt $files.Count; $i++) { $null = $sed.Add("%FILE$i%=") }

  # iexpress 是 GUI 子系统程序，直接调用不会等待，必须用 -Wait。
  # 另外它无法把结果写进带空格的路径，所以先在无空格的临时目录生成再搬回来。
  $tmpTarget = Join-Path $env:TEMP "SodaAMLL-Setup-$([guid]::NewGuid().ToString('N')).exe"
  $sedPath = Join-Path $env:TEMP "SodaAMLL-Setup-$([guid]::NewGuid().ToString('N')).sed"
  $sedText = (($sed -join "`r`n") + "`r`n").Replace($setupPath, $tmpTarget)
  [System.IO.File]::WriteAllText($sedPath, $sedText, [System.Text.Encoding]::ASCII)

  Start-Process -FilePath $iexpress -ArgumentList @('/N', '/Q', $sedPath) -Wait | Out-Null
  Remove-Item -LiteralPath $sedPath -Force
  Remove-Item -LiteralPath $flat -Recurse -Force
  if (-not (Test-Path -LiteralPath $tmpTarget)) { throw 'IExpress 没有产出 exe。' }
  Move-Item -LiteralPath $tmpTarget -Destination $setupPath -Force

  # IExpress 的 SED 不支持自定义图标（只会套用 wextract 自带的），
  # 所以打包完成后再直接改 PE 资源把图标写进去。
  if (Test-Path -LiteralPath $iconPath) {
    & $setIconScript -Exe $setupPath -Ico $iconPath
  } else {
    Write-Host "    没有 $iconPath，沿用 IExpress 默认图标。" -ForegroundColor Yellow
  }

  Ok ("$setupPath（{0:N0} 字节）" -f (Get-Item -LiteralPath $setupPath).Length)
}

Write-Host ''
Write-Host "  打包完成：$releaseDir" -ForegroundColor Green
Write-Host ''
