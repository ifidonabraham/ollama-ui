#pragma once
#include <string>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <atomic>

template <typename T>
class LockFreeTokenQueue {
public:
    LockFreeTokenQueue() : m_finished(false) {}

    void Push(const T& item) {
        {
            std::lock_guard<std::mutex> lock(m_mutex);
            m_queue.push(item);
        }
        m_cv.notify_one();
    }

    bool TryPop(T& item) {
        std::lock_guard<std::mutex> lock(m_mutex);
        if (m_queue.empty()) {
            return false;
        }
        item = std::move(m_queue.front());
        m_queue.pop();
        return true;
    }

    bool PopWait(T& item) {
        std::unique_lock<std::mutex> lock(m_mutex);
        m_cv.wait(lock, [this]() {
            return !m_queue.empty() || m_finished.load();
        });

        if (m_queue.empty()) {
            return false; // Finished and empty
        }

        item = std::move(m_queue.front());
        m_queue.pop();
        return true;
    }

    void SetFinished(bool finished = true) {
        m_finished.store(finished);
        m_cv.notify_all();
    }

    bool IsFinished() const {
        return m_finished.load();
    }

    void Clear() {
        std::lock_guard<std::mutex> lock(m_mutex);
        std::queue<T> empty;
        std::swap(m_queue, empty);
        m_finished.store(false);
    }

private:
    std::queue<T> m_queue;
    std::mutex m_mutex;
    std::condition_variable m_cv;
    std::atomic<bool> m_finished;
};
