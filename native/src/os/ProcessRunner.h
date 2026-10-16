#pragma once
#include <windows.h>
#include <string>
#include <vector>
#include <functional>

struct ProcessResult {
    int exitCode = 0;
    std::string stdOut;
    std::string stdErr;
    bool success = false;
};

class ProcessRunner {
public:
    // Execute a command directly with explicit working directory without using shell concatenation (&&)
    static ProcessResult RunCommand(
        const std::wstring& executable,
        const std::wstring& arguments,
        const std::wstring& workingDirectory,
        DWORD timeoutMs = 60000
    );

    // PowerShell runner with explicit ScriptBlock execution and array arguments
    static ProcessResult RunPowerShell(
        const std::wstring& scriptBlock,
        const std::wstring& workingDirectory,
        DWORD timeoutMs = 60000
    );

    // Asynchronous execution streaming output chunk-by-chunk
    static bool RunCommandAsync(
        const std::wstring& executable,
        const std::wstring& arguments,
        const std::wstring& workingDirectory,
        std::function<void(const std::string&)> onStdOut,
        std::function<void(const std::string&)> onStdErr,
        std::function<void(int)> onExit
    );
};
