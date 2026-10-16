#include "VoicePipeline.h"

VoicePipelineWASAPI::VoicePipelineWASAPI() {}

VoicePipelineWASAPI::~VoicePipelineWASAPI() {
    Uninitialize();
}

bool VoicePipelineWASAPI::Initialize() {
    HRESULT hr = CoCreateInstance(
        __uuidof(MMDeviceEnumerator),
        nullptr,
        CLSCTX_ALL,
        __uuidof(IMMDeviceEnumerator),
        (void**)&m_enumerator
    );
    if (FAILED(hr)) return false;

    // Get default audio recording endpoint (microphone)
    hr = m_enumerator->GetDefaultAudioEndpoint(eCapture, eConsole, &m_device);
    if (FAILED(hr)) return false;

    hr = m_device->Activate(__uuidof(IAudioClient), CLSCTX_ALL, nullptr, (void**)&m_audioClient);
    if (FAILED(hr)) return false;

    hr = m_audioClient->GetMixFormat(&m_pwfx);
    if (FAILED(hr)) return false;

    // Initialize audio client for 100ms buffer in event-driven or polling mode
    hr = m_audioClient->Initialize(
        AUDCLNT_SHAREMODE_SHARED,
        0,
        10000000, // 1 second buffer
        0,
        m_pwfx,
        nullptr
    );
    if (FAILED(hr)) return false;

    hr = m_audioClient->GetService(__uuidof(IAudioCaptureClient), (void**)&m_captureClient);
    return SUCCEEDED(hr);
}

void VoicePipelineWASAPI::Uninitialize() {
    if (m_pwfx) {
        CoTaskMemFree(m_pwfx);
        m_pwfx = nullptr;
    }
    m_captureClient = nullptr;
    m_audioClient = nullptr;
    m_device = nullptr;
    m_enumerator = nullptr;
}

bool VoicePipelineWASAPI::StartRecording() {
    if (!m_audioClient) {
        if (!Initialize()) return false;
    }

    m_recordedPcm.clear();
    HRESULT hr = m_audioClient->Start();
    if (SUCCEEDED(hr)) {
        m_isRecording = true;
        return true;
    }
    return false;
}

std::vector<int16_t> VoicePipelineWASAPI::StopRecording() {
    if (m_isRecording && m_audioClient) {
        m_audioClient->Stop();
        m_isRecording = false;

        // Drain any remaining audio packets
        UINT32 packetLength = 0;
        BYTE* pData = nullptr;
        UINT32 numFramesAvailable = 0;
        DWORD flags = 0;

        while (SUCCEEDED(m_captureClient->GetNextPacketSize(&packetLength)) && packetLength > 0) {
            if (SUCCEEDED(m_captureClient->GetBuffer(&pData, &numFramesAvailable, &flags, nullptr, nullptr))) {
                if (!(flags & AUDCLNT_BUFFERFLAGS_SILENT)) {
                    int16_t* pSamples = reinterpret_cast<int16_t*>(pData);
                    m_recordedPcm.insert(m_recordedPcm.end(), pSamples, pSamples + numFramesAvailable);
                }
                m_captureClient->ReleaseBuffer(numFramesAvailable);
            }
        }
    }
    return m_recordedPcm;
}
