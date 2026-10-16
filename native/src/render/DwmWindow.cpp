#include "DwmWindow.h"
#include <iostream>

// DWM Accent policy definitions for Acrylic blur
enum ACCENT_STATE {
    ACCENT_DISABLED = 0,
    ACCENT_ENABLE_GRADIENT = 1,
    ACCENT_ENABLE_TRANSPARENTGRADIENT = 2,
    ACCENT_ENABLE_BLURBEHIND = 3,
    ACCENT_ENABLE_ACRYLICBLURBEHIND = 4,
    ACCENT_INVALID_STATE = 5
};

struct ACCENT_POLICY {
    ACCENT_STATE AccentState;
    DWORD AccentFlags;
    DWORD GradientColor;
    DWORD AnimationId;
};

struct WINDOWCOMPOSITIONATTRIBDATA {
    DWORD Attrib;
    PVOID pvData;
    SIZE_T cbData;
};

typedef BOOL(WINAPI* pfnSetWindowCompositionAttribute)(HWND, WINDOWCOMPOSITIONATTRIBDATA*);

DwmWindow::DwmWindow() {}

DwmWindow::~DwmWindow() {
    if (m_hWnd) {
        DestroyWindow(m_hWnd);
    }
}

LRESULT CALLBACK DwmWindow::WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam) {
    DwmWindow* pThis = reinterpret_cast<DwmWindow*>(GetWindowLongPtr(hWnd, GWLP_USERDATA));

    switch (msg) {
    case WM_NCCREATE: {
        CREATESTRUCT* pCreate = reinterpret_cast<CREATESTRUCT*>(lParam);
        SetWindowLongPtr(hWnd, GWLP_USERDATA, reinterpret_cast<LONG_PTR>(pCreate->lpCreateParams));
        return DefWindowProc(hWnd, msg, wParam, lParam);
    }
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;
    case WM_PAINT: {
        PAINTSTRUCT ps;
        BeginPaint(hWnd, &ps);
        if (pThis) pThis->Present();
        EndPaint(hWnd, &ps);
        return 0;
    }
    case WM_CHAR:
        if (pThis && pThis->m_charCallback) {
            pThis->m_charCallback(static_cast<wchar_t>(wParam));
            return 0;
        }
        break;
    case WM_KEYDOWN:
        if (wParam == VK_ESCAPE) {
            PostQuitMessage(0);
            return 0;
        }
        if (pThis && pThis->m_keyDownCallback) {
            pThis->m_keyDownCallback(wParam);
            return 0;
        }
        break;
    case WM_LBUTTONDOWN:
        if (pThis && pThis->m_mouseDownCallback) {
            int x = static_cast<short>(LOWORD(lParam));
            int y = static_cast<short>(HIWORD(lParam));
            pThis->m_mouseDownCallback(x, y);
            return 0;
        }
        break;
    case WM_MOUSEMOVE:
        if (pThis && pThis->m_mouseMoveCallback) {
            int x = static_cast<short>(LOWORD(lParam));
            int y = static_cast<short>(HIWORD(lParam));
            pThis->m_mouseMoveCallback(x, y);
        }
        break;
    }
    return DefWindowProc(hWnd, msg, wParam, lParam);
}

bool DwmWindow::Initialize(HINSTANCE hInstance, int width, int height, const wchar_t* title) {
    m_hInstance = hInstance;
    m_width = width;
    m_height = height;

    WNDCLASSEXW wc = {};
    wc.cbSize = sizeof(WNDCLASSEXW);
    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.hCursor = LoadCursor(nullptr, IDC_ARROW);
    wc.lpszClassName = L"FoniaDwmWindowClass";

    if (!RegisterClassExW(&wc)) {
        if (GetLastError() != ERROR_CLASS_ALREADY_EXISTS) {
            return false;
        }
    }

    // Window style: Standard desktop application with normal title bar, border and controls
    DWORD dwStyle = WS_OVERLAPPEDWINDOW | WS_VISIBLE;
    DWORD dwExStyle = WS_EX_APPWINDOW;

    m_hWnd = CreateWindowExW(
        dwExStyle,
        wc.lpszClassName,
        title,
        dwStyle,
        CW_USEDEFAULT, CW_USEDEFAULT,
        width, height,
        nullptr, nullptr, hInstance, this
    );

    if (!m_hWnd) return false;

    ApplyAcrylicBlur();

    if (!InitDirect3D(width, height)) return false;
    if (!InitDirect2D()) return false;
    InitDirectComposition();

    // Attach DXGI Backbuffer to D2D
    ComPtr<IDXGISurface> dxgiBackBuffer;
    HRESULT hr = m_swapChain->GetBuffer(0, IID_PPV_ARGS(&dxgiBackBuffer));
    if (SUCCEEDED(hr) && m_d2dContext) {
        D2D1_BITMAP_PROPERTIES1 bitmapProperties = D2D1::BitmapProperties1(
            D2D1_BITMAP_OPTIONS_TARGET | D2D1_BITMAP_OPTIONS_CANNOT_DRAW,
            D2D1::PixelFormat(DXGI_FORMAT_B8G8R8A8_UNORM, D2D1_ALPHA_MODE_IGNORE)
        );
        ComPtr<ID2D1Bitmap1> d2dTargetBitmap;
        hr = m_d2dContext->CreateBitmapFromDxgiSurface(dxgiBackBuffer.Get(), &bitmapProperties, &d2dTargetBitmap);
        if (SUCCEEDED(hr)) {
            m_d2dContext->SetTarget(d2dTargetBitmap.Get());
        }
    }

    ShowWindow(m_hWnd, SW_SHOW);
    UpdateWindow(m_hWnd);
    return true;
}

bool DwmWindow::InitDirect2D() {
    D2D1_FACTORY_OPTIONS options = {};
#if defined(_DEBUG)
    options.debugLevel = D2D1_DEBUG_LEVEL_INFORMATION;
#endif

    HRESULT hr = D2D1CreateFactory(D2D1_FACTORY_TYPE_SINGLE_THREADED, __uuidof(ID2D1Factory1), &options, (void**)&m_d2dFactory);
    if (FAILED(hr)) return false;

    ComPtr<IDXGIDevice> dxgiDevice;
    hr = m_d3dDevice.As(&dxgiDevice);
    if (FAILED(hr)) return false;

    hr = m_d2dFactory->CreateDevice(dxgiDevice.Get(), &m_d2dDevice);
    if (FAILED(hr)) return false;

    hr = m_d2dDevice->CreateDeviceContext(D2D1_DEVICE_CONTEXT_OPTIONS_NONE, &m_d2dContext);
    if (FAILED(hr)) return false;

    // DirectWrite Factory
    hr = DWriteCreateFactory(DWRITE_FACTORY_TYPE_SHARED, __uuidof(IDWriteFactory1), (IUnknown**)&m_dwriteFactory);
    return SUCCEEDED(hr);
}

void DwmWindow::ApplyAcrylicBlur() {
    HMODULE hUser = GetModuleHandleW(L"user32.dll");
    if (!hUser) return;

    pfnSetWindowCompositionAttribute setWindowCompositionAttribute =
        (pfnSetWindowCompositionAttribute)GetProcAddress(hUser, "SetWindowCompositionAttribute");

    if (setWindowCompositionAttribute) {
        // Fonia Labs dark theme tint: #0B1120 with acrylic blur opacity
        ACCENT_POLICY policy = {};
        policy.AccentState = ACCENT_ENABLE_ACRYLICBLURBEHIND;
        policy.AccentFlags = 2; // draw borders
        policy.GradientColor = 0xCC110B0B; // ARGB: 80% opacity dark navy tint

        WINDOWCOMPOSITIONATTRIBDATA data = {};
        data.Attrib = 19; // WCA_ACCENT_POLICY
        data.pvData = &policy;
        data.cbData = sizeof(policy);

        setWindowCompositionAttribute(m_hWnd, &data);
    }
}

bool DwmWindow::InitDirect3D(int width, int height) {
    D3D_FEATURE_LEVEL featureLevels[] = {
        D3D_FEATURE_LEVEL_11_1,
        D3D_FEATURE_LEVEL_11_0,
    };
    D3D_FEATURE_LEVEL featureLevel;

    UINT createDeviceFlags = D3D11_CREATE_DEVICE_BGRA_SUPPORT;
#if defined(_DEBUG)
    createDeviceFlags |= D3D11_CREATE_DEVICE_DEBUG;
#endif

    HRESULT hr = D3D11CreateDevice(
        nullptr,
        D3D_DRIVER_TYPE_HARDWARE,
        nullptr,
        createDeviceFlags,
        featureLevels,
        ARRAYSIZE(featureLevels),
        D3D11_SDK_VERSION,
        &m_d3dDevice,
        &featureLevel,
        &m_d3dContext
    );
    if (FAILED(hr)) return false;

    ComPtr<IDXGIDevice> dxgiDevice;
    hr = m_d3dDevice.As(&dxgiDevice);
    if (FAILED(hr)) return false;

    ComPtr<IDXGIAdapter> dxgiAdapter;
    hr = dxgiDevice->GetAdapter(&dxgiAdapter);
    if (FAILED(hr)) return false;

    ComPtr<IDXGIFactory2> dxgiFactory;
    hr = dxgiAdapter->GetParent(IID_PPV_ARGS(&dxgiFactory));
    if (FAILED(hr)) return false;

    // DXGI SwapChain with 2 buffers (16MB VRAM allocation), FLIP_DISCARD
    DXGI_SWAP_CHAIN_DESC1 scDesc = {};
    scDesc.Width = width;
    scDesc.Height = height;
    scDesc.Format = DXGI_FORMAT_B8G8R8A8_UNORM;
    scDesc.Stereo = FALSE;
    scDesc.SampleDesc.Count = 1;
    scDesc.SampleDesc.Quality = 0;
    scDesc.BufferUsage = DXGI_USAGE_RENDER_TARGET_OUTPUT;
    scDesc.BufferCount = 2; // 2 buffers
    scDesc.Scaling = DXGI_SCALING_STRETCH;
    scDesc.SwapEffect = DXGI_SWAP_EFFECT_FLIP_DISCARD;
    scDesc.AlphaMode = DXGI_ALPHA_MODE_IGNORE;

    hr = dxgiFactory->CreateSwapChainForHwnd(
        m_d3dDevice.Get(),
        m_hWnd,
        &scDesc,
        nullptr,
        nullptr,
        &m_swapChain
    );
    if (FAILED(hr)) return false;

    // Create Render Target View
    ComPtr<ID3D11Texture2D> backBuffer;
    hr = m_swapChain->GetBuffer(0, IID_PPV_ARGS(&backBuffer));
    if (FAILED(hr)) return false;

    hr = m_d3dDevice->CreateRenderTargetView(backBuffer.Get(), nullptr, &m_renderTargetView);
    return SUCCEEDED(hr);
}

bool DwmWindow::InitDirectComposition() {
    ComPtr<IDXGIDevice> dxgiDevice;
    HRESULT hr = m_d3dDevice.As(&dxgiDevice);
    if (FAILED(hr)) return false;

    hr = DCompositionCreateDevice(dxgiDevice.Get(), IID_PPV_ARGS(&m_dcompDevice));
    if (FAILED(hr)) return false;

    hr = m_dcompDevice->CreateTargetForHwnd(m_hWnd, TRUE, &m_dcompTarget);
    if (FAILED(hr)) return false;

    hr = m_dcompDevice->CreateVisual(&m_rootVisual);
    if (FAILED(hr)) return false;

    // Bind swapchain content to root visual
    hr = m_rootVisual->SetContent(m_swapChain.Get());
    if (FAILED(hr)) return false;

    hr = m_dcompTarget->SetRoot(m_rootVisual.Get());
    if (FAILED(hr)) return false;

    hr = m_dcompDevice->Commit();
    return SUCCEEDED(hr);
}

void DwmWindow::Present() {
    if (!m_d3dContext || !m_swapChain || !m_renderTargetView) return;

    // Clear with Fonia Navy background (#0B1120 with alpha for acrylic effect)
    const float clearColor[4] = { 11.0f / 255.0f, 17.0f / 255.0f, 32.0f / 255.0f, 0.85f };
    m_d3dContext->ClearRenderTargetView(m_renderTargetView.Get(), clearColor);

    // Direct2D drawing pass
    if (m_d2dContext && m_renderCallback) {
        m_d2dContext->BeginDraw();
        m_renderCallback();
        m_d2dContext->EndDraw();
    }

    // SwapChain present synchronizes with DWM VSync (1 = wait for VSync, 0 = 0ms latency)
    m_swapChain->Present(1, 0);
}

void DwmWindow::MessageLoop() {
    MSG msg = {};
    while (msg.message != WM_QUIT) {
        if (PeekMessage(&msg, nullptr, 0, 0, PM_REMOVE)) {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        } else {
            Present();
            Sleep(1);
        }
    }
}
