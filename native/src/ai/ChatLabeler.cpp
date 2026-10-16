#include "ChatLabeler.h"
#include <algorithm>

std::string ChatLabeler::KindToString(AdjusterKind kind) {
    switch (kind) {
    case AdjusterKind::Chat: return "chat";
    case AdjusterKind::Project: return "project";
    case AdjusterKind::Computer: return "computer";
    case AdjusterKind::Code: return "code";
    case AdjusterKind::Vision: return "vision";
    default: return "unknown";
    }
}

AdjusterKind ChatLabeler::ParseKind(const std::string& labelText) {
    std::string lower = labelText;
    std::transform(lower.begin(), lower.end(), lower.begin(), ::tolower);

    if (lower.find("chat") != std::string::npos) return AdjusterKind::Chat;
    if (lower.find("project") != std::string::npos) return AdjusterKind::Project;
    if (lower.find("computer") != std::string::npos) return AdjusterKind::Computer;
    if (lower.find("code") != std::string::npos) return AdjusterKind::Code;
    if (lower.find("vision") != std::string::npos) return AdjusterKind::Vision;
    return AdjusterKind::Unknown;
}

AdjusterKind ChatLabeler::LabelMessageWithSmallModel(
    const std::string& userMessage,
    std::shared_ptr<OllamaStreamer> streamer
) {
    if (!streamer) return AdjusterKind::Unknown;

    std::string prompt = 
        "Label the user message with one word and no other text.\n"
        "chat = a question about this conversation.\n"
        "project = what the open folder or project is.\n"
        "computer = a PC status or a Windows setting.\n"
        "code = create, edit, or fix files.\n"
        "vision = the user is asking about a picture.\n\n"
        "User message: " + userMessage + "\nLabel:";

    auto queue = std::make_shared<LockFreeTokenQueue<std::string>>();
    // The small 1.5B model labels the message in ~150ms
    streamer->GenerateStream("qwen2.5-coder:1.5b", prompt, queue);

    std::string fullResponse;
    std::string token;
    while (queue->PopWait(token)) {
        fullResponse += token;
    }

    return ParseKind(fullResponse);
}
