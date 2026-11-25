@echo off
setlocal
title Ex 5 - Angular Component Setup
cd /d "%~dp0"
echo ==================================================
echo   Ex 5 - Create an Angular component and connect it with HTML
echo   One-time setup: installs everything and starts the app
echo ==================================================
set "NG_CLI_ANALYTICS=false"
set "NPM_CONFIG_FUND=false"
set "NPM_CONFIG_AUDIT=false"

echo.
echo [1/3] Checking for Node.js 22 or newer...
call :checknode
if "%NODE_OK%"=="1" goto :nodeready

echo Node.js 22+ was not found. Installing Node.js LTS using winget...
where winget >nul 2>nul
if errorlevel 1 (
  echo.
  echo ERROR: winget is not available on this PC.
  echo Please install Node.js LTS from https://nodejs.org and run setup.bat again.
  pause
  exit /b 1
)
winget install -e --id OpenJS.NodeJS.LTS --silent --accept-source-agreements --accept-package-agreements
winget upgrade -e --id OpenJS.NodeJS.LTS --silent --accept-source-agreements --accept-package-agreements >nul 2>nul
rem Make the freshly installed Node visible in this window without a restart
set "PATH=%ProgramFiles%\nodejs;%APPDATA%\npm;%PATH%"
call :checknode
if not "%NODE_OK%"=="1" (
  echo.
  echo ERROR: Node.js 22+ is still not available.
  echo Close this window, open a new one and run setup.bat again,
  echo or install Node.js LTS manually from https://nodejs.org
  pause
  exit /b 1
)

:nodeready
for /f "delims=" %%v in ('node -v') do echo Using Node.js %%v

echo.
echo [2/3] Installing project dependencies (this can take a few minutes)...
call npm install
if errorlevel 1 (
  echo.
  echo ERROR: npm install failed. Check your internet connection and try again.
  pause
  exit /b 1
)

echo.
echo [3/3] Starting the Angular dev server...
echo The app will open at http://localhost:4200  (press Ctrl+C to stop)
echo Next time, just double-click run.bat
echo.
call npx ng serve --open
pause
exit /b 0

rem ---------------------------------------------------------------
rem Sets NODE_OK=1 when node is on PATH and is version 22.22+ or 24+
:checknode
set "NODE_OK=0"
set "NODE_MAJOR="
set "NODE_MINOR=0"
where node >nul 2>nul
if errorlevel 1 exit /b 0
for /f "tokens=1,2 delims=v." %%a in ('node -v') do (
  set "NODE_MAJOR=%%a"
  set "NODE_MINOR=%%b"
)
if not defined NODE_MAJOR exit /b 0
if %NODE_MAJOR% GEQ 23 set "NODE_OK=1"
if %NODE_MAJOR% EQU 22 if %NODE_MINOR% GEQ 22 set "NODE_OK=1"
exit /b 0
