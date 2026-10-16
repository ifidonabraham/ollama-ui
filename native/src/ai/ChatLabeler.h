#pragma once
#include <string>
#include <memory>
#include "../net/OllamaStreamer.h"

enum class AdjusterKind {
    Chat,       // A question about this conversation
    Project,    // What the open folder or repository is
    Computer,   // A PC status or Windows setting
    Code,       // Create, edit, or fix files
    Vision,     // Question about a picture or screen
    Unknown
};

class ChatLabeler {
public:
    static std::string KindToString(AdjusterKind kind);
    static AdjusterKind ParseKind(const std::string& labelText);

    // Prompt qwen2.5-coder:1.5b to label the message with one word
    static AdjusterKind LabelMessageWithSmallModel(
        const std::string& userMessage,
        std::shared_ptr<OllamaStreamer> streamer
    );
};
