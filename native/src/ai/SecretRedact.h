#pragma once
#include <string>
#include <vector>

class SecretRedact {
public:
    static std::string RedactSecrets(const std::string& rawText);
    static std::string TextForModel(const std::string& summary, bool online = false);
};
