#pragma once
#include <string>
#include <optional>

// Spoken-word computer action matching. Ports lib/phraseMap.ts.
// Given a natural-language sentence, returns one confident {action, target} or
// std::nullopt when the sentence is mixed, unclear, or not a computer command.

struct PhraseAction {
    std::string action;
    std::string target;
};

class PhraseMapper {
public:
    /** One confident meaning, or nullopt when the sentence is mixed or unclear. */
    static std::optional<PhraseAction> MapPhrase(const std::string& content);

private:
    static std::string NormalizePhrase(const std::string& content);
    static bool Has(const std::string& text, const std::string& regex);
    static std::optional<std::string> CleanName(const std::string& value);
    static bool AsksOff(const std::string& text);
    static bool AsksOn(const std::string& text);
};
