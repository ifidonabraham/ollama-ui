#pragma once
#include <string>
#include <optional>

class ComputerActionExecutor {
public:
    static std::string RunAction(const std::string& action, const std::string& target = "");
    private:
    static std::string RunPowerShell(const std::string& script);
};
