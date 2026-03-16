# Uppskillr LMS - Fix MySQL and Start Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MySQL Setup & Start Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Try to find MySQL installation
$mysqlPaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\xampp\mysql\bin\mysql.exe"
)

$mysqlExe = $null
foreach ($path in $mysqlPaths) {
    if (Test-Path $path) {
        $mysqlExe = $path
        Write-Host "✓ Found MySQL at: $path" -ForegroundColor Green
        break
    }
}

if (-not $mysqlExe) {
    Write-Host "✗ MySQL not found in common locations" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install MySQL or update the path in this script" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "In the meantime, you can still start the servers:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Manual steps needed:" -ForegroundColor Yellow
    Write-Host "1. Create database 'lms_db' in MySQL" -ForegroundColor Gray
    Write-Host "2. Update backend/.env with correct DATABASE_URL" -ForegroundColor Gray
    Write-Host "3. Run: cd backend; npx prisma migrate dev; npx prisma db seed" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

# Try common passwords
$passwords = @("", "root", "password", "mysql", "Shravya")
$validPassword = $null

foreach ($pwd in $passwords) {
    Write-Host "Trying password: '$pwd'..." -ForegroundColor Gray
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $mysqlExe
    $psi.Arguments = "-u root -p$pwd -e `"SELECT 1;`""
    $psi.UseShellExecute = $false
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.CreateNoWindow = $true
    
    $process = [System.Diagnostics.Process]::Start($psi)
    $output = $process.StandardOutput.ReadToEnd()
    $error = $process.StandardError.ReadToEnd()
    $process.WaitForExit()
    
    if ($process.ExitCode -eq 0) {
        $validPassword = $pwd
        Write-Host "✓ Valid password found: '$pwd'" -ForegroundColor Green
        break
    }
}

if (-not $validPassword) {
    Write-Host ""
    Write-Host "✗ Could not find valid MySQL password" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please manually:" -ForegroundColor Yellow
    Write-Host "1. Open MySQL command line or Workbench" -ForegroundColor Gray
    Write-Host "2. Run: CREATE DATABASE lms_db;" -ForegroundColor Gray
    Write-Host "3. Note your root password" -ForegroundColor Gray
    Write-Host "4. Update backend/.env with correct DATABASE_URL" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Example DATABASE_URL format:" -ForegroundColor Cyan
    Write-Host "DATABASE_URL=`"mysql://root:YOUR_PASSWORD@localhost:3306/lms_db`"" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

# Create database
Write-Host ""
Write-Host "Creating database lms_db..." -ForegroundColor Cyan
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $mysqlExe
$psi.Arguments = "-u root -p$validPassword -e `"CREATE DATABASE IF NOT EXISTS lms_db;`""
$psi.UseShellExecute = $false
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.CreateNoWindow = $true

$process = [System.Diagnostics.Process]::Start($psi)
$process.WaitForExit()

if ($process.ExitCode -eq 0) {
    Write-Host "✓ Database created successfully" -ForegroundColor Green
} else {
    $error = $process.StandardError.ReadToEnd()
    Write-Host "⚠ Database might already exist: $error" -ForegroundColor Yellow
}

# Update .env file
Write-Host ""
Write-Host "Updating backend/.env with correct credentials..." -ForegroundColor Cyan
$envPath = "backend\.env"
if (Test-Path $envPath) {
    $content = Get-Content $envPath -Raw
    $newDatabaseUrl = "DATABASE_URL=`"mysql://root:$validPassword@localhost:3306/lms_db`""
    
    if ($content -match 'DATABASE_URL=.*') {
        $content = $content -replace 'DATABASE_URL=.*', $newDatabaseUrl
        Set-Content $envPath -Value $content
        Write-Host "✓ Updated .env file" -ForegroundColor Green
    } else {
        Add-Content $envPath "`n$newDatabaseUrl"
        Write-Host "✓ Added DATABASE_URL to .env file" -ForegroundColor Green
    }
} else {
    Write-Host "✗ backend\.env not found!" -ForegroundColor Red
    exit 1
}

# Run migrations
Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Cyan
Set-Location "backend"
npx prisma migrate dev --name init

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migrations completed" -ForegroundColor Green
} else {
    Write-Host "⚠ Migration might have issues" -ForegroundColor Yellow
}

# Seed database
Write-Host ""
Write-Host "Seeding database..." -ForegroundColor Cyan
npx prisma db seed

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database seeded" -ForegroundColor Green
} else {
    Write-Host "⚠ Seeding might have issues" -ForegroundColor Yellow
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "Starting Backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
cd '$PSScriptRoot\backend'
Write-Host 'Starting Backend...' -ForegroundColor Cyan
npm run dev
"@

Start-Sleep -Seconds 2

# Start Frontend
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
Write-Host "Visit: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
