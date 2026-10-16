#include "OllamaStreamer.h"
#include <sstream>
#include <iostream>

OllamaStreamer::OllamaStreamer(const std::wstring& host, WORD port)
    : m_host(host), m_port(port) {}

OllamaStreamer::~OllamaStreamer() {
    Cancel();
    if (m_workerThread.joinable()) {
        m_workerThread.join();
    }
}

void OllamaStreamer::Cancel() {
    m_cancelRequested.store(true);
}

bool OllamaStreamer::GenerateStream(
    const std::string& model,
    const std::string& prompt,
    std::shared_ptr<LockFreeTokenQueue<std::string>> tokenQueue
) {
    if (m_isStreaming.load()) {
        Cancel();
        if (m_workerThread.joinable()) m_workerThread.join();
    }

    m_cancelRequested.store(false);
    m_isStreaming.store(true);
    tokenQueue->Clear();

    // Construct JSON payload manually without slow JS serialization
    // Escape prompt string
    std::string escapedPrompt;
    for (char c : prompt) {
        if (c == '"') escapedPrompt += "\\\"";
        else if (c == '\\') escapedPrompt += "\\\\";
        else if (c == '\n') escapedPrompt += "\\n";
        else if (c == '\r') escapedPrompt += "\\r";
        else if (c == '\t') escapedPrompt += "\\t";
        else escapedPrompt += c;
    }

    std::string jsonPayload = "{\"model\":\"" + model + "\",\"prompt\":\"" + escapedPrompt + "\",\"stream\":true}";

    m_workerThread = std::thread([this, jsonPayload, tokenQueue]() {
        HINTERNET hSession = WinHttpOpen(
            L"FoniaNativeEngine/1.0",
            WINHTTP_ACCESS_TYPE_DEFAULT_PROXY,
            WINHTTP_NO_PROXY_NAME,
            WINHTTP_NO_PROXY_BYPASS,
            0
        );

        if (!hSession) {
            tokenQueue->SetFinished(true);
            m_isStreaming.store(false);
            return;
        }

        HINTERNET hConnect = WinHttpConnect(hSession, m_host.c_str(), m_port, 0);
        if (!hConnect) {
            WinHttpCloseHandle(hSession);
            tokenQueue->SetFinished(true);
            m_isStreaming.store(false);
            return;
        }

        HINTERNET hRequest = WinHttpOpenRequest(
            hConnect,
            L"POST",
            L"/api/generate",
            nullptr,
            WINHTTP_NO_REFERER,
            WINHTTP_DEFAULT_ACCEPT_TYPES,
            0
        );

        if (!hRequest) {
            WinHttpCloseHandle(hConnect);
            WinHttpCloseHandle(hSession);
            tokenQueue->SetFinished(true);
            m_isStreaming.store(false);
            return;
        }

        LPCWSTR headers = L"Content-Type: application/json\r\n";
        BOOL sent = WinHttpSendRequest(
            hRequest,
            headers,
            -1L,
            (LPVOID)jsonPayload.data(),
            static_cast<DWORD>(jsonPayload.size()),
            static_cast<DWORD>(jsonPayload.size()),
            0
        );

        if (sent && WinHttpReceiveResponse(hRequest, nullptr)) {
            char buffer[2048];
            DWORD bytesRead = 0;
            std::string lineAccumulator;

            while (WinHttpReadData(hRequest, buffer, sizeof(buffer) - 1, &bytesRead) && bytesRead > 0) {
                if (m_cancelRequested.load()) break;

                buffer[bytesRead] = '\0';
                lineAccumulator.append(buffer, bytesRead);

                // Process line-by-line JSON stream from Ollama
                size_t newlinePos = 0;
                while ((newlinePos = lineAccumulator.find('\n')) != std::string::npos) {
                    std::string line = lineAccumulator.substr(0, newlinePos);
                    lineAccumulator.erase(0, newlinePos + 1);

                    // Fast extraction of "response":"..." token without heavy parser overhead
                    size_t respIdx = line.find("\"response\":\"");
                    if (respIdx != std::string::npos) {
                        size_t start = respIdx + 12;
                        size_t end = start;
                        while (end < line.size() && line[end] != '"') {
                            if (line[end] == '\\' && end + 1 < line.size()) end += 2;
                            else end++;
                        }
                        std::string rawToken = line.substr(start, end - start);

                        // Unescape token
                        std::string token;
                        for (size_t k = 0; k < rawToken.size(); ++k) {
                            if (rawToken[k] == '\\' && k + 1 < rawToken.size()) {
                                if (rawToken[k + 1] == 'n') { token += '\n'; k++; }
                                else if (rawToken[k + 1] == 't') { token += '\t'; k++; }
                                else if (rawToken[k + 1] == '"') { token += '"'; k++; }
                                else if (rawToken[k + 1] == '\\') { token += '\\'; k++; }
                                else { token += rawToken[k]; }
                            } else {
                                token += rawToken[k];
                            }
                        }
                        if (!token.empty()) {
                            tokenQueue->Push(token);
                        }
                    }
                }
            }
        }

        WinHttpCloseHandle(hRequest);
        WinHttpCloseHandle(hConnect);
        WinHttpCloseHandle(hSession);

        tokenQueue->SetFinished(true);
        m_isStreaming.store(false);
    });

    return true;
}

std::vector<std::string> OllamaStreamer::FetchModels() {
    std::vector<std::string> models;
    HINTERNET hSession = WinHttpOpen(
        L"FoniaNativeEngine/1.0",
        WINHTTP_ACCESS_TYPE_DEFAULT_PROXY,
        WINHTTP_NO_PROXY_NAME,
        WINHTTP_NO_PROXY_BYPASS,
        0
    );
    if (!hSession) return models;

    // Fast timeout: 1500ms max so offline / slow Ollama never blocks UI startup
    WinHttpSetTimeouts(hSession, 1000, 1500, 1500, 1500);

    HINTERNET hConnect = WinHttpConnect(hSession, m_host.c_str(), m_port, 0);
    if (!hConnect) {
        WinHttpCloseHandle(hSession);
        return models;
    }

    HINTERNET hRequest = WinHttpOpenRequest(
        hConnect,
        L"GET",
        L"/api/tags",
        nullptr,
        WINHTTP_NO_REFERER,
        WINHTTP_DEFAULT_ACCEPT_TYPES,
        0
    );

    if (hRequest && WinHttpSendRequest(hRequest, WINHTTP_NO_ADDITIONAL_HEADERS, 0, nullptr, 0, 0, 0) &&
        WinHttpReceiveResponse(hRequest, nullptr)) {
        std::string response;
        char buffer[2048];
        DWORD bytesRead = 0;
        while (WinHttpReadData(hRequest, buffer, sizeof(buffer) - 1, &bytesRead) && bytesRead > 0) {
            buffer[bytesRead] = '\0';
            response.append(buffer, bytesRead);
        }

        // Parse model names from JSON "name":"<model>"
        size_t pos = 0;
        while ((pos = response.find("\"name\":\"", pos)) != std::string::npos) {
            pos += 8;
            size_t end = response.find('"', pos);
            if (end != std::string::npos) {
                std::string modelName = response.substr(pos, end - pos);
                models.push_back(modelName);
                pos = end + 1;
            }
        }
    }

    if (hRequest) WinHttpCloseHandle(hRequest);
    WinHttpCloseHandle(hConnect);
    WinHttpCloseHandle(hSession);
    return models;
}

bool OllamaStreamer::UnloadAllModels() {
    // Unload active models via /api/generate with keep_alive: 0
    HINTERNET hSession = WinHttpOpen(
        L"FoniaNativeEngine/1.0",
        WINHTTP_ACCESS_TYPE_DEFAULT_PROXY,
        WINHTTP_NO_PROXY_NAME,
        WINHTTP_NO_PROXY_BYPASS,
        0
    );
    if (!hSession) return false;

    HINTERNET hConnect = WinHttpConnect(hSession, m_host.c_str(), m_port, 0);
    if (!hConnect) {
        WinHttpCloseHandle(hSession);
        return false;
    }

    auto models = FetchModels();
    for (const auto& m : models) {
        std::string body = "{\"model\":\"" + m + "\",\"keep_alive\":0}";
        HINTERNET hRequest = WinHttpOpenRequest(
            hConnect,
            L"POST",
            L"/api/generate",
            nullptr,
            WINHTTP_NO_REFERER,
            WINHTTP_DEFAULT_ACCEPT_TYPES,
            0
        );

        if (hRequest) {
            std::wstring headers = L"Content-Type: application/json\r\n";
            WinHttpSendRequest(hRequest, headers.c_str(), static_cast<DWORD>(headers.size()), (LPVOID)body.c_str(), static_cast<DWORD>(body.size()), static_cast<DWORD>(body.size()), 0);
            WinHttpReceiveResponse(hRequest, nullptr);
            WinHttpCloseHandle(hRequest);
        }
    }

    WinHttpCloseHandle(hConnect);
    WinHttpCloseHandle(hSession);
    return true;
}

