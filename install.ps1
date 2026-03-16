# Uppskillr LMS - Installation Script for Windows
# Run this script from PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Uppskillr LMS - Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if MySQL is running
Write-Host "Checking MySQL service..." -ForegroundColor Yellow
try {
    $mysqlService = Get-Service -Name "MySQL*" -ErrorAction Stop
    if ($mysqlService.Status -eq "Running") {
        Write-Host "✓ MySQL service is running" -ForegroundColor Green
    } else {
        Write-Host "⚠ MySQL service exists but is not running. Starting..." -ForegroundColor Yellow
        Start-Service -Name $mysqlService.Name
        Write-Host "✓ MySQL service started" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ MySQL service not found. Please ensure MySQL is installed and running." -ForegroundColor Yellow
}

# Create database
Write-Host ""
Write-Host "Creating database..." -ForegroundColor Yellow
$createDbQuery = "CREATE DATABASE IF NOT EXISTS lms_db;"
mysql -u root -pShravya -e $createDbQuery 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database 'lms_db' created/verified" -ForegroundColor Green
} else {
    Write-Host "⚠ Could not create database automatically. Please create it manually." -ForegroundColor Yellow
    Write-Host "Run: mysql -u root -p -e 'CREATE DATABASE lms_db;'" -ForegroundColor Gray
}

# Install Backend Dependencies
Write-Host ""
Write-Host "Installing Backend dependencies..." -ForegroundColor Cyan
Set-Location "backend"
if (Test-Path "node_modules") {
    Write-Host "Backend node_modules found, skipping install..." -ForegroundColor Yellow
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
}

# Generate Prisma Client
Write-Host ""
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma client generated" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}

# Run Database Migrations
Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database migrations completed" -ForegroundColor Green
} else {
    Write-Host "⚠ Migration might have already run or failed" -ForegroundColor Yellow
}

# Seed Database
Write-Host ""
Write-Host "Seeding database with sample data..." -ForegroundColor Yellow
npx prisma db seed
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database seeded successfully" -ForegroundColor Green
} else {
    Write-Host "⚠ Database seeding might have already run" -ForegroundColor Yellow
}

Set-Location ..

# Install Frontend Dependencies
Write-Host ""
Write-Host "Installing Frontend dependencies..." -ForegroundColor Cyan
Set-Location "frontend"
if (Test-Path "node_modules") {
    Write-Host "Frontend node_modules found, skipping install..." -ForegroundColor Yellow
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
}

Set-Location ..

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 (Backend):" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Terminal 2 (Frontend):" -ForegroundColor Yellow
Write-Host "  cd frontend" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Then visit: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or use the start.ps1 script to run both servers automatically!" -ForegroundColor Green
Write-Host ""
