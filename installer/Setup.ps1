# 汽水音乐 AMLL 歌词插件 —— 图形化安装 / 卸载程序
#
#   powershell -ExecutionPolicy Bypass -File installer\Setup.ps1
#
# 界面展示：检测到的客户端、客户端版本、插件安装状态、适配情况，
# 并提供「安装 / 更新」与「卸载」两个操作。逻辑复用 AmllCommon.ps1。

[CmdletBinding()]
param(
  # 由提权后的进程传入，用来直接锁定目标客户端
  [string]$AppDir
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $here 'AsarTool.ps1')
. (Join-Path $here 'AmllCommon.ps1')

# 目录结构里 payload\ 是一层子目录；自解压安装包（IExpress）不支持子目录，
# 会把所有文件平铺到同一层，所以这里两种布局都要认。
$PayloadDir = Join-Path $here 'payload'
if (-not (Test-Path -LiteralPath (Join-Path $PayloadDir 'entry.js'))) { $PayloadDir = $here }

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
try { [System.Windows.Forms.Application]::EnableVisualStyles() } catch {}
try {
  Add-Type -Namespace AmllWin32 -Name Dpi -MemberDefinition '[DllImport("user32.dll")] public static extern bool SetProcessDPIAware();'
  [void][AmllWin32.Dpi]::SetProcessDPIAware()
} catch {}

# ---- 主题 ---------------------------------------------------------------
$cBg      = [System.Drawing.Color]::FromArgb(244, 246, 249)
$cCard    = [System.Drawing.Color]::White
$cText    = [System.Drawing.Color]::FromArgb(28, 32, 38)
$cMuted   = [System.Drawing.Color]::FromArgb(110, 118, 129)
$cLine    = [System.Drawing.Color]::FromArgb(226, 230, 236)
$cAccent  = [System.Drawing.Color]::FromArgb(41, 106, 246)
$cAccentD = [System.Drawing.Color]::FromArgb(30, 84, 205)
$cOk      = [System.Drawing.Color]::FromArgb(18, 150, 76)
$cWarn    = [System.Drawing.Color]::FromArgb(206, 122, 8)
$cErr     = [System.Drawing.Color]::FromArgb(214, 60, 66)

$fontUI    = New-Object System.Drawing.Font('Microsoft YaHei UI', 9)
$fontSmall = New-Object System.Drawing.Font('Microsoft YaHei UI', 8.5)
$fontBold  = New-Object System.Drawing.Font('Microsoft YaHei UI', 9, [System.Drawing.FontStyle]::Bold)
$fontTitle = New-Object System.Drawing.Font('Microsoft YaHei UI', 15, [System.Drawing.FontStyle]::Bold)
$fontMono  = New-Object System.Drawing.Font('Consolas', 8.5)

# ---- 窗口 ---------------------------------------------------------------
$form = New-Object System.Windows.Forms.Form
$form.Text = 'Soda AMLL Lyrics · 安装程序'
$form.ClientSize = New-Object System.Drawing.Size(620, 534)
$form.StartPosition = 'CenterScreen'
$form.FormBorderStyle = 'FixedSingle'
$form.MaximizeBox = $false
$form.BackColor = $cBg
$form.Font = $fontUI

$accentBar = New-Object System.Windows.Forms.Panel
$accentBar.Location = New-Object System.Drawing.Point(0, 0)
$accentBar.Size = New-Object System.Drawing.Size(620, 4)
$accentBar.BackColor = $cAccent
$form.Controls.Add($accentBar)

$lblTitle = New-Object System.Windows.Forms.Label
$lblTitle.Text = '汽水音乐 · AMLL 歌词插件'
$lblTitle.Font = $fontTitle
$lblTitle.ForeColor = $cText
$lblTitle.AutoSize = $true
$lblTitle.Location = New-Object System.Drawing.Point(20, 20)
$form.Controls.Add($lblTitle)

$lblSub = New-Object System.Windows.Forms.Label
$lblSub.Text = 'Apple Music 风格歌词 · 逐字高亮 · 液态玻璃底栏'
$lblSub.Font = $fontSmall
$lblSub.ForeColor = $cMuted
$lblSub.AutoSize = $true
$lblSub.Location = New-Object System.Drawing.Point(22, 56)
$form.Controls.Add($lblSub)

# ---- 客户端信息卡片 ------------------------------------------------------
$grpInfo = New-Object System.Windows.Forms.GroupBox
$grpInfo.Text = '  客户端信息  '
$grpInfo.Location = New-Object System.Drawing.Point(20, 92)
$grpInfo.Size = New-Object System.Drawing.Size(580, 190)
$grpInfo.BackColor = $cCard
$grpInfo.ForeColor = $cMuted
$grpInfo.Font = $fontSmall
$form.Controls.Add($grpInfo)

function New-Caption {
  param([string]$Text, [int]$Y)
  $l = New-Object System.Windows.Forms.Label
  $l.Text = $Text
  $l.Font = $fontSmall
  $l.ForeColor = $cMuted
  $l.AutoSize = $true
  $l.Location = New-Object System.Drawing.Point(18, $Y)
  $grpInfo.Controls.Add($l)
  return $l
}

function New-Value {
  param([int]$Y, [int]$Width = 470)
  $l = New-Object System.Windows.Forms.Label
  $l.Text = '—'
  $l.Font = $fontUI
  $l.ForeColor = $cText
  $l.AutoSize = $false
  $l.Size = New-Object System.Drawing.Size($Width, 20)
  $l.Location = New-Object System.Drawing.Point(96, $Y)
  $l.AutoEllipsis = $true
  $grpInfo.Controls.Add($l)
  return $l
}

New-Caption -Text '客户端' -Y 30 | Out-Null
$combo = New-Object System.Windows.Forms.ComboBox
$combo.DropDownStyle = 'DropDownList'
$combo.Font = $fontUI
$combo.Location = New-Object System.Drawing.Point(96, 26)
$combo.Size = New-Object System.Drawing.Size(386, 24)
$grpInfo.Controls.Add($combo)

$btnBrowse = New-Object System.Windows.Forms.Button
$btnBrowse.Text = '浏览…'
$btnBrowse.Font = $fontSmall
$btnBrowse.Location = New-Object System.Drawing.Point(490, 25)
$btnBrowse.Size = New-Object System.Drawing.Size(72, 26)
$btnBrowse.FlatStyle = 'Flat'
$btnBrowse.FlatAppearance.BorderSize = 1
$btnBrowse.FlatAppearance.BorderColor = $cLine
$btnBrowse.BackColor = $cCard
$btnBrowse.ForeColor = $cText
$btnBrowse.Cursor = [System.Windows.Forms.Cursors]::Hand
$grpInfo.Controls.Add($btnBrowse)

New-Caption -Text '客户端版本' -Y 62 | Out-Null
$lblVersion = New-Value -Y 62 -Width 460

New-Caption -Text '安装位置' -Y 94 | Out-Null
$lblPath = New-Value -Y 94 -Width 460

New-Caption -Text '插件状态' -Y 126 | Out-Null
$lblPlugin = New-Value -Y 126 -Width 300

New-Caption -Text '适配情况' -Y 158 | Out-Null
$lblCompat = New-Value -Y 158 -Width 460

# ---- 日志 ---------------------------------------------------------------
$grpLog = New-Object System.Windows.Forms.GroupBox
$grpLog.Text = '  日志  '
$grpLog.Location = New-Object System.Drawing.Point(20, 294)
$grpLog.Size = New-Object System.Drawing.Size(580, 178)
$grpLog.BackColor = $cCard
$grpLog.ForeColor = $cMuted
$grpLog.Font = $fontSmall
$form.Controls.Add($grpLog)

$logBox = New-Object System.Windows.Forms.RichTextBox
$logBox.Location = New-Object System.Drawing.Point(14, 24)
$logBox.Size = New-Object System.Drawing.Size(552, 142)
$logBox.ReadOnly = $true
$logBox.BorderStyle = 'None'
$logBox.BackColor = $cCard
$logBox.ForeColor = $cText
$logBox.Font = $fontMono
$logBox.WordWrap = $true
$logBox.ScrollBars = 'Vertical'
$grpLog.Controls.Add($logBox)

# ---- 按钮 ---------------------------------------------------------------
function Style-Button {
  param($Button, [System.Drawing.Color]$Back, [System.Drawing.Color]$Fore, [System.Drawing.Color]$Hover)
  $Button.FlatStyle = 'Flat'
  $Button.FlatAppearance.BorderSize = 0
  $Button.FlatAppearance.MouseOverBackColor = $Hover
  $Button.FlatAppearance.MouseDownBackColor = $Hover
  $Button.BackColor = $Back
  $Button.ForeColor = $Fore
  $Button.Font = $fontBold
  $Button.Cursor = [System.Windows.Forms.Cursors]::Hand
}

$btnClose = New-Object System.Windows.Forms.Button
$btnClose.Text = '退出'
$btnClose.Location = New-Object System.Drawing.Point(20, 486)
$btnClose.Size = New-Object System.Drawing.Size(88, 34)
Style-Button -Button $btnClose -Back $cCard -Fore $cText -Hover ([System.Drawing.Color]::FromArgb(232, 235, 240))
$form.Controls.Add($btnClose)

$btnRefresh = New-Object System.Windows.Forms.Button
$btnRefresh.Text = '刷新'
$btnRefresh.Location = New-Object System.Drawing.Point(116, 486)
$btnRefresh.Size = New-Object System.Drawing.Size(88, 34)
Style-Button -Button $btnRefresh -Back $cCard -Fore $cText -Hover ([System.Drawing.Color]::FromArgb(232, 235, 240))
$form.Controls.Add($btnRefresh)

$btnUninstall = New-Object System.Windows.Forms.Button
$btnUninstall.Text = '卸载插件'
$btnUninstall.Location = New-Object System.Drawing.Point(400, 486)
$btnUninstall.Size = New-Object System.Drawing.Size(96, 34)
Style-Button -Button $btnUninstall -Back ([System.Drawing.Color]::FromArgb(238, 240, 244)) -Fore $cErr -Hover ([System.Drawing.Color]::FromArgb(250, 228, 229))
$form.Controls.Add($btnUninstall)

$btnInstall = New-Object System.Windows.Forms.Button
$btnInstall.Text = '安装插件'
$btnInstall.Location = New-Object System.Drawing.Point(504, 486)
$btnInstall.Size = New-Object System.Drawing.Size(96, 34)
Style-Button -Button $btnInstall -Back $cAccent -Fore ([System.Drawing.Color]::White) -Hover $cAccentD
$form.Controls.Add($btnInstall)

# ---- 行为 ---------------------------------------------------------------
$script:clients = @()
$script:info = $null
$script:busy = $false

function Add-Log {
  param([string]$Text, [string]$Level = 'info')
  $color = switch ($Level) {
    'ok'    { $cOk }
    'warn'  { $cWarn }
    'error' { $cErr }
    'step'  { $cAccent }
    default { $cMuted }
  }
  $logBox.SelectionStart = $logBox.TextLength
  $logBox.SelectionLength = 0
  $logBox.SelectionColor = $color
  $logBox.AppendText(('[{0}] {1}{2}' -f (Get-Date).ToString('HH:mm:ss'), $Text, [Environment]::NewLine))
  $logBox.SelectionColor = $logBox.ForeColor
  $logBox.ScrollToCaret()
  [System.Windows.Forms.Application]::DoEvents()
}

function Set-Info {
  param($Info)

  $script:info = $Info

  if (-not $Info) {
    $lblVersion.Text = '—'
    $lblPath.Text = '—'
    $lblPlugin.Text = '未检测到客户端'
    $lblPlugin.ForeColor = $cMuted
    $lblCompat.Text = '—'
    $lblCompat.ForeColor = $cMuted
    $btnInstall.Enabled = $false
    $btnUninstall.Enabled = $false
    return
  }

  $lblVersion.Text = $Info.Version
  $lblPath.Text = $Info.AppDir

  if ($Info.Installed) {
    $lblPlugin.Text = '已安装（v{0}）' -f $Info.PluginVersion
    $lblPlugin.ForeColor = $cOk
  } else {
    $lblPlugin.Text = '未安装'
    $lblPlugin.ForeColor = $cMuted
  }

  switch ($Info.CompatLevel) {
    'verified'   { $lblCompat.Text = '● 已实测适配'; $lblCompat.ForeColor = $cOk }
    'structural' { $lblCompat.Text = '● 结构兼容，未实测 · 可能失效'; $lblCompat.ForeColor = $cWarn }
    default      { $lblCompat.Text = '● 不适配 · ' + $Info.CompatText; $lblCompat.ForeColor = $cErr }
  }

  $btnInstall.Enabled = ($Info.CompatLevel -ne 'unsupported')
  $btnUninstall.Enabled = [bool]$Info.Installed
}

function Load-Current {
  if ($combo.SelectedIndex -lt 0 -or $combo.SelectedIndex -ge $script:clients.Count) { Set-Info $null; return }
  $dir = $script:clients[$combo.SelectedIndex]
  try {
    $info = Get-ClientInfo -AppDir $dir
  } catch {
    Add-Log ('读取客户端信息失败：' + $_.Exception.Message) 'error'
    Set-Info $null
    return
  }
  Set-Info $info
  Add-Log ('当前客户端 {0} · {1}' -f $info.Version, $info.CompatText) $(if ($info.CompatLevel -eq 'verified') { 'ok' } elseif ($info.CompatLevel -eq 'structural') { 'warn' } else { 'error' })
}

function Get-ClientLabel {
  param([string]$Dir)
  $leaf = Split-Path -Leaf $Dir
  $label = if ($leaf -match '^\d+(\.\d+)+') { "汽水音乐 $leaf" } else { '汽水音乐' }
  if (Test-ClientInUse -AppDir $Dir) { $label += '（当前使用）' }
  return $label
}

function Load-Clients {
  $combo.Items.Clear()
  $script:clients = @()
  Set-Info $null

  foreach ($p in @(Get-ClientCandidates)) { $script:clients += $p }

  if ($script:clients.Count -eq 0) {
    Add-Log '未检测到汽水音乐客户端。' 'warn'
    Add-Log '点「浏览…」选择安装目录（里面能看到 resources 文件夹的那一层）。' 'info'
    return
  }

  foreach ($p in $script:clients) { [void]$combo.Items.Add((Get-ClientLabel -Dir $p)) }
  Add-Log ('检测到 {0} 个汽水音乐客户端。' -f $script:clients.Count) 'ok'

  $idx = 0
  if ($AppDir) {
    $want = Resolve-AppDir -Path $AppDir
    if ($want) {
      for ($i = 0; $i -lt $script:clients.Count; $i++) { if ($script:clients[$i] -ieq $want) { $idx = $i; break } }
    }
  }
  $combo.SelectedIndex = $idx
}

# 目标目录需要提权时，把整份安装器暂存后以管理员身份重开图形界面
function Restart-Elevated {
  param([string]$Dir)
  Add-Log '目标目录需要管理员权限，正在以管理员身份重新打开…' 'warn'
  try {
    $stage = Start-AmllElevated -SourceDir $here -ScriptName 'Setup.ps1' -ExtraArgs @('-AppDir', ('"' + $Dir + '"')) -Hidden
    Add-Log ('安装器已暂存到 ' + $stage) 'info'
    return $true
  } catch {
    Add-Log ('提权失败：' + $_.Exception.Message) 'error'
    [System.Windows.Forms.MessageBox]::Show('以管理员身份重新启动失败，请右键以管理员身份运行本程序。', 'Soda AMLL Lyrics', 'OK', 'Error') | Out-Null
    return $false
  }
}

$btnBrowse.Add_Click({
  $dlg = New-Object System.Windows.Forms.FolderBrowserDialog
  $dlg.Description = '选择汽水音乐安装目录（里面能看到 resources 文件夹的那一层）'
  if ($script:info) { $dlg.SelectedPath = $script:info.AppDir }
  if ($dlg.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
    $dir = Resolve-AppDir -Path $dlg.SelectedPath
    if (-not $dir) {
      Add-Log ('这个目录里没有找到 resources\app.asar：' + $dlg.SelectedPath) 'error'
      return
    }
    $script:clients = @($dir)
    $combo.Items.Clear()
    [void]$combo.Items.Add((Get-ClientLabel -Dir $dir))
    $combo.SelectedIndex = 0
  }
})

$combo.Add_SelectedIndexChanged({ if (-not $script:busy) { Load-Current } })

$btnRefresh.Add_Click({
  if ($script:busy) { return }
  Load-Clients
})

$btnClose.Add_Click({ $form.Close() })

$btnInstall.Add_Click({
  if ($script:busy) { return }
  $info = $script:info
  if (-not $info) { return }

  $resDir = Join-Path $info.AppDir 'resources'
  if (-not (Test-CanWrite -Path $resDir) -and -not (Test-Admin)) {
    if (Restart-Elevated -Dir $info.AppDir) { $form.Close() }
    return
  }

  $script:busy = $true
  $btnInstall.Enabled = $false
  $btnUninstall.Enabled = $false
  $btnRefresh.Enabled = $false
  $btnInstall.Text = '安装中…'
  try {
    $ok = Invoke-AmllInstall -AppDir $info.AppDir -PayloadDir $PayloadDir -Log { param($t, $l) Add-Log $t $l }
  } catch {
    Add-Log ('安装出错：' + $_.Exception.Message) 'error'
    $ok = $false
  }
  $btnInstall.Text = '安装插件'
  $btnRefresh.Enabled = $true
  $script:busy = $false

  if ($ok) {
    [System.Windows.Forms.MessageBox]::Show(
      "安装完成。`n`n打开汽水音乐播放任意歌曲，歌词页会自动使用 AMLL 渲染。`n右下角「AMLL 歌词」悬浮按钮或 Ctrl+Alt+L 开关，Esc 关闭。`n如果汽水音乐正在运行，请完全退出后重新打开。",
      'Soda AMLL Lyrics', 'OK', 'Information') | Out-Null
  } else {
    [System.Windows.Forms.MessageBox]::Show('安装失败，详见日志。', 'Soda AMLL Lyrics', 'OK', 'Error') | Out-Null
  }
  Load-Current
})

$btnUninstall.Add_Click({
  if ($script:busy) { return }
  $info = $script:info
  if (-not $info) { return }

  $ans = [System.Windows.Forms.MessageBox]::Show(
    "确定要卸载插件吗？`n`n客户端入口会用 app.asar.orig 还原，插件文件会被删除。",
    'Soda AMLL Lyrics', 'YesNo', 'Question')
  if ($ans -ne [System.Windows.Forms.DialogResult]::Yes) { return }

  $resDir = Join-Path $info.AppDir 'resources'
  if (-not (Test-CanWrite -Path $resDir) -and -not (Test-Admin)) {
    if (Restart-Elevated -Dir $info.AppDir) { $form.Close() }
    return
  }

  $script:busy = $true
  $btnInstall.Enabled = $false
  $btnUninstall.Enabled = $false
  $btnRefresh.Enabled = $false
  $btnUninstall.Text = '卸载中…'
  try {
    $ok = Invoke-AmllUninstall -AppDir $info.AppDir -Log { param($t, $l) Add-Log $t $l }
  } catch {
    Add-Log ('卸载出错：' + $_.Exception.Message) 'error'
    $ok = $false
  }
  $btnUninstall.Text = '卸载插件'
  $btnRefresh.Enabled = $true
  $script:busy = $false

  if ($ok) {
    [System.Windows.Forms.MessageBox]::Show('卸载完成。' + "`n`n" + '如果汽水音乐正在运行，请完全退出后重新打开。', 'Soda AMLL Lyrics', 'OK', 'Information') | Out-Null
  } else {
    [System.Windows.Forms.MessageBox]::Show('卸载失败，详见日志。', 'Soda AMLL Lyrics', 'OK', 'Error') | Out-Null
  }
  Load-Current
})

$form.Add_Shown({
  if (-not (Test-Admin)) { Add-Log '当前不是管理员权限，若客户端装在受保护目录会自动请求提权。' 'info' }
  Load-Clients
})

[void]$form.ShowDialog()
$form.Dispose()
