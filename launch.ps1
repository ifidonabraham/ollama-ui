# Ollama UI Launcher
$ErrorActionPreference = "SilentlyContinue"

Write-Host "Starting Ollama UI..." -ForegroundColor Cyan

# Check if already running on port 3000
$portInUse = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue

if (-not $portInUse) {
    Write-Host "Starting Next.js server..." -ForegroundColor Yellow
    # Start the dev server in background
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -WindowStyle Minimized -Command `"cd 'C:\Users\PC\ollama-ui'; npm run dev`"" -WindowStyle Minimized
    
    # Wait for server to be ready
    Write-Host "Waiting for server to start..." -ForegroundColor Yellow
    $ready = $false
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 1
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 1 -ErrorAction Stop
            if ($response.StatusCode -eq 200) { $ready = $true; break }
        } catch {}
        Write-Host "." -NoNewline
    }
    Write-Host ""
} else {
    Write-Host "Server already running on port 3000" -ForegroundColor Green
}

# Open in Edge app mode (no browser chrome - looks like a native app)
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
Start-Process -FilePath $edgePath -ArgumentList "--app=http://localhost:3000 --window-size=1400,900 --no-first-run --no-default-browser-check"

Write-Host "Ollama UI opened!" -ForegroundColor Green
