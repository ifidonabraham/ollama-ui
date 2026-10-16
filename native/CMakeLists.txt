cmake_minimum_required(VERSION 3.20)
project(FoniaNativeEngine CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Enable AVX2 SIMD intrinsics
if (MSVC)
    add_compile_options(/arch:AVX2 /W4 /O2)
else()
    add_compile_options(-mavx2 -O3 -Wall)
endif()

include_directories(src)

set(SOURCES
    src/main.cpp
    src/render/DwmWindow.cpp
    src/render/VisualTree.cpp
    src/render/ChatVisual.cpp
    src/render/TerminalVisual.cpp
    src/render/FileBrowserVisual.cpp
    src/ai/VectorRouter.cpp
    src/ai/MemoryManager.cpp
    src/ai/ChatLabeler.cpp
    src/os/ProcessRunner.cpp
    src/os/Win32HardwareOps.cpp
    src/os/SystemSafetyOps.cpp
    src/os/UIAutomationBridge.cpp
    src/connectors/ComBridge.cpp
    src/connectors/UniversalConnectorHub.cpp
    src/vision/ScreenVisionDXGI.cpp
    src/storage/DatabaseStorage.cpp
    src/audio/VoicePipeline.cpp
    src/net/OllamaStreamer.cpp
    src/core/AgentPipeline.cpp
)

add_executable(fonia_engine ${SOURCES})

target_link_libraries(fonia_engine PRIVATE
    d3d11
    dxgi
    dcomp
    dwmapi
    d2d1
    dwrite
    winhttp
    wlanapi
    shlwapi
    ole32
    oleaut32
    user32
    gdi32
    avrt
)
