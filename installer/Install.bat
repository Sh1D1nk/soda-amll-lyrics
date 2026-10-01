@echo off
setlocal
cd /d "%~dp0"

rem The self-extracting package (IExpress / wextract) runs this script from a
rem HIDDEN console, so the user sees no output at all, and the trailing "pause"
rem would hang the installer forever. In /sfx mode we skip pause and let
rem install.ps1 report the result with a message box instead.
if /i "%~1"=="/sfx" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1" -Sfx
  exit /b %ERRORLEVEL%
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1" %*
echo.
pause
