@echo off
call "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat"
cd /d "C:\Users\PC\A.I projects\ollama-ui\native"

if not exist bin mkdir bin

echo Compiling Native Architecture Test Suite...
cl.exe /std:c++20 /arch:AVX2 /W3 /O2 /EHsc /I"src" ^
    tests\test_native_core.cpp ^
    src\ai\VectorRouter.cpp ^
    src\ai\MemoryManager.cpp ^
    src\ai\ChatLabeler.cpp ^
    src\os\SystemSafetyOps.cpp ^
    src\os\Win32HardwareOps.cpp ^
    src\os\ProcessRunner.cpp ^
    src\os\UIAutomationBridge.cpp ^
    src\connectors\ComBridge.cpp ^
    src\connectors\UniversalConnectorHub.cpp ^
    src\vision\ScreenVisionDXGI.cpp ^
    src\net\OllamaStreamer.cpp ^
    /Fe:bin\test_native_core.exe ^
    wlanapi.lib ole32.lib oleaut32.lib user32.lib gdi32.lib shlwapi.lib winhttp.lib

if %errorlevel% equ 0 (
    echo.
    echo Running Native Core Tests:
    echo ------------------------------------------
    bin\test_native_core.exe
) else (
    echo Native test compilation failed with code %errorlevel%
)
