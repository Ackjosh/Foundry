@echo off
echo Setting up Python environment...

REM Check if venv exists, if not create it
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install requirements if they exist
if exist "data_pipeline\requirements.txt" (
    echo Installing Python dependencies...
    pip install -r data_pipeline\requirements.txt
) else (
    echo Installing basic dependencies...
    pip install fastapi uvicorn python-multipart
)

echo.
echo Virtual environment is now active.
echo To start the Python backend, run:
echo   cd data_pipeline
echo   python chatbot_api.py
echo.
echo To start the React frontend, run in another terminal:
echo   npm run dev
echo.