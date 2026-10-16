#pragma once
#include <windows.h>
#include <mmdeviceapi.h>
#include <audioclient.h>
#include <wrl/client.h>
#include <vector>
#include <string>
#include <functional>

using Microsoft::WRL::ComPtr;

class VoicePipelineWASAPI {
public:
    VoicePipelineWASAPI();
    ~VoicePipelineWASAPI();

    bool Initialize();
    void Uninitialize();

    // Start recording audio from default input microphone
    bool StartRecording();

    // Stop recording and retrieve 16kHz PCM audio samples for Whisper
    std::vector<int16_t> StopRecording();

    bool IsRecording() const { return m_isRecording; }

private:
    ComPtr<IMMDeviceEnumerator> m_enumerator;
    ComPtr<IMMDevice> m_device;
    ComPtr<IAudioClient> m_audioClient;
    ComPtr<IAudioCaptureClient> m_captureClient;

    WAVEFORMATEX* m_pwfx = nullptr;
    bool m_isRecording = false;
    std::vector<int16_t> m_recordedPcm;
};
