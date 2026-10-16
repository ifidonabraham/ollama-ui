#include "render/DwmWindow.h"
#include "render/VisualTree.h"
#include "render/ChatVisual.h"
#include "render/TerminalVisual.h"
#include "render/FileBrowserVisual.h"
#include "ai/VectorRouter.h"
#include "ai/MemoryManager.h"
#include "net/OllamaStreamer.h"
#include "core/AgentPipeline.h"
#include "storage/DatabaseStorage.h"
#include "audio/VoicePipeline.h"
#include <iostream>
#include <memory>
#include <sstream>
#include <iomanip>

enum class ActivePanel {
    Chat,
    Split,
    Terminal
};

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPWSTR lpCmdLine, int nCmdShow) {
    // 1. Initialize Root Win32 HWND with WS_EX_NOREDIRECTIONBITMAP and Acrylic Blur
    DwmWindow window;
    if (!window.Initialize(hInstance, 1400, 900, L"Fonia — Native DWM AI Workstation")) {
        MessageBoxW(nullptr, L"Failed to initialize DWM DirectComposition Engine", L"Fatal Error", MB_ICONERROR);
        return -1;
    }

    // 2. DirectComposition Visual Tree (Islands System)
    auto visualTree = std::make_shared<VisualTreeManager>(window.GetDCompDevice(), window.GetRootVisual());

    // 3. DirectWrite & Direct2D Chat Visual Island (144 FPS Rendering)
    auto chatVisual = std::make_shared<ChatVisual>(
        window.GetDCompDevice(),
        window.GetD2DContext(),
        window.GetDWriteFactory()
    );

    // 4. Windows ConPTY Interactive Terminal Island
    auto terminalVisual = std::make_shared<TerminalVisual>(
        window.GetDCompDevice(),
        window.GetD2DContext(),
        window.GetDWriteFactory()
    );

    // 5. Windows Shell File Browser Island
    auto fileBrowserVisual = std::make_shared<FileBrowserVisual>(
        window.GetDCompDevice(),
        window.GetD2DContext(),
        window.GetDWriteFactory()
    );
    fileBrowserVisual->NavigateTo(L"C:\\Users\\PC\\A.I projects\\ollama-ui");

    // 6. AVX2 Vector Intent Router (Sub-10ms _mm256_dot_ps)
    auto vectorRouter = std::make_shared<VectorRouter>();

    // 7. WinHTTP Token Streamer (Decoupled lock-free queue)
    auto streamer = std::make_shared<OllamaStreamer>(L"localhost", 11434);

    // 7b. WASAPI Voice Input Pipeline (microphone capture for Whisper transcription)
    auto voicePipeline = std::make_shared<VoicePipelineWASAPI>();
    voicePipeline->Initialize();

    // 8. Unified Agent Pipeline connecting OS tools & LLM streaming
    auto agentPipeline = std::make_shared<AgentPipeline>(vectorRouter, streamer, chatVisual);

    // 9. Real Persistent Database Storage (mirroring TypeScript SQLite .data/ollama-ui.db)
    auto db = std::make_shared<DatabaseStorage>();
    wchar_t exePath[MAX_PATH];
    GetModuleFileNameW(nullptr, exePath, MAX_PATH);
    std::wstring dbPath = exePath;
    size_t lastSlash = dbPath.find_last_of(L"\\/");
    if (lastSlash != std::wstring::npos) {
        dbPath = dbPath.substr(0, lastSlash + 1) + L"..\\fonia_store.db";
    } else {
        dbPath = L"fonia_store.db";
    }
    db->Initialize(dbPath);

    // Dynamic UI states mirroring original TypeScript app/page.tsx
    bool sidebarCollapsed = false;
    ActivePanel activePanel = ActivePanel::Chat;
    bool terminalDock = false;
    std::wstring currentActiveModel = L"qwen2.5-coder:3b";
    int activeChatIndex = 0;

    // Load actual sessions from storage
    std::vector<NativeSession> nativeSessions = db->ListSessions();
    if (nativeSessions.empty()) {
        db->CreateSession("s-default", "hi", "qwen2.5-coder:7b");
        nativeSessions = db->ListSessions();
    }

    // Query live Ollama models
    std::vector<std::string> liveModels = streamer->FetchModels();
    chatVisual->SetAvailableModels(liveModels);
    chatVisual->SetCurrentModel("qwen2.5-coder:3b");

    // Wire model picker selection callback
    chatVisual->SetOnModelChangeCallback([&](const std::string& newModel) {
        currentActiveModel = std::wstring(newModel.begin(), newModel.end());
        // Update model in current session if exists
        if (activeChatIndex >= 0 && activeChatIndex < static_cast<int>(nativeSessions.size())) {
            nativeSessions[activeChatIndex].model = newModel;
        }
    });

    // Brushes for UI elements
    ComPtr<ID2D1SolidColorBrush> sidebarBgBrush;
    ComPtr<ID2D1SolidColorBrush> headerBgBrush;
    ComPtr<ID2D1SolidColorBrush> borderBrush;
    ComPtr<ID2D1SolidColorBrush> textWhiteBrush;
    ComPtr<ID2D1SolidColorBrush> textMutedBrush;
    ComPtr<ID2D1SolidColorBrush> accentBrush;
    ComPtr<ID2D1SolidColorBrush> ocoreOuterBrush;
    ComPtr<ID2D1SolidColorBrush> ocoreOrbBrush;
    ComPtr<ID2D1SolidColorBrush> redDeleteBrush;

    auto d2d = window.GetD2DContext();
    auto dw = window.GetDWriteFactory();

    d2d->CreateSolidColorBrush(D2D1::ColorF(0x070B14, 0.95f), &sidebarBgBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0x0B1120, 0.95f), &headerBgBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0x1E293B, 0.85f), &borderBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0xF8FAFC, 1.0f), &textWhiteBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0x94A3B8, 1.0f), &textMutedBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0x38BDF8, 1.0f), &accentBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0x2563EB, 0.90f), &ocoreOuterBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0x38BDF8, 1.0f), &ocoreOrbBrush);
    d2d->CreateSolidColorBrush(D2D1::ColorF(0xEF4444, 0.90f), &redDeleteBrush);

    ComPtr<IDWriteTextFormat> headerFormat;
    dw->CreateTextFormat(L"Segoe UI", nullptr, DWRITE_FONT_WEIGHT_SEMI_BOLD, DWRITE_FONT_STYLE_NORMAL, DWRITE_FONT_STRETCH_NORMAL, 13.0f, L"en-us", &headerFormat);

    ComPtr<IDWriteTextFormat> sectionFormat;
    dw->CreateTextFormat(L"Segoe UI", nullptr, DWRITE_FONT_WEIGHT_BOLD, DWRITE_FONT_STYLE_NORMAL, DWRITE_FONT_STRETCH_NORMAL, 11.0f, L"en-us", &sectionFormat);

    ComPtr<IDWriteTextFormat> brandFormat;
    dw->CreateTextFormat(L"Segoe UI", nullptr, DWRITE_FONT_WEIGHT_BOLD, DWRITE_FONT_STYLE_NORMAL, DWRITE_FONT_STRETCH_NORMAL, 16.0f, L"en-us", &brandFormat);

    ComPtr<IDWriteTextFormat> monoFormat;
    dw->CreateTextFormat(L"Consolas", nullptr, DWRITE_FONT_WEIGHT_NORMAL, DWRITE_FONT_STYLE_NORMAL, DWRITE_FONT_STRETCH_NORMAL, 12.0f, L"en-us", &monoFormat);

    // Update Island bounds based on sidebar and dock state
    auto updateLayout = [&]() {
        float sidebarWidth = sidebarCollapsed ? 0.0f : 240.0f;
        float stageX = sidebarWidth;
        float stageY = 52.0f;
        float stageW = 1400.0f - sidebarWidth;
        float stageH = 900.0f - stageY;

        if (terminalDock) {
            float termH = 220.0f;
            float chatH = stageH - termH;
            chatVisual->SetBounds({ stageX, stageY, stageW, chatH });
            terminalVisual->SetBounds({ stageX, stageY + chatH, stageW, termH });
        } else if (activePanel == ActivePanel::Split) {
            float chatW = stageW * 0.58f;
            float fileW = stageW - chatW;
            chatVisual->SetBounds({ stageX, stageY, chatW, stageH });
            fileBrowserVisual->SetBounds({ stageX + chatW, stageY, fileW, stageH });
        } else if (activePanel == ActivePanel::Terminal) {
            terminalVisual->SetBounds({ stageX, stageY, stageW, stageH });
        } else {
            chatVisual->SetBounds({ stageX, stageY, stageW, stageH });
        }
    };
    updateLayout();

    // Load active session messages from Database
    auto loadActiveSessionMessages = [&]() {
        chatVisual->ClearMessages();
        if (activeChatIndex >= 0 && activeChatIndex < static_cast<int>(nativeSessions.size())) {
            const auto& curSession = nativeSessions[activeChatIndex];
            currentActiveModel = std::wstring(curSession.model.begin(), curSession.model.end());

            auto msgs = db->GetSessionMessages(curSession.id);
            if (msgs.empty()) {
                // If newly created session with no messages yet
                chatVisual->AddMessage(false, L"Fonia", L"New conversation started with " + currentActiveModel);
            } else {
                for (const auto& m : msgs) {
                    bool isUser = (m.role == "user");
                    std::wstring wAuthor(m.role.begin(), m.role.end());
                    std::wstring wContent(m.content.begin(), m.content.end());
                    chatVisual->AddMessage(isUser, wAuthor, wContent);
                }
            }
        }
    };
    loadActiveSessionMessages();

    // Wire up Direct2D render callback
    window.SetRenderCallback([&]() {
        float sidebarWidth = sidebarCollapsed ? 0.0f : 240.0f;

        // Query real dynamic RAM status from Windows GlobalMemoryStatusEx
        size_t availRamMb = MemoryManager::GetAvailableSystemRamMb();
        std::wstringstream ramStream;
        ramStream << L"RAM " << availRamMb << L" MB";
        std::wstring ramString = ramStream.str();

        std::wstringstream ramFreeFoot;
        ramFreeFoot << L"RAM " << availRamMb << L" MB free";
        std::wstring ramFreeFootString = ramFreeFoot.str();

        // 1. LEFT SIDEBAR PANEL (if not collapsed)
        if (!sidebarCollapsed) {
            D2D1_RECT_F sidebarRect = D2D1::RectF(0.0f, 0.0f, sidebarWidth, 900.0f);
            d2d->FillRectangle(&sidebarRect, sidebarBgBrush.Get());
            d2d->DrawLine(D2D1::Point2F(sidebarWidth, 0.0f), D2D1::Point2F(sidebarWidth, 900.0f), borderBrush.Get(), 1.0f);

            // Header: O-Core + "Fonia" + Blue circle (+) button
            d2d->DrawEllipse(D2D1::Ellipse(D2D1::Point2F(28.0f, 26.0f), 12.0f, 12.0f), ocoreOuterBrush.Get(), 2.0f);
            d2d->FillEllipse(D2D1::Ellipse(D2D1::Point2F(28.0f, 26.0f), 5.0f, 5.0f), ocoreOrbBrush.Get());

            D2D1_RECT_F brandRect = D2D1::RectF(48.0f, 16.0f, 150.0f, 40.0f);
            d2d->DrawText(L"Fonia", 5, brandFormat.Get(), &brandRect, accentBrush.Get());

            // (+) Blue Circle New Chat Button
            d2d->FillEllipse(D2D1::Ellipse(D2D1::Point2F(216.0f, 26.0f), 12.0f, 12.0f), ocoreOuterBrush.Get());
            D2D1_RECT_F plusRect = D2D1::RectF(211.0f, 16.0f, 225.0f, 36.0f);
            d2d->DrawText(L"+", 1, brandFormat.Get(), &plusRect, textWhiteBrush.Get());

            d2d->DrawLine(D2D1::Point2F(0.0f, 52.0f), D2D1::Point2F(sidebarWidth, 52.0f), borderBrush.Get(), 1.0f);

            // PROJECT Section Header
            D2D1_RECT_F projRect = D2D1::RectF(16.0f, 66.0f, 180.0f, 86.0f);
            d2d->DrawText(L"\x25BC PROJECT", 9, sectionFormat.Get(), &projRect, textMutedBrush.Get());

            // Folder icon
            D2D1_ROUNDED_RECT folderIcon = D2D1::RoundedRect(D2D1::RectF(210.0f, 68.0f, 224.0f, 82.0f), 2.0f, 2.0f);
            d2d->DrawRoundedRectangle(&folderIcon, textMutedBrush.Get(), 1.2f);

            // CHATS Section Header
            D2D1_RECT_F chatsHdr = D2D1::RectF(16.0f, 104.0f, 180.0f, 124.0f);
            d2d->DrawText(L"\x25BC CHATS", 7, sectionFormat.Get(), &chatsHdr, textMutedBrush.Get());
            
            std::wstring sessionCountStr = std::to_wstring(nativeSessions.size());
            D2D1_RECT_F chatsCount = D2D1::RectF(214.0f, 104.0f, 230.0f, 124.0f);
            d2d->DrawText(sessionCountStr.c_str(), static_cast<UINT32>(sessionCountStr.size()), sectionFormat.Get(), &chatsCount, textMutedBrush.Get());

            // Render Chat Sessions List directly from database
            float cardY = 132.0f;
            for (size_t i = 0; i < nativeSessions.size() && cardY < 830.0f; ++i) {
                bool isActive = (static_cast<int>(i) == activeChatIndex);
                std::wstring wTitle(nativeSessions[i].title.begin(), nativeSessions[i].title.end());
                std::wstring wModel(nativeSessions[i].model.begin(), nativeSessions[i].model.end());

                if (isActive) {
                    D2D1_ROUNDED_RECT activeCard = D2D1::RoundedRect(D2D1::RectF(10.0f, cardY, 230.0f, cardY + 56.0f), 6.0f, 6.0f);
                    d2d->FillRoundedRectangle(&activeCard, headerBgBrush.Get());
                    d2d->DrawRoundedRectangle(&activeCard, borderBrush.Get(), 1.0f);

                    // Active blue radio dot
                    d2d->FillEllipse(D2D1::Ellipse(D2D1::Point2F(24.0f, cardY + 16.0f), 3.5f, 3.5f), accentBrush.Get());

                    // Title
                    D2D1_RECT_F cTitle = D2D1::RectF(36.0f, cardY + 8.0f, 190.0f, cardY + 26.0f);
                    d2d->DrawText(wTitle.c_str(), static_cast<UINT32>(wTitle.size()), headerFormat.Get(), &cTitle, textWhiteBrush.Get());

                    // Delete X icon
                    D2D1_RECT_F delRect = D2D1::RectF(212.0f, cardY + 8.0f, 226.0f, cardY + 26.0f);
                    d2d->DrawText(L"\x2715", 1, headerFormat.Get(), &delRect, redDeleteBrush.Get());

                    // Model Tag Pill
                    D2D1_ROUNDED_RECT mPill = D2D1::RoundedRect(D2D1::RectF(36.0f, cardY + 29.0f, 154.0f, cardY + 47.0f), 3.0f, 3.0f);
                    d2d->FillRoundedRectangle(&mPill, borderBrush.Get());
                    D2D1_RECT_F mTxt = D2D1::RectF(42.0f, cardY + 31.0f, 150.0f, cardY + 47.0f);
                    d2d->DrawText(wModel.c_str(), static_cast<UINT32>(wModel.size()), monoFormat.Get(), &mTxt, textMutedBrush.Get());
                } else {
                    // Inactive session circle dot
                    d2d->DrawEllipse(D2D1::Ellipse(D2D1::Point2F(24.0f, cardY + 14.0f), 3.0f, 3.0f), borderBrush.Get(), 1.2f);

                    D2D1_RECT_F cTitle = D2D1::RectF(36.0f, cardY + 6.0f, 220.0f, cardY + 24.0f);
                    d2d->DrawText(wTitle.c_str(), static_cast<UINT32>(wTitle.size()), headerFormat.Get(), &cTitle, textMutedBrush.Get());

                    // Model tag pill
                    D2D1_ROUNDED_RECT mPill = D2D1::RoundedRect(D2D1::RectF(36.0f, cardY + 26.0f, 154.0f, cardY + 42.0f), 3.0f, 3.0f);
                    d2d->FillRoundedRectangle(&mPill, borderBrush.Get());
                    D2D1_RECT_F mTxt = D2D1::RectF(42.0f, cardY + 27.0f, 150.0f, cardY + 42.0f);
                    d2d->DrawText(wModel.c_str(), static_cast<UINT32>(wModel.size()), monoFormat.Get(), &mTxt, textMutedBrush.Get());
                }
                cardY += 58.0f;
            }

            // Bottom Settings & RAM free footer
            d2d->DrawLine(D2D1::Point2F(0.0f, 850.0f), D2D1::Point2F(sidebarWidth, 850.0f), borderBrush.Get(), 1.0f);
            D2D1_RECT_F setRect = D2D1::RectF(24.0f, 860.0f, 120.0f, 882.0f);
            d2d->DrawText(L"\x2699 Settings", 10, headerFormat.Get(), &setRect, textMutedBrush.Get());

            D2D1_RECT_F ramFreeRect = D2D1::RectF(16.0f, 882.0f, 230.0f, 900.0f);
            d2d->DrawText(ramFreeFootString.c_str(), static_cast<UINT32>(ramFreeFootString.size()), monoFormat.Get(), &ramFreeRect, textMutedBrush.Get());
        }

        // 2. TOP HUD STAGE BAR (y: 0 to 52, matching TypeScript fonia-top)
        D2D1_RECT_F hudRect = D2D1::RectF(sidebarWidth, 0.0f, 1400.0f, 52.0f);
        d2d->FillRectangle(&hudRect, headerBgBrush.Get());
        d2d->DrawLine(D2D1::Point2F(sidebarWidth, 52.0f), D2D1::Point2F(1400.0f, 52.0f), borderBrush.Get(), 1.0f);

        // Hide / Show Sidebar Button
        float hideBtnX = sidebarWidth + 14.0f;
        D2D1_ROUNDED_RECT hideBtn = D2D1::RoundedRect(D2D1::RectF(hideBtnX, 12.0f, hideBtnX + 54.0f, 40.0f), 6.0f, 6.0f);
        d2d->DrawRoundedRectangle(&hideBtn, borderBrush.Get(), 1.0f);
        D2D1_RECT_F hideText = D2D1::RectF(hideBtnX + 11.0f, 17.0f, hideBtnX + 48.0f, 38.0f);
        const wchar_t* hideLabel = sidebarCollapsed ? L"Show" : L"Hide";
        d2d->DrawText(hideLabel, static_cast<UINT32>(wcslen(hideLabel)), headerFormat.Get(), &hideText, textMutedBrush.Get());

        // Segmented Tabs: [Chat] [Split] [Terminal]
        float segX = hideBtnX + 66.0f;
        D2D1_ROUNDED_RECT segBox = D2D1::RoundedRect(D2D1::RectF(segX, 10.0f, segX + 200.0f, 42.0f), 8.0f, 8.0f);
        d2d->FillRoundedRectangle(&segBox, sidebarBgBrush.Get());
        d2d->DrawRoundedRectangle(&segBox, borderBrush.Get(), 1.0f);

        // Chat tab
        if (activePanel == ActivePanel::Chat) {
            D2D1_ROUNDED_RECT tab1 = D2D1::RoundedRect(D2D1::RectF(segX + 4.0f, 13.0f, segX + 60.0f, 39.0f), 6.0f, 6.0f);
            d2d->FillRoundedRectangle(&tab1, borderBrush.Get());
        }
        D2D1_RECT_F t1 = D2D1::RectF(segX + 16.0f, 17.0f, segX + 56.0f, 37.0f);
        d2d->DrawText(L"Chat", 4, headerFormat.Get(), &t1, activePanel == ActivePanel::Chat ? textWhiteBrush.Get() : textMutedBrush.Get());

        // Split tab
        if (activePanel == ActivePanel::Split) {
            D2D1_ROUNDED_RECT tab2 = D2D1::RoundedRect(D2D1::RectF(segX + 64.0f, 13.0f, segX + 120.0f, 39.0f), 6.0f, 6.0f);
            d2d->FillRoundedRectangle(&tab2, borderBrush.Get());
        }
        D2D1_RECT_F t2 = D2D1::RectF(segX + 74.0f, 17.0f, segX + 116.0f, 37.0f);
        d2d->DrawText(L"Split", 5, headerFormat.Get(), &t2, activePanel == ActivePanel::Split ? textWhiteBrush.Get() : textMutedBrush.Get());

        // Terminal tab
        if (activePanel == ActivePanel::Terminal) {
            D2D1_ROUNDED_RECT tab3 = D2D1::RoundedRect(D2D1::RectF(segX + 124.0f, 13.0f, segX + 194.0f, 39.0f), 6.0f, 6.0f);
            d2d->FillRoundedRectangle(&tab3, borderBrush.Get());
        }
        D2D1_RECT_F t3 = D2D1::RectF(segX + 134.0f, 17.0f, segX + 190.0f, 37.0f);
        d2d->DrawText(L"Terminal", 8, headerFormat.Get(), &t3, activePanel == ActivePanel::Terminal ? textWhiteBrush.Get() : textMutedBrush.Get());

        // Right side Status Pills (model badge, dynamic RAM, models count, TTY, Refresh, Free RAM)
        D2D1_ROUNDED_RECT pModel = D2D1::RoundedRect(D2D1::RectF(780.0f, 12.0f, 920.0f, 38.0f), 12.0f, 12.0f);
        d2d->DrawRoundedRectangle(&pModel, borderBrush.Get(), 1.0f);
        D2D1_RECT_F tModel = D2D1::RectF(792.0f, 16.0f, 915.0f, 36.0f);
        d2d->DrawText(currentActiveModel.c_str(), static_cast<UINT32>(currentActiveModel.size()), headerFormat.Get(), &tModel, textMutedBrush.Get());

        D2D1_ROUNDED_RECT pRam = D2D1::RoundedRect(D2D1::RectF(930.0f, 12.0f, 1045.0f, 38.0f), 12.0f, 12.0f);
        d2d->DrawRoundedRectangle(&pRam, borderBrush.Get(), 1.0f);
        D2D1_RECT_F tRam = D2D1::RectF(942.0f, 16.0f, 1040.0f, 36.0f);
        d2d->DrawText(ramString.c_str(), static_cast<UINT32>(ramString.size()), headerFormat.Get(), &tRam, textMutedBrush.Get());

        std::wstring modelsCountStr = std::to_wstring(liveModels.size()) + L" models";
        D2D1_ROUNDED_RECT pModelsCount = D2D1::RoundedRect(D2D1::RectF(1055.0f, 12.0f, 1135.0f, 38.0f), 12.0f, 12.0f);
        d2d->DrawRoundedRectangle(&pModelsCount, borderBrush.Get(), 1.0f);
        D2D1_RECT_F tModelsCount = D2D1::RectF(1065.0f, 16.0f, 1130.0f, 36.0f);
        d2d->DrawText(modelsCountStr.c_str(), static_cast<UINT32>(modelsCountStr.size()), headerFormat.Get(), &tModelsCount, textMutedBrush.Get());

        // TTY button (toggles dock terminal)
        D2D1_ROUNDED_RECT pTty = D2D1::RoundedRect(D2D1::RectF(1145.0f, 12.0f, 1200.0f, 38.0f), 6.0f, 6.0f);
        if (terminalDock) d2d->FillRoundedRectangle(&pTty, borderBrush.Get());
        d2d->DrawRoundedRectangle(&pTty, borderBrush.Get(), 1.0f);
        D2D1_RECT_F tTty = D2D1::RectF(1155.0f, 16.0f, 1195.0f, 36.0f);
        d2d->DrawText(terminalDock ? L"Hide" : L"TTY", terminalDock ? 4 : 3, headerFormat.Get(), &tTty, terminalDock ? textWhiteBrush.Get() : textMutedBrush.Get());

        // Refresh button
        D2D1_ROUNDED_RECT pRef = D2D1::RoundedRect(D2D1::RectF(1210.0f, 12.0f, 1280.0f, 38.0f), 6.0f, 6.0f);
        d2d->DrawRoundedRectangle(&pRef, borderBrush.Get(), 1.0f);
        D2D1_RECT_F tRef = D2D1::RectF(1220.0f, 16.0f, 1275.0f, 36.0f);
        d2d->DrawText(L"Refresh", 7, headerFormat.Get(), &tRef, textMutedBrush.Get());

        // Free RAM button
        D2D1_ROUNDED_RECT pFree = D2D1::RoundedRect(D2D1::RectF(1290.0f, 12.0f, 1380.0f, 38.0f), 6.0f, 6.0f);
        d2d->DrawRoundedRectangle(&pFree, borderBrush.Get(), 1.0f);
        D2D1_RECT_F tFree = D2D1::RectF(1302.0f, 16.0f, 1375.0f, 36.0f);
        d2d->DrawText(L"Free RAM", 8, headerFormat.Get(), &tFree, textMutedBrush.Get());

        // 3. MAIN WORKSPACE ISLANDS
        if (activePanel == ActivePanel::Chat || activePanel == ActivePanel::Split) {
            chatVisual->Render();
            if (activePanel == ActivePanel::Split) {
                fileBrowserVisual->Render();
            }
        }
        if (activePanel == ActivePanel::Terminal || terminalDock) {
            terminalVisual->Render();
        }
    });

    // Wire mouse clicks for full interactivity
    window.SetMouseDownCallback([&](int x, int y) {
        float fx = static_cast<float>(x);
        float fy = static_cast<float>(y);
        float sidebarWidth = sidebarCollapsed ? 0.0f : 240.0f;

        // Top bar clicks
        if (fy >= 0.0f && fy <= 52.0f) {
            float hideBtnX = sidebarWidth + 14.0f;
            // Hide / Show toggle
            if (fx >= hideBtnX && fx <= hideBtnX + 54.0f) {
                sidebarCollapsed = !sidebarCollapsed;
                updateLayout();
                return;
            }

            // Segmented Tabs
            float segX = hideBtnX + 66.0f;
            if (fx >= segX && fx <= segX + 60.0f) {
                activePanel = ActivePanel::Chat;
                updateLayout();
                return;
            }
            if (fx >= segX + 64.0f && fx <= segX + 120.0f) {
                activePanel = ActivePanel::Split;
                updateLayout();
                return;
            }
            if (fx >= segX + 124.0f && fx <= segX + 194.0f) {
                activePanel = ActivePanel::Terminal;
                if (!terminalVisual->IsRunning()) {
                    terminalVisual->StartConPty(120, 25, L"C:\\Users\\PC");
                }
                updateLayout();
                return;
            }

            // TTY Toggle Button
            if (fx >= 1145.0f && fx <= 1200.0f) {
                terminalDock = !terminalDock;
                if (terminalDock && !terminalVisual->IsRunning()) {
                    terminalVisual->StartConPty(120, 25, L"C:\\Users\\PC");
                }
                updateLayout();
                return;
            }

            // Free RAM Button
            if (fx >= 1290.0f && fx <= 1380.0f) {
                streamer->UnloadAllModels();
                chatVisual->AddMessage(false, L"System", L"Unloaded models from VRAM. System memory reclaimed.");
                return;
            }

            // Refresh Button
            if (fx >= 1210.0f && fx <= 1280.0f) {
                liveModels = streamer->FetchModels();
                nativeSessions = db->ListSessions();
                chatVisual->AddMessage(false, L"System", L"Refreshed models and session state.");
                return;
            }
        }

        // Sidebar clicks
        if (!sidebarCollapsed && fx >= 0.0f && fx <= sidebarWidth) {
            // (+) New Session button
            if (fx >= 204.0f && fx <= 228.0f && fy >= 14.0f && fy <= 38.0f) {
                std::string newId = "session-" + std::to_string(GetTickCount64());
                std::string modelStr(currentActiveModel.begin(), currentActiveModel.end());
                db->CreateSession(newId, "New Chat", modelStr);
                nativeSessions = db->ListSessions();
                activeChatIndex = 0;
                loadActiveSessionMessages();
                return;
            }

            // Select chat sessions
            float cardY = 132.0f;
            for (size_t i = 0; i < nativeSessions.size() && cardY < 830.0f; ++i) {
                if (fy >= cardY && fy <= cardY + 54.0f) {
                    // Check if delete X clicked
                    if (static_cast<int>(i) == activeChatIndex && fx >= 208.0f && fx <= 228.0f) {
                        if (nativeSessions.size() > 1) {
                            db->DeleteSession(nativeSessions[i].id);
                            nativeSessions = db->ListSessions();
                            activeChatIndex = 0;
                            loadActiveSessionMessages();
                        }
                        return;
                    }

                    activeChatIndex = static_cast<int>(i);
                    loadActiveSessionMessages();
                    return;
                }
                cardY += 58.0f;
            }
        }

        // Main Stage / ChatVisual clicks
        chatVisual->OnMouseDown(fx, fy);
    });

    // Wire keyboard inputs to ChatVisual and ConPTY Terminal
    window.SetCharCallback([&](wchar_t ch) {
        if (activePanel == ActivePanel::Terminal || (terminalDock && ch == L'`')) {
            std::string s(1, static_cast<char>(ch));
            terminalVisual->WriteInput(s);
        } else {
            chatVisual->OnChar(ch);
        }
    });

    window.SetKeyDownCallback([&](WPARAM key) {
        chatVisual->OnKeyDown(key);
    });

    // Wire Chat submission to unified AgentPipeline (AVX2 routing + Ollama streaming + DB save)
    chatVisual->SetOnSubmitCallback([&](const std::wstring& prompt) {
        std::string promptA(prompt.begin(), prompt.end());
        chatVisual->AddMessage(true, L"User", prompt);

        if (activeChatIndex >= 0 && activeChatIndex < static_cast<int>(nativeSessions.size())) {
            std::string msgId = "msg-" + std::to_string(GetTickCount64());
            db->AddMessage(msgId, nativeSessions[activeChatIndex].id, "user", promptA);
        }

        std::string modelStr(currentActiveModel.begin(), currentActiveModel.end());
        agentPipeline->ProcessUserMessage(promptA, modelStr);
    });

    // Wire Voice button click to WASAPI microphone recording toggle
    chatVisual->SetOnVoiceCallback([&]() {
        if (!voicePipeline->IsRecording()) {
            if (voicePipeline->StartRecording()) {
                chatVisual->AddMessage(false, L"WASAPI Voice", L"🎙️ Microphone recording started... Speak now, click Voice again to stop & transcribe.");
            } else {
                chatVisual->AddMessage(false, L"WASAPI Voice", L"Failed to start microphone recording.");
            }
        } else {
            auto pcm = voicePipeline->StopRecording();
            std::wstringstream ss;
            ss << L"🛑 Recording stopped. Captured " << pcm.size() << L" PCM samples (16kHz mono). Ready for Whisper transcription.";
            chatVisual->AddMessage(false, L"WASAPI Voice", ss.str());
        }
    });

    // Run non-blocking DWM message loop
    window.MessageLoop();
    return 0;
}
