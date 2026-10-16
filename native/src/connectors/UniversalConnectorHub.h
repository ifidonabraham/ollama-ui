#pragma once
#include <string>
#include <vector>
#include <functional>
#include <windows.h>
#include <d3d11.h>
#include <dcomp.h>
#include <wrl/client.h>

using Microsoft::WRL::ComPtr;

// The 7 Universal Execution Modes
enum class ConnectorMode {
    COM,        // Type 1 & 2: Office (Excel, Word, PowerPoint), Photoshop, CorelDRAW
    PYTHON,     // Type 3: Blender background bpy, DaVinci Python
    CLI,        // Type 4: FFmpeg d3d11va hardware-accelerated filtergraphs
    UIA,        // Type 5: Windows UIAutomation Core + DXGI moondream vision fallback
    CDP,        // Type 6: Chrome DevTools Protocol websocket control
    NATIVE_WIN32 // Type 7: Win32 native APIs
};

struct ConnectorRequest {
    std::string app;            // "excel", "word", "photoshop", "blender", "ffmpeg", "uia", "chrome"
    ConnectorMode mode;         // COM, PYTHON, CLI, UIA, CDP, WIN32
    std::string exec;           // Actual script or parameters (VBA/JS, Python bpy, CLI string, UIA action)
    bool background = true;
};

struct ConnectorResponse {
    bool success = false;
    std::string outputText;
    std::string visualIslandId; // If output produced a texture (Blender render.png, DXGI screen grab, live PSD)
};

class UniversalConnectorHub {
public:
    UniversalConnectorHub(ID3D11Device* d3dDevice, IDCompositionDevice* dcompDevice);
    ~UniversalConnectorHub();

    // The Master Universal Dispatcher
    ConnectorResponse Execute(const ConnectorRequest& request);

    // Type 1: Office COM (Excel, Word, PowerPoint)
    ConnectorResponse ExecuteOfficeCom(const std::string& app, const std::string& exec);

    // Type 2: Adobe / CorelDRAW (Photoshop JSX, Corel GMS)
    ConnectorResponse ExecuteCreativeCom(const std::string& app, const std::string& jsxCode);

    // Type 3: Blender 3D (Background bpy Python -> Direct3D 11 VRAM texture)
    ConnectorResponse ExecuteBlenderPython(const std::string& bpyScript);

    // Type 4: FFmpeg Hardware CLI (D3D11VA hardware acceleration)
    ConnectorResponse ExecuteFfmpegHw(const std::string& ffmpegArgs, std::function<void(float)> onProgress);

    // Type 5: UIAutomation Core + Moondream Vision
    ConnectorResponse ExecuteUIA(const std::string& uiaAction);

    // Type 6: Chrome DevTools Protocol (CDP via WinHTTP WebSocket)
    ConnectorResponse ExecuteCDP(const std::string& cdpMethod, const std::string& paramsJson);

    // Type 7: Win32 System Direct
    ConnectorResponse ExecuteWin32(const std::string& action);

private:
    ComPtr<ID3D11Device> m_d3dDevice;
    ComPtr<IDCompositionDevice> m_dcompDevice;
};
