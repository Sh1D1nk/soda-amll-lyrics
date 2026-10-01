# AsarTool.ps1 —— 极简 asar 读取 / 重打包，只做「替换若干文件内容」这一件事。
# 格式参考：4 字节 pickle 长度 + 4 字节 header 长度 + 4 字节 payload 长度 + 4 字节 JSON 长度
#           + JSON（补零到 4 字节对齐）+ 各文件内容依次拼接。
# unpacked 的文件（如 *.node）没有 offset，内容在 app.asar.unpacked 里，打包时跳过。

function Read-AsarArchive {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) { throw "找不到文件：$Path" }
  $bytes = [System.IO.File]::ReadAllBytes($Path)
  if ($bytes.Length -lt 16) { throw "文件过小，不是有效的 asar：$Path" }

  $magic = [System.BitConverter]::ToUInt32($bytes, 0)
  if ($magic -ne 4) { throw "asar 头部校验失败（magic=$magic）：$Path" }

  $headerSize = [System.BitConverter]::ToUInt32($bytes, 4)
  $jsonLen = [System.BitConverter]::ToUInt32($bytes, 12)
  if ($jsonLen -le 0 -or (16 + $jsonLen) -gt $bytes.Length) { throw "asar 头部长度异常：$Path" }

  $json = [System.Text.Encoding]::UTF8.GetString($bytes, 16, $jsonLen)
  return [pscustomobject]@{
    Path      = $Path
    Header    = ($json | ConvertFrom-Json)
    DataStart = 8 + $headerSize
    Data      = $bytes
  }
}

function Get-AsarFileList {
  param($Node, [string]$Prefix = '')

  $list = New-Object System.Collections.ArrayList
  foreach ($prop in $Node.files.PSObject.Properties) {
    $childPath = "$Prefix/$($prop.Name)"
    $info = $prop.Value
    if ($info.PSObject.Properties.Name -contains 'files') {
      foreach ($item in (Get-AsarFileList -Node $info -Prefix $childPath)) { $null = $list.Add($item) }
    } else {
      $null = $list.Add([pscustomobject]@{ Path = $childPath; Info = $info })
    }
  }
  return $list
}

function Get-AsarContent {
  param($Archive, $Entry)

  $offset = [int]$Entry.Info.offset
  $size = [int]$Entry.Info.size
  $buffer = New-Object byte[] $size
  [System.Array]::Copy($Archive.Data, $Archive.DataStart + $offset, $buffer, 0, $size)
  return , $buffer
}

function Write-UInt32 {
  param([System.IO.Stream]$Stream, [uint32]$Value)
  $b = [System.BitConverter]::GetBytes($Value)
  $Stream.Write($b, 0, 4)
}

function Write-AsarArchive {
  param(
    [Parameter(Mandatory = $true)]$Archive,
    [Parameter(Mandatory = $true)][string]$Destination,
    [hashtable]$Replace = @{}
  )

  $sha = [System.Security.Cryptography.SHA256]::Create()
  $blob = New-Object System.IO.MemoryStream
  try {
    foreach ($entry in (Get-AsarFileList -Node $Archive.Header)) {
      $names = $entry.Info.PSObject.Properties.Name
      if ($names -notcontains 'offset') { continue }   # unpacked，不进数据区

      $offsetIsString = $entry.Info.offset -is [string]
      if ($Replace.ContainsKey($entry.Path)) {
        $content = $Replace[$entry.Path]
        $entry.Info.size = $content.Length
        $hash = ($sha.ComputeHash($content) | ForEach-Object { $_.ToString('x2') }) -join ''
        if ($names -contains 'integrity') {
          $entry.Info.integrity.hash = $hash
          $entry.Info.integrity.blocks = [object[]]@($hash)
        }
      } else {
        $content = Get-AsarContent -Archive $Archive -Entry $entry
      }

      if ($offsetIsString) { $entry.Info.offset = [string]$blob.Length } else { $entry.Info.offset = $blob.Length }
      $blob.Write($content, 0, $content.Length)
    }

    $json = $Archive.Header | ConvertTo-Json -Depth 100 -Compress
    $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $pad = (4 - ($jsonBytes.Length % 4)) % 4
    $padded = New-Object byte[] ($jsonBytes.Length + $pad)
    [System.Array]::Copy($jsonBytes, $padded, $jsonBytes.Length)

    $payloadSize = 4 + $padded.Length
    $headerPickleSize = 4 + $payloadSize

    $out = New-Object System.IO.MemoryStream
    try {
      Write-UInt32 -Stream $out -Value 4
      Write-UInt32 -Stream $out -Value $headerPickleSize
      Write-UInt32 -Stream $out -Value $payloadSize
      Write-UInt32 -Stream $out -Value $jsonBytes.Length
      $out.Write($padded, 0, $padded.Length)
      $blob.Position = 0
      $blob.CopyTo($out)
      [System.IO.File]::WriteAllBytes($Destination, $out.ToArray())
    } finally {
      $out.Dispose()
    }
  } finally {
    $blob.Dispose()
    $sha.Dispose()
  }
}
