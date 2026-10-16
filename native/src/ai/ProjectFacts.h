#pragma once
#include <string>
#include <vector>

struct WorkspaceResolution {
    std::string path;
    bool missing;
    std::string redirectedFrom;
};

struct ProjectFacts {
    std::string workspace;
    std::string requested;
    std::string redirectedFrom;
    std::vector<std::string> entries;
    std::vector<std::string> filesRead;
    std::string packageSummary;
    std::string readmeExcerpt;
    std::string evidenceText;
};

struct ToolLogItem {
    std::string tool;
    std::string summary;
};

class ProjectFacts {
public:
    static bool PathMentioned(const std::string& content, std::string& result);
    static bool QuestionNeedsProjectFacts(const std::string& content);
    static WorkspaceResolution WorkspaceForRequest(const std::string& content, 
                                                 const std::string& workspacePath, 
                                                 const std::string& appRoot);
    static WorkspaceResolution ResolveWorkspace(const std::string& requested, 
                                                const std::string& appRoot, 
                                                const std::string& oldPath = "C:\Users\PC\ollama-ui");
    static ProjectFacts CollectProjectFacts(const std::string& workspace, 
                                           const std::string& redirectedFrom = "");
    static std::string RenderProjectFacts(const ProjectFacts& facts);
    static bool IsUngroundedRefusal(const std::string& text);
    static std::string StripUngroundedSentences(const std::string& answer, 
                                               const std::string& evidence);
};
