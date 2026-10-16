#include "ProcessRunner.h"
#include <thread>
#include <array>

ProcessResult ProcessRunner::RunCommand(
    const std::wstring& executable,
    const std::wstring& arguments,
    const std::wstring& workingDirectory,
    DWORD timeoutMs
) {
    ProcessResult result;

    SECURITY_ATTRIBUTES sa = {};
    sa.nLength = sizeof(SECURITY_ATTRIBUTES);
    sa.bInheritHandle = TRUE;
    sa.lpSecurityDescriptor = nullptr;

    HANDLE hOutRead = nullptr, hOutWrite = nullptr;
    HANDLE hErrRead = nullptr, hErrWrite = nullptr;

    if (!CreatePipe(&hOutRead, &hOutWrite, &sa, 0)) return result;
    SetHandleInformation(hOutRead, HANDLE_FLAG_INHERIT, 0);

    if (!CreatePipe(&hErrRead, &hErrWrite, &sa, 0)) {
        CloseHandle(hOutRead);
        CloseHandle(hOutWrite);
        return result;
    }
    SetHandleInformation(hErrRead, HANDLE_FLAG_INHERIT, 0);

    STARTUPINFOW si = {};
    si.cb = sizeof(STARTUPINFOW);
    si.dwFlags = STARTF_USESTDHANDLES | STARTF_USESHOWWINDOW;
    si.wShowWindow = SW_HIDE;
    si.hStdOutput = hOutWrite;
    si.hStdError = hErrWrite;

    PROCESS_INFORMATION pi = {};

    std::wstring cmdLine = L"\"" + executable + L"\" " + arguments;
    std::vector<wchar_t> cmdLineBuffer(cmdLine.begin(), cmdLine.end());
    cmdLineBuffer.push_back(L'\0');

    const wchar_t* pWorkDir = workingDirectory.empty() ? nullptr : workingDirectory.c_str();

    BOOL created = CreateProcessW(
        nullptr,
        cmdLineBuffer.data(),
        nullptr,
        nullptr,
        TRUE,
        CREATE_NO_WINDOW,
        nullptr,
        pWorkDir,
        &si,
        &pi
    );

    // Close the write ends in the parent process so ReadFile does not block
    CloseHandle(hOutWrite);
    CloseHandle(hErrWrite);

    if (!created) {
        CloseHandle(hOutRead);
        CloseHandle(hErrRead);
        result.stdErr = "Failed to launch process: CreateProcessW error " + std::to_string(GetLastError());
        return result;
    }

    // Read StdOut in a helper lambda/thread
    auto readPipeToString = [](HANDLE hPipe) -> std::string {
        std::string out;
        std::array<char, 4096> buffer;
        DWORD bytesRead = 0;
        while (ReadFile(hPipe, buffer.data(), static_cast<DWORD>(buffer.size()), &bytesRead, nullptr) && bytesRead > 0) {
            out.append(buffer.data(), bytesRead);
        }
        return out;
    };

    std::string outData;
    std::string errData;

    std::thread outThread([&]() { outData = readPipeToString(hOutRead); });
    std::thread errThread([&]() { errData = readPipeToString(hErrRead); });

    DWORD waitResult = WaitForSingleObject(pi.hProcess, timeoutMs);
    if (waitResult == WAIT_TIMEOUT) {
        TerminateProcess(pi.hProcess, 1);
        result.stdErr = "Process timed out after " + std::to_string(timeoutMs) + " ms";
        result.exitCode = -1;
    } else {
        DWORD exitCode = 0;
        GetExitCodeProcess(pi.hProcess, &exitCode);
        result.exitCode = static_cast<int>(exitCode);
        result.success = (result.exitCode == 0);
    }

    if (outThread.joinable()) outThread.join();
    if (errThread.joinable()) errThread.join();

    CloseHandle(hOutRead);
    CloseHandle(hErrRead);
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);

    result.stdOut = outData;
    if (result.stdErr.empty()) {
        result.stdErr = errData;
    }

    return result;
}

ProcessResult ProcessRunner::RunPowerShell(
    const std::wstring& scriptBlock,
    const std::wstring& workingDirectory,
    DWORD timeoutMs
) {
    // Powershell invocation with clean ExecutionPolicy bypass and encoded/quoted script block
    std::wstring args = L"-NoProfile -NonInteractive -ExecutionPolicy Bypass -Command \"& { " + scriptBlock + L" }\"";
    return RunCommand(L"powershell.exe", args, workingDirectory, timeoutMs);
}
