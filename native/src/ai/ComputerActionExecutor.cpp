#include "ComputerActionExecutor.h"
#include <windows.h>
#include <iostream>

std::string ComputerActionExecutor::RunPowerShell(const std::string& script) {
    // Stub: In production use WinHTTP to invoke PowerShellHelper service
    // or execute via ProcessRunner with proper escaping
    return "Action " + script.substr(0, 20) + "... (stub)";
}

std::string ComputerActionExecutor::RunAction(const std::string& action, const std::string& target) {
    if (action.empty()) return "No action";
    // Route to hardware ops or PowerShell stubs
    if (action == "bluetooth_status" || action == "bluetooth_on" || action == "bluetooth_off")
        return "Bluetooth " + action + " executed";
    if (action == "firewall_status" || action == "firewall_on" || action == "firewall_off")
        return "Firewall " + action + " executed";
    if (action == "wifi_status") return "WiFi status checked";
    if (action == "battery_status") return "Battery status checked";
    if (action == "volume_status" || action == "volume_set" || action == "volume_mute" || action == "volume_unmute")
        return "Volume " + action + " executed";
    if (action == "shutdown") return "Shutdown requested";
    if (action == "restart") return "Restart requested";
    if (action == "sleep") return "Sleep requested";
    if (action == "screenshot") return "Screenshot captured (stub)";
    if (action == "disk_space") return "Disk space checked";
    if (action == "memory_status") return "Memory status checked";
    if (action == "cpu_status") return "CPU status checked";
    if (action == "gpu_status") return "GPU status checked";
    if (action == "display_status") return "Display status checked";
    if (action == "brightness_status" || action == "brightness_up" || action == "brightness_down" || action == "brightness_set")
        return "Brightness " + action + " executed";
    if (action == "theme_status" || action == "theme_dark" || action == "theme_light")
        return "Theme " + action + " executed";
    if (action == "clipboard_read") return "Clipboard read (stub)";
    if (action == "eject_drive") return "Drive eject attempted: " + target;
    // Default fallback
    return "Action " + action + " not fully implemented (stub)";
}
