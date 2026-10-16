#include "MemoryManager.h"

size_t MemoryManager::GetAvailableSystemRamMb() {
    MEMORYSTATUSEX status = {};
    status.dwLength = sizeof(MEMORYSTATUSEX);
    if (GlobalMemoryStatusEx(&status)) {
        return static_cast<size_t>(status.ullAvailPhys / (1024 * 1024));
    }
    return 0;
}

size_t MemoryManager::GetTotalSystemRamMb() {
    MEMORYSTATUSEX status = {};
    status.dwLength = sizeof(MEMORYSTATUSEX);
    if (GlobalMemoryStatusEx(&status)) {
        return static_cast<size_t>(status.ullTotalPhys / (1024 * 1024));
    }
    return 0;
}

size_t MemoryManager::EstimateModelMemoryMb(const std::string& modelName) {
    if (modelName.find("14b") != std::string::npos) return 9200;
    if (modelName.find("8b") != std::string::npos) return 7200;
    if (modelName.find("7b") != std::string::npos) return 6200;
    if (modelName.find("3b") != std::string::npos) return 3800;
    if (modelName.find("moondream") != std::string::npos) return 2800;
    if (modelName.find("1.5b") != std::string::npos || modelName.find("1b") != std::string::npos) return 2200;
    if (modelName.find("nomic") != std::string::npos) return 500;
    return 4000; // default safe fallback
}

bool MemoryManager::CanModelFit(const std::string& modelName, size_t safetyMarginMb) {
    size_t availableMb = GetAvailableSystemRamMb();
    size_t requiredMb = EstimateModelMemoryMb(modelName) + safetyMarginMb;
    return availableMb >= requiredMb;
}

std::string MemoryManager::PickFittingModel(
    const std::vector<std::string>& candidates,
    const std::string& preferredModel
) {
    if (CanModelFit(preferredModel)) {
        return preferredModel;
    }

    // Fallback to smaller model that fits in current free RAM
    for (const auto& model : candidates) {
        if (CanModelFit(model)) {
            return model;
        }
    }

    return candidates.empty() ? preferredModel : candidates.back();
}
