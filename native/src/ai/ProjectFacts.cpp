#include "ProjectFacts.h"
#include <regex>
#include <filesystem>

namespace fs = std::filesystem;

bool ProjectFacts::PathMentioned(const std::string& content, std::string& result) {
    std::regex re(R"([A-Za-z]:\(?:[^\
"]+\)*[^\
"]*)");
    std::smatch match;
    if (std::regex_search(content, match, re)) {
        result = match[0];
        result = std::regex_replace(result, std::regex(R"([.,;:]+$)"), "");
        return true;
    }
    return false;
}

bool ProjectFacts::QuestionNeedsProjectFacts(const std::string& content) {
    return true; // stub
}

ProjectFacts::WorkspaceResolution ProjectFacts::WorkspaceForRequest(const std::string& content, 
                                                                   const std::string& workspacePath, 
                                                                   const std::string& appRoot) {
    std::string mentioned;
    if (!PathMentioned(content, mentioned)) {
        return ResolveWorkspace(workspacePath, appRoot);
    }
    return ResolveWorkspace(mentioned, appRoot);
}

ProjectFacts::WorkspaceResolution ProjectFacts::ResolveWorkspace(const std::string& requested, 
                                                                 const std::string& appRoot, 
                                                                 const std::string& oldPath) {
    // Simple stub
    return {requested, false, ""};
}

ProjectFacts ProjectFacts::CollectProjectFacts(const std::string& workspace, 
                                              const std::string& redirectedFrom) {
    ProjectFacts facts;
    facts.workspace = workspace;
    facts.requested = redirectedFrom.empty() ? workspace : redirectedFrom;
    facts.redirectedFrom = redirectedFrom;
    return facts;
}

std::string ProjectFacts::RenderProjectFacts(const ProjectFacts& facts) {
    return "Project facts stub";
}

bool ProjectFacts::IsUngroundedRefusal(const std::string& text) {
    return false; // stub
}

std::string ProjectFacts::StripUngroundedSentences(const std::string& answer, 
                                                  const std::string& evidence) {
    return answer; // stub
}
