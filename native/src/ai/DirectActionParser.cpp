#include "DirectActionParser.h"
#include <regex>
#include <cctype>
#include <algorithm>
#include <windows.h>
#include <shlobj.h>

// Helper: check if text contains a regex pattern
static bool HasMatch(const std::string& text, const std::string& pattern) {
    std::regex re(pattern, std::regex::icase);
    return std::regex_search(text, re);
}

// Helper: trim whitespace
static std::string Trim(const std::string& s) {
    size_t start = s.find_first_not_of(" \t\r\n");
    if (start == std::string::npos) return "";
    size_t end = s.find_last_not_of(" \t\r\n");
    return s.substr(start, end - start + 1);
}

// Helper: strip surrounding quotes
static std::string StripQuotes(const std::string& s) {
    if (s.size() >= 2 && ((s.front() == '"' && s.back() == '"') || (s.front() == '\'' && s.back() == '\''))) {
        return s.substr(1, s.size() - 2);
    }
    return s;
}

bool DirectActionParser::IsDestructive(const std::string& content) {
    std::string lower = content;
    for (auto& c : lower) c = static_cast<char>(tolower(c));
    return HasMatch(lower, "\\bformat\\b.{0,30}\\b(disk|drive|volume|partition|[a-z]:)\\b") ||
           HasMatch(lower, "\\b(wipe|erase)\\b.{0,30}\\b(disk|drive|volume|partition|everything|all)\\b") ||
           HasMatch(lower, "\\bdelete\\b.{0,40}\\b(everything|all|disk|drive|files)\\b") ||
           HasMatch(lower, "\\bremove-item\\b") ||
           HasMatch(lower, "\\brm\\s+-rf\\b");
}

bool DirectActionParser::IsComputerControlTask(const std::string& content) {
    return HasMatch(content, "\\b(bluetooth|firewall|wifi|wi-fi|disk space|microphone|voice command|transcribe|screenshot|hear me|battery|cpu|gpu|processor|graphics|display|monitor|volume|printer|camera|brightness|startup|components|hardware|audio|speaker|power plan|shutdown|restart|eject)\\b") ||
           HasMatch(content, "\\bshut\\s*down\\b") ||
           HasMatch(content, "\\b(?:say|speak)\\s+aloud\\b") ||
           HasMatch(content, "\\b(disable|enable)\\b[\\s\\S]{0,40}\\b(camera|device|adapter|bluetooth|wifi|microphone|speaker|usb)\\b") ||
           HasMatch(content, "\\b(stop|start|kill)\\s+(?:the\\s+)?(?:process|service)\\b") ||
           HasMatch(content, "\\b(?:eject|unplug|safely\\s+remove)\\b[\\s\\S]{0,48}\\b(flash|usb|thumb|pen|stick|drive|removable)\\b");
}

ToolCall DirectActionParser::MatchRunCommand(const std::string& text) {
    std::regex re("^(?:please\\s+)?(?:run|execute)(?:\\s+(?:the\\s+)?command)?\\s*:?\\s+(.+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        std::string command = StripQuotes(Trim(match[1].str()));
        if (!command.empty() && !HasMatch(command, "^(a|the|this|command|something)\\b")) {
            return { "run_command", command, "" };
        }
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::MatchReadFile(const std::string& text) {
    std::regex re("^(?:please\\s+)?read(?:\\s+(?:the\\s+)?file)?\\s+(.+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        std::string filePath = StripQuotes(Trim(match[1].str()));
        if (!filePath.empty() && filePath.find(' ') == std::string::npos) {
            std::string tool = HasMatch(filePath, "\\.(pdf|docx|pptx)$") ? "read_document" : "read_file";
            return { tool, filePath, "" };
        }
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::MatchLaunchApp(const std::string& text) {
    std::regex re("^(?:please\\s+)?(?:open|launch|start)\\s+(.+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        std::string name = StripQuotes(Trim(match[1].str()));
        if (!name.empty() && name.find(' ') == std::string::npos &&
            !HasMatch(name, "[;&|<>`$]") &&
            !HasMatch(name, "shutdown|format|Remove-Item|Restart-Computer")) {
            return { "launch_app", name, "" };
        }
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::MatchListDir(const std::string& text) {
    if (HasMatch(text, "^(?:please\\s+)?(?:list|ls)(?:\\s+(?:me\\s+)?)?(?:this\\s+|the\\s+)?(?:dir|directory|folder|files)?\\s*$")) {
        return { "list_dir", ".", "" };
    }
    std::regex re("^(?:please\\s+)?(?:list|ls)(?:\\s+(?:directory|dir|folder))?\\s+(\\S+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        return { "list_dir", match[1].str(), "" };
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::Parse(const std::string& content) {
    std::string text = Trim(content);
    if (text.empty() || text.find('\n') != std::string::npos || text.length() > 400) return { "", "", "" };
    if (HasMatch(text, "\\b(and|then)\\b")) return { "", "", "" };

    // Try computer_action first (exact match)
    if (IsComputerControlTask(text)) {
        return { "computer_action", text, "" };
    }

    // Try run_command
    auto run = MatchRunCommand(text);
    if (!run.name.empty()) return run;

    // Try read_file
    auto read = MatchReadFile(text);
    if (!read.name.empty()) return read;

    // Try launch_app
    auto open = MatchLaunchApp(text);
    if (!open.name.empty()) return open;

    // Try list_dir
    auto list = MatchListDir(text);
    if (!list.name.empty()) return list;

    return { "", "", "" };
}

// Helper: check if text contains a regex pattern
static bool HasMatch(const std::string& text, const std::string& pattern) {
    std::regex re(pattern, std::regex::icase);
    return std::regex_search(text, re);
}

// Helper: trim whitespace
static std::string Trim(const std::string& s) {
    size_t start = s.find_first_not_of(" \t\r\n");
    if (start == std::string::npos) return "";
    size_t end = s.find_last_not_of(" \t\r\n");
    return s.substr(start, end - start + 1);
}

// Helper: strip surrounding quotes
static std::string StripQuotes(const std::string& s) {
    if (s.size() >= 2 && ((s.front() == '"' && s.back() == '"') || (s.front() == '\'' && s.back() == '\''))) {
        return s.substr(1, s.size() - 2);
    }
    return s;
}

bool DirectActionParser::IsDestructive(const std::string& content) {
    std::string lower = content;
    for (auto& c : lower) c = static_cast<char>(tolower(c));
    return HasMatch(lower, "\\bformat\\b.{0,30}\\b(disk|drive|volume|partition|[a-z]:)\\b") ||
           HasMatch(lower, "\\b(wipe|erase)\\b.{0,30}\\b(disk|drive|volume|partition|everything|all)\\b") ||
           HasMatch(lower, "\\bdelete\\b.{0,40}\\b(everything|all|disk|drive|files)\\b") ||
           HasMatch(lower, "\\bremove-item\\b") ||
           HasMatch(lower, "\\brm\\s+-rf\\b");
}

bool DirectActionParser::IsComputerControlTask(const std::string& content) {
    return HasMatch(content, "\\b(bluetooth|firewall|wifi|wi-fi|disk space|microphone|voice command|transcribe|screenshot|hear me|battery|cpu|gpu|processor|graphics|display|monitor|volume|printer|camera|brightness|startup|components|hardware|audio|speaker|power plan|shutdown|restart|eject)\\b") ||
           HasMatch(content, "\\bshut\\s*down\\b") ||
           HasMatch(content, "\\b(?:say|speak)\\s+aloud\\b") ||
           HasMatch(content, "\\b(disable|enable)\\b[\\s\\S]{0,40}\\b(camera|device|adapter|bluetooth|wifi|microphone|speaker|usb)\\b") ||
           HasMatch(content, "\\b(stop|start|kill)\\s+(?:the\\s+)?(?:process|service)\\b") ||
           HasMatch(content, "\\b(?:eject|unplug|safely\\s+remove)\\b[\\s\\S]{0,48}\\b(flash|usb|thumb|pen|stick|drive|removable)\\b");
}

ToolCall DirectActionParser::MatchRunCommand(const std::string& text) {
    std::regex re("^(?:please\\s+)?(?:run|execute)(?:\\s+(?:the\\s+)?command)?\\s*:?\\s+(.+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        std::string command = StripQuotes(Trim(match[1].str()));
        if (!command.empty() && !HasMatch(command, "^(a|the|this|command|something)\\b")) {
            return { "run_command", command, "" };
        }
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::MatchReadFile(const std::string& text) {
    std::regex re("^(?:please\\s+)?read(?:\\s+(?:the\\s+)?file)?\\s+(.+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        std::string filePath = StripQuotes(Trim(match[1].str()));
        if (!filePath.empty() && filePath.find(' ') == std::string::npos) {
            std::string tool = HasMatch(filePath, "\\.(pdf|docx|pptx)$") ? "read_document" : "read_file";
            return { tool, filePath, "" };
        }
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::MatchLaunchApp(const std::string& text) {
    std::regex re("^(?:please\\s+)?(?:open|launch|start)\\s+(.+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        std::string name = StripQuotes(Trim(match[1].str()));
        if (!name.empty() && name.find(' ') == std::string::npos &&
            !HasMatch(name, "[;&|<>`$]") &&
            !HasMatch(name, "shutdown|format|Remove-Item|Restart-Computer")) {
            return { "launch_app", name, "" };
        }
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::MatchListDir(const std::string& text) {
    if (HasMatch(text, "^(?:please\\s+)?(?:list|ls)(?:\\s+(?:me\\s+)?)?(?:this\\s+|the\\s+)?(?:dir|directory|folder|files)?\\s*$")) {
        return { "list_dir", ".", "" };
    }
    std::regex re("^(?:please\\s+)?(?:list|ls)(?:\\s+(?:directory|dir|folder))?\\s+(\\S+)$", std::regex::icase);
    std::smatch match;
    if (std::regex_search(text, match, re)) {
        return { "list_dir", match[1].str(), "" };
    }
    return { "", "", "" };
}

ToolCall DirectActionParser::Parse(const std::string& content) {
    std::string text = Trim(content);
    if (text.empty() || text.find('\n') != std::string::npos || text.length() > 400) return { "", "", "" };
    if (HasMatch(text, "\\b(and|then)\\b")) return { "", "", "" };

    // Try computer_action first (exact match)
    if (IsComputerControlTask(text)) {
        return { "computer_action", text, "" };
    }

    // Try run_command
    auto run = MatchRunCommand(text);
    if (!run.name.empty()) return run;

    // Try read_file
    auto read = MatchReadFile(text);
    if (!read.name.empty()) return read;

    // Try launch_app
    auto open = MatchLaunchApp(text);
    if (!open.name.empty()) return open;

    // Try list_dir
    auto list = MatchListDir(text);
    if (!list.name.empty()) return list;

    return { "", "", "" };
}