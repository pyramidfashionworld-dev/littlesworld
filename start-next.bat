@echo off
echo Stopping any running Next.js processes...

:: Kill process on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /PID %%a /F >nul 2>&1
:: Kill process on port 3001
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do taskkill /PID %%a /F >nul 2>&1

echo Deleting lock file...
del ".next\dev\lock" >nul 2>&1

echo Installing dependencies...
npm install

echo Starting Next.js dev server...
npm run dev

pause
