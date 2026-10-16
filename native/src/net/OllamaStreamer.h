#pragma once
#include <windows.h>
#include <winhttp.h>
#include <string>
#include <memory>
#include <thread>
#include <functional>
#include "../core/TokenQueue.h"

#pragma comment(lib, "winhttp.lib")

class OllamaStreamer {
public:
    OllamaStreamer(const std::wstring& host = L"localhost", WORD port = 11434);
    ~OllamaStreamer();

    // Stream generation tokens into the provided queue asynchronously
    bool GenerateStream(
        const std::string& model,
        const std::string& prompt,
        std::shared_ptr<LockFreeTokenQueue<std::string>> tokenQueue
    );

    // Stop active streaming thread immediately
    void Cancel();

    bool IsStreaming() const { return m_isStreaming.load(); }

    // Fetch live models list from Ollama /api/tags
    std::vector<std::string> FetchModels();

    // Unload all models from RAM (matching TypeScript freeRam /api/unload)
    bool UnloadAllModels();

private:
    std::wstring m_host;
    WORD m_port;

    std::atomic<bool> m_isStreaming{ false };
    std::atomic<bool> m_cancelRequested{ false };
    std::thread m_workerThread;
};
