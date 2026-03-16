# Uppskillr LMS - Start Script for Windows
# This script starts both backend and frontend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Uppskillr LMS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend in a new window
Write-Host "Starting Backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
cd '$PSScriptRoot\backend'
Write-Host 'Starting Backend...' -ForegroundColor Cyan
npm run dev
"@

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start Frontend in a new window
Write-Host "Starting Frontend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
cd '$PSScriptRoot\frontend'
Write-Host 'Starting Frontend...' -ForegroundColor Cyan
npm run dev
"@

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Servers Starting..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
