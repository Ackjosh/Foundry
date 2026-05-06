# PowerShell script to setup Python environment and fix virtual environment issues
Write-Host "Setting up Python environment..." -ForegroundColor Green

# Check if venv exists, if not create it
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create virtual environment. Make sure Python is installed and in PATH." -ForegroundColor Red
        exit 1
    }
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Virtual environment activated successfully!" -ForegroundColor Green
    
    # Install requirements if they exist
    if (Test-Path "data_pipeline\requirements.txt") {
        Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
        pip install -r "data_pipeline\requirements.txt"
    } else {
        Write-Host "Installing basic dependencies..." -ForegroundColor Yellow
        pip install fastapi uvicorn python-multipart
    }
    
    Write-Host ""
    Write-Host "Setup complete! Your Python environment is ready." -ForegroundColor Green
    Write-Host "To start the Python backend:" -ForegroundColor Cyan
    Write-Host "  cd data_pipeline" -ForegroundColor White
    Write-Host "  python chatbot_api.py" -ForegroundColor White
    Write-Host ""
    Write-Host "To start the React frontend (in another terminal):" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "Failed to activate virtual environment. Trying alternative method..." -ForegroundColor Yellow
    
    # Try alternative activation
    try {
        . ".\venv\Scripts\activate"
        Write-Host "Virtual environment activated using alternative method!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to activate virtual environment. Please check if Python venv module is working correctly." -ForegroundColor Red
        Write-Host "You may need to reinstall Python or fix your Python installation." -ForegroundColor Red
    }
}