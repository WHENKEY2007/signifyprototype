# Run Signify Kaggle ASL Recognition Backend
Write-Host "Starting Signify Kaggle ASL Model Server..." -ForegroundColor Yellow

$venvPython = "C:\Users\srive\OneDrive\Documents\Sign_Language_Translator\.venv\Scripts\python.exe"

if (Test-Path $venvPython) {
    & $venvPython "$PSScriptRoot\backend\app.py"
} else {
    python "$PSScriptRoot\backend\app.py"
}
