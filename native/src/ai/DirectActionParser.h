#pragma once
#include <string>
#include <vector>
#include <functional>

// A single command the user already stated. Open-ended edits stay with the model.
struct ToolCall {
    std::string name;        // run_command, read_file, list_dir, launch_app, computer_action
    std::string argument;    // the command/path/name/action
    std::string target;      // for computer_action: the action target
};

class DirectActionParser {
public:
    // Parse a single user message into a ToolCall or nullptr.
    // Returns null for multi-clause, multiline, or open-ended messages.
    static ToolCall Parse(const std::string& content);

    // Check if content is a computer control task (bluetooth, firewall, wifi, etc.)
    static bool IsComputerControlTask(const std::string& content);

    // Check if content contains destructive keywords
    static bool IsDestructive(const std::string& content);

private:
    static ToolCall MatchRunCommand(const std::string& text);
    static ToolCall MatchReadFile(const std::string& text);
    static ToolCall MatchLaunchApp(const std::string& text);
    static ToolCall MatchListDir(const std::string& text);
    static bool IsSafeLaunchName(const std::string& name);
};
