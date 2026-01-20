@echo off
echo ========================================
echo    3D Model Playground - Starting...
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Get the directory where this batch file is located
set "APP_DIR=%~dp0"
cd /d "%APP_DIR%"

echo Starting HTTP server on http://localhost:8000
echo.
echo Instructions:
echo - The server will start automatically
echo - Your browser will open to the application
echo - Allow camera and microphone access when prompted
echo - Say "drag", "rotate", "scale", or "animate" to control models
echo - Use pinch gestures to interact with 3D models
echo.
echo Press Ctrl+C to stop the server when done.
echo ========================================
echo.

REM Start the HTTP server and open browser
start "" "http://localhost:8000"
python -m http.server 8000

pause