# 把 ICO 的图标资源写进已经生成的 exe。
#
# IExpress 的 SED 文件不支持自定义图标（它只会套用 wextract.exe 自带的图标），
# 所以只能在打包完成后直接改 PE 资源：先枚举并删掉原有的 RT_ICON / RT_GROUP_ICON，
# 再把 ICO 里的每个尺寸写成新的 RT_ICON，最后补一个指向它们的 RT_GROUP_ICON。
#
#   powershell -ExecutionPolicy Bypass -File scripts\set-exe-icon.ps1 -Exe <exe> -Ico <ico>

[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$Exe,
  [Parameter(Mandatory)][string]$Ico
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $Exe)) { throw "找不到 exe：$Exe" }
if (-not (Test-Path -LiteralPath $Ico)) { throw "找不到 ico：$Ico" }

# 同一个会话里重复调用时要跳过重复编译
if (-not ('ExeIconReplacer' -as [type])) {
Add-Type -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;

public static class ExeIconReplacer
{
    const uint LOAD_LIBRARY_AS_DATAFILE = 0x00000002;
    const int RT_ICON = 3;
    const int RT_GROUP_ICON = 14;

    [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    static extern IntPtr LoadLibraryEx(string file, IntPtr reserved, uint flags);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool FreeLibrary(IntPtr module);
    [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    static extern IntPtr BeginUpdateResource(string file, bool deleteExisting);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool UpdateResource(IntPtr update, IntPtr type, IntPtr name, ushort language, byte[] data, uint size);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool EndUpdateResource(IntPtr update, bool discard);

    delegate bool EnumNameProc(IntPtr module, IntPtr type, IntPtr name, IntPtr param);
    delegate bool EnumLangProc(IntPtr module, IntPtr type, IntPtr name, ushort language, IntPtr param);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool EnumResourceNames(IntPtr module, IntPtr type, EnumNameProc callback, IntPtr param);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool EnumResourceLanguages(IntPtr module, IntPtr type, IntPtr name, EnumLangProc callback, IntPtr param);

    public static string Apply(string exePath, string icoPath)
    {
        byte[] ico = File.ReadAllBytes(icoPath);
        if (BitConverter.ToUInt16(ico, 0) != 0 || BitConverter.ToUInt16(ico, 2) != 1)
            throw new InvalidDataException("不是合法的 ICO 文件：" + icoPath);

        int count = BitConverter.ToUInt16(ico, 4);
        var images = new List<byte[]>(count);
        var entries = new List<byte[]>(count);
        for (int i = 0; i < count; i++)
        {
            int at = 6 + i * 16;
            int size = BitConverter.ToInt32(ico, at + 8);
            int offset = BitConverter.ToInt32(ico, at + 12);
            byte[] img = new byte[size];
            Array.Copy(ico, offset, img, 0, size);
            images.Add(img);

            byte[] entry = new byte[16];
            Array.Copy(ico, at, entry, 0, 16);
            entries.Add(entry);
        }

        // GRPICONDIR：ICONDIRENTRY 去掉 4 字节的 offset，换成 2 字节的资源 id
        byte[] group;
        using (var ms = new MemoryStream())
        using (var bw = new BinaryWriter(ms))
        {
            bw.Write((ushort)0);
            bw.Write((ushort)1);
            bw.Write((ushort)count);
            for (int i = 0; i < count; i++)
            {
                byte[] e = entries[i];
                bw.Write(e[0]);
                bw.Write(e[1]);
                bw.Write(e[2]);
                bw.Write(e[3]);
                bw.Write(BitConverter.ToUInt16(e, 4));
                bw.Write(BitConverter.ToUInt16(e, 6));
                bw.Write(BitConverter.ToInt32(e, 8));
                bw.Write((ushort)(i + 1));
            }
            bw.Flush();
            group = ms.ToArray();
        }

        var iconNames = new List<IntPtr>();
        var groupNames = new List<IntPtr>();
        var languages = new List<ushort>();

        IntPtr module = LoadLibraryEx(exePath, IntPtr.Zero, LOAD_LIBRARY_AS_DATAFILE);
        if (module == IntPtr.Zero)
            throw new Exception("LoadLibraryEx 失败，错误码 " + Marshal.GetLastWin32Error());

        try
        {
            EnumResourceNames(module, (IntPtr)RT_ICON,
                delegate(IntPtr m, IntPtr t, IntPtr n, IntPtr p) { iconNames.Add(n); return true; }, IntPtr.Zero);
            EnumResourceNames(module, (IntPtr)RT_GROUP_ICON,
                delegate(IntPtr m, IntPtr t, IntPtr n, IntPtr p) { groupNames.Add(n); return true; }, IntPtr.Zero);

            foreach (IntPtr n in groupNames)
                EnumResourceLanguages(module, (IntPtr)RT_GROUP_ICON, n,
                    delegate(IntPtr m, IntPtr t, IntPtr nm, ushort lg, IntPtr p) { if (!languages.Contains(lg)) languages.Add(lg); return true; }, IntPtr.Zero);
            foreach (IntPtr n in iconNames)
                EnumResourceLanguages(module, (IntPtr)RT_ICON, n,
                    delegate(IntPtr m, IntPtr t, IntPtr nm, ushort lg, IntPtr p) { if (!languages.Contains(lg)) languages.Add(lg); return true; }, IntPtr.Zero);
        }
        finally
        {
            FreeLibrary(module);
        }

        if (languages.Count == 0) languages.Add(1033);

        IntPtr update = BeginUpdateResource(exePath, false);
        if (update == IntPtr.Zero)
            throw new Exception("BeginUpdateResource 失败，错误码 " + Marshal.GetLastWin32Error());

        try
        {
            // data 传 null、size 传 0 即删除该资源
            foreach (IntPtr n in iconNames)
                foreach (ushort lg in languages)
                    UpdateResource(update, (IntPtr)RT_ICON, n, lg, null, 0);
            foreach (IntPtr n in groupNames)
                foreach (ushort lg in languages)
                    UpdateResource(update, (IntPtr)RT_GROUP_ICON, n, lg, null, 0);

            ushort lang = languages[0];
            for (int i = 0; i < images.Count; i++)
                if (!UpdateResource(update, (IntPtr)RT_ICON, (IntPtr)(i + 1), lang, images[i], (uint)images[i].Length))
                    throw new Exception("写入 RT_ICON 失败，错误码 " + Marshal.GetLastWin32Error());

            IntPtr groupName = groupNames.Count > 0 ? groupNames[0] : (IntPtr)1;
            if (!UpdateResource(update, (IntPtr)RT_GROUP_ICON, groupName, lang, group, (uint)group.Length))
                throw new Exception("写入 RT_GROUP_ICON 失败，错误码 " + Marshal.GetLastWin32Error());
        }
        finally
        {
            EndUpdateResource(update, false);
        }

        return string.Format("{0} 个尺寸：{1}", images.Count, string.Join(", ", ImageLabels(entries)));
    }

    static string[] ImageLabels(List<byte[]> entries)
    {
        var labels = new List<string>(entries.Count);
        foreach (byte[] e in entries)
        {
            int w = e[0] == 0 ? 256 : e[0];
            int h = e[1] == 0 ? 256 : e[1];
            labels.Add(w + "x" + h);
        }
        return labels.ToArray();
    }
}
'@
}

$info = [ExeIconReplacer]::Apply($Exe, $Ico)
Write-Host "    已写入图标 $info" -ForegroundColor Green
