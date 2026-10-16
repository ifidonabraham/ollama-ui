#include "AgentPipeline.h"
#include "../ai/ChatLabeler.h"
#include "../os/SystemSafetyOps.h"
#include <iostream>

AgentPipeline::AgentPipeline(
    std::shared_ptr<VectorRouter> vectorRouter,
    std::shared_ptr<OllamaStreamer> streamer,
    std::shared_ptr<ChatVisual> chatVisual
) : m_vectorRouter(vectorRouter), m_streamer(streamer), m_chatVisual(chatVisual) {
    m_tokenQueue = std::make_shared<LockFreeTokenQueue<std::string>>();
    m_chatVisual->SetTokenQueue(m_tokenQueue);
    InitializeToolRegistry();
}

void AgentPipeline::InitializeToolRegistry() {
    std::vector<float> sampleVector(768, 0.05f);
    m_vectorRouter->RegisterTool("wifi_off", "turn off wifi switch off wifi disable wireless airplane mode", sampleVector);
    m_vectorRouter->RegisterTool("wifi_on", "turn on wifi enable wireless connect wifi", sampleVector);
    m_vectorRouter->RegisterTool("wifi_status", "wifi status check wifi is wifi on network status", sampleVector);
    m_vectorRouter->RegisterTool("battery_status", "check battery battery percentage how much charge is left", sampleVector);
    m_vectorRouter->RegisterTool("volume_mute", "mute sound silence pc quiet mute volume", sampleVector);
    m_vectorRouter->RegisterTool("volume_unmute", "unmute sound restore volume speak", sampleVector);
    m_vectorRouter->RegisterTool("sleep", "sleep suspend put pc to sleep", sampleVector);
    m_vectorRouter->RegisterTool("notepad_open", "open notepad launch notepad take note text editor", sampleVector);
}

std::string AgentPipeline::DispatchDirectAction(const std::string& toolId) {
    if (toolId == "wifi_off") {
        bool ok = Win32HardwareOps::SetWifiRadioState(false);
        return ok ? "Wi-Fi radio turned OFF." : "Failed to toggle Wi-Fi.";
    }
    if (toolId == "wifi_on") {
        bool ok = Win32HardwareOps::SetWifiRadioState(true);
        return ok ? "Wi-Fi radio turned ON." : "Failed to toggle Wi-Fi.";
    }
    if (toolId == "wifi_status") return Win32HardwareOps::GetWifiStatus();
    if (toolId == "battery_status") return Win32HardwareOps::GetBatteryStatus();
    if (toolId == "volume_mute") { Win32HardwareOps::SetMasterMute(true); return "Audio volume MUTED."; }
    if (toolId == "volume_unmute") { Win32HardwareOps::SetMasterMute(false); return "Audio volume UNMUTED."; }
    if (toolId == "sleep") { Win32HardwareOps::RequestSleep(); return "PC sleep requested."; }
    if (toolId == "notepad_open") { ProcessRunner::RunCommand(L"notepad.exe", L"", L""); return "Launched Notepad."; }
    return "Unknown direct action.";
}

std::string AgentPipeline::ExecuteComputerAction(const std::string& action, const std::string& target) {
    return ComputerActionExecutor::RunAction(action, target);
}

void AgentPipeline::ProcessUserMessage(const std::string& inputPrompt, const std::string& selectedModel) {
    std::wstring wPrompt(inputPrompt.begin(), inputPrompt.end());

    if (m_labelingEnabled) {
        AdjusterKind kind = ChatLabeler::LabelMessageWithSmallModel(inputPrompt, m_streamer);
        std::string labelStr = ChatLabeler::KindToString(kind);
        std::wstring wAuthor = L"User [" + std::wstring(labelStr.begin(), labelStr.end()) + L"]";
        m_chatVisual->AddMessage(true, wAuthor, wPrompt);
    } else {
        m_chatVisual->AddMessage(true, L"User", wPrompt);
    }

    if (SystemSafetyOps::IsDestructiveOrUnsafe(inputPrompt)) {
        m_chatVisual->AddMessage(false, L"Fonia Safety", L"Action cancelled: Sentence contains destructive keywords.");
        return;
    }

    // Phase 3: Use DirectActionParser for single-command parsing
    ToolCall tc = DirectActionParser::Parse(inputPrompt);
    if (!tc.name.empty()) {
        if (tc.name == "computer_action") {
            std::string result = ExecuteComputerAction(tc.argument, tc.target);
            std::wstring wRes(result.begin(), result.end());
            m_chatVisual->AddMessage(false, L"Fonia OS", wRes);
            return;
        }
        if (tc.name == "run_command") {
            std::wstring wCmd(tc.argument.begin(), tc.argument.end());
            ProcessRunner::RunCommand(wCmd, L"", L"");
            m_chatVisual->AddMessage(false, L"Fonia", L"Ran: " + wCmd);
            return;
        }
        if (tc.name == "launch_app") {
            std::wstring wApp(tc.argument.begin(), tc.argument.end());
            ProcessRunner::RunCommand(wApp, L"", L"");
            m_chatVisual->AddMessage(false, L"Fonia", L"Launched: " + wApp);
            return;
        }
        if (tc.name == "read_file") {
            std::wstring wPath(tc.argument.begin(), tc.argument.end());
            m_chatVisual->AddMessage(false, L"Fonia", L"Reading: " + wPath);
            return;
        }
        if (tc.name == "list_dir") {
            std::wstring wPath(tc.argument.begin(), tc.argument.end());
            m_chatVisual->AddMessage(false, L"Fonia", L"Listing: " + wPath);
            return;
        }
    }

    // Fallback: keep old keyword matching for backward compatibility
    std::string lowerPrompt = inputPrompt;
    for (auto& c : lowerPrompt) c = static_cast<char>(tolower(c));

    std::string matchedTool;
    if (lowerPrompt.find("wifi") != std::string::npos && (lowerPrompt.find("off") != std::string::npos || lowerPrompt.find("switch off") != std::string::npos || lowerPrompt.find("turn off") != std::string::npos))
        matchedTool = "wifi_off";
    else if (lowerPrompt.find("wifi") != std::string::npos && (lowerPrompt.find("on") != std::string::npos || lowerPrompt.find("turn on") != std::string::npos))
        matchedTool = "wifi_on";
    else if (lowerPrompt.find("battery") != std::string::npos || lowerPrompt.find("percentage") != std::string::npos)
        matchedTool = "battery_status";
    else if (lowerPrompt.find("mute") != std::string::npos)
        matchedTool = "volume_mute";
    else if (lowerPrompt.find("notepad") != std::string::npos && lowerPrompt.find("open") != std::string::npos)
        matchedTool = "notepad_open";

    if (!matchedTool.empty()) {
        std::string result = DispatchDirectAction(matchedTool);
        std::wstring wRes(result.begin(), result.end());
        m_chatVisual->AddMessage(false, L"Fonia Direct OS", wRes);
        return;
    }

    std::string modelToUse = MemoryManager::CanModelFit(selectedModel) ? selectedModel : "qwen2.5-coder:1.5b";
    m_streamer->GenerateStream(modelToUse, inputPrompt, m_tokenQueue);
}
