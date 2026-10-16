#include "SystemSafetyOps.h"
#include <windows.h>
#include <winioctl.h>
#include <regex>
#include <algorithm>

bool SystemSafetyOps::IsDestructiveOrUnsafe(const std::string& input) {
    // Exact destructive patterns from SYSTEM.md (Lines 117-118) and lib/commandUnderstand.ts
    static const std::regex destructivePattern(
        R"(\bformat\s+([a-zA-Z]:|[a-zA-Z]\b)|\bformat\b.{0,30}\b(?:disk|drive|volume|partition|[a-zA-Z]:)\b|\b(?:wipe|erase)\b.{0,30}\b(?:disk|drive|volume|partition|everything|all)\b|\bdelete\b.{0,40}\b(?:everything|all|disk|drive|files)\b|\bremove-item\b|\brm\s+-rf\b)",
        std::regex_constants::icase
    );
    return std::regex_search(input, destructivePattern);
}

bool SystemSafetyOps::IsProtectedProcess(const std::string& processName) {
    static const std::unordered_set<std::string> protectedSet = {
        "system", "idle", "csrss", "wininit", "winlogon", "lsass", 
        "services", "smss", "svchost", "registry", "rpcss", "dcomlaunch", 
        "samss", "lsm", "winmgmt"
    };

    std::string lower = processName;
    std::transform(lower.begin(), lower.end(), lower.begin(), ::tolower);
    // Remove .exe extension if present
    if (lower.size() > 4 && lower.substr(lower.size() - 4) == ".exe") {
        lower = lower.substr(0, lower.size() - 4);
    }
    return protectedSet.find(lower) != protectedSet.end();
}

bool SystemSafetyOps::IsProtectedDevice(const std::string& deviceName) {
    static const std::regex protectedDevices(
        R"(\b(keyboard|mouse|display|monitor|screen|disk|drive)\b)",
        std::regex_constants::icase
    );
    return std::regex_search(deviceName, protectedDevices);
}

bool SystemSafetyOps::SafeEjectRemovableDrive(const std::wstring& driveLetter) {
    if (driveLetter.empty()) return false;

    std::wstring rootPath = driveLetter.substr(0, 1) + L":\\";
    UINT driveType = GetDriveTypeW(rootPath.c_str());

    // SYSTEM.md Rule: C: and any fixed disk are refused. Only DRIVE_REMOVABLE (Type 2) allowed
    if (driveType != DRIVE_REMOVABLE) {
        return false;
    }

    std::wstring volumePath = L"\\\\.\\" + driveLetter.substr(0, 1) + L":";
    HANDLE hVolume = CreateFileW(
        volumePath.c_str(),
        GENERIC_READ | GENERIC_WRITE,
        FILE_SHARE_READ | FILE_SHARE_WRITE,
        nullptr,
        OPEN_EXISTING,
        0,
        nullptr
    );

    if (hVolume == INVALID_HANDLE_VALUE) return false;

    DWORD bytesReturned = 0;
    // Lock volume, dismount, and eject
    DeviceIoControl(hVolume, FSCTL_LOCK_VOLUME, nullptr, 0, nullptr, 0, &bytesReturned, nullptr);
    DeviceIoControl(hVolume, FSCTL_DISMOUNT_VOLUME, nullptr, 0, nullptr, 0, &bytesReturned, nullptr);
    PREVENT_MEDIA_REMOVAL pmr = { FALSE };
    DeviceIoControl(hVolume, IOCTL_STORAGE_MEDIA_REMOVAL, &pmr, sizeof(pmr), nullptr, 0, &bytesReturned, nullptr);
    BOOL ejected = DeviceIoControl(hVolume, IOCTL_STORAGE_EJECT_MEDIA, nullptr, 0, nullptr, 0, &bytesReturned, nullptr);

    CloseHandle(hVolume);
    return ejected == TRUE;
}

std::string SystemSafetyOps::RedactSecrets(const std::string& rawText) {
    // Redact passwords and tokens when streaming to external/remote hosts (SYSTEM.md Line 178)
    static const std::regex secretPattern(
        R"((password|token|secret|key|bearer|auth)\s*[:=]\s*([^\s,;]+))",
        std::regex_constants::icase
    );
    return std::regex_replace(rawText, secretPattern, "$1=[hidden]");
}
