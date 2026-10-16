#include <iostream>
#include <cassert>
#include <chrono>
#include "ai/VectorRouter.h"
#include "ai/MemoryManager.h"
#include "ai/ChatLabeler.h"
#include "os/SystemSafetyOps.h"
#include "os/Win32HardwareOps.h"
#include "os/ProcessRunner.h"
#include "connectors/UniversalConnectorHub.h"

int main() {
    std::cout << "=========================================================\n";
    std::cout << "   RUNNING NATIVE C++ DWM ARCHITECTURE TEST SUITE        \n";
    std::cout << "=========================================================\n\n";

    int passed = 0;
    int total = 0;

    // TEST 1: AVX2 SIMD Vector Intent Router
    total++;
    {
        std::cout << "[TEST 1] AVX2 SIMD Dot-Product Cosine Similarity... ";
        std::vector<float> a(768, 0.036f); // Normalized vector
        std::vector<float> b(768, 0.036f);

        auto start = std::chrono::high_resolution_clock::now();
        float sim = VectorRouter::CosineSimilarityAVX2(a.data(), b.data(), 768);
        auto end = std::chrono::high_resolution_clock::now();
        auto nanos = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();

        assert(sim > 0.95f && sim <= 1.05f);
        std::cout << "PASS (Similarity: " << sim << ", Latency: " << nanos << " ns)\n";
        passed++;
    }

    // TEST 2: Compound Destructive Safety Cancellation
    total++;
    {
        std::cout << "[TEST 2] Safety Gate: Destructive Compound Clause Cancellation... ";
        bool rejected1 = SystemSafetyOps::IsDestructiveOrUnsafe("clean build files and format d:");
        bool rejected2 = SystemSafetyOps::IsDestructiveOrUnsafe("build project and rm -rf /");
        bool allowed = SystemSafetyOps::IsDestructiveOrUnsafe("show system battery and wifi status");

        assert(rejected1 == true);
        assert(rejected2 == true);
        assert(allowed == false);
        std::cout << "PASS (Destructive compound clauses cancelled unconditionally)\n";
        passed++;
    }

    // TEST 3: Protected Process Termination Blacklist
    total++;
    {
        std::cout << "[TEST 3] Safety Gate: Protected System Process Blacklist... ";
        bool prot1 = SystemSafetyOps::IsProtectedProcess("lsass.exe");
        bool prot2 = SystemSafetyOps::IsProtectedProcess("svchost.exe");
        bool prot3 = SystemSafetyOps::IsProtectedProcess("csrss.exe");
        bool safeApp = SystemSafetyOps::IsProtectedProcess("notepad.exe");

        assert(prot1 == true);
        assert(prot2 == true);
        assert(prot3 == true);
        assert(safeApp == false);
        std::cout << "PASS (Core Windows services protected from termination)\n";
        passed++;
    }

    // TEST 4: Flash-drive Only Ejection (C: Refusal)
    total++;
    {
        std::cout << "[TEST 4] Safety Gate: Fixed Disk Ejection Refusal (C: drive)... ";
        bool cDriveEject = SystemSafetyOps::SafeEjectRemovableDrive(L"C:\\");
        assert(cDriveEject == false);
        std::cout << "PASS (Fixed OS drive C: ejection strictly rejected)\n";
        passed++;
    }

    // TEST 5: Secret Redaction (Passwords & Tokens)
    total++;
    {
        std::cout << "[TEST 5] Safety Gate: Secret Redactor... ";
        std::string raw = "My password=SecretPass123! and token=ghp_ABC123XYZ";
        std::string redacted = SystemSafetyOps::RedactSecrets(raw);
        assert(redacted.find("SecretPass123!") == std::string::npos);
        std::cout << "PASS (Secrets scrubbed)\n";
        passed++;
    }

    // TEST 6: Native Win32 Hardware Ops (Power Status / Battery)
    total++;
    {
        std::cout << "[TEST 6] Win32 Hardware: Battery & Power Status via Win32... ";
        std::string battery = Win32HardwareOps::GetBatteryStatus();
        assert(!battery.empty());
        std::cout << "PASS (" << battery << ")\n";
        passed++;
    }

    // TEST 7: Native Wi-Fi Query
    total++;
    {
        std::cout << "[TEST 7] Win32 Hardware: WLAN Radio Interface Query... ";
        std::string wifi = Win32HardwareOps::GetWifiStatus();
        assert(!wifi.empty());
        std::cout << "PASS (Interface response: " << wifi.substr(0, 30) << "...)\n";
        passed++;
    }

    // TEST 8: Memory Manager RAM Tracking (GlobalMemoryStatusEx)
    total++;
    {
        std::cout << "[TEST 8] AI Budget: GlobalMemoryStatusEx RAM Budget Check... ";
        size_t freeMb = MemoryManager::GetAvailableSystemRamMb();
        size_t totalMb = MemoryManager::GetTotalSystemRamMb();
        assert(freeMb > 0);
        assert(totalMb > 0);
        bool fits8B = MemoryManager::CanModelFit("qwen2.5-coder:7b", 1024);
        std::cout << "PASS (Free RAM: " << freeMb << " MB / " << totalMb << " MB, Fits 7B: " << (fits8B ? "YES" : "NO") << ")\n";
        passed++;
    }

    // TEST 9: Chat Labeler (Small Model 1.5B adjuster parser)
    total++;
    {
        std::cout << "[TEST 9] Chat Labeler: Mode String Parser... ";
        AdjusterKind kChat = ChatLabeler::ParseKind("chat");
        AdjusterKind kCode = ChatLabeler::ParseKind("code");
        AdjusterKind kComputer = ChatLabeler::ParseKind("computer");
        assert(kChat == AdjusterKind::Chat);
        assert(kCode == AdjusterKind::Code);
        assert(kComputer == AdjusterKind::Computer);
        std::cout << "PASS (Modes: chat, code, computer correctly recognized)\n";
        passed++;
    }

    // TEST 10: Universal Connector Hub Dispatch
    total++;
    {
        std::cout << "[TEST 10] Universal Connector Hub: Win32 Mode Execution... ";
        UniversalConnectorHub hub(nullptr, nullptr);
        ConnectorRequest req;
        req.mode = ConnectorMode::NATIVE_WIN32;
        req.app = "system";
        req.exec = "cmd.exe /c echo fonia_test";
        ConnectorResponse resp = hub.Execute(req);
        assert(resp.success == true);
        std::cout << "PASS (Dispatched Win32 action: " << resp.outputText << ")\n";
        passed++;
    }

    std::cout << "\n=========================================================\n";
    std::cout << " RESULTS: " << passed << " / " << total << " NATIVE C++ ARCHITECTURE TESTS PASSED (100%)\n";
    std::cout << "=========================================================\n";
    return 0;
}
