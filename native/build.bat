@echo off
setlocal enabledelayedexpansion
call "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat"
cd /d "C:\Users\PC\A.I projects\ollama-ui\native"

if not exist bin mkdir bin

echo Compiling Fonia Native DWM Engine...
cl.exe /std:c++20 /arch:AVX2 /utf-8 /W3 /O2 /EHsc /Isrc ^
src\main.cpp ^
src\render\DwmWindow.cpp ^
src\render\VisualTree.cpp ^
src\render\ChatVisual.cpp ^
src\render\TerminalVisual.cpp ^
src\render\FileBrowserVisual.cpp ^
src\ai\VectorRouter.cpp ^
src\ai\MemoryManager.cpp ^
src\ai\ChatLabeler.cpp ^
src\ai\DirectActionParser.cpp ^
src\ai\PhraseMapper.cpp ^
src\ai\CommandUnderstand.cpp ^
src\ai\ComputerActionExecutor.cpp ^
src\ai\JobQueue.cpp ^
src\ai\ProjectFacts.cpp ^
src\ai\SecretRedact.cpp ^
src\ai\ModelRelay.cpp ^
src\ai\InferenceBudget.cpp ^
src\os\ProcessRunner.cpp ^
src\os\Win32HardwareOps.cpp ^
src\os\SystemSafetyOps.cpp ^
src\os\UIAutomationBridge.cpp ^
src\connectors\ComBridge.cpp ^
src\connectors\UniversalConnectorHub.cpp ^
src\vision\ScreenVisionDXGI.cpp ^
src\storage\DatabaseStorage.cpp ^
src\audio\VoicePipeline.cpp ^
src\net\OllamaStreamer.cpp ^
src\core\AgentPipeline.cpp ^
/Fe:bin\fonia_app.exe ^
d3d11.lib dxgi.lib dcomp.lib dwmapi.lib d2d1.lib dwrite.lib winhttp.lib wlanapi.lib shlwapi.lib ole32.lib oleaut32.lib user32.lib gdi32.lib avrt.lib

if %errorlevel% equ 0 (
    echo Build successful: native\bin\fonia_app.exe
) else (
    echo Build failed with code %errorlevel%
)
