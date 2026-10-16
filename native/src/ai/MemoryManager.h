#pragma once
#include <windows.h>
#include <string>
#include <vector>

struct ModelMemoryBudget {
    std::string modelName;
    size_t memoryRequiredMb;
    bool fitsInRam;
};

class MemoryManager {
public:
    static size_t GetAvailableSystemRamMb();
    static size_t GetTotalSystemRamMb();

    // Estimate model memory requirement based on parameter size
    static size_t EstimateModelMemoryMb(const std::string& modelName);

    // Check if model fits in free physical RAM before triggering Ollama load
    static bool CanModelFit(const std::string& modelName, size_t safetyMarginMb = 1024);

    // Pick best fitting model among available candidates
    static std::string PickFittingModel(
        const std::vector<std::string>& candidates,
        const std::string& preferredModel
    );
};
