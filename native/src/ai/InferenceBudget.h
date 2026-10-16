#pragma once
#include <string>
#include <unordered_map>

class InferenceBudget {
public:
    static int GetTokenLimit(const std::string& model);
    static int GetTimeBudgetMs(const std::string& model);
    static std::string GetReasoningEffort(const std::string& model);
private:
    static std::unordered_map<std::string, int> tokenLimits;
    static std::unordered_map<std::string, int> timeBudgets;
    static std::unordered_map<std::string, std::string> reasoningEffort;
};
