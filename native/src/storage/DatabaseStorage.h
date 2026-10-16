#pragma once
#include <windows.h>
#include <string>
#include <vector>

struct NativeSession {
    std::string id;
    std::string title;
    std::string model;
    int64_t createdAt = 0;
};

struct NativeMessage {
    std::string id;
    std::string sessionId;
    std::string role; // "user", "assistant", "system"
    std::string content;
    int64_t createdAt = 0;
};

class DatabaseStorage {
public:
    DatabaseStorage();
    ~DatabaseStorage();

    bool Initialize(const std::wstring& dbPath);
    void Close();

    bool CreateSession(const std::string& id, const std::string& title, const std::string& model);
    bool DeleteSession(const std::string& id);
    std::vector<NativeSession> ListSessions();

    bool AddMessage(const std::string& id, const std::string& sessionId, const std::string& role, const std::string& content);
    std::vector<NativeMessage> GetSessionMessages(const std::string& sessionId);

private:
    void* m_dbHandle = nullptr; // sqlite3* pointer
    std::wstring m_dbPath;
};
