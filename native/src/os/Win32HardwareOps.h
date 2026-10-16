#pragma once
#include <windows.h>
#include <wlanapi.h>
#include <endpointvolume.h>
#include <mmdeviceapi.h>
#include <string>

#pragma comment(lib, "wlanapi.lib")

struct SystemHardwareReport {
    std::string wifiStatus;
    std::string batteryStatus;
    std::string memoryStatus;
    std::string powerPlan;
    bool success = true;
};

class Win32HardwareOps {
public:
    // Native Wi-Fi radio control via Windows Native Wifi API (WlanSetInterface)
    static bool SetWifiRadioState(bool enable);
    static std::string GetWifiStatus();

    // Native Master Audio Volume and Mute via Windows Core Audio (IAudioEndpointVolume)
    static bool SetMasterMute(bool mute);
    static bool SetMasterVolume(float level0to1);
    static float GetMasterVolume();

    // Native Power and Battery status (GetSystemPowerStatus)
    static std::string GetBatteryStatus();
    static bool RequestSleep();

    // Consolidated one-call PC status check
    static SystemHardwareReport GetQuickReport();
};
