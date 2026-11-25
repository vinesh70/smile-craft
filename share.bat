@echo off
setlocal

echo.
echo  SmileCraft Dental -- Share via Public URL
echo  ==========================================
echo.

set PORT=3000
set LOG=%TEMP%\cf-tunnel-smilecraft.log
set SERVE_LOG=%TEMP%\serve-smilecraft.log

REM Kill anything on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R ":%PORT% .*LISTENING" 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [1/3] Building static site...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed. Fix errors and retry.
    pause
    exit /b 1
)

echo [2/3] Starting static file server on port %PORT%...
if exist "%SERVE_LOG%" del "%SERVE_LOG%"
start "SmileCraft Server" /min cmd /c "npx serve out --listen %PORT% --no-clipboard > "%SERVE_LOG%" 2>&1"

REM Wait for server
timeout /t 5 /nobreak >nul
curl -s -o nul -w "%%{http_code}" http://localhost:%PORT% | findstr "200" >nul
if errorlevel 1 (
    echo ERROR: Static server did not start. Check %SERVE_LOG%
    pause
    exit /b 1
)
echo     Server ready at http://localhost:%PORT%

echo [3/3] Opening Cloudflare Quick Tunnel (no account needed)...
if exist "%LOG%" del "%LOG%"
start "SmileCraft Tunnel" /min cmd /c "npx --yes cloudflared tunnel --url http://localhost:%PORT% > "%LOG%" 2>&1"

echo.
echo  Waiting for tunnel URL (up to 30 seconds)...
set FOUND=0
for /L %%i in (1,1,30) do (
    timeout /t 1 /nobreak >nul
    findstr "trycloudflare.com" "%LOG%" >nul 2>&1
    if not errorlevel 1 (
        set FOUND=1
        goto :found
    )
)

:found
if "%FOUND%"=="0" (
    echo ERROR: Tunnel URL not found after 30s. Check %LOG%
    pause
    exit /b 1
)

echo.
echo  ============================================================
echo   PUBLIC URL:
for /f "tokens=*" %%a in ('findstr "https://.*trycloudflare.com" "%LOG%"') do (
    echo    %%a
)
echo.
echo   Local:  http://localhost:%PORT%
echo   Log:    %LOG%
echo.
echo   NOTE: This link only works while THIS window's processes
echo         are running. Keep it open.
echo.
echo   TO STOP: Close this window OR run:
echo     taskkill /F /IM node.exe
echo     taskkill /F /IM cloudflared.exe
echo  ============================================================
echo.

pause
