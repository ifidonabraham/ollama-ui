#include "VectorRouter.h"

VectorRouter::VectorRouter() {}

VectorRouter::~VectorRouter() {}

void VectorRouter::RegisterTool(const std::string& toolId, const std::string& description, const std::vector<float>& embedding) {
    m_tools.push_back({ toolId, description, embedding });
}

// AVX2 Cosine Similarity dot product runs at raw CPU speed (0 and 1 level)
// Unrolls across 8 single-precision floats per instruction cycle (_mm256)
float VectorRouter::CosineSimilarityAVX2(const float* a, const float* b, size_t dim) {
    __m256 dot = _mm256_setzero_ps();
    __m256 normA = _mm256_setzero_ps();
    __m256 normB = _mm256_setzero_ps();

    size_t i = 0;
    // Process 8 floats per SIMD iteration (e.g. 768 / 8 = 96 iterations total)
    for (; i + 8 <= dim; i += 8) {
        __m256 va = _mm256_loadu_ps(a + i);
        __m256 vb = _mm256_loadu_ps(b + i);

        dot = _mm256_fmadd_ps(va, vb, dot);
        normA = _mm256_fmadd_ps(va, va, normA);
        normB = _mm256_fmadd_ps(vb, vb, normB);
    }

    // Horizontal sum of the 256-bit SIMD registers down to scalars
    alignas(32) float dotArr[8];
    alignas(32) float normAArr[8];
    alignas(32) float normBArr[8];

    _mm256_storeu_ps(dotArr, dot);
    _mm256_storeu_ps(normAArr, normA);
    _mm256_storeu_ps(normBArr, normB);

    float totalDot = 0.0f;
    float totalNormA = 0.0f;
    float totalNormB = 0.0f;

    for (int j = 0; j < 8; ++j) {
        totalDot += dotArr[j];
        totalNormA += normAArr[j];
        totalNormB += normBArr[j];
    }

    // Handle any leftover dimensions if not divisible by 8
    for (; i < dim; ++i) {
        totalDot += a[i] * b[i];
        totalNormA += a[i] * a[i];
        totalNormB += b[i] * b[i];
    }

    float denominator = std::sqrt(totalNormA) * std::sqrt(totalNormB);
    if (denominator <= 0.000001f) return 0.0f;

    return totalDot / denominator;
}

MatchResult VectorRouter::FindBestMatch(const std::vector<float>& inputEmbedding, float threshold) {
    if (inputEmbedding.empty() || m_tools.empty()) {
        return { "", 0.0f };
    }

    size_t dim = inputEmbedding.size();
    float bestSimilarity = -1.0f;
    std::string bestTool = "";

    for (const auto& tool : m_tools) {
        if (tool.embedding.size() != dim) continue;

        float sim = CosineSimilarityAVX2(inputEmbedding.data(), tool.embedding.data(), dim);
        if (sim > bestSimilarity) {
            bestSimilarity = sim;
            bestTool = tool.id;
        }
    }

    if (bestSimilarity >= threshold) {
        return { bestTool, bestSimilarity };
    }

    return { "", bestSimilarity };
}
