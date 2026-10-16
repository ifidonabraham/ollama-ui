#pragma once
#include <string>
#include <vector>
#include "ai/DirectActionParser.h"

struct CommandStep {
    ToolCall call;
    std::string source;
};

struct CommandPlan {
    std::vector<CommandStep> steps;
    std::vector<std::string> leftover;
    bool safeToRun;
};

class CommandUnderstand {
public:
    static CommandPlan* UnderstandCommand(const std::string& content);
};
