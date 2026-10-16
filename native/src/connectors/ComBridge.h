#pragma once
#include <windows.h>
#include <ole2.h>
#include <string>
#include <vector>

class ComBridge {
public:
    static bool Initialize();
    static void Uninitialize();

    // Invoke COM method or property get/set by name
    static HRESULT InvokeMethod(
        IDispatch* pDispatch,
        const std::wstring& name,
        VARIANT* pResult,
        std::vector<VARIANT> args = {}
    );

    static HRESULT GetProperty(
        IDispatch* pDispatch,
        const std::wstring& name,
        VARIANT* pResult
    );

    static HRESULT SetProperty(
        IDispatch* pDispatch,
        const std::wstring& name,
        VARIANT value
    );
};

// Direct Office Connectors
class OfficeConnectors {
public:
    // Excel: CoCreateInstance(Excel.Application) -> direct cell modification without shell strings
    static bool ExcelSetCellValue(const std::wstring& sheetName, const std::wstring& cell, const std::wstring& value);
    static std::wstring ExcelGetCellValue(const std::wstring& sheetName, const std::wstring& cell);

    // Word: CoCreateInstance(Word.Application) -> direct document creation
    static bool WordCreateDocument(const std::wstring& content, const std::wstring& savePath);
};
