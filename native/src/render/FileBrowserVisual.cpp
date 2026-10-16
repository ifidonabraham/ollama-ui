#include "FileBrowserVisual.h"
#include <shlwapi.h>

#pragma comment(lib, "shlwapi.lib")

FileBrowserVisual::FileBrowserVisual(IDCompositionDevice* dcompDevice, ID2D1DeviceContext* d2dContext, IDWriteFactory1* dwriteFactory)
    : Island(IslandType::FileBrowser, dcompDevice), m_d2dContext(d2dContext), m_dwriteFactory(dwriteFactory) {

    if (m_dwriteFactory) {
        m_dwriteFactory->CreateTextFormat(
            L"Segoe UI",
            nullptr,
            DWRITE_FONT_WEIGHT_NORMAL,
            DWRITE_FONT_STYLE_NORMAL,
            DWRITE_FONT_STRETCH_NORMAL,
            13.5f,
            L"en-us",
            &m_textFormat
        );
    }

    if (m_d2dContext) {
        // Fonia File Browser palette: #0B1120 background, #38BDF8 folders, #F8FAFC files
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x0B1120, 0.95f), &m_bgBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x38BDF8, 1.0f), &m_folderBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0xF8FAFC, 1.0f), &m_fileBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x1E293B, 0.8f), &m_borderBrush);
    }
}

FileBrowserVisual::~FileBrowserVisual() {}

bool FileBrowserVisual::NavigateTo(const std::wstring& directoryPath) {
    m_currentPath = directoryPath;
    m_files.clear();

    std::wstring searchPattern = directoryPath + L"\\*";
    WIN32_FIND_DATAW findData;
    HANDLE hFind = FindFirstFileW(searchPattern.c_str(), &findData);

    if (hFind == INVALID_HANDLE_VALUE) return false;

    do {
        std::wstring fileName = findData.cFileName;
        if (fileName == L"." || fileName == L"..") continue;

        FileRow row;
        row.name = fileName;
        row.fullPath = directoryPath + L"\\" + fileName;
        row.isDirectory = (findData.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) != 0;
        row.fileSize = (static_cast<uint64_t>(findData.nFileSizeHigh) << 32) | findData.nFileSizeLow;

        m_files.push_back(row);
    } while (FindNextFileW(hFind, &findData));

    FindClose(hFind);
    return true;
}

void FileBrowserVisual::Render() {
    if (!m_d2dContext || !m_textFormat) return;

    D2D1_RECT_F bgRect = D2D1::RectF(0, 0, m_bounds.width, m_bounds.height);
    m_d2dContext->FillRectangle(&bgRect, m_bgBrush.Get());

    float rowHeight = 28.0f;
    float y = 10.0f;

    for (const auto& file : m_files) {
        if (y + rowHeight > m_bounds.height) break;

        std::wstring label = (file.isDirectory ? L"[DIR] " : L"  ") + file.name;
        D2D1_RECT_F textRect = D2D1::RectF(16.0f, y, m_bounds.width - 16.0f, y + rowHeight);

        m_d2dContext->DrawText(
            label.c_str(),
            static_cast<UINT32>(label.size()),
            m_textFormat.Get(),
            &textRect,
            file.isDirectory ? m_folderBrush.Get() : m_fileBrush.Get()
        );

        y += rowHeight;
    }
}
