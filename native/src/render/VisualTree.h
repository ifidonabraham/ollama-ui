#pragma once
#include <windows.h>
#include <dcomp.h>
#include <wrl/client.h>
#include <vector>
#include <memory>

using Microsoft::WRL::ComPtr;

enum class IslandType {
    Sidebar,
    ChatWindow,
    Terminal,
    FileBrowser,
    HUD
};

struct RectF {
    float x;
    float y;
    float width;
    float height;
};

class Island {
public:
    Island(IslandType type, IDCompositionDevice* dcompDevice);
    virtual ~Island();

    void SetBounds(const RectF& bounds);
    RectF GetBounds() const { return m_bounds; }

    IDCompositionVisual* GetVisual() const { return m_visual.Get(); }
    IslandType GetType() const { return m_type; }

    void SetVisible(bool visible);
    bool IsVisible() const { return m_visible; }

protected:
    IslandType m_type;
    RectF m_bounds = { 0, 0, 0, 0 };
    bool m_visible = true;

    ComPtr<IDCompositionDevice> m_dcompDevice;
    ComPtr<IDCompositionVisual> m_visual;
};

class VisualTreeManager {
public:
    VisualTreeManager(IDCompositionDevice* dcompDevice, IDCompositionVisual* rootVisual);
    ~VisualTreeManager();

    std::shared_ptr<Island> CreateIsland(IslandType type);
    void UpdateLayout(float windowWidth, float windowHeight, bool sidebarCollapsed, bool terminalOpen);
    void Commit();

private:
    ComPtr<IDCompositionDevice> m_dcompDevice;
    ComPtr<IDCompositionVisual> m_rootVisual;
    std::vector<std::shared_ptr<Island>> m_islands;
};
