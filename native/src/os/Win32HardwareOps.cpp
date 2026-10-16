#include "Win32HardwareOps.h"
#include <wrl/client.h>
#include <sstream>

using Microsoft::WRL::ComPtr;

bool Win32HardwareOps::SetWifiRadioState(bool enable) {
    HANDLE hClient = nullptr;
    DWORD dwCurVersion = 0;
    DWORD dwResult = WlanOpenHandle(2, nullptr, &dwCurVersion, &hClient);
    if (dwResult != ERROR_SUCCESS) return false;

    PWLAN_INTERFACE_INFO_LIST pIfList = nullptr;
    dwResult = WlanEnumInterfaces(hClient, nullptr, &pIfList);
    if (dwResult != ERROR_SUCCESS || !pIfList) {
        WlanCloseHandle(hClient, nullptr);
        return false;
    }

    bool success = false;
    for (DWORD i = 0; i < pIfList->dwNumberOfItems; ++i) {
        WLAN_PHY_RADIO_STATE radioState = {};
        radioState.dwPhyIndex = 0;
        radioState.dot11SoftwareRadioState = enable ? dot11_radio_state_on : dot11_radio_state_off;

        dwResult = WlanSetInterface(
            hClient,
            &pIfList->InterfaceInfo[i].InterfaceGuid,
            wlan_intf_opcode_radio_state,
            sizeof(WLAN_PHY_RADIO_STATE),
            (PVOID)&radioState,
            nullptr
        );
        if (dwResult == ERROR_SUCCESS) success = true;
    }

    WlanFreeMemory(pIfList);
    WlanCloseHandle(hClient, nullptr);
    return success;
}

std::string Win32HardwareOps::GetWifiStatus() {
    HANDLE hClient = nullptr;
    DWORD dwCurVersion = 0;
    if (WlanOpenHandle(2, nullptr, &dwCurVersion, &hClient) != ERROR_SUCCESS) {
        return "Wi-Fi: Not available";
    }

    PWLAN_INTERFACE_INFO_LIST pIfList = nullptr;
    if (WlanEnumInterfaces(hClient, nullptr, &pIfList) != ERROR_SUCCESS || !pIfList) {
        WlanCloseHandle(hClient, nullptr);
        return "Wi-Fi: No adapters found";
    }

    std::stringstream ss;
    ss << "Wi-Fi Adapters: " << pIfList->dwNumberOfItems << "\n";
    for (DWORD i = 0; i < pIfList->dwNumberOfItems; ++i) {
        PWLAN_INTERFACE_INFO pIf = &pIfList->InterfaceInfo[i];
        std::wstring desc(pIf->strInterfaceDescription);
        std::string descA(desc.begin(), desc.end());
        ss << "  - " << descA << ": ";
        switch (pIf->isState) {
        case wlan_interface_state_connected: ss << "Connected\n"; break;
        case wlan_interface_state_disconnected: ss << "Disconnected\n"; break;
        default: ss << "Available\n"; break;
        }
    }

    WlanFreeMemory(pIfList);
    WlanCloseHandle(hClient, nullptr);
    return ss.str();
}

bool Win32HardwareOps::SetMasterMute(bool mute) {
    ComPtr<IMMDeviceEnumerator> enumerator;
    if (FAILED(CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr, CLSCTX_ALL, IID_PPV_ARGS(&enumerator)))) {
        return false;
    }

    ComPtr<IMMDevice> defaultDevice;
    if (FAILED(enumerator->GetDefaultAudioEndpoint(eRender, eConsole, &defaultDevice))) {
        return false;
    }

    ComPtr<IAudioEndpointVolume> endpointVolume;
    if (FAILED(defaultDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_ALL, nullptr, (void**)&endpointVolume))) {
        return false;
    }

    return SUCCEEDED(endpointVolume->SetMute(mute ? TRUE : FALSE, nullptr));
}

bool Win32HardwareOps::SetMasterVolume(float level0to1) {
    ComPtr<IMMDeviceEnumerator> enumerator;
    if (FAILED(CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr, CLSCTX_ALL, IID_PPV_ARGS(&enumerator)))) {
        return false;
    }

    ComPtr<IMMDevice> defaultDevice;
    if (FAILED(enumerator->GetDefaultAudioEndpoint(eRender, eConsole, &defaultDevice))) {
        return false;
    }

    ComPtr<IAudioEndpointVolume> endpointVolume;
    if (FAILED(defaultDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_ALL, nullptr, (void**)&endpointVolume))) {
        return false;
    }

    return SUCCEEDED(endpointVolume->SetMasterVolumeLevelScalar(level0to1, nullptr));
}

float Win32HardwareOps::GetMasterVolume() {
    ComPtr<IMMDeviceEnumerator> enumerator;
    if (FAILED(CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr, CLSCTX_ALL, IID_PPV_ARGS(&enumerator)))) {
        return 0.0f;
    }

    ComPtr<IMMDevice> defaultDevice;
    if (FAILED(enumerator->GetDefaultAudioEndpoint(eRender, eConsole, &defaultDevice))) {
        return 0.0f;
    }

    ComPtr<IAudioEndpointVolume> endpointVolume;
    if (FAILED(defaultDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_ALL, nullptr, (void**)&endpointVolume))) {
        return 0.0f;
    }

    float level = 0.0f;
    endpointVolume->GetMasterVolumeLevelScalar(&level);
    return level;
}

std::string Win32HardwareOps::GetBatteryStatus() {
    SYSTEM_POWER_STATUS sps = {};
    if (GetSystemPowerStatus(&sps)) {
        std::stringstream ss;
        if (sps.BatteryLifePercent != 255) {
            ss << "Battery: " << static_cast<int>(sps.BatteryLifePercent) << "%";
            if (sps.ACLineStatus == 1) ss << " (Charging / AC)";
            else ss << " (On Battery)";
            return ss.str();
        }
    }
    return "Battery: AC Desktop or Status Unknown";
}

bool Win32HardwareOps::RequestSleep() {
    HMODULE hPowrProf = LoadLibraryW(L"PowrProf.dll");
    if (!hPowrProf) return false;

    typedef BOOLEAN(WINAPI* pfnSetSuspendState)(BOOLEAN, BOOLEAN, BOOLEAN);
    pfnSetSuspendState setSuspendState = (pfnSetSuspendState)GetProcAddress(hPowrProf, "SetSuspendState");
    bool ok = false;
    if (setSuspendState) {
        ok = setSuspendState(FALSE, FALSE, FALSE);
    }
    FreeLibrary(hPowrProf);
    return ok;
}

SystemHardwareReport Win32HardwareOps::GetQuickReport() {
    SystemHardwareReport rep;
    rep.wifiStatus = GetWifiStatus();
    rep.batteryStatus = GetBatteryStatus();
    return rep;
}
