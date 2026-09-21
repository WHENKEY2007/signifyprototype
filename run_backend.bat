@echo off
title Signify Kaggle ASL Server
echo ==========================================
echo Starting Signify Kaggle ASL ML Server...
echo ==========================================

if exist "C:\Users\srive\OneDrive\Documents\Sign_Language_Translator\.venv\Scripts\python.exe" (
    "C:\Users\srive\OneDrive\Documents\Sign_Language_Translator\.venv\Scripts\python.exe" "%~dp0backend\app.py"
) else (
    python "%~dp0backend\app.py"
)
pause
