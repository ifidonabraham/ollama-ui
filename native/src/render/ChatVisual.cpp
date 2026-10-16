#include "ChatVisual.h"
#include <algorithm>
#include <cctype>

ChatVisual::ChatVisual(IDCompositionDevice* dcompDevice, ID2D1DeviceContext* d2dContext, IDWriteFactory1* dwriteFactory)
    : Island(IslandType::ChatWindow, dcompDevice), m_d2dContext(d2dContext), m_dwriteFactory(dwriteFactory) {

    if (m_dwriteFactory) {
        // Segoe UI font matching Fonia design specs
        m_dwriteFactory->CreateTextFormat(
            L"Segoe UI",
            nullptr,
            DWRITE_FONT_WEIGHT_NORMAL,
            DWRITE_FONT_STYLE_NORMAL,
            DWRITE_FONT_STRETCH_NORMAL,
            15.0f,
            L"en-us",
            &m_textFormat
        );

        // Consolas font for code blocks
        m_dwriteFactory->CreateTextFormat(
            L"Consolas",
            nullptr,
            DWRITE_FONT_WEIGHT_NORMAL,
            DWRITE_FONT_STYLE_NORMAL,
            DWRITE_FONT_STRETCH_NORMAL,
            13.5f,
            L"en-us",
            &m_codeFormat
        );

        // Input prompt text format
        m_dwriteFactory->CreateTextFormat(
            L"Segoe UI",
            nullptr,
            DWRITE_FONT_WEIGHT_NORMAL,
            DWRITE_FONT_STYLE_NORMAL,
            DWRITE_FONT_STRETCH_NORMAL,
            14.5f,
            L"en-us",
            &m_inputFormat
        );

        // Heading format
        m_dwriteFactory->CreateTextFormat(
            L"Segoe UI",
            nullptr,
            DWRITE_FONT_WEIGHT_SEMI_BOLD,
            DWRITE_FONT_STYLE_NORMAL,
            DWRITE_FONT_STRETCH_NORMAL,
            18.0f,
            L"en-us",
            &m_headingFormat
        );

        // Bold format
        m_dwriteFactory->CreateTextFormat(
            L"Segoe UI",
            nullptr,
            DWRITE_FONT_WEIGHT_BOLD,
            DWRITE_FONT_STYLE_NORMAL,
            DWRITE_FONT_STRETCH_NORMAL,
            15.0f,
            L"en-us",
            &m_boldFormat
        );

        // Italic format
        m_dwriteFactory->CreateTextFormat(
            L"Segoe UI",
            nullptr,
            DWRITE_FONT_WEIGHT_NORMAL,
            DWRITE_FONT_STYLE_ITALIC,
            DWRITE_FONT_STRETCH_NORMAL,
            15.0f,
            L"en-us",
            &m_italicFormat
        );
    }

    if (m_d2dContext) {
        // Fonia Theme Colors: User bubble #2563EB, Assistant bubble #1E293B, Text #F8FAFC, Accent #38BDF8
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x2563EB, 0.95f), &m_userBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x1E293B, 0.85f), &m_assistantBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0xF8FAFC, 1.0f), &m_textBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x38BDF8, 1.0f), &m_accentBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x0F172A, 0.95f), &m_inputBgBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x334155, 1.0f), &m_borderBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x64748B, 1.0f), &m_placeholderBrush);
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x1E1E1E, 1.0f), &m_codeBgBrush);       // VS Code dark bg
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0xD4D4D4, 1.0f), &m_codeTextBrush);     // VS Code text
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0x8B5CF6, 0.9f), &m_thinkBrush);        // Purple think
        m_d2dContext->CreateSolidColorBrush(D2D1::ColorF(0xFBBF24, 1.0f), &m_headingBrush);      // Amber heading
    }

    // Initialize syntax highlighting colors (VS Code Dark+ inspired) as hex UINT32
    m_syntaxColors[L"keyword"] = 0xC586C0;      // purple
    m_syntaxColors[L"string"] = 0xCE9178;       // orange
    m_syntaxColors[L"comment"] = 0x6A9955;      // green
    m_syntaxColors[L"number"] = 0xB5CEA8;       // light green
    m_syntaxColors[L"function"] = 0xDCDCAA;     // yellow
    m_syntaxColors[L"type"] = 0x4EC9B0;         // teal
    m_syntaxColors[L"operator"] = 0xD4D4D4;     // white
    m_syntaxColors[L"punctuation"] = 0xD4D4D4;  // white
    m_syntaxColors[L"default"] = 0xD4D4D4;      // default white
}

ChatVisual::~ChatVisual() {}

void ChatVisual::SetAvailableModels(const std::vector<std::string>& models) {
    m_availableModels = models;
    if (!models.empty() && m_currentModel.empty()) {
        m_currentModel = models[0];
    }
}

void ChatVisual::SetCurrentModel(const std::string& model) {
    m_currentModel = model;
}

// Simple markdown parser - converts markdown to segments for rendering
std::vector<MarkdownSegment> ChatVisual::ParseMarkdown(const std::wstring& text) {
    std::vector<MarkdownSegment> segments;
    std::wstring remaining = text;
    size_t pos = 0;

    while (pos < remaining.size()) {
        // Check for think blocks
        if (remaining.compare(pos, 7, L"<think>") == 0) {
            size_t endPos = remaining.find(L"</think>", pos);
            if (endPos != std::wstring::npos) {
                if (pos > 0) {
                    segments.push_back({ SegmentType::Text, remaining.substr(0, pos), L"" });
                }
                std::wstring thinkContent = remaining.substr(pos + 7, endPos - pos - 7);
                segments.push_back({ SegmentType::ThinkBlock, thinkContent, L"" });
                remaining = remaining.substr(endPos + 8);
                pos = 0;
                continue;
            }
        }

        // Check for code blocks ```language\ncode\n```
        if (remaining.compare(pos, 3, L"```") == 0) {
            size_t langStart = pos + 3;
            size_t langEnd = remaining.find(L'\n', langStart);
            if (langEnd != std::wstring::npos) {
                std::wstring language = remaining.substr(langStart, langEnd - langStart);
                size_t codeStart = langEnd + 1;
                size_t codeEnd = remaining.find(L"```", codeStart);
                if (codeEnd != std::wstring::npos) {
                    if (pos > 0) {
                        segments.push_back({ SegmentType::Text, remaining.substr(0, pos), L"" });
                    }
                    std::wstring codeContent = remaining.substr(codeStart, codeEnd - codeStart);
                    segments.push_back({ SegmentType::CodeBlock, codeContent, language });
                    remaining = remaining.substr(codeEnd + 3);
                    pos = 0;
                    continue;
                }
            }
        }

        // Check for inline code `code`
        if (remaining[pos] == L'`') {
            size_t endPos = remaining.find(L'`', pos + 1);
            if (endPos != std::wstring::npos) {
                if (pos > 0) {
                    segments.push_back({ SegmentType::Text, remaining.substr(0, pos), L"" });
                }
                std::wstring codeContent = remaining.substr(pos + 1, endPos - pos - 1);
                segments.push_back({ SegmentType::CodeInline, codeContent, L"" });
                remaining = remaining.substr(endPos + 1);
                pos = 0;
                continue;
            }
        }

        // Check for headings ###
        if (remaining[pos] == L'#' && (pos == 0 || remaining[pos - 1] == L'\n')) {
            size_t endPos = remaining.find(L'\n', pos);
            if (endPos == std::wstring::npos) endPos = remaining.size();
            std::wstring line = remaining.substr(pos, endPos - pos);
            int level = 0;
            while (level < line.size() && line[level] == L'#') level++;
            if (level > 0 && level <= 6 && (level == line.size() || line[level] == L' ')) {
                if (pos > 0) {
                    segments.push_back({ SegmentType::Text, remaining.substr(0, pos), L"" });
                }
                std::wstring headingText = line.substr(level);
                while (!headingText.empty() && headingText[0] == L' ') headingText = headingText.substr(1);
                segments.push_back({ SegmentType::Heading, headingText, std::to_wstring(level) });
                remaining = remaining.substr(endPos);
                pos = 0;
                continue;
            }
        }

        // Check for bold **text**
        if (pos + 1 < remaining.size() && remaining[pos] == L'*' && remaining[pos + 1] == L'*') {
            size_t endPos = remaining.find(L"**", pos + 2);
            if (endPos != std::wstring::npos) {
                if (pos > 0) {
                    segments.push_back({ SegmentType::Text, remaining.substr(0, pos), L"" });
                }
                std::wstring boldContent = remaining.substr(pos + 2, endPos - pos - 2);
                segments.push_back({ SegmentType::Bold, boldContent, L"" });
                remaining = remaining.substr(endPos + 2);
                pos = 0;
                continue;
            }
        }

        // Check for italic *text*
        if (remaining[pos] == L'*' && (pos + 1 >= remaining.size() || remaining[pos + 1] != L'*')) {
            size_t endPos = remaining.find(L'*', pos + 1);
            if (endPos != std::wstring::npos) {
                if (pos > 0) {
                    segments.push_back({ SegmentType::Text, remaining.substr(0, pos), L"" });
                }
                std::wstring italicContent = remaining.substr(pos + 1, endPos - pos - 1);
                segments.push_back({ SegmentType::Italic, italicContent, L"" });
                remaining = remaining.substr(endPos + 1);
                pos = 0;
                continue;
            }
        }

        pos++;
    }

    if (!remaining.empty()) {
        segments.push_back({ SegmentType::Text, remaining, L"" });
    }

    // If no markdown found, return as plain text
    if (segments.empty()) {
        segments.push_back({ SegmentType::Text, text, L"" });
    }

    return segments;
}

void ChatVisual::AddMessage(bool isUser, const std::wstring& author, const std::wstring& text) {
    ChatBubble bubble;
    bubble.isUser = isUser;
    bubble.author = author;
    bubble.rawText = text;
    bubble.segments = ParseMarkdown(text);
    bubble.isStreaming = false;
    m_bubbles.push_back(bubble);
}

void ChatVisual::AppendStreamToken(const std::wstring& token) {
    if (m_bubbles.empty() || m_bubbles.back().isUser) {
        ChatBubble bubble;
        bubble.isUser = false;
        bubble.author = L"Fonia Engine";
        bubble.rawText = token;
        bubble.segments = ParseMarkdown(token);
        bubble.isStreaming = true;
        m_bubbles.push_back(bubble);
    } else {
        auto& lastBubble = m_bubbles.back();
        lastBubble.rawText += token;
        // Re-parse the accumulated text for proper markdown rendering
        lastBubble.segments = ParseMarkdown(lastBubble.rawText);
    }
}

// Pull all pending tokens from the shared LockFreeTokenQueue and append them to
// the last assistant bubble. Called from the DWM render thread so that
// m_bubbles is only ever mutated on the UI thread — no cross-thread races.
void ChatVisual::DrainTokenQueue() {
    if (!m_tokenQueue || m_tokenQueue->IsFinished()) return;

    std::string token;
    while (m_tokenQueue->TryPop(token)) {
        if (!token.empty()) {
            std::wstring wToken(token.begin(), token.end());
            if (m_bubbles.empty() || m_bubbles.back().isUser) {
                AddMessage(false, L"Fonia Engine", wToken);
            } else {
                m_bubbles.back().rawText += wToken;
            }
        }
    }
}

void ChatVisual::Render() {
    if (!m_d2dContext || !m_textFormat) return;

    // Consume streamed tokens before rendering so the UI is always current.
    DrainTokenQueue();

    float originX = m_bounds.x > 0.0f ? m_bounds.x : 0.0f;
    float originY = m_bounds.y > 0.0f ? m_bounds.y : 0.0f;
    float dockHeight = 100.0f;
    float dockY = originY + m_bounds.height - dockHeight - 16.0f;
    float barY = dockY + 40.0f;
    float btnY = barY + 6.0f;

    float currentY = originY + 16.0f - m_scrollOffsetY;
    float maxBubbleWidth = m_bounds.width * 0.75f;

    for (size_t i = 0; i < m_bubbles.size(); ++i) {
        auto& bubble = m_bubbles[i];
        RenderBubble(bubble, originX, originY, maxBubbleWidth, currentY);
    }

    // Render Complete Fonia Bottom Dock (matching TypeScript ChatWindow.tsx exactly)
    D2D1_ROUNDED_RECT dockRect = D2D1::RoundedRect(
        D2D1::RectF(originX + 24.0f, dockY, originX + m_bounds.width - 24.0f, dockY + dockHeight),
        10.0f, 10.0f
    );

    m_d2dContext->FillRoundedRectangle(&dockRect, m_inputBgBrush.Get());
    m_d2dContext->DrawRoundedRectangle(&dockRect, m_borderBrush.Get(), 1.0f);

    // Prompt text line
    std::wstring displayText = m_inputBuffer.empty() ? L"Queue with Enter. Steer this run with Ctrl+Enter." : m_inputBuffer;
    ID2D1SolidColorBrush* textBrush = m_inputBuffer.empty() ? m_placeholderBrush.Get() : m_textBrush.Get();

    D2D1_RECT_F promptTextRect = D2D1::RectF(originX + 36.0f, dockY + 10.0f, originX + m_bounds.width - 36.0f, dockY + 36.0f);
    m_d2dContext->DrawText(
        displayText.c_str(),
        static_cast<UINT32>(displayText.size()),
        m_inputFormat ? m_inputFormat.Get() : m_textFormat.Get(),
        &promptTextRect,
        textBrush
    );

    // Separator line between input and bottom button toolbar
    m_d2dContext->DrawLine(
        D2D1::Point2F(originX + 24.0f, barY),
        D2D1::Point2F(originX + m_bounds.width - 24.0f, barY),
        m_borderBrush.Get(),
        1.0f
    );

    // Toolbar Buttons
    // Model pill button
    D2D1_ROUNDED_RECT mBtn = D2D1::RoundedRect(D2D1::RectF(originX + 34.0f, btnY, originX + 160.0f, btnY + 26.0f), 6.0f, 6.0f);
    m_d2dContext->DrawRoundedRectangle(&mBtn, m_borderBrush.Get(), 1.0f);
    std::wstring modelLabel = std::wstring(m_currentModel.begin(), m_currentModel.end());
    std::wstring modelDisplay = modelLabel + L" \x25BE";
    D2D1_RECT_F mTxt = D2D1::RectF(originX + 42.0f, btnY + 4.0f, originX + 155.0f, btnY + 24.0f);
    m_d2dContext->DrawText(modelDisplay.c_str(), static_cast<UINT32>(modelDisplay.size()), m_codeFormat.Get(), &mTxt, m_textBrush.Get());

    // Tools: [Attach] [Vision] [Voice] [Label]
    const wchar_t* tools[] = { L"Attach", L"Vision", L"Voice", L"Label" };
    float curBtnX = originX + 172.0f;
    for (int t = 0; t < 4; ++t) {
        D2D1_ROUNDED_RECT tBtn = D2D1::RoundedRect(D2D1::RectF(curBtnX, btnY, curBtnX + 54.0f, btnY + 26.0f), 6.0f, 6.0f);
        m_d2dContext->DrawRoundedRectangle(&tBtn, m_borderBrush.Get(), 1.0f);
        D2D1_RECT_F tTxt = D2D1::RectF(curBtnX + 8.0f, btnY + 4.0f, curBtnX + 50.0f, btnY + 24.0f);
        m_d2dContext->DrawText(tools[t], static_cast<UINT32>(wcslen(tools[t])), m_codeFormat.Get(), &tTxt, m_textBrush.Get());
        curBtnX += 60.0f;
    }

    // Right-aligned Action Buttons: [Queue] [Steer] [Stop]
    float rightBtnX = originX + m_bounds.width - 34.0f;

    D2D1_ROUNDED_RECT stopBtn = D2D1::RoundedRect(D2D1::RectF(rightBtnX - 54.0f, btnY, rightBtnX, btnY + 26.0f), 6.0f, 6.0f);
    m_d2dContext->DrawRoundedRectangle(&stopBtn, m_borderBrush.Get(), 1.0f);
    D2D1_RECT_F stopTxt = D2D1::RectF(rightBtnX - 44.0f, btnY + 4.0f, rightBtnX - 8.0f, btnY + 24.0f);
    m_d2dContext->DrawText(L"Stop", 4, m_codeFormat.Get(), &stopTxt, m_textBrush.Get());
    rightBtnX -= 62.0f;

    D2D1_ROUNDED_RECT steerBtn = D2D1::RoundedRect(D2D1::RectF(rightBtnX - 54.0f, btnY, rightBtnX, btnY + 26.0f), 6.0f, 6.0f);
    m_d2dContext->DrawRoundedRectangle(&steerBtn, m_borderBrush.Get(), 1.0f);
    D2D1_RECT_F steerTxt = D2D1::RectF(rightBtnX - 46.0f, btnY + 4.0f, rightBtnX - 8.0f, btnY + 24.0f);
    m_d2dContext->DrawText(L"Steer", 5, m_codeFormat.Get(), &steerTxt, m_textBrush.Get());
    rightBtnX -= 62.0f;

    D2D1_ROUNDED_RECT queueBtn = D2D1::RoundedRect(D2D1::RectF(rightBtnX - 58.0f, btnY, rightBtnX, btnY + 26.0f), 6.0f, 6.0f);
    m_d2dContext->DrawRoundedRectangle(&queueBtn, m_borderBrush.Get(), 1.0f);
    D2D1_RECT_F queueTxt = D2D1::RectF(rightBtnX - 50.0f, btnY + 4.0f, rightBtnX - 8.0f, btnY + 24.0f);
    m_d2dContext->DrawText(L"Queue", 5, m_codeFormat.Get(), &queueTxt, m_textBrush.Get());

    // Hint caption underneath dock (matching fonia-hint)
    D2D1_RECT_F hintRect = D2D1::RectF(originX + 36.0f, dockY + 76.0f, originX + m_bounds.width - 36.0f, dockY + 96.0f);
    m_d2dContext->DrawText(
        L"Enter sends. Shift+Enter adds a line. Ctrl+Enter steers. Esc or Ctrl+C stops the run. Ctrl+K opens commands. Model server offline.",
        130,
        m_codeFormat.Get(),
        &hintRect,
        m_placeholderBrush.Get()
    );

    // Render model picker dropdown if open (drawn on top of everything)
    if (m_modelPickerOpen) {
        RenderModelPicker(originX, originY, dockY, btnY);
    }
}

void ChatVisual::RenderBubble(ChatBubble& bubble, float originX, float originY, float maxBubbleWidth, float& currentY) {
    float totalHeight = 0.0f;

    // Measure all segments to determine bubble height
    for (const auto& seg : bubble.segments) {
        if (seg.type == SegmentType::CodeBlock) {
            ComPtr<IDWriteTextLayout> codeLayout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                m_codeFormat.Get(),
                maxBubbleWidth - 56.0f,
                10000.0f,
                &codeLayout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (codeLayout) codeLayout->GetMetrics(&metrics);
            totalHeight += metrics.height + 24.0f; // code bg padding
        } else if (seg.type == SegmentType::ThinkBlock) {
            ComPtr<IDWriteTextLayout> thinkLayout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                m_italicFormat.Get(),
                maxBubbleWidth - 56.0f,
                10000.0f,
                &thinkLayout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (thinkLayout) thinkLayout->GetMetrics(&metrics);
            totalHeight += metrics.height + 32.0f; // think padding + expandable area
        } else {
            // Text, Bold, Italic, Heading, CodeInline - measure with appropriate format
            IDWriteTextFormat* fmt = m_textFormat.Get();
            if (seg.type == SegmentType::Heading) fmt = m_headingFormat.Get();
            else if (seg.type == SegmentType::Bold) fmt = m_boldFormat.Get();
            else if (seg.type == SegmentType::Italic) fmt = m_italicFormat.Get();
            else if (seg.type == SegmentType::CodeInline) fmt = m_codeFormat.Get();

            ComPtr<IDWriteTextLayout> layout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                fmt,
                maxBubbleWidth - 40.0f,
                10000.0f,
                &layout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (layout) layout->GetMetrics(&metrics);
            totalHeight += metrics.height + 4.0f; // line spacing
        }
    }

    // Minimum bubble height
    if (totalHeight < 20.0f) totalHeight = 28.0f;
    float bubbleHeight = totalHeight + 16.0f;
    bubble.height = bubbleHeight;

    // Determine bubble width from widest segment
    float maxWidth = 120.0f;
    for (const auto& seg : bubble.segments) {
        if (seg.type != SegmentType::CodeBlock && seg.type != SegmentType::ThinkBlock) {
            IDWriteTextFormat* fmt = m_textFormat.Get();
            if (seg.type == SegmentType::Heading) fmt = m_headingFormat.Get();
            else if (seg.type == SegmentType::Bold) fmt = m_boldFormat.Get();
            else if (seg.type == SegmentType::Italic) fmt = m_italicFormat.Get();
            else if (seg.type == SegmentType::CodeInline) fmt = m_codeFormat.Get();

            ComPtr<IDWriteTextLayout> layout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                fmt,
                maxBubbleWidth - 40.0f,
                10000.0f,
                &layout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (layout) layout->GetMetrics(&metrics);
            maxWidth = (std::max)(maxWidth, metrics.width + 48.0f);
        }
    }
    maxWidth = (std::min)(maxWidth, maxBubbleWidth);

    float bubbleX = bubble.isUser ? (originX + m_bounds.width - maxWidth - 24.0f) : (originX + 24.0f);

    // Draw bubble background
    D2D1_ROUNDED_RECT roundedRect = D2D1::RoundedRect(
        D2D1::RectF(bubbleX, currentY, bubbleX + maxWidth, currentY + bubbleHeight),
        8.0f, 8.0f
    );
    m_d2dContext->FillRoundedRectangle(&roundedRect, bubble.isUser ? m_userBrush.Get() : m_assistantBrush.Get());

    // Render each segment
    float segX = bubbleX + 14.0f;
    float segY = currentY + 8.0f;
    RenderSegment(bubble.segments[0], segX, segY, maxWidth - 28.0f, segY);
    for (size_t i = 1; i < bubble.segments.size(); ++i) {
        RenderSegment(bubble.segments[i], segX, segY, maxWidth - 28.0f, segY);
    }

    // Streaming indicator
    if (bubble.isStreaming && bubble.isUser == false) {
        std::wstring cursor = L"█";
        D2D1_RECT_F cursorRect = D2D1::RectF(bubbleX + maxWidth - 20.0f, currentY + 8.0f, bubbleX + maxWidth - 10.0f, currentY + 22.0f);
        m_d2dContext->DrawText(cursor.c_str(), 1, m_codeFormat.Get(), &cursorRect, m_accentBrush.Get());
    }

    currentY += bubbleHeight + 12.0f;
}

void ChatVisual::RenderSegment(const MarkdownSegment& seg, float x, float y, float maxWidth, float& currentY) {
    switch (seg.type) {
        case SegmentType::Text: {
            ComPtr<IDWriteTextLayout> layout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                m_textFormat.Get(),
                maxWidth,
                10000.0f,
                &layout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (layout) {
                layout->GetMetrics(&metrics);
                D2D1_POINT_2F textOrigin = D2D1::Point2F(x, y);
                m_d2dContext->DrawTextLayout(textOrigin, layout.Get(), m_textBrush.Get());
                currentY += metrics.height + 4.0f;
            }
            break;
        }
        case SegmentType::Heading: {
            ComPtr<IDWriteTextLayout> layout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                m_headingFormat.Get(),
                maxWidth,
                10000.0f,
                &layout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (layout) {
                layout->GetMetrics(&metrics);
                D2D1_POINT_2F textOrigin = D2D1::Point2F(x, y);
                m_d2dContext->DrawTextLayout(textOrigin, layout.Get(), m_headingBrush.Get());
                currentY += metrics.height + 8.0f;
            }
            break;
        }
        case SegmentType::Bold: {
            ComPtr<IDWriteTextLayout> layout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                m_boldFormat.Get(),
                maxWidth,
                10000.0f,
                &layout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (layout) {
                layout->GetMetrics(&metrics);
                D2D1_POINT_2F textOrigin = D2D1::Point2F(x, y);
                m_d2dContext->DrawTextLayout(textOrigin, layout.Get(), m_textBrush.Get());
                currentY += metrics.height + 4.0f;
            }
            break;
        }
        case SegmentType::Italic: {
            ComPtr<IDWriteTextLayout> layout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                m_italicFormat.Get(),
                maxWidth,
                10000.0f,
                &layout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (layout) {
                layout->GetMetrics(&metrics);
                D2D1_POINT_2F textOrigin = D2D1::Point2F(x, y);
                m_d2dContext->DrawTextLayout(textOrigin, layout.Get(), m_placeholderBrush.Get());
                currentY += metrics.height + 4.0f;
            }
            break;
        }
        case SegmentType::CodeInline: {
            ComPtr<IDWriteTextLayout> layout;
            m_dwriteFactory->CreateTextLayout(
                seg.content.c_str(),
                static_cast<UINT32>(seg.content.size()),
                m_codeFormat.Get(),
                maxWidth,
                10000.0f,
                &layout
            );
            DWRITE_TEXT_METRICS metrics = {};
            if (layout) {
                layout->GetMetrics(&metrics);
                // Draw inline code background
                D2D1_RECT_F bgRect = D2D1::RectF(x - 4.0f, y - 2.0f, x + metrics.width + 8.0f, y + metrics.height + 6.0f);
                D2D1_ROUNDED_RECT inlineCodeRect = D2D1::RoundedRect(bgRect, 3.0f, 3.0f);
                m_d2dContext->FillRoundedRectangle(
                    &inlineCodeRect,
                    m_codeBgBrush.Get()
                );
                D2D1_POINT_2F textOrigin = D2D1::Point2F(x, y);
                m_d2dContext->DrawTextLayout(textOrigin, layout.Get(), m_codeTextBrush.Get());
                currentY += metrics.height + 8.0f;
            }
            break;
        }
        case SegmentType::CodeBlock: {
            RenderCodeBlock(seg, x, y, maxWidth, currentY);
            break;
        }
        case SegmentType::ThinkBlock: {
            RenderThinkBlock(seg, x, y, maxWidth, currentY);
            break;
        }
        default:
            break;
    }
}

void ChatVisual::RenderCodeBlock(const MarkdownSegment& seg, float x, float y, float maxWidth, float& currentY) {
    ComPtr<IDWriteTextLayout> codeLayout;
    m_dwriteFactory->CreateTextLayout(
        seg.content.c_str(),
        static_cast<UINT32>(seg.content.size()),
        m_codeFormat.Get(),
        maxWidth - 16.0f,
        10000.0f,
        &codeLayout
    );

    DWRITE_TEXT_METRICS metrics = {};
    if (codeLayout) codeLayout->GetMetrics(&metrics);

    float codeHeight = metrics.height + 12.0f;
    float codeWidth = maxWidth;

    // Draw code block background (dark bg)
    D2D1_RECT_F codeRect = D2D1::RectF(x - 4.0f, y - 4.0f, x + codeWidth, y + codeHeight + 4.0f);
    D2D1_ROUNDED_RECT codeRounded = D2D1::RoundedRect(codeRect, 6.0f, 6.0f);
    m_d2dContext->FillRoundedRectangle(
        &codeRounded,
        m_codeBgBrush.Get()
    );

    // Draw language label
    if (!seg.language.empty()) {
        D2D1_RECT_F langRect = D2D1::RectF(x + 4.0f, y - 2.0f, x + 80.0f, y + 10.0f);
        m_d2dContext->DrawText(seg.language.c_str(), static_cast<UINT32>(seg.language.size()), m_codeFormat.Get(), &langRect, m_placeholderBrush.Get());
    }

    // Draw code text
    if (codeLayout) {
        D2D1_POINT_2F textOrigin = D2D1::Point2F(x + 4.0f, y + 4.0f);
        m_d2dContext->DrawTextLayout(textOrigin, codeLayout.Get(), m_codeTextBrush.Get());
    }

    currentY += codeHeight + 16.0f;
}

void ChatVisual::RenderThinkBlock(const MarkdownSegment& seg, float x, float y, float maxWidth, float& currentY) {
    ComPtr<IDWriteTextLayout> thinkLayout;
    m_dwriteFactory->CreateTextLayout(
        seg.content.c_str(),
        static_cast<UINT32>(seg.content.size()),
        m_italicFormat.Get(),
        maxWidth - 24.0f,
        10000.0f,
        &thinkLayout
    );

    DWRITE_TEXT_METRICS metrics = {};
    if (thinkLayout) thinkLayout->GetMetrics(&metrics);

    // Think block gets a purple-ish tinted background
    float thinkHeight = metrics.height + 24.0f;
    D2D1_RECT_F thinkRect = D2D1::RectF(x - 4.0f, y - 4.0f, x + maxWidth, y + thinkHeight + 4.0f);

    // Semi-transparent purple background for think block
    D2D1::ColorF thinkBg(D2D1::ColorF::Purple, 0.15f);
    ComPtr<ID2D1SolidColorBrush> thinkBgBrush;
    m_d2dContext->CreateSolidColorBrush(thinkBg, &thinkBgBrush);

    D2D1_ROUNDED_RECT thinkRounded = D2D1::RoundedRect(thinkRect, 6.0f, 6.0f);
    m_d2dContext->FillRoundedRectangle(
        &thinkRounded,
        thinkBgBrush.Get()
    );

    // Draw "Think" label
    D2D1_RECT_F labelRect = D2D1::RectF(x + 4.0f, y - 2.0f, x + 60.0f, y + 12.0f);
    m_d2dContext->DrawText(L"Think", 5, m_italicFormat.Get(), &labelRect, m_thinkBrush.Get());

    // Draw think content
    if (thinkLayout) {
        D2D1_POINT_2F textOrigin = D2D1::Point2F(x + 4.0f, y + 10.0f);
        m_d2dContext->DrawTextLayout(textOrigin, thinkLayout.Get(), m_placeholderBrush.Get());
    }

    currentY += thinkHeight + 16.0f;
}

void ChatVisual::RenderModelPicker(float originX, float originY, float dockY, float btnY) {
    // Model picker dropdown appears above the model pill button
    float dropdownX = originX + 34.0f;
    float dropdownW = 150.0f;
    float dropdownY = btnY - 10.0f - (static_cast<float>(m_availableModels.size()) * 24.0f);
    float dropdownH = static_cast<float>(m_availableModels.size()) * 24.0f;

    // Dropdown background
    D2D1_RECT_F dropdownRect = D2D1::RectF(dropdownX, dropdownY, dropdownX + dropdownW, dropdownY + dropdownH);
    D2D1_ROUNDED_RECT dropdownRounded = D2D1::RoundedRect(dropdownRect, 6.0f, 6.0f);
    m_d2dContext->FillRoundedRectangle(
        &dropdownRounded,
        m_inputBgBrush.Get()
    );
    m_d2dContext->DrawRoundedRectangle(
        &dropdownRounded,
        m_borderBrush.Get(),
        1.0f
    );

    // Draw each model option
    float optY = dropdownY + 4.0f;
    for (const auto& model : m_availableModels) {
        std::wstring wModel(model.begin(), model.end());
        bool isSelected = (model == m_currentModel);

        // Highlight selected model
        if (isSelected) {
            D2D1_RECT_F selRect = D2D1::RectF(dropdownX + 4.0f, optY - 2.0f, dropdownX + dropdownW - 4.0f, optY + 16.0f);
            D2D1_ROUNDED_RECT selRounded = D2D1::RoundedRect(selRect, 3.0f, 3.0f);
            m_d2dContext->FillRoundedRectangle(
                &selRounded,
                m_accentBrush.Get()
            );
        }

        D2D1_RECT_F optTxt = D2D1::RectF(dropdownX + 10.0f, optY, dropdownX + dropdownW - 10.0f, optY + 18.0f);
        m_d2dContext->DrawText(wModel.c_str(), static_cast<UINT32>(wModel.size()), m_codeFormat.Get(), &optTxt, isSelected ? m_textBrush.Get() : m_placeholderBrush.Get());
        optY += 24.0f;
    }
}

bool ChatVisual::OnModelPickerMouseDown(float x, float y) {
    float originX = m_bounds.x > 0.0f ? m_bounds.x : 0.0f;
    float originY = m_bounds.y > 0.0f ? m_bounds.y : 0.0f;
    float dockHeight = 100.0f;
    float dockY = originY + m_bounds.height - dockHeight - 16.0f;
    float btnY = dockY + 46.0f;

    // Check click on model pill button (originX + 34 to originX + 160, btnY to btnY + 26)
    if (x >= originX + 34.0f && x <= originX + 160.0f && y >= btnY && y <= btnY + 26.0f) {
        m_modelPickerOpen = !m_modelPickerOpen;
        return true;
    }

    // Check clicks inside dropdown if open
    if (m_modelPickerOpen && !m_availableModels.empty()) {
        float dropdownX = originX + 34.0f;
        float dropdownW = 150.0f;
        float dropdownY = btnY - 10.0f - (static_cast<float>(m_availableModels.size()) * 24.0f);
        float dropdownH = static_cast<float>(m_availableModels.size()) * 24.0f;

        if (x >= dropdownX && x <= dropdownX + dropdownW && y >= dropdownY && y <= dropdownY + dropdownH) {
            // Find which model was clicked
            float optY = dropdownY + 4.0f;
            for (const auto& model : m_availableModels) {
                if (y >= optY - 2.0f && y <= optY + 16.0f) {
                    m_currentModel = model;
                    if (m_onModelChange) m_onModelChange(model);
                    m_modelPickerOpen = false;
                    return true;
                }
                optY += 24.0f;
            }
        }
    }

    return false;
}

bool ChatVisual::OnMouseDown(float x, float y) {
    float originX = m_bounds.x > 0.0f ? m_bounds.x : 0.0f;
    float originY = m_bounds.y > 0.0f ? m_bounds.y : 0.0f;
    float dockHeight = 100.0f;
    float dockY = originY + m_bounds.height - dockHeight - 16.0f;
    float btnY = dockY + 46.0f;

    // Model picker button (originX + 34 to originX + 160, btnY to btnY + 26)
    if (x >= originX + 34.0f && x <= originX + 160.0f && y >= btnY && y <= btnY + 26.0f) {
        OnModelPickerMouseDown(x, y);
        return true;
    }

    // Check [Voice] button: toolbar starts at originX + 172, Voice is 3rd (0, 1, 2)
    // Buttons are 54 wide, 6 spaced. Voice starts at 172 + (60 * 2) = 292
    float voiceX = originX + 292.0f;
    if (x >= voiceX && x <= voiceX + 54.0f && y >= btnY && y <= btnY + 26.0f) {
        if (m_onVoice) m_onVoice();
        return true;
    }

    // Check click inside input box
    if (x >= originX + 24.0f && x <= originX + m_bounds.width - 24.0f &&
        y >= dockY && y <= dockY + dockHeight) {
        return true;
    }
    return false;
}

void ChatVisual::OnChar(wchar_t ch) {
    if (ch == L'\r' || ch == L'\n') {
        if (!m_inputBuffer.empty()) {
            if (m_onSubmit) {
                m_onSubmit(m_inputBuffer);
            }
            m_inputBuffer.clear();
        }
    } else if (ch == L'\b') {
        if (!m_inputBuffer.empty()) {
            m_inputBuffer.pop_back();
        }
    } else if (ch >= 32) {
        m_inputBuffer.push_back(ch);
    }
}

void ChatVisual::OnKeyDown(WPARAM key) {
    // Navigation or action shortcuts (e.g., Ctrl+V for paste)
    if (key == 'V' && (GetKeyState(VK_CONTROL) & 0x8000)) {
        if (OpenClipboard(nullptr)) {
            HANDLE hData = GetClipboardData(CF_UNICODETEXT);
            if (hData) {
                wchar_t* pText = static_cast<wchar_t*>(GlobalLock(hData));
                if (pText) {
                    m_inputBuffer += pText;
                    GlobalUnlock(hData);
                }
            }
            CloseClipboard();
        }
    }
}

void ChatVisual::CopyMessageToClipboard(size_t index) {
    if (index >= m_bubbles.size()) return;

    const std::wstring& text = m_bubbles[index].rawText;
    if (OpenClipboard(nullptr)) {
        EmptyClipboard();
        size_t bytes = (text.size() + 1) * sizeof(wchar_t);
        HGLOBAL hMem = GlobalAlloc(GMEM_MOVEABLE, bytes);
        if (hMem) {
            memcpy(GlobalLock(hMem), text.c_str(), bytes);
            GlobalUnlock(hMem);
            SetClipboardData(CF_UNICODETEXT, hMem);
        }
        CloseClipboard();
    }
}

std::wstring ChatVisual::GetMessageForEdit(size_t index) {
    if (index < m_bubbles.size()) {
        return m_bubbles[index].rawText;
    }
    return L"";
}
