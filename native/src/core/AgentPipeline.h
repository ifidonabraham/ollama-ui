#pragma once
#include <string>
#include <memory>
#include "../ai/VectorRouter.h"
#include "../ai/MemoryManager.h"
#include "../ai/DirectActionParser.h"
#include "../ai/ComputerActionExecutor.h"
#include "../net/OllamaStreamer.h"
#include "../os/Win32HardwareOps.h"
#include "../os/ProcessRunner.h"
#include "../connectors/ComBridge.h"
#include "../render/ChatVisual.h"

class AgentPipeline {
public:
    AgentPipeline(
        std::shared_ptr<VectorRouter> vectorRouter,
        std::shared_ptr<OllamaStreamer> streamer,
        std::shared_ptr<ChatVisual> chatVisual
    );

    void InitializeToolRegistry();
    void ProcessUserMessage(const std::string& inputPrompt, const std::string& selectedModel);
    void SetLabelingEnabled(bool enabled) { m_labelingEnabled = enabled; }
    bool IsLabelingEnabled() const { return m_labelingEnabled; }
    std::shared_ptr<LockFreeTokenQueue<std::string>> GetTokenQueue() const { return m_tokenQueue; }

private:
    std::shared_ptr<VectorRouter> m_vectorRouter;
    std::shared_ptr<OllamaStreamer> m_streamer;
    std::shared_ptr<ChatVisual> m_chatVisual;
    std::shared_ptr<LockFreeTokenQueue<std::string>> m_tokenQueue;
    bool m_labelingEnabled = false;

    std::string DispatchDirectAction(const std::string& toolId);
    std::string ExecuteComputerAction(const std::string& action, const std::string& target);
};
