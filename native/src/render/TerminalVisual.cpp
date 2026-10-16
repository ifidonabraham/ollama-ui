#include "TerminalVisual.h"
#include <iostream>

TerminalVisual::TerminalVisual(IDCompositionDevice* dcompDevice, ID2D1DeviceContext* d2dContext, IDWriteFactory1* dwriteFactory)
    : Island(IslandType::Terminal, dcompDevice), m_d2dContext(d2dContext), m_dwriteFactory(dwriteFactory) {

    if (m_dwriteFactory) {
        m_dwriteFactory->CreateTextFormat(
            L"Consolas",
            nullptr,
            DWRITE_FONT_WEIGHT_NORMAL,
            DWRITE_FONT_STYLE_NORMAL,
            DWRITE_FONT_STRETCH_NORMAL,
            13.0f,
            L"en-us",
            &m_monoFormat
        );
    }

    if (m_d2dContext) {
        // Deep terminal navy background #050B14, Text #E2E8F0
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x050B14, 0.95f), &m_bgBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0xE2E8F0, 1.0f), &m_textBrush);
    }
}

TerminalVisual::~TerminalVisual() {
    Terminate();
}

void TerminalVisual::Terminate() {
    m_running.store(false);
    if (m_hPipeIn) { CloseHandle(m_hPipeIn); m_hPipeIn = nullptr; }
    if (m_hPipeOut) { CloseHandle(m_hPipeOut); m_hPipeOut = nullptr; }
    if (m_hPC) { ClosePseudoConsole(m_hPC); m_hPC = nullptr; }

    if (m_pi.hProcess) {
        TerminateProcess(m_pi.hProcess, 0);
        CloseHandle(m_pi.hProcess);
        CloseHandle(m_pi.hThread);
        m_pi = {};
    }

    if (m_readThread.joinable()) {
        m_readThread.join();
    }
}

bool TerminalVisual::StartConPty(int cols, int rows, const std::wstring& workingDir) {
    HANDLE hPipePTYIn = nullptr, hPipePTYOut = nullptr;

    if (!CreatePipe(&hPipePTYIn, &m_hPipeIn, nullptr, 0)) return false;
    if (!CreatePipe(&m_hPipeOut, &hPipePTYOut, nullptr, 0)) {
        CloseHandle(hPipePTYIn);
        CloseHandle(m_hPipeIn);
        return false;
    }

    COORD size = { static_cast<SHORT>(cols), static_cast<SHORT>(rows) };
    HRESULT hr = CreatePseudoConsole(size, hPipePTYIn, hPipePTYOut, 0, &m_hPC);
    if (FAILED(hr)) {
        CloseHandle(hPipePTYIn); CloseHandle(m_hPipeIn);
        CloseHandle(m_hPipeOut); CloseHandle(hPipePTYOut);
        return false;
    }

    // Prepare startup info with ConPTY attribute
    STARTUPINFOEXW siEx = {};
    siEx.StartupInfo.cb = sizeof(STARTUPINFOEXW);

    SIZE_T attrListSize = 0;
    InitializeProcThreadAttributeList(nullptr, 1, 0, &attrListSize);
    siEx.lpAttributeList = reinterpret_cast<PPROC_THREAD_ATTRIBUTE_LIST>(malloc(attrListSize));
    InitializeProcThreadAttributeList(siEx.lpAttributeList, 1, 0, &attrListSize);

    UpdateProcThreadAttribute(
        siEx.lpAttributeList,
        0,
        PROC_THREAD_ATTRIBUTE_PSEUDOCONSOLE,
        m_hPC,
        sizeof(HPCON),
        nullptr,
        nullptr
    );

    std::wstring cmdLine = L"powershell.exe -NoLogo";
    std::vector<wchar_t> cmdBuffer(cmdLine.begin(), cmdLine.end());
    cmdBuffer.push_back(L'\0');

    const wchar_t* pWorkDir = workingDir.empty() ? nullptr : workingDir.c_str();

    BOOL created = CreateProcessW(
        nullptr,
        cmdBuffer.data(),
        nullptr,
        nullptr,
        FALSE,
        EXTENDED_STARTUPINFO_PRESENT,
        nullptr,
        pWorkDir,
        &siEx.StartupInfo,
        &m_pi
    );

    DeleteProcThreadAttributeList(siEx.lpAttributeList);
    free(siEx.lpAttributeList);

    CloseHandle(hPipePTYIn);
    CloseHandle(hPipePTYOut);

    if (!created) return false;

    m_running.store(true);
    m_screenLines.push_back("Fonia Windows ConPTY Terminal Session Active");

    // Read thread capturing ConPTY output
    m_readThread = std::thread([this]() {
        char buffer[1024];
        DWORD bytesRead = 0;
        std::string currentLine;

        while (m_running.load() && ReadFile(m_hPipeOut, buffer, sizeof(buffer) - 1, &bytesRead, nullptr) && bytesRead > 0) {
            buffer[bytesRead] = '\0';
            for (DWORD i = 0; i < bytesRead; ++i) {
                if (buffer[i] == '\n') {
                    m_screenLines.push_back(currentLine);
                    currentLine.clear();
                    if (m_screenLines.size() > 500) m_screenLines.erase(m_screenLines.begin());
                } else if (buffer[i] != '\r') {
                    currentLine += buffer[i];
                }
            }
        }
    });

    return true;
}

void TerminalVisual::WriteInput(const std::string& input) {
    if (!m_hPipeIn) return;
    std::string toWrite = input + "\r\n";
    DWORD bytesWritten = 0;
    WriteFile(m_hPipeIn, toWrite.c_str(), static_cast<DWORD>(toWrite.size()), &bytesWritten, nullptr);
}

void TerminalVisual::Render() {
    if (!m_d2dContext || !m_monoFormat) return;

    D2D1_RECT_F bgRect = D2D1::RectF(0, 0, m_bounds.width, m_bounds.height);
    m_d2dContext->FillRectangle(&bgRect, m_bgBrush.Get());

    float lineHeight = 18.0f;
    float y = 8.0f;

    // Render latest terminal lines
    int maxLines = static_cast<int>(m_bounds.height / lineHeight) - 1;
    int startIdx = (std::max)(0, static_cast<int>(m_screenLines.size()) - maxLines);

    for (size_t i = startIdx; i < m_screenLines.size(); ++i) {
        std::wstring wLine(m_screenLines[i].begin(), m_screenLines[i].end());
        D2D1_RECT_F lineRect = D2D1::RectF(12.0f, y, m_bounds.width - 12.0f, y + lineHeight);
        m_d2dContext->DrawText(wLine.c_str(), static_cast<UINT32>(wLine.size()), m_monoFormat.Get(), &lineRect, m_textBrush.Get());
        y += lineHeight;
    }
}
