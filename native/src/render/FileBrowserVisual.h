#pragma once
#include <windows.h>
#include <shlobj.h>
#include <d2d1_1.h>
#include <dwrite_1.h>
#include <wrl/client.h>
#include <string>
#include <vector>
#include "VisualTree.h"

using Microsoft::WRL::ComPtr;

struct FileRow {
    std::wstring name;
    std::wstring fullPath;
    bool isDirectory;
    uint64_t fileSize;
};

class FileBrowserVisual : public Island {
public:
    FileBrowserVisual(IDCompositionDevice* dcompDevice, ID2D1DeviceContext* d2dContext, IDWriteFactory1* dwriteFactory);
    virtual ~FileBrowserVisual();

    bool NavigateTo(const std::wstring& directoryPath);
    void Render();

    const std::vector<FileRow>& GetFiles() const { return m_files; }
    std::wstring GetCurrentPath() const { return m_currentPath; }

private:
    ID2D1DeviceContext* m_d2dContext;
    IDWriteFactory1* m_dwriteFactory;

    std::wstring m_currentPath;
    std::vector<FileRow> m_files;

    ComPtr<IDWriteTextFormat> m_textFormat;
    ComPtr<ID2D1SolidColorBrush> m_bgBrush;
    ComPtr<ID2D1SolidColorBrush> m_folderBrush;
    ComPtr<ID2D1SolidColorBrush> m_fileBrush;
    ComPtr<ID2D1SolidColorBrush> m_borderBrush;
};
