#include "VisualTree.h"

Island::Island(IslandType type, IDCompositionDevice* dcompDevice)
    : m_type(type), m_dcompDevice(dcompDevice) {
    if (m_dcompDevice) {
        m_dcompDevice->CreateVisual(&m_visual);
    }
}

Island::~Island() {}

void Island::SetBounds(const RectF& bounds) {
    m_bounds = bounds;
    if (m_visual) {
        // DWM hardware transforms: Moves the island directly on GPU without React layout recalculations
        m_visual->SetOffsetX(bounds.x);
        m_visual->SetOffsetY(bounds.y);
    }
}

void Island::SetVisible(bool visible) {
    m_visible = visible;
    if (m_visual) {
        if (!visible) {
            m_visual->SetOffsetX(-10000.0f);
        } else {
            m_visual->SetOffsetX(m_bounds.x);
        }
    }
}

VisualTreeManager::VisualTreeManager(IDCompositionDevice* dcompDevice, IDCompositionVisual* rootVisual)
    : m_dcompDevice(dcompDevice), m_rootVisual(rootVisual) {}

VisualTreeManager::~VisualTreeManager() {}

std::shared_ptr<Island> VisualTreeManager::CreateIsland(IslandType type) {
    auto island = std::make_shared<Island>(type, m_dcompDevice.Get());
    m_islands.push_back(island);

    if (m_rootVisual && island->GetVisual()) {
        m_rootVisual->AddVisual(island->GetVisual(), FALSE, nullptr);
    }
    return island;
}

void VisualTreeManager::UpdateLayout(float windowWidth, float windowHeight, bool sidebarCollapsed, bool terminalOpen) {
    float sidebarWidth = sidebarCollapsed ? 48.0f : 260.0f;
    float hudHeight = 36.0f;
    float contentX = sidebarWidth;
    float contentWidth = windowWidth - sidebarWidth;

    float chatHeight = terminalOpen ? (windowHeight - hudHeight) * 0.65f : (windowHeight - hudHeight);
    float terminalHeight = terminalOpen ? (windowHeight - hudHeight) * 0.35f : 0.0f;

    for (auto& island : m_islands) {
        switch (island->GetType()) {
        case IslandType::Sidebar:
            island->SetBounds({ 0.0f, 0.0f, sidebarWidth, windowHeight });
            break;
        case IslandType::HUD:
            island->SetBounds({ contentX, 0.0f, contentWidth, hudHeight });
            break;
        case IslandType::ChatWindow:
            island->SetBounds({ contentX, hudHeight, contentWidth, chatHeight });
            break;
        case IslandType::Terminal:
            if (terminalOpen) {
                island->SetVisible(true);
                island->SetBounds({ contentX, hudHeight + chatHeight, contentWidth, terminalHeight });
            } else {
                island->SetVisible(false);
            }
            break;
        default:
            break;
        }
    }
    Commit();
}

void VisualTreeManager::Commit() {
    if (m_dcompDevice) {
        m_dcompDevice->Commit();
    }
}
