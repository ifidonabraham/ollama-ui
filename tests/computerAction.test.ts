import { strict as assert } from "node:assert";
import { test } from "node:test";
import { parseComputerAction } from "../lib/computerActionParse";
import { directUserAction } from "../lib/directAction";
import { cleanTranscript, pickAudioDevice, runComputerAction, speechEngineFailed } from "../lib/computerActions";

test("one-line PC checks are server actions", () => {
  assert.deepEqual(parseComputerAction("turn on bluetooth"), { action: "bluetooth_on", target: "" });
  assert.deepEqual(parseComputerAction("turn off the firewall"), { action: "firewall_off", target: "" });
  assert.deepEqual(parseComputerAction("check disk space"), { action: "disk_space", target: "" });
  assert.deepEqual(parseComputerAction("how much ram is free?"), { action: "memory_status", target: "" });
  assert.deepEqual(parseComputerAction("wifi status"), { action: "wifi_status", target: "" });
  assert.deepEqual(parseComputerAction("is node running well?"), { action: "process_status", target: "node" });
  assert.deepEqual(parseComputerAction("check the service Spooler running"), { action: "service_status", target: "Spooler" });
  assert.deepEqual(parseComputerAction("take a screenshot"), { action: "screenshot", target: "" });
  assert.deepEqual(parseComputerAction("say hello"), { action: "speak", target: "hello" });
  assert.deepEqual(parseComputerAction("listen"), { action: "listen", target: "6" });
  assert.deepEqual(parseComputerAction("transcribe C:\\audio\\note.wav"), { action: "transcribe", target: "C:\\audio\\note.wav" });
  assert.deepEqual(parseComputerAction("pc status"), { action: "components_status", target: "" });
  assert.deepEqual(parseComputerAction("all components"), { action: "components_status", target: "" });
  assert.deepEqual(parseComputerAction("check battery"), { action: "battery_status", target: "" });
  assert.deepEqual(parseComputerAction("cpu status"), { action: "cpu_status", target: "" });
  assert.deepEqual(parseComputerAction("check my network"), { action: "network_status", target: "" });
  assert.deepEqual(parseComputerAction("set volume to 30%"), { action: "volume_set", target: "30" });
  assert.deepEqual(parseComputerAction("devices"), { action: "devices_status", target: "" });
  assert.deepEqual(parseComputerAction("restart the computer"), { action: "restart", target: "" });
  assert.deepEqual(parseComputerAction("shut down the pc"), { action: "shutdown", target: "" });
  assert.deepEqual(parseComputerAction("sleep"), { action: "sleep", target: "" });
  assert.deepEqual(parseComputerAction("stop node"), { action: "process_stop", target: "node" });
  assert.deepEqual(parseComputerAction("start the service Spooler"), { action: "service_start", target: "Spooler" });
  assert.deepEqual(parseComputerAction("disable camera"), { action: "device_disable", target: "camera" });
  assert.equal(parseComputerAction("format the disk"), null);
  assert.deepEqual(parseComputerAction("eject the flash drive"), { action: "eject_drive", target: "" });
  assert.deepEqual(parseComputerAction("eject drive e:"), { action: "eject_drive", target: "E" });
  assert.deepEqual(parseComputerAction("safely remove the usb stick"), { action: "eject_drive", target: "" });
  assert.deepEqual(parseComputerAction("how full is my drive"), { action: "disk_space", target: "" });
});

test("mixed or unsafe PC sentences stay with the model", () => {
  assert.equal(parseComputerAction("turn off firewall and delete everything"), null);
  assert.equal(parseComputerAction("ensure that this process is running"), null);
  assert.equal(parseComputerAction("create a website"), null);
  assert.equal(parseComputerAction("say read the project aloud"), null);
  assert.equal(directUserAction("turn on bluetooth and tell me why"), null);
  assert.deepEqual(directUserAction("open blender"), {
    function: { name: "launch_app", arguments: { name: "blender" } },
  });
  assert.deepEqual(directUserAction("firewall status"), {
    function: { name: "computer_action", arguments: { action: "firewall_status", target: "" } },
  });
});

test("spoken paraphrases map onto one existing command", () => {
  const battery = { action: "battery_status", target: "" };
  const disk = { action: "disk_space", target: "" };
  const memory = { action: "memory_status", target: "" };
  const cases: Array<[string, { action: string; target: string } | null]> = [
    ["can you check the percentage of my system", battery],
    ["hey fonia what's my battery percentage", battery],
    ["how much charge is left", battery],
    ["how much battery do I have", battery],
    ["check the battery level", battery],
    ["what's the charge remaining", battery],
    ["percentage of my laptop", battery],
    ["is my battery low", battery],
    ["please check my charge level", battery],
    ["tell me the system percentage", battery],
    ["how much power is left", battery],
    ["could you check on the battery for me", battery],
    ["how full is my drive", disk],
    ["percentage of my disk", disk],
    ["how much storage is free", disk],
    ["free space on the drive", disk],
    ["check storage left", disk],
    ["what's the disk percentage", disk],
    ["how much space is left on the disk", disk],
    ["hey fonia can you check disk usage", disk],
    ["how much ram am I using", memory],
    ["percentage of memory", memory],
    ["what's my memory usage", memory],
    ["check the ram", memory],
    ["what percent of ram is used", memory],
    ["how's the processor", { action: "cpu_status", target: "" }],
    ["cpu load percentage", { action: "cpu_status", target: "" }],
    ["check the cpu", { action: "cpu_status", target: "" }],
    ["what's my processor doing", { action: "cpu_status", target: "" }],
    ["how's the graphics card", { action: "gpu_status", target: "" }],
    ["check the video card", { action: "gpu_status", target: "" }],
    ["check the graphics", { action: "gpu_status", target: "" }],
    ["what's my screen resolution", { action: "display_status", target: "" }],
    ["check the monitor", { action: "display_status", target: "" }],
    ["am I connected to wifi", { action: "wifi_status", target: "" }],
    ["how's the wi-fi", { action: "wifi_status", target: "" }],
    ["is the wireless connected", { action: "wifi_status", target: "" }],
    ["check the wifi network", { action: "wifi_status", target: "" }],
    ["check the internet", { action: "network_status", target: "" }],
    ["am I online", { action: "network_status", target: "" }],
    ["show the network adapters", { action: "network_status", target: "" }],
    ["how is my computer", { action: "components_status", target: "" }],
    ["check my system", { action: "components_status", target: "" }],
    ["give me a full status of this pc", { action: "components_status", target: "" }],
    ["how's my pc doing", { action: "components_status", target: "" }],
    ["how loud is it", { action: "volume_status", target: "" }],
    ["what's the current volume", { action: "volume_status", target: "" }],
    ["is the volume muted", { action: "volume_status", target: "" }],
    ["can you mute the sound", { action: "volume_mute", target: "" }],
    ["turn the sound off", { action: "volume_mute", target: "" }],
    ["unmute the speakers", { action: "volume_unmute", target: "" }],
    ["set the volume to 40", { action: "volume_set", target: "40" }],
    ["make the volume 15", { action: "volume_set", target: "15" }],
    ["set volume to 30 percent", { action: "volume_set", target: "30" }],
    ["is bluetooth enabled", { action: "bluetooth_status", target: "" }],
    ["check if bluetooth is on", { action: "bluetooth_status", target: "" }],
    ["can you turn bluetooth off", { action: "bluetooth_off", target: "" }],
    ["please enable bluetooth", { action: "bluetooth_on", target: "" }],
    ["is the firewall up", { action: "firewall_status", target: "" }],
    ["can you turn the firewall off", { action: "firewall_off", target: "" }],
    ["enable the firewall", { action: "firewall_on", target: "" }],
    ["what printers do I have", { action: "printers_status", target: "" }],
    ["do I have a printer", { action: "printers_status", target: "" }],
    ["is the webcam connected", { action: "camera_status", target: "" }],
    ["do I have a webcam", { action: "camera_status", target: "" }],
    ["turn off the camera", { action: "device_disable", target: "camera" }],
    ["enable the camera", { action: "device_enable", target: "camera" }],
    ["are my speakers working", { action: "audio_status", target: "" }],
    ["what speakers are installed", { action: "audio_status", target: "" }],
    ["list connected devices", { action: "devices_status", target: "" }],
    ["show my devices", { action: "devices_status", target: "" }],
    ["which power plan is active", { action: "power_status", target: "" }],
    ["what starts with windows", { action: "startup_status", target: "" }],
    ["what opens at startup", { action: "startup_status", target: "" }],
    ["what's installed", { action: "programs_status", target: "" }],
    ["list what is installed", { action: "programs_status", target: "" }],
    ["find the program Chrome", { action: "programs_status", target: "chrome" }],
    ["is Chrome installed", { action: "programs_status", target: "chrome" }],
    ["turn off the computer", { action: "shutdown", target: "" }],
    ["power off the pc", { action: "shutdown", target: "" }],
    ["can you shut down", { action: "shutdown", target: "" }],
    ["can you reboot", { action: "restart", target: "" }],
    ["restart my laptop", { action: "restart", target: "" }],
    ["put the computer to sleep", { action: "sleep", target: "" }],
    ["suspend the laptop", { action: "sleep", target: "" }],
    ["go to sleep", { action: "sleep", target: "" }],
    ["is chrome running", { action: "process_status", target: "chrome" }],
    ["check if node is running", { action: "process_status", target: "node" }],
    ["check whether chrome is running", { action: "process_status", target: "chrome" }],
    ["make sure chrome is running", { action: "process_status", target: "chrome" }],
    ["kill chrome", { action: "process_stop", target: "chrome" }],
    ["end the process notepad", { action: "process_stop", target: "notepad" }],
    ["close chrome", { action: "process_stop", target: "chrome" }],
    ["quit notepad", { action: "process_stop", target: "notepad" }],
    ["is the spooler service running", { action: "service_status", target: "spooler" }],
    ["start the spooler service", { action: "service_start", target: "spooler" }],
    ["stop service Spooler", { action: "service_stop", target: "Spooler" }],
    ["hey fonia take a screenshot", { action: "screenshot", target: "" }],
    ["capture the screen", { action: "screenshot", target: "" }],
    ["what is on my screen", { action: "screenshot", target: "" }],
    ["can you hear me", { action: "listen", target: "6" }],
    ["fonia listen", { action: "listen", target: "6" }],
    ["can you say hello", { action: "speak", target: "hello" }],
    ["can you transcribe C:\\audio\\note.wav", { action: "transcribe", target: "c:\\audio\\note.wav" }],
    ["disable the touchpad", { action: "device_disable", target: "touchpad" }],
    ["turn on the touchpad", { action: "device_enable", target: "touchpad" }],
    ["turn off the microphone", { action: "microphone_off", target: "" }],
    ["disable the microphone", { action: "microphone_off", target: "" }],
    ["turn on the microphone", { action: "microphone_on", target: "" }],
    ["format the disk", null],
    ["create a website", null],
    ["turn off wifi", null],
    ["check the battery and the disk", null],
    ["restart node", null],
    ["say read the project aloud", null],
    ["how are you", null],
    ["in charge of the project", null],
    ["turn off the firewall and delete everything", null],
    ["will the computer shut down", null],
    ["is a restart needed", null],
    ["how do I sleep", null],
    ["turn the volume up", null],
    ["close the window", null],
    ["stop it", null],
    ["is the service running", null],
    ["fix the battery indicator in the app", null],
    ["design the architecture for a multi-file system", null],
  ];
  assert.equal(cases.length >= 100, true, `expected about 100 phrases, got ${cases.length}`);
  for (const [phrase, expected] of cases) {
    assert.deepEqual(parseComputerAction(phrase), expected, phrase);
  }
  assert.deepEqual(directUserAction("can you check the percentage of my system"), {
    function: { name: "computer_action", arguments: { action: "battery_status", target: "" } },
  });
});

test("eject leaves a fixed disk alone", async () => {
  const fixed = await runComputerAction("eject_drive", "C");
  assert.match(fixed, /fixed disk/i);
  const wiped = await runComputerAction("eject_drive", "format");
  assert.match(wiped, /fixed disk/i);
});

test("a failed speech recognizer is handed to the installed whisper model", () => {
  assert.equal(speechEngineFailed("Error: No recognizer is installed."), true);
  assert.equal(speechEngineFailed("Heard: check the battery"), false);
  assert.equal(speechEngineFailed("No speech recognized."), false);
  assert.equal(speechEngineFailed("Error: The PC check timed out."), false);
  assert.equal(pickAudioDevice(["Stereo Mix", "Microphone Array (Realtek)"]), "Microphone Array (Realtek)");
  assert.equal(cleanTranscript("whisper_init_from_file: loading model\ncheck the battery"), "check the battery");
});

test("an unknown computer action is rejected before any command", async () => {
  assert.equal(await runComputerAction("format_disk"), "Error: Unknown computer action: format_disk");
  assert.match(await runComputerAction("process_status", "bad name"), /Error: Name the process/);
  assert.match(await runComputerAction("process_stop", "lsass"), /stays running/);
  assert.match(await runComputerAction("device_disable", "keyboard"), /stays available/);
});
