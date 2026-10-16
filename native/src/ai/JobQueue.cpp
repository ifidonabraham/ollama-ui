#include "JobQueue.h"
#include <ctime>
#include <algorithm>

std::unordered_map<std::string, AgentJob> JobQueue::jobs;
std::unordered_map<std::string, std::vector<std::string>> JobQueue::steerNotes;
std::mutex JobQueue::mtx;

void JobQueue::PushSteerNote(const std::string& id, const std::string& text) {
    std::lock_guard<std::mutex> lock(mtx);
    auto it = jobs.find(id);
    if (it == jobs.end() || it->second.status != JobStatus::running) return;
    std::string note = text.substr(0, 2000);
    if (note.empty()) return;
    steerNotes[id].push_back(note);
}

std::vector<std::string> JobQueue::TakeSteerNotes(const std::string& id) {
    std::lock_guard<std::mutex> lock(mtx);
    if (id.empty()) return {};
    auto it = steerNotes.find(id);
    if (it == steerNotes.end()) return {};
    std::vector<std::string> result = it->second;
    steerNotes[id].clear();
    return result;
}

AgentJob JobQueue::CreateJob(const std::string& id, const std::string& session_id) {
    std::lock_guard<std::mutex> lock(mtx);
    long long now = static_cast<long long>(std::time(nullptr)) * 1000;
    AgentJob job{id, session_id, JobStatus::queued, "queued", "", "", now, now, ""};
    jobs[id] = job;
    return job;
}

AgentJob* JobQueue::GetJob(const std::string& id) {
    std::lock_guard<std::mutex> lock(mtx);
    auto it = jobs.find(id);
    if (it == jobs.end()) return nullptr;
    return &it->second;
}

AgentJob* JobQueue::UpdateJob(const std::string& id, const std::unordered_map<std::string, std::string>& patch) {
    std::lock_guard<std::mutex> lock(mtx);
    auto it = jobs.find(id);
    if (it == jobs.end()) return nullptr;
    AgentJob& job = it->second;
    for (const auto& [key, value] : patch) {
        if (key == "status") {
            if (value == "queued") job.status = JobStatus::queued;
            else if (value == "running") job.status = JobStatus::running;
            else if (value == "completed") job.status = JobStatus::completed;
            else if (value == "failed") job.status = JobStatus::failed;
            else if (value == "cancelled") job.status = JobStatus::cancelled;
            else if (value == "queued") job.phase = "queued";
            else if (value == "running") job.phase = "running";
            else if (value == "completed") job.phase = "completed";
            else if (value == "failed") job.phase = "failed";
            else if (value == "cancelled") job.phase = "cancelled";
        } else if (key == "phase") {
            job.phase = value;
        } else if (key == "model") {
            job.model = value;
        } else if (key == "role") {
            job.role = value;
        } else if (key == "error") {
            job.error = value;
        }
    }
    job.updated_at = static_cast<long long>(std::time(nullptr)) * 1000;
    return &job;
}

AgentJob* JobQueue::CancelJob(const std::string& id) {
    std::unordered_map<std::string, std::string> patch{{"status", "cancelled"}, {"phase", "cancelled"}};
    return UpdateJob(id, patch);
}

bool JobQueue::IsJobCancelled(const std::string& id) {
    std::lock_guard<std::mutex> lock(mtx);
    auto it = jobs.find(id);
    if (it == jobs.end()) return false;
    return it->second.status == JobStatus::cancelled;
}
