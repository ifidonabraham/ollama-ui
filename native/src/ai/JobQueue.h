#pragma once
#include <string>
#include <unordered_map>
#include <vector>
#include <mutex>

enum class JobStatus { queued, running, completed, failed, cancelled };

struct AgentJob {
    std::string id;
    std::string session_id;  // optional
    JobStatus status;
    std::string phase;
    std::string model;       // optional
    std::string role;        // optional
    long long created_at;
    long long updated_at;
    std::string error;       // optional
};

class JobQueue {
public:
    static void PushSteerNote(const std::string& id, const std::string& text);
    static std::vector<std::string> TakeSteerNotes(const std::string& id = "");
    static AgentJob CreateJob(const std::string& id, const std::string& session_id = "");
    static AgentJob* GetJob(const std::string& id);
    static AgentJob* UpdateJob(const std::string& id, const std::unordered_map<std::string, std::string>& patch);
    static AgentJob* CancelJob(const std::string& id);
    static bool IsJobCancelled(const std::string& id);

private:
    static std::unordered_map<std::string, AgentJob> jobs;
    static std::unordered_map<std::string, std::vector<std::string>> steerNotes;
    static std::mutex mtx;
};
