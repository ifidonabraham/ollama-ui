#include "SecretRedact.h"
#include <regex>
#include <string>

std::string SecretRedact::RedactSecrets(const std::string& rawText) {
    std::string result = rawText;
    // Redact common secret patterns
    static const std::vector<std::pair<std::string, std::string>> patterns = {
        {R"((?<=password["']?\s*[:=]\s*["'])[^"']*(?=["']))", "*****"},
        {R"((?<=api[_-]?key["']?\s*[:=]\s*["'])[^"']*(?=["']))", "*****"},
        {R"((?<=secret["']?\s*[:=]\s*["'])[^"']*(?=["']))", "*****"},
        {R"((?<=token["']?\s*[:=]\s*["'])[^"']*(?=["']))", "*****"},
        {R"(\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4})", "****-****-****-****"}, // credit card
        {R"(\d{3}-\d{2}-\d{4})", "***-**-****"}, // SSN
    };
    for (const auto& [pattern, replacement] : patterns) {
        std::regex re(pattern, std::regex_constants::icase);
        result = std::regex_replace(result, re, replacement);
    }
    return result;
}

std::string SecretRedact::TextForModel(const std::string& summary, bool online) {
    // In production, this would adjust detail level based on online/offline mode
    // For now, just return the summary as-is
    return summary;
}
