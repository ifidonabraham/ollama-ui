#include "DatabaseStorage.h"
#include <fstream>
#include <sstream>
#include <chrono>

// Native Win32 file-backed storage layer (JSON/Binary format) providing
// instant zero-dependency persistence without requiring external SQLite DLL binaries
DatabaseStorage::DatabaseStorage() {}

DatabaseStorage::~DatabaseStorage() {
    Close();
}

bool DatabaseStorage::Initialize(const std::wstring& dbPath) {
    m_dbPath = dbPath;
    // Ensure storage file exists or create it
    std::ifstream file(dbPath);
    if (!file.is_open()) {
        std::ofstream create(dbPath);
        return create.is_open();
    }
    return true;
}

void DatabaseStorage::Close() {
    m_dbHandle = nullptr;
}

bool DatabaseStorage::CreateSession(const std::string& id, const std::string& title, const std::string& model) {
    std::ofstream out(m_dbPath, std::ios::app);
    if (!out.is_open()) return false;

    auto now = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::system_clock::now().time_since_epoch()
    ).count();

    out << "SESSION|" << id << "|" << title << "|" << model << "|" << now << "\n";
    return true;
}

bool DatabaseStorage::DeleteSession(const std::string& targetId) {
    std::ifstream in(m_dbPath);
    if (!in.is_open()) return false;

    std::vector<std::string> lines;
    std::string line;
    while (std::getline(in, line)) {
        if (line.rfind("SESSION|" + targetId + "|", 0) == 0) continue;
        if (line.find("|" + targetId + "|") != std::string::npos && line.rfind("MSG|", 0) == 0) continue;
        lines.push_back(line);
    }
    in.close();

    std::ofstream out(m_dbPath, std::ios::trunc);
    for (const auto& l : lines) {
        out << l << "\n";
    }
    return true;
}

std::vector<NativeSession> DatabaseStorage::ListSessions() {
    std::vector<NativeSession> sessions;
    std::ifstream in(m_dbPath);
    if (!in.is_open()) return sessions;

    std::string line;
    while (std::getline(in, line)) {
        if (line.rfind("SESSION|", 0) == 0) {
            std::stringstream ss(line.substr(8));
            std::string id, title, model, timeStr;
            if (std::getline(ss, id, '|') && std::getline(ss, title, '|') &&
                std::getline(ss, model, '|') && std::getline(ss, timeStr, '|')) {
                NativeSession s;
                s.id = id;
                s.title = title;
                s.model = model;
                s.createdAt = std::stoll(timeStr);
                sessions.push_back(s);
            }
        }
    }
    return sessions;
}

bool DatabaseStorage::AddMessage(const std::string& id, const std::string& sessionId, const std::string& role, const std::string& content) {
    std::ofstream out(m_dbPath, std::ios::app);
    if (!out.is_open()) return false;

    auto now = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::system_clock::now().time_since_epoch()
    ).count();

    // Escape newlines in content for clean linear storage
    std::string escapedContent = content;
    size_t pos = 0;
    while ((pos = escapedContent.find('\n', pos)) != std::string::npos) {
        escapedContent.replace(pos, 1, "\\n");
        pos += 2;
    }

    out << "MSG|" << id << "|" << sessionId << "|" << role << "|" << escapedContent << "|" << now << "\n";
    return true;
}

std::vector<NativeMessage> DatabaseStorage::GetSessionMessages(const std::string& targetSessionId) {
    std::vector<NativeMessage> messages;
    std::ifstream in(m_dbPath);
    if (!in.is_open()) return messages;

    std::string line;
    while (std::getline(in, line)) {
        if (line.rfind("MSG|", 0) == 0) {
            std::stringstream ss(line.substr(4));
            std::string id, sessionId, role, content, timeStr;
            if (std::getline(ss, id, '|') && std::getline(ss, sessionId, '|') &&
                std::getline(ss, role, '|') && std::getline(ss, content, '|') &&
                std::getline(ss, timeStr, '|')) {
                if (sessionId == targetSessionId) {
                    NativeMessage m;
                    m.id = id;
                    m.sessionId = sessionId;
                    m.role = role;
                    m.createdAt = std::stoll(timeStr);

                    // Unescape newlines
                    size_t p = 0;
                    while ((p = content.find("\\n", p)) != std::string::npos) {
                        content.replace(p, 2, "\n");
                        p += 1;
                    }
                    m.content = content;
                    messages.push_back(m);
                }
            }
        }
    }
    return messages;
}
