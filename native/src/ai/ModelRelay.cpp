#include "ModelRelay.h"
#include <algorithm>

std::string ModelRelay::SelectModel(const std::vector<std::string>& available, 
                                   const std::string& preferred,
                                   const std::string& taskType) {
    // Simple stub: return preferred if available, otherwise first available
    if (!preferred.empty() && 
        std::find(available.begin(), available.end(), preferred) != available.end()) {
        return preferred;
    }
    if (!available.empty()) {
        return available.front();
    }
    return "qwen2.5-coder:1.5b"; // fallback
}
