#include "UIAutomationBridge.h"
#include <iostream>

ComPtr<IUIAutomation> UIAutomationBridge::s_pAutomation = nullptr;

bool UIAutomationBridge::Initialize() {
    if (s_pAutomation) return true;

    HRESULT hr = CoCreateInstance(
        CLSID_CUIAutomation,
        nullptr,
        CLSCTX_INPROC_SERVER,
        IID_IUIAutomation,
        reinterpret_cast<void**>(s_pAutomation.GetAddressOf())
    );
    return SUCCEEDED(hr);
}

void UIAutomationBridge::Uninitialize() {
    s_pAutomation = nullptr;
}

bool UIAutomationBridge::ClickElement(const std::wstring& nameOrId, HWND parentHwnd) {
    if (!Initialize() || !s_pAutomation) return false;

    ComPtr<IUIAutomationElement> root;
    if (parentHwnd) {
        s_pAutomation->ElementFromHandle(parentHwnd, &root);
    } else {
        s_pAutomation->GetRootElement(&root);
    }
    if (!root) return false;

    VARIANT varProp;
    VariantInit(&varProp);
    varProp.vt = VT_BSTR;
    varProp.bstrVal = SysAllocString(nameOrId.c_str());

    ComPtr<IUIAutomationCondition> nameCond;
    s_pAutomation->CreatePropertyCondition(UIA_NamePropertyId, varProp, &nameCond);

    ComPtr<IUIAutomationCondition> idCond;
    s_pAutomation->CreatePropertyCondition(UIA_AutomationIdPropertyId, varProp, &idCond);

    ComPtr<IUIAutomationCondition> orCond;
    s_pAutomation->CreateOrCondition(nameCond.Get(), idCond.Get(), &orCond);

    ComPtr<IUIAutomationElement> targetElement;
    root->FindFirst(TreeScope_Descendants, orCond.Get(), &targetElement);
    SysFreeString(varProp.bstrVal);

    if (!targetElement) return false;

    // Try Invoke pattern (buttons, links)
    ComPtr<IUIAutomationInvokePattern> invokePattern;
    HRESULT hr = targetElement->GetCurrentPatternAs(
        UIA_InvokePatternId,
        IID_PPV_ARGS(&invokePattern)
    );

    if (SUCCEEDED(hr) && invokePattern) {
        invokePattern->Invoke();
        return true;
    }

    // Fallback: Click center point via legacy or mouse click
    POINT pt;
    RECT rect;
    if (SUCCEEDED(targetElement->get_CurrentBoundingRectangle(&rect))) {
        pt.x = rect.left + (rect.right - rect.left) / 2;
        pt.y = rect.top + (rect.bottom - rect.top) / 2;
        SetCursorPos(pt.x, pt.y);
        mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
        mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
        return true;
    }

    return false;
}

std::wstring UIAutomationBridge::GetElementText(const std::wstring& nameOrId, HWND parentHwnd) {
    if (!Initialize() || !s_pAutomation) return L"";

    ComPtr<IUIAutomationElement> root;
    if (parentHwnd) {
        s_pAutomation->ElementFromHandle(parentHwnd, &root);
    } else {
        s_pAutomation->GetRootElement(&root);
    }
    if (!root) return L"";

    VARIANT varProp;
    VariantInit(&varProp);
    varProp.vt = VT_BSTR;
    varProp.bstrVal = SysAllocString(nameOrId.c_str());

    ComPtr<IUIAutomationCondition> cond;
    s_pAutomation->CreatePropertyCondition(UIA_NamePropertyId, varProp, &cond);

    ComPtr<IUIAutomationElement> targetElement;
    root->FindFirst(TreeScope_Descendants, cond.Get(), &targetElement);
    SysFreeString(varProp.bstrVal);

    if (!targetElement) return L"";

    // Value pattern
    ComPtr<IUIAutomationValuePattern> valPattern;
    if (SUCCEEDED(targetElement->GetCurrentPatternAs(UIA_ValuePatternId, IID_PPV_ARGS(&valPattern))) && valPattern) {
        BSTR bstrVal;
        if (SUCCEEDED(valPattern->get_CurrentValue(&bstrVal)) && bstrVal) {
            std::wstring res(bstrVal);
            SysFreeString(bstrVal);
            return res;
        }
    }

    // Name fallback
    BSTR bstrName;
    if (SUCCEEDED(targetElement->get_CurrentName(&bstrName)) && bstrName) {
        std::wstring res(bstrName);
        SysFreeString(bstrName);
        return res;
    }

    return L"";
}

bool UIAutomationBridge::SetElementText(const std::wstring& nameOrId, const std::wstring& text, HWND parentHwnd) {
    if (!Initialize() || !s_pAutomation) return false;

    ComPtr<IUIAutomationElement> root;
    if (parentHwnd) {
        s_pAutomation->ElementFromHandle(parentHwnd, &root);
    } else {
        s_pAutomation->GetRootElement(&root);
    }
    if (!root) return false;

    VARIANT varProp;
    VariantInit(&varProp);
    varProp.vt = VT_BSTR;
    varProp.bstrVal = SysAllocString(nameOrId.c_str());

    ComPtr<IUIAutomationCondition> cond;
    s_pAutomation->CreatePropertyCondition(UIA_NamePropertyId, varProp, &cond);

    ComPtr<IUIAutomationElement> targetElement;
    root->FindFirst(TreeScope_Descendants, cond.Get(), &targetElement);
    SysFreeString(varProp.bstrVal);

    if (!targetElement) return false;

    ComPtr<IUIAutomationValuePattern> valPattern;
    if (SUCCEEDED(targetElement->GetCurrentPatternAs(UIA_ValuePatternId, IID_PPV_ARGS(&valPattern))) && valPattern) {
        BSTR bstrText = SysAllocString(text.c_str());
        valPattern->SetValue(bstrText);
        SysFreeString(bstrText);
        return true;
    }

    return false;
}
