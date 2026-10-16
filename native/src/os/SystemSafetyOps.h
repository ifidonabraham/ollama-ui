#pragma once
#include <string>
#include <vector>
#include <unordered_set>

class SystemSafetyOps {
public:
    // Compound Sentence Safety: A destructive clause cancels the whole sentence (SYSTEM.md Line 117)
    static bool IsDestructiveOrUnsafe(const std::string& input);

    // Process & Service Protection (SYSTEM.md Line 199)
    static bool IsProtectedProcess(const std::string& processName);
    static bool IsProtectedDevice(const std::string& deviceName);

    // Flash Drive Ejection (Windows DRIVE_REMOVABLE check) (SYSTEM.md Line 157)
    static bool SafeEjectRemovableDrive(const std::wstring& driveLetter);

    // Secret Redactor for clipboard / remote hosts (SYSTEM.md Line 178)
    static std::string RedactSecrets(const std::string& rawText);
};
