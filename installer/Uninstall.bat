@echo off
setlocal
cd /d "%~dp0"

rem 与 Install.bat 相同：打开图形界面，在里面点「卸载插件」。
rem 命令行方式仍然可用：powershell -ExecutionPolicy Bypass -File uninstall.ps1

powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0Setup.ps1" %*
exit /b %ERRORLEVEL%
