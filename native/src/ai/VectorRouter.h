#pragma once
#include <immintrin.h>
#include <vector>
#include <string>
#include <cmath>
#include <memory>
#include <unordered_map>

struct ToolDefinition {
    std::string id;
    std::string description;
    std::vector<float> embedding; // 768 dimensions for nomic-embed-text
};

struct MatchResult {
    std::string toolId;
    float similarity;
};

class VectorRouter {
public:
    VectorRouter();
    ~VectorRouter();

    // Register a tool with precomputed or dynamically computed 768-dim embeddings
    void RegisterTool(const std::string& toolId, const std::string& description, const std::vector<float>& embedding);

    // Fast AVX2 Cosine Similarity dot product between two normalized 768-dim vectors
    static float CosineSimilarityAVX2(const float* a, const float* b, size_t dim);

    // Match input embedding against all registered tools
    MatchResult FindBestMatch(const std::vector<float>& inputEmbedding, float threshold = 0.82f);

private:
    std::vector<ToolDefinition> m_tools;
};
