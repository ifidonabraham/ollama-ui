#include "ScreenVisionDXGI.h"

ScreenVisionDXGI::ScreenVisionDXGI() {}

ScreenVisionDXGI::~ScreenVisionDXGI() {
    Uninitialize();
}

void ScreenVisionDXGI::Uninitialize() {
    m_deskDupl = nullptr;
    m_stagingTexture = nullptr;
}

bool ScreenVisionDXGI::Initialize(ID3D11Device* d3dDevice) {
    if (!d3dDevice) return false;
    m_d3dDevice = d3dDevice;
    m_d3dDevice->GetImmediateContext(&m_d3dContext);

    ComPtr<IDXGIDevice> dxgiDevice;
    HRESULT hr = m_d3dDevice.As(&dxgiDevice);
    if (FAILED(hr)) return false;

    ComPtr<IDXGIAdapter> dxgiAdapter;
    hr = dxgiDevice->GetAdapter(&dxgiAdapter);
    if (FAILED(hr)) return false;

    // Get primary display output
    ComPtr<IDXGIOutput> dxgiOutput;
    hr = dxgiAdapter->EnumOutputs(0, &dxgiOutput);
    if (FAILED(hr)) return false;

    ComPtr<IDXGIOutput1> dxgiOutput1;
    hr = dxgiOutput.As(&dxgiOutput1);
    if (FAILED(hr)) return false;

    // Direct DXGI Desktop Duplication Hook
    hr = dxgiOutput1->DuplicateOutput(m_d3dDevice.Get(), &m_deskDupl);
    if (FAILED(hr)) return false;

    DXGI_OUTPUT_DESC desc;
    dxgiOutput->GetDesc(&desc);
    m_width = desc.DesktopCoordinates.right - desc.DesktopCoordinates.left;
    m_height = desc.DesktopCoordinates.bottom - desc.DesktopCoordinates.top;

    // Create CPU-accessible staging texture for reading frames
    D3D11_TEXTURE2D_DESC texDesc = {};
    texDesc.Width = m_width;
    texDesc.Height = m_height;
    texDesc.MipLevels = 1;
    texDesc.ArraySize = 1;
    texDesc.Format = DXGI_FORMAT_B8G8R8A8_UNORM;
    texDesc.SampleDesc.Count = 1;
    texDesc.Usage = D3D11_USAGE_STAGING;
    texDesc.CPUAccessFlags = D3D11_CPU_ACCESS_READ;

    hr = m_d3dDevice->CreateTexture2D(&texDesc, nullptr, &m_stagingTexture);
    return SUCCEEDED(hr);
}

ScreenFrame ScreenVisionDXGI::CaptureFrame(DWORD timeoutMs) {
    ScreenFrame frame;
    if (!m_deskDupl || !m_stagingTexture) return frame;

    ComPtr<IDXGIResource> desktopResource;
    DXGI_OUTDUPL_FRAME_INFO frameInfo;

    HRESULT hr = m_deskDupl->AcquireNextFrame(timeoutMs, &frameInfo, &desktopResource);
    if (FAILED(hr)) return frame;

    ComPtr<ID3D11Texture2D> acquiredTexture;
    hr = desktopResource.As(&acquiredTexture);
    if (SUCCEEDED(hr)) {
        // GPU to GPU zero-copy copy into staging texture
        m_d3dContext->CopyResource(m_stagingTexture.Get(), acquiredTexture.Get());

        D3D11_MAPPED_SUBRESOURCE mapped;
        hr = m_d3dContext->Map(m_stagingTexture.Get(), 0, D3D11_MAP_READ, 0, &mapped);
        if (SUCCEEDED(hr)) {
            frame.width = m_width;
            frame.height = m_height;
            frame.bgraPixels.resize(m_width * m_height * 4);

            uint8_t* dest = frame.bgraPixels.data();
            uint8_t* src = static_cast<uint8_t*>(mapped.pData);

            for (int y = 0; y < m_height; ++y) {
                memcpy(dest + (y * m_width * 4), src + (y * mapped.RowPitch), m_width * 4);
            }

            m_d3dContext->Unmap(m_stagingTexture.Get(), 0);
            frame.valid = true;
        }
    }

    m_deskDupl->ReleaseFrame();
    return frame;
}
