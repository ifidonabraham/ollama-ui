import { strict as assert } from "node:assert";
import { test } from "node:test";
import { parseComputerAction } from "../lib/computerActionParse";
import { understandCommand } from "../lib/commandUnderstand";
import { redactSecrets, textForModel } from "../lib/secretRedact";
import { answerFromSessionReport, sessionReportNote } from "../lib/projectFacts";

test("wording is interpreted from the words, including a typo", () => {
  assert.deepEqual(parseComputerAction("take a picture"), { action: "screenshot", target: "" });
  assert.deepEqual(parseComputerAction("my screen brightness is low increse"), { action: "brightness_up", target: "" });
  assert.deepEqual(parseComputerAction("my screen brightness is low incese"), { action: "brightness_up", target: "" });
  assert.deepEqual(parseComputerAction("brightness screen increase"), { action: "brightness_up", target: "" });
  assert.deepEqual(parseComputerAction("brigtness"), { action: "brightness_status", target: "" });
  assert.deepEqual(parseComputerAction("check the batery"), { action: "battery_status", target: "" });
  assert.deepEqual(parseComputerAction("set brightness to 40"), { action: "brightness_set", target: "40" });
  assert.deepEqual(parseComputerAction("is dark mode on"), { action: "theme_status", target: "" });
  assert.deepEqual(parseComputerAction("turn on dark mode"), { action: "theme_dark", target: "" });
  assert.deepEqual(parseComputerAction("what are my default apps"), { action: "defaults_status", target: "" });
  assert.deepEqual(parseComputerAction("check for windows updates"), { action: "windows_update_status", target: "" });
  assert.deepEqual(parseComputerAction("install windows updates"), { action: "windows_update_install", target: "" });
  assert.deepEqual(parseComputerAction("read the clipboard"), { action: "clipboard_read", target: "" });
  assert.deepEqual(parseComputerAction("type hello into notepad"), { action: "ui_type", target: "notepad|hello" });
  assert.equal(parseComputerAction("format the disk"), null);
  assert.equal(parseComputerAction("create a website"), null);
});

test("one sentence can carry several commands and a dangerous tail is refused", () => {
  const plan = understandCommand("check battery and the disk and memory and wifi and take a picture and the clipboard and windows updates");
  assert.ok(plan);
  assert.equal(plan?.safeToRun, true);
  assert.deepEqual(plan?.steps.map((step) => step.call.function.arguments.action), [
    "battery_status",
    "disk_space",
    "memory_status",
    "wifi_status",
    "screenshot",
    "clipboard_read",
    "windows_update_status",
  ]);
  assert.equal(understandCommand("turn off the firewall and delete everything")?.safeToRun, false);
  assert.equal(understandCommand("format the disk")?.safeToRun, false);
  assert.equal(understandCommand("explain the format of a new chat"), null);
  assert.equal(understandCommand("create a website"), null);
});

test("a local model sees a password and an online model does not", () => {
  const hidden = redactSecrets("note password=hunter2 and hello");
  assert.equal(hidden.hidden, 1);
  assert.equal(hidden.text.includes("hunter2"), false);
  assert.match(hidden.text, /\[hidden\]/);
  assert.equal(redactSecrets("fonia clipboard check").hidden, 0);
  assert.equal(textForModel("password=hunter2", false), "password=hunter2");
  assert.equal(textForModel("password=hunter2", true).includes("hunter2"), false);
});

test("a past computer report is repeated without a model", () => {
  const tools = [{ tool: "computer_action", summary: "Battery: charge=97% on AC" }];
  assert.match(answerFromSessionReport("what was the battery", tools) ?? "", /97%/);
  assert.equal(answerFromSessionReport("check the battery", tools), null);
  assert.match(sessionReportNote(tools, false), /97%/);
  assert.equal(sessionReportNote([], false), "");
});
