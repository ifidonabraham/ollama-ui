#pragma once
#include <windows.h>
#include <uiautomation.h>
#include <wrl/client.h>
#include <string>
#include <vector>

#pragma comment(lib, "ole32.lib")
#pragma comment(lib, "oleaut32.lib")

using Microsoft::WRL::ComPtr;

class UIAutomationBridge {
public:
    static bool Initialize();
    static void Uninitialize();

    // Click button by control name or automation ID in active window or entire desktop
    static bool ClickElement(const std::wstring& nameOrId, HWND parentHwnd = nullptr);

    // Get text value from control (input boxes, labels, text fields)
    static std::wstring GetElementText(const std::wstring& nameOrId, HWND parentHwnd = nullptr);

    // Set text value directly into control
    static bool SetElementText(const std::wstring& nameOrId, const std::wstring& text, HWND parentHwnd = nullptr);

private:
    static ComPtr<IUIAutomation> s_pAutomation;
};
