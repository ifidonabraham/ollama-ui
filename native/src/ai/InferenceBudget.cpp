#include "InferenceBudget.h"

std::unordered_map<std::string, int> InferenceBudget::tokenLimits = {
    {"qwen2.5-coder:1.5b", 2048},
    {"qwen2.5:3b", 4096},
    {"qwen2.5:7b", 8192},
    {"llama3.2:1b", 2048},
    {"llama3.2:3b", 4096},
    {"llama3.2", 8192},
    {"phi3:mini", 4096},
    {"phi3", 4096}
};

std::unordered_map<std::string, int> InferenceBudget::timeBudgets = {
    {"qwen2.5-coder:1.5b", 15000},
    {"qwen2.5:3b", 20000},
    {"qwen2.5:7b", 30000},
    {"llama3.2:1b", 15000},
    {"llama3.2:3b", 20000},
    {"llama3.2", 30000},
    {"phi3:mini", 20000},
    {"phi3", 20000}
};

std::unordered_map<std::string, std::string> InferenceBudget::reasoningEffort = {
    {"qwen2.5-coder:1.5b", "medium"},
    {"qwen2.5:3b", "medium"},
    {"qwen2.5:7b", "medium"},
    {"llama3.2:1b", "low"},
    {"llama3.2:3b", "low"},
    {"llama3.2", "low"},
    {"phi3:mini", "medium"},
    {"phi3", "medium"}
};

int InferenceBudget::GetTokenLimit(const std::string& model) {
    auto it = tokenLimits.find(model);
    if (it != tokenLimits.end()) return it->second;
    return 2048; // default
}

int InferenceBudget::GetTimeBudgetMs(const std::string& model) {
    auto it = timeBudgets.find(model);
    if (it != timeBudgets.end()) return it->second;
    return 15000; // default
}

std::string InferenceBudget::GetReasoningEffort(const std::string& model) {
    auto it = reasoningEffort.find(model);
    if (it != reasoningEffort.end()) return it->second;
    return "medium"; // default
}
