#pragma once
#include <windows.h>
#include <d3d11.h>
#include <dxgi1_3.h>
#include <dcomp.h>
#include <dwmapi.h>
#include <d2d1_1.h>
#include <dwrite_1.h>
#include <wrl/client.h>
#include <functional>

#pragma comment(lib, "d3d11.lib")
#pragma comment(lib, "dxgi.lib")
#pragma comment(lib, "dcomp.lib")
#pragma comment(lib, "dwmapi.lib")
#pragma comment(lib, "d2d1.lib")
#pragma comment(lib, "dwrite.lib")

using Microsoft::WRL::ComPtr;

class DwmWindow {
public:
    DwmWindow();
    ~DwmWindow();

    bool Initialize(HINSTANCE hInstance, int width, int height, const wchar_t* title);
    void SetRenderCallback(std::function<void()> cb) { m_renderCallback = cb; }
    void SetCharCallback(std::function<void(wchar_t)> cb) { m_charCallback = cb; }
    void SetKeyDownCallback(std::function<void(WPARAM)> cb) { m_keyDownCallback = cb; }
    void SetMouseDownCallback(std::function<void(int x, int y)> cb) { m_mouseDownCallback = cb; }
    void SetMouseMoveCallback(std::function<void(int x, int y)> cb) { m_mouseMoveCallback = cb; }
    void MessageLoop();
    void Present();

    HWND GetHwnd() const { return m_hWnd; }
    IDCompositionDevice* GetDCompDevice() const { return m_dcompDevice.Get(); }
    IDCompositionTarget* GetDCompTarget() const { return m_dcompTarget.Get(); }
    IDCompositionVisual* GetRootVisual() const { return m_rootVisual.Get(); }
    IDXGISwapChain1* GetSwapChain() const { return m_swapChain.Get(); }
    ID3D11DeviceContext* GetD3DContext() const { return m_d3dContext.Get(); }
    ID3D11RenderTargetView* GetRenderTargetView() const { return m_renderTargetView.Get(); }
    ID2D1DeviceContext* GetD2DContext() const { return m_d2dContext.Get(); }
    IDWriteFactory1* GetDWriteFactory() const { return m_dwriteFactory.Get(); }

private:
    static LRESULT CALLBACK WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam);
    bool InitDirect3D(int width, int height);
    bool InitDirectComposition();
    void ApplyAcrylicBlur();

    HWND m_hWnd = nullptr;
    HINSTANCE m_hInstance = nullptr;
    int m_width = 1400;
    int m_height = 900;

    // D3D11 and DXGI
    ComPtr<ID3D11Device> m_d3dDevice;
    ComPtr<ID3D11DeviceContext> m_d3dContext;
    ComPtr<IDXGISwapChain1> m_swapChain;
    ComPtr<ID3D11RenderTargetView> m_renderTargetView;

    // DirectComposition
    ComPtr<IDCompositionDevice> m_dcompDevice;
    ComPtr<IDCompositionTarget> m_dcompTarget;
    ComPtr<IDCompositionVisual> m_rootVisual;

    // Direct2D & DirectWrite
    ComPtr<ID2D1Factory1> m_d2dFactory;
    ComPtr<ID2D1Device> m_d2dDevice;
    ComPtr<ID2D1DeviceContext> m_d2dContext;
    ComPtr<IDWriteFactory1> m_dwriteFactory;
    std::function<void()> m_renderCallback = nullptr;
    std::function<void(wchar_t)> m_charCallback = nullptr;
    std::function<void(WPARAM)> m_keyDownCallback = nullptr;
    std::function<void(int x, int y)> m_mouseDownCallback = nullptr;
    std::function<void(int x, int y)> m_mouseMoveCallback = nullptr;

    bool InitDirect2D();
};
