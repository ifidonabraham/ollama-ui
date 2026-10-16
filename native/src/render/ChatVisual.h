#pragma once
#include <windows.h>
#include <d2d1_1.h>
#include <dwrite_1.h>
#include <wrl/client.h>
#include <string>
#include <vector>
#include <functional>
#include <mutex>
#include <unordered_map>
#include "VisualTree.h"
#include "../core/TokenQueue.h"

#pragma comment(lib, "d2d1.lib")
#pragma comment(lib, "dwrite.lib")

using Microsoft::WRL::ComPtr;

// Parsed markdown segments for rendering with different styles
enum class SegmentType {
    Text,
    CodeInline,
    CodeBlock,
    ThinkBlock,
    Heading,
    Bold,
    Italic,
    Link
};

struct MarkdownSegment {
    SegmentType type;
    std::wstring content;
    std::wstring language; // for code blocks
};

struct ChatBubble {
    bool isUser;
    std::wstring author;
    std::wstring rawText;      // Original markdown text
    std::vector<MarkdownSegment> segments; // Parsed segments for rendering
    float height = 0.0f;
    bool showThink = false;    // Think block expanded/collapsed
    bool isStreaming = false;  // Still receiving tokens
};

class ChatVisual : public Island {
public:
    ChatVisual(IDCompositionDevice* dcompDevice, ID2D1DeviceContext* d2dContext, IDWriteFactory1* dwriteFactory);
    virtual ~ChatVisual();

    void AddMessage(bool isUser, const std::wstring& author, const std::wstring& text);
    void AppendStreamToken(const std::wstring& token);
    void Render();

    // Drain pending streaming tokens from the lock-free queue on the render thread.
    // Safe to call from Render(); consumes tokens without spawning a worker thread.
    void DrainTokenQueue();

    // Bind the shared token queue so Render() can pull tokens directly.
    void SetTokenQueue(std::shared_ptr<LockFreeTokenQueue<std::string>> q) { m_tokenQueue = q; }

    // Model picker
    void SetAvailableModels(const std::vector<std::string>& models);
    void SetCurrentModel(const std::string& model);
    std::string GetCurrentModel() const { return m_currentModel; }
    void SetOnModelChangeCallback(std::function<void(const std::string&)> cb) { m_onModelChange = cb; }

    // UI Buttons: Copy message, Retry prompt, Edit/Resend
    void CopyMessageToClipboard(size_t index);
    std::wstring GetMessageForEdit(size_t index);

    // User input and typing
    void OnChar(wchar_t ch);
    void OnKeyDown(WPARAM key);
    bool OnMouseDown(float x, float y);

    // Voice input: returns true if the click hit the [Voice] button.
    bool OnVoiceMouseDown(float x, float y);

    // Model picker dropdown hit-test
    bool OnModelPickerMouseDown(float x, float y);
    bool IsModelPickerOpen() const { return m_modelPickerOpen; }
    void ToggleModelPicker() { m_modelPickerOpen = !m_modelPickerOpen; }
    void CloseModelPicker() { m_modelPickerOpen = false; }

    std::wstring GetCurrentInput() const { return m_inputBuffer; }
    void ClearInput() { m_inputBuffer.clear(); }
    void ClearMessages() { m_bubbles.clear(); }
    void SetOnSubmitCallback(std::function<void(const std::wstring&)> cb) { m_onSubmit = cb; }
    void SetOnVoiceCallback(std::function<void()> cb) { m_onVoice = cb; }

private:
    ID2D1DeviceContext* m_d2dContext;
    IDWriteFactory1* m_dwriteFactory;

    ComPtr<IDWriteTextFormat> m_textFormat;
    ComPtr<IDWriteTextFormat> m_codeFormat;
    ComPtr<IDWriteTextFormat> m_inputFormat;
    ComPtr<IDWriteTextFormat> m_headingFormat;
    ComPtr<IDWriteTextFormat> m_boldFormat;
    ComPtr<IDWriteTextFormat> m_italicFormat;
    ComPtr<ID2D1SolidColorBrush> m_userBrush;
    ComPtr<ID2D1SolidColorBrush> m_assistantBrush;
    ComPtr<ID2D1SolidColorBrush> m_textBrush;
    ComPtr<ID2D1SolidColorBrush> m_accentBrush;
    ComPtr<ID2D1SolidColorBrush> m_inputBgBrush;
    ComPtr<ID2D1SolidColorBrush> m_borderBrush;
    ComPtr<ID2D1SolidColorBrush> m_placeholderBrush;
    ComPtr<ID2D1SolidColorBrush> m_codeBgBrush;
    ComPtr<ID2D1SolidColorBrush> m_codeTextBrush;
    ComPtr<ID2D1SolidColorBrush> m_thinkBrush;
    ComPtr<ID2D1SolidColorBrush> m_headingBrush;

    std::vector<ChatBubble> m_bubbles;
    std::wstring m_inputBuffer;
    float m_scrollOffsetY = 0.0f;
    std::function<void(const std::wstring&)> m_onSubmit;
    std::function<void()> m_onVoice;
    std::function<void(const std::string&)> m_onModelChange;

    // Shared token queue (set by AgentPipeline); drained on the render thread so
    // AppendStreamToken is never called from a detached worker thread.
    std::shared_ptr<LockFreeTokenQueue<std::string>> m_tokenQueue;

    // Model picker
    std::vector<std::string> m_availableModels;
    std::string m_currentModel = "qwen2.5-coder:3b";
    bool m_modelPickerOpen = false;

    // Syntax highlighting colors per language (stored as hex UINT32 to avoid D2D1::ColorF default constructor issue)
    std::unordered_map<std::wstring, UINT32> m_syntaxColors;

    // Markdown parsing
    std::vector<MarkdownSegment> ParseMarkdown(const std::wstring& text);
    void RenderBubble(ChatBubble& bubble, float originX, float originY, float maxBubbleWidth, float& currentY);
    void RenderSegment(const MarkdownSegment& seg, float x, float y, float maxWidth, float& currentY);
    void RenderModelPicker(float originX, float originY, float dockY, float btnY);
    void RenderCodeBlock(const MarkdownSegment& seg, float x, float y, float maxWidth, float& currentY);
    void RenderThinkBlock(const MarkdownSegment& seg, float x, float y, float maxWidth, float& currentY);
};
