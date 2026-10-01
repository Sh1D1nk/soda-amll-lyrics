# AmllCommon.ps1 —— 命令行安装器、卸载器和图形界面共用的逻辑。
# 负责：定位汽水音乐客户端、判断版本与适配状态、安装与卸载插件。
# 依赖 AsarTool.ps1，调用方需先 dot-source 它。

# 实际验证过适配的客户端版本；不在列表里的版本只做结构判断
$script:VerifiedVersions = @('3.5.1')

function Test-Admin {
  $id = [Security.Principal.WindowsIdentity]::GetCurrent()
  return ([Security.Principal.WindowsPrincipal]$id).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-CanWrite {
  param([Parameter(Mandatory = $true)][string]$Path)
  try {
    if (-not (Test-Path -LiteralPath $Path)) { return $false }
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

function Get-ClientVersion {
  param([Parameter(Mandatory = $true)][string]$AppDir)
  $leaf = Split-Path -Leaf $AppDir
  if ($leaf -match '^\d+(\.\d+)+') { return $leaf }
  $vf = Join-Path $AppDir 'version'
  if (Test-Path -LiteralPath $vf) {
    try { $v = (Get-Content -LiteralPath $vf -Raw).Trim(); if ($v) { return $v } } catch {}
  }
  return '未知'
}

# launcher_config.json 里的 cur_path 就是启动器当前选中的版本
function Test-ClientInUse {
  param([Parameter(Mandatory = $true)][string]$AppDir)
  $leaf = Split-Path -Leaf $AppDir
  $cands = @((Join-Path $AppDir 'launcher_config.json'), (Join-Path (Split-Path -Parent $AppDir) 'launcher_config.json'))
  foreach ($c in $cands) {
    if (-not (Test-Path -LiteralPath $c)) { continue }
    try {
      $j = Get-Content -LiteralPath $c -Raw | ConvertFrom-Json
      if ($j.cur_path -and ([string]$j.cur_path) -eq $leaf) { return $true }
    } catch {}
  }
  return $false
}

# 找出机器上所有可用的汽水音乐客户端目录（含多版本），按版本降序
function Get-ClientCandidates {
  $roots = New-Object System.Collections.ArrayList
  $addRoot = { param($p) if ($p -and -not ($roots -contains $p)) { $null = $roots.Add($p) } }

  foreach ($r in @(
      'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*',
      'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*',
      'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*')) {
    try {
      Get-ItemProperty $r -ErrorAction SilentlyContinue |
        Where-Object { $_.DisplayName -and ($_.DisplayName -match '汽水|Soda') } |
        ForEach-Object {
          if ($_.InstallLocation) { & $addRoot $_.InstallLocation }
          if ($_.DisplayIcon) {
            $icon = $_.DisplayIcon -replace '^"', '' -split '"' | Select-Object -First 1
            if ($icon) { & $addRoot (Split-Path -Parent $icon) }
          }
        }
    } catch {}
  }

  foreach ($b in @("$env:LOCALAPPDATA\Programs", $env:ProgramFiles, ${env:ProgramFiles(x86)})) {
    if (-not $b) { continue }
    foreach ($n in @('Soda Music', 'SodaMusic', '汽水音乐', 'Soda Music AMLL')) { & $addRoot (Join-Path $b $n) }
  }

  $apps = New-Object System.Collections.ArrayList
  foreach ($root in $roots) {
    if (-not (Test-Path -LiteralPath $root)) { continue }
    $rp = (Resolve-Path -LiteralPath $root).Path
    if (Test-Path -LiteralPath (Join-Path $rp 'resources\app.asar')) {
      if (-not ($apps -contains $rp)) { $null = $apps.Add($rp) }
      continue
    }
    foreach ($sub in (Get-ChildItem -LiteralPath $rp -Directory -ErrorAction SilentlyContinue)) {
      if (Test-Path -LiteralPath (Join-Path $sub.FullName 'resources\app.asar')) {
        if (-not ($apps -contains $sub.FullName)) { $null = $apps.Add($sub.FullName) }
      }
    }
  }

  return $apps | Sort-Object -Property @{ Expression = { try { [version](Split-Path -Leaf $_) } catch { [version]'0.0.0' } } } -Descending
}

# 读取一个客户端的版本 / 适配状态 / 插件状态
function Get-ClientInfo {
  param([Parameter(Mandatory = $true)][string]$AppDir)

  $resDir = Join-Path $AppDir 'resources'
  $asarPath = Join-Path $resDir 'app.asar'
  $bakPath = "$asarPath.orig"

  $info = [pscustomobject]@{
    AppDir         = $AppDir
    Version        = Get-ClientVersion -AppDir $AppDir
    InUse          = Test-ClientInUse -AppDir $AppDir
    AsarPath       = $asarPath
    HasAsar        = (Test-Path -LiteralPath $asarPath)
    BackupExists   = (Test-Path -LiteralPath $bakPath)
    Writable       = (Test-CanWrite -Path $resDir)
    CompatLevel    = 'unsupported'   # verified / structural / unsupported
    CompatText     = ''
    Installed      = $false
    PluginVersion  = ''
    Verified       = ($script:VerifiedVersions -contains (Get-ClientVersion -AppDir $AppDir))
  }

  if (-not $info.HasAsar) {
    $info.CompatText = '找不到 resources\app.asar'
    return $info
  }

  try {
    $arc = Read-AsarArchive -Path $asarPath
    $entry = Get-AsarFileList -Node $arc.Header | Where-Object { $_.Path -eq '/entry.js' }
    if (-not $entry) {
      $info.CompatText = '客户端入口结构不认识（app.asar 里没有 /entry.js）'
      return $info
    }
    $text = [System.Text.Encoding]::UTF8.GetString((Get-AsarContent -Archive $arc -Entry $entry))
    if ($text -match '__amllAutoInject') {
      $info.Installed = $true
    } elseif ($text -notmatch 'entry\.node') {
      $info.CompatText = '入口文件不是预期内容，可能与当前插件不兼容'
      return $info
    }
  } catch {
    $info.CompatText = '读取 app.asar 失败：' + $_.Exception.Message
    return $info
  }

  $marker = Join-Path $resDir 'amll\install.json'
  if (Test-Path -LiteralPath $marker) {
    try {
      $j = Get-Content -LiteralPath $marker -Raw | ConvertFrom-Json
      if ($j.version) { $info.PluginVersion = [string]$j.version }
    } catch {}
  }
  if (-not $info.PluginVersion) { $info.PluginVersion = '1.0.0' }

  if ($info.Verified) {
    $info.CompatLevel = 'verified'
    $info.CompatText = "该版本（$($info.Version)）已实测适配"
  } else {
    $info.CompatLevel = 'structural'
    $info.CompatText = "结构兼容，但 $($info.Version) 未实测，可能失效"
  }
  return $info
}

# 安装 / 更新插件。成功返回 $true。
function Invoke-AmllInstall {
  param(
    [Parameter(Mandatory = $true)][string]$AppDir,
    [Parameter(Mandatory = $true)][string]$PayloadDir,
    [scriptblock]$Log = { param($t, $l) }
  )
  $emit = { param($t, $l = 'info') [void](& $Log $t $l) }

  $resDir = Join-Path $AppDir 'resources'
  $asarPath = Join-Path $resDir 'app.asar'
  $bakPath = "$asarPath.orig"
  $srcEntry = Join-Path $PayloadDir 'entry.js'
  $srcPlugin = Join-Path $PayloadDir 'soda-amll.js'

  foreach ($f in @($srcEntry, $srcPlugin)) {
    if (-not (Test-Path -LiteralPath $f)) { & $emit "安装包不完整，缺少文件：$f" 'error'; return $false }
  }
  if (-not (Test-Path -LiteralPath $asarPath)) { & $emit "找不到 $asarPath" 'error'; return $false }
  if (-not (Test-CanWrite -Path $resDir)) { & $emit "没有写入权限：$resDir（请以管理员身份运行）" 'error'; return $false }

  & $emit '读取并校验 app.asar…' 'step'
  $arc = Read-AsarArchive -Path $asarPath
  $entry = Get-AsarFileList -Node $arc.Header | Where-Object { $_.Path -eq '/entry.js' }
  if (-not $entry) { & $emit 'app.asar 里没有 /entry.js，这个客户端结构不受支持。' 'error'; return $false }

  $text = [System.Text.Encoding]::UTF8.GetString((Get-AsarContent -Archive $arc -Entry $entry))
  if ($text -match '__amllAutoInject') {
    & $emit '检测到已安装过插件，将直接覆盖更新。' 'warn'
  } elseif ($text -notmatch 'entry\.node') {
    & $emit '入口文件不是预期内容，为安全起见已中止。' 'error'
    return $false
  } else {
    & $emit '入口文件校验通过。' 'ok'
  }

  if (-not (Test-Path -LiteralPath $bakPath)) {
    Copy-Item -LiteralPath $asarPath -Destination $bakPath -Force
    & $emit '已备份原始 app.asar → app.asar.orig' 'ok'
  } else {
    & $emit '备份已存在，跳过备份。' 'info'
  }

  & $emit '重打包 app.asar…' 'step'
  Write-AsarArchive -Archive $arc -Destination $asarPath -Replace @{ '/entry.js' = [System.IO.File]::ReadAllBytes($srcEntry) }
  & $emit ("app.asar 已更新（{0:N0} 字节）" -f (Get-Item -LiteralPath $asarPath).Length) 'ok'

  $amllDir = Join-Path $resDir 'amll'
  if (-not (Test-Path -LiteralPath $amllDir)) { New-Item -ItemType Directory -Path $amllDir | Out-Null }
  Copy-Item -LiteralPath $srcPlugin -Destination (Join-Path $amllDir 'soda-amll.js') -Force
  & $emit ("插件已投放：resources\amll\soda-amll.js（{0:N0} 字节）" -f (Get-Item -LiteralPath (Join-Path $amllDir 'soda-amll.js')).Length) 'ok'

  [pscustomobject]@{
    plugin    = 'soda-amll-lyrics'
    version   = '1.0.0'
    installed = (Get-Date).ToString('s')
    appDir    = $AppDir
    asar      = $asarPath
  } | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $amllDir 'install.json') -Encoding UTF8

  if (Get-Process -Name 'SodaMusic' -ErrorAction SilentlyContinue) {
    & $emit '汽水音乐正在运行，需要完全退出后重新打开才会生效。' 'warn'
  }
  & $emit '安装完成。' 'ok'
  return $true
}

# 卸载插件。成功返回 $true。
function Invoke-AmllUninstall {
  param(
    [Parameter(Mandatory = $true)][string]$AppDir,
    [scriptblock]$Log = { param($t, $l) }
  )
  $emit = { param($t, $l = 'info') [void](& $Log $t $l) }

  $resDir = Join-Path $AppDir 'resources'
  $asarPath = Join-Path $resDir 'app.asar'
  $bakPath = "$asarPath.orig"

  if (-not (Test-CanWrite -Path $resDir)) { & $emit "没有写入权限：$resDir（请以管理员身份运行）" 'error'; return $false }

  & $emit '还原客户端入口…' 'step'
  if (Test-Path -LiteralPath $bakPath) {
    Copy-Item -LiteralPath $bakPath -Destination $asarPath -Force
    & $emit 'app.asar 已用 app.asar.orig 还原' 'ok'
  } else {
    & $emit '没有找到 app.asar.orig，无法还原客户端入口。' 'warn'
    & $emit '请通过汽水音乐自带的更新 / 修复功能重新安装客户端。' 'warn'
  }

  & $emit '删除插件文件…' 'step'
  $amllDir = Join-Path $resDir 'amll'
  foreach ($f in @('soda-amll.js', 'install.json')) {
    $fp = Join-Path $amllDir $f
    if (Test-Path -LiteralPath $fp) {
      Remove-Item -LiteralPath $fp -Force
      & $emit "已删除 resources\amll\$f" 'ok'
    }
  }
  if ((Test-Path -LiteralPath $amllDir) -and -not (Get-ChildItem -LiteralPath $amllDir -Force | Select-Object -First 1)) {
    Remove-Item -LiteralPath $amllDir -Force
    & $emit '已清理空的 resources\amll 目录' 'ok'
  }

  if (Get-Process -Name 'SodaMusic' -ErrorAction SilentlyContinue) {
    & $emit '汽水音乐正在运行，需要完全退出后重新打开才会生效。' 'warn'
  }
  & $emit '卸载完成。' 'ok'
  return $true
}

# 目标目录需要管理员权限时，把整份安装器暂存到稳定位置再以管理员身份重启指定脚本。
# 返回暂存目录，便于调用方判断是否成功拉起。
function Start-AmllElevated {
  param(
    [Parameter(Mandatory = $true)][string]$SourceDir,
    [Parameter(Mandatory = $true)][string]$ScriptName,
    [string[]]$ExtraArgs = @(),
    # 图形界面自己会显示结果，提权后的控制台窗口没必要露出来
    [switch]$Hidden
  )
  $stage = Join-Path $env:LOCALAPPDATA 'SodaAMLL\installer'
  if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force -ErrorAction SilentlyContinue }
  New-Item -ItemType Directory -Path $stage -Force | Out-Null
  Copy-Item -Path (Join-Path $SourceDir '*') -Destination $stage -Recurse -Force

  $script = Join-Path $stage $ScriptName
  $psArgs = @('-NoProfile', '-ExecutionPolicy', 'Bypass')
  if ($Hidden) { $psArgs += @('-WindowStyle', 'Hidden') }
  $psArgs += @('-File', "`"$script`"") + $ExtraArgs
  Start-Process -FilePath 'powershell.exe' -ArgumentList $psArgs -Verb RunAs
  return $stage
}
