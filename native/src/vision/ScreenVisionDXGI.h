#pragma once
#include <windows.h>
#include <d3d11.h>
#include <dxgi1_2.h>
#include <wrl/client.h>
#include <vector>

using Microsoft::WRL::ComPtr;

struct ScreenFrame {
    int width = 0;
    int height = 0;
    std::vector<uint8_t> bgraPixels; // GPU VRAM extracted buffer
    bool valid = false;
};

class ScreenVisionDXGI {
public:
    ScreenVisionDXGI();
    ~ScreenVisionDXGI();

    bool Initialize(ID3D11Device* d3dDevice);
    void Uninitialize();

    // Grab desktop texture directly from GPU VRAM at up to 60fps
    ScreenFrame CaptureFrame(DWORD timeoutMs = 100);

private:
    ComPtr<ID3D11Device> m_d3dDevice;
    ComPtr<ID3D11DeviceContext> m_d3dContext;
    ComPtr<IDXGIOutputDuplication> m_deskDupl;
    ComPtr<ID3D11Texture2D> m_stagingTexture;
    int m_width = 0;
    int m_height = 0;
};
