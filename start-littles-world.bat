@echo off
:: =========================================
:: Little's World Dev Server – Ultra-Friendly
:: =========================================

:: Set colors
color 0A
echo -------------------------------
echo Little's World Dev Server Setup
echo -------------------------------

:: Step 1: Install dependencies
echo Installing dependencies...
npm install
if errorlevel 1 (
    color 0C
    echo ERROR: npm install failed! Check the log above.
    pause
    exit /b 1
)

:: Step 2: Delete stale lock file
if exist ".next\dev\lock" (
    del ".next\dev\lock"
)

:: Step 3: Find a free port starting from 3000
set "PORT=3000"
:checkport
netstat -aon | findstr :%PORT% >nul
if %errorlevel%==0 (
    set /a PORT+=1
    goto checkport
)
echo Using free port %PORT% for Next.js

:: Step 4: Kill any Node.js processes on that port (just in case)
for /f "tokens=5" %%a in ('netstat -aon
