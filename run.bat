@echo off
title Ex 5 - Angular Component
cd /d "%~dp0"
set "NG_CLI_ANALYTICS=false"
if not exist node_modules (
  echo Dependencies are not installed yet. Running setup.bat first...
  call setup.bat
  exit /b
)
echo Starting the app at http://localhost:4200  (press Ctrl+C to stop)
call npx ng serve --open
pause
