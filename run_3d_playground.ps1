# 3D Model Playground Launcher
# This PowerShell script starts the 3D Model Playground web application

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   3D Model Playground - Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>$null
    Write-Host "Found Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://python.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Get the directory where this script is located
$APP_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $APP_DIR

Write-Host "Starting HTTP server on http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Instructions:" -ForegroundColor White
Write-Host "- The server will start automatically" -ForegroundColor Gray
Write-Host "- Your browser will open to the application" -ForegroundColor Gray
Write-Host "- Allow camera and microphone access when prompted" -ForegroundColor Gray
Write-Host "- Say 'drag', 'rotate', 'scale', or 'animate' to control models" -ForegroundColor Gray
Write-Host "- Use pinch gestures to interact with 3D models" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop the server when done." -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the browser first
Start-Process "http://localhost:8000"

# Start the HTTP server
try {
    python -m http.server 8000
} catch {
    Write-Host "Error starting server. Press Enter to exit." -ForegroundColor Red
    Read-Host
}