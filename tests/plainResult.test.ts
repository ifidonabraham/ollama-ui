import { strict as assert } from "node:assert";
import { test } from "node:test";
import { plainComputerResult, presentComputerResult, toolResultFailed } from "../lib/plainResult";

const PASTED = [
  "Error: Internal Microphone (2- Conexant ISST Audio) Generic failure",
  "Error: Internal Microphone (Conexant ISST Audio) Generic failure",
  "Error: Digital microphone device Generic failure",
].join("\n");

test("a hardware microphone failure is explained without a model", () => {
  const spoken = plainComputerResult("device_disable", "microphone", PASTED);
  assert.match(spoken, /still on/);
  assert.match(spoken, /Generic failure/);
  assert.match(spoken, /not allowed to disable/);
  const shown = presentComputerResult("device_disable", "microphone", PASTED);
  assert.match(shown, /Computer reading:/);
  assert.match(shown, /Conexant/);
  assert.equal(toolResultFailed(shown), true);
});

test("a confirmed mute is said in plain language", () => {
  const reading = "Microphone: muted=True level=0 | muted=True level=0 consent=Deny";
  const spoken = plainComputerResult("microphone_off", "", reading);
  assert.match(spoken, /off for now/);
  assert.match(spoken, /not removed/);
  assert.equal(toolResultFailed(presentComputerResult("microphone_off", "", reading)), false);
});

test("privacy deny without a confirmed mute is not called off", () => {
  const reading = "Microphone: role1=No capture device consent=Deny";
  const spoken = plainComputerResult("microphone_off", "", reading);
  assert.match(spoken, /blocked/);
  assert.match(spoken, /could not be confirmed/);
  assert.equal(toolResultFailed(spoken), true);
});

test("turning the microphone on is a separate sentence", () => {
  const spoken = plainComputerResult("microphone_on", "", "Microphone: muted=False level=40 consent=Allow");
  assert.match(spoken, /on again/);
  assert.match(spoken, /Listen/);
});

test("other device failures stay plain and status numbers stay with the report model", () => {
  assert.match(plainComputerResult("device_disable", "camera", "Error: Integrated Camera Generic failure"), /still as it was/);
  assert.match(plainComputerResult("device_disable", "touchpad", "Too many devices. Name one of: A, B"), /nothing was changed/i);
  assert.match(plainComputerResult("device_disable", "widget", "No device matched: widget"), /No device with that name/);
  assert.equal(plainComputerResult("battery_status", "", "Battery: charge=80% on AC"), "");
  assert.equal(toolResultFailed("No output for 30 seconds, so this was stopped."), true);
});
