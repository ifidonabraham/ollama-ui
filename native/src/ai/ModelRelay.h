#pragma once
#include <string>
#include <vector>

class ModelRelay {
public:
    static std::string SelectModel(const std::vector<std::string>& available, 
                                  const std::string& preferred,
                                  const std::string& taskType);
};
