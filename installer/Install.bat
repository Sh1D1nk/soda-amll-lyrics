@echo off
setlocal
cd /d "%~dp0"

rem 启动图形界面（安装 / 卸载 / 版本 / 适配状态都在这里）。
rem
rem 由自解压包（IExpress / wextract）经 cmd.exe /c 启动，这里必须同步运行：
rem cmd 一退出，wextract 就会把解压出来的临时目录删掉，图形界面就跑不起来了。
rem -WindowStyle Hidden 只隐藏控制台窗口，WinForms 界面照常显示。

powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0Setup.ps1" %*
exit /b %ERRORLEVEL%
