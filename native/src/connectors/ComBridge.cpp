#include "ComBridge.h"
#include <iostream>

bool ComBridge::Initialize() {
    HRESULT hr = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
    return SUCCEEDED(hr) || hr == S_FALSE;
}

void ComBridge::Uninitialize() {
    CoUninitialize();
}

HRESULT ComBridge::InvokeMethod(IDispatch* pDispatch, const std::wstring& name, VARIANT* pResult, std::vector<VARIANT> args) {
    if (!pDispatch) return E_POINTER;

    DISPID dispid;
    LPOLESTR olestr = const_cast<LPOLESTR>(name.c_str());
    HRESULT hr = pDispatch->GetIDsOfNames(IID_NULL, &olestr, 1, LOCALE_USER_DEFAULT, &dispid);
    if (FAILED(hr)) return hr;

    DISPPARAMS params = {};
    std::vector<VARIANT> revArgs;
    if (!args.empty()) {
        revArgs.assign(args.rbegin(), args.rend());
        params.rgvarg = revArgs.data();
        params.cArgs = static_cast<UINT>(revArgs.size());
    }

    return pDispatch->Invoke(dispid, IID_NULL, LOCALE_USER_DEFAULT, DISPATCH_METHOD, &params, pResult, nullptr, nullptr);
}

HRESULT ComBridge::GetProperty(IDispatch* pDispatch, const std::wstring& name, VARIANT* pResult) {
    if (!pDispatch) return E_POINTER;

    DISPID dispid;
    LPOLESTR olestr = const_cast<LPOLESTR>(name.c_str());
    HRESULT hr = pDispatch->GetIDsOfNames(IID_NULL, &olestr, 1, LOCALE_USER_DEFAULT, &dispid);
    if (FAILED(hr)) return hr;

    DISPPARAMS params = {};
    return pDispatch->Invoke(dispid, IID_NULL, LOCALE_USER_DEFAULT, DISPATCH_PROPERTYGET, &params, pResult, nullptr, nullptr);
}

HRESULT ComBridge::SetProperty(IDispatch* pDispatch, const std::wstring& name, VARIANT value) {
    if (!pDispatch) return E_POINTER;

    DISPID dispid;
    LPOLESTR olestr = const_cast<LPOLESTR>(name.c_str());
    HRESULT hr = pDispatch->GetIDsOfNames(IID_NULL, &olestr, 1, LOCALE_USER_DEFAULT, &dispid);
    if (FAILED(hr)) return hr;

    DISPID dispidNamed = DISPID_PROPERTYPUT;
    DISPPARAMS params = {};
    params.rgvarg = &value;
    params.cArgs = 1;
    params.rgdispidNamedArgs = &dispidNamed;
    params.cNamedArgs = 1;

    return pDispatch->Invoke(dispid, IID_NULL, LOCALE_USER_DEFAULT, DISPATCH_PROPERTYPUT, &params, nullptr, nullptr, nullptr);
}

// Direct Excel COM Control
bool OfficeConnectors::ExcelSetCellValue(const std::wstring& /*sheetName*/, const std::wstring& cell, const std::wstring& value) {
    ComBridge::Initialize();

    CLSID clsid;
    HRESULT hr = CLSIDFromProgID(L"Excel.Application", &clsid);
    if (FAILED(hr)) return false;

    IDispatch* pExcel = nullptr;
    hr = CoCreateInstance(clsid, nullptr, CLSCTX_LOCAL_SERVER, IID_IDispatch, (void**)&pExcel);
    if (FAILED(hr) || !pExcel) return false;

    // Make visible: pExcel.Visible = TRUE
    VARIANT vTrue;
    VariantInit(&vTrue);
    vTrue.vt = VT_BOOL;
    vTrue.boolVal = VARIANT_TRUE;
    ComBridge::SetProperty(pExcel, L"Visible", vTrue);

    // Get Workbooks collection
    VARIANT vWorkbooks;
    VariantInit(&vWorkbooks);
    if (SUCCEEDED(ComBridge::GetProperty(pExcel, L"Workbooks", &vWorkbooks)) && vWorkbooks.pdispVal) {
        // Workbooks.Add()
        VARIANT vWorkbook;
        VariantInit(&vWorkbook);
        ComBridge::InvokeMethod(vWorkbooks.pdispVal, L"Add", &vWorkbook);

        // Get ActiveSheet
        VARIANT vSheet;
        VariantInit(&vSheet);
        if (SUCCEEDED(ComBridge::GetProperty(pExcel, L"ActiveSheet", &vSheet)) && vSheet.pdispVal) {
            // Sheet.Range(cell)
            VARIANT vRange;
            VariantInit(&vRange);
            VARIANT vCellParam;
            VariantInit(&vCellParam);
            vCellParam.vt = VT_BSTR;
            vCellParam.bstrVal = SysAllocString(cell.c_str());

            if (SUCCEEDED(ComBridge::GetProperty(vSheet.pdispVal, L"Range", &vRange)) ||
                SUCCEEDED(ComBridge::InvokeMethod(vSheet.pdispVal, L"Range", &vRange, { vCellParam }))) {
                if (vRange.pdispVal) {
                    // Range.Value = value
                    VARIANT vVal;
                    VariantInit(&vVal);
                    vVal.vt = VT_BSTR;
                    vVal.bstrVal = SysAllocString(value.c_str());
                    ComBridge::SetProperty(vRange.pdispVal, L"Value", vVal);
                    VariantClear(&vVal);
                    vRange.pdispVal->Release();
                }
            }
            SysFreeString(vCellParam.bstrVal);
            vSheet.pdispVal->Release();
        }
        if (vWorkbook.pdispVal) vWorkbook.pdispVal->Release();
        vWorkbooks.pdispVal->Release();
    }

    pExcel->Release();
    return true;
}

std::wstring OfficeConnectors::ExcelGetCellValue(const std::wstring& /*sheetName*/, const std::wstring& /*cell*/) {
    return L"";
}

bool OfficeConnectors::WordCreateDocument(const std::wstring& content, const std::wstring& /*savePath*/) {
    ComBridge::Initialize();

    CLSID clsid;
    HRESULT hr = CLSIDFromProgID(L"Word.Application", &clsid);
    if (FAILED(hr)) return false;

    IDispatch* pWord = nullptr;
    hr = CoCreateInstance(clsid, nullptr, CLSCTX_LOCAL_SERVER, IID_IDispatch, (void**)&pWord);
    if (FAILED(hr) || !pWord) return false;

    // Word.Visible = TRUE
    VARIANT vTrue;
    VariantInit(&vTrue);
    vTrue.vt = VT_BOOL;
    vTrue.boolVal = VARIANT_TRUE;
    ComBridge::SetProperty(pWord, L"Visible", vTrue);

    // Documents.Add()
    VARIANT vDocs;
    VariantInit(&vDocs);
    if (SUCCEEDED(ComBridge::GetProperty(pWord, L"Documents", &vDocs)) && vDocs.pdispVal) {
        VARIANT vDoc;
        VariantInit(&vDoc);
        ComBridge::InvokeMethod(vDocs.pdispVal, L"Add", &vDoc);

        // Content.Text = content
        if (vDoc.pdispVal) {
            VARIANT vContent;
            VariantInit(&vContent);
            if (SUCCEEDED(ComBridge::GetProperty(vDoc.pdispVal, L"Content", &vContent)) && vContent.pdispVal) {
                VARIANT vText;
                VariantInit(&vText);
                vText.vt = VT_BSTR;
                vText.bstrVal = SysAllocString(content.c_str());
                ComBridge::SetProperty(vContent.pdispVal, L"Text", vText);
                SysFreeString(vText.bstrVal);
                vContent.pdispVal->Release();
            }
            vDoc.pdispVal->Release();
        }
        vDocs.pdispVal->Release();
    }

    pWord->Release();
    return true;
}
