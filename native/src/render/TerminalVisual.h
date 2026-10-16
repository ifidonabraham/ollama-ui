#pragma once
#include <windows.h>
#include <d2d1_1.h>
#include <dwrite_1.h>
#include <wrl/client.h>
#include <string>
#include <vector>
#include <thread>
#include <atomic>
#include "VisualTree.h"

using Microsoft::WRL::ComPtr;

class TerminalVisual : public Island {
public:
    TerminalVisual(IDCompositionDevice* dcompDevice, ID2D1DeviceContext* d2dContext, IDWriteFactory1* dwriteFactory);
    virtual ~TerminalVisual();

    bool StartConPty(int cols = 120, int rows = 30, const std::wstring& workingDir = L"C:\\Users\\PC");
    void WriteInput(const std::string& input);
    void Render();
    void Terminate();
    bool IsRunning() const { return m_running.load(); }

private:
    ID2D1DeviceContext* m_d2dContext;
    IDWriteFactory1* m_dwriteFactory;

    HPCON m_hPC = nullptr;
    HANDLE m_hPipeIn = nullptr;
    HANDLE m_hPipeOut = nullptr;
    PROCESS_INFORMATION m_pi = {};

    ComPtr<IDWriteTextFormat> m_monoFormat;
    ComPtr<ID2D1SolidColorBrush> m_bgBrush;
    ComPtr<ID2D1SolidColorBrush> m_textBrush;

    std::vector<std::string> m_screenLines;
    std::thread m_readThread;
    std::atomic<bool> m_running{ false };
};
