import { strict as assert } from "node:assert";
import { test } from "node:test";
import { answerRequiresEvidence, classifyIntent, imageStaysWithVision, isLocalComputerTask, isSimpleAction, refersToPriorAction } from "../lib/intent";

test("casual messages do not receive tools", () => {
  assert.deepEqual(classifyIntent("hi"), {
    intent: "casual",
    needsTools: false,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("hello how are you"), {
    intent: "casual",
    needsTools: false,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("thank you!"), {
    intent: "casual",
    needsTools: false,
    needsWriteAccess: false,
  });
});

test("scan and inspection requests receive tools without unsolicited writes", () => {
  assert.deepEqual(classifyIntent("scan this folder C:\\Users\\PC\\ollama-ui"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("run a command in terminal to check the directory"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: true,
  });
});

test("code changes receive tools and write access", () => {
  assert.deepEqual(classifyIntent("fix the API error in this project"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: true,
  });
});

test("code explanation can use read-only tools", () => {
  assert.deepEqual(classifyIntent("explain this repository"), {
    intent: "explain",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("tell me about this project"), {
    intent: "explain",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("what are you coding"), {
    intent: "explain",
    needsTools: true,
    needsWriteAccess: false,
  });
});

test("large architecture requests are deep tasks", () => {
  assert.deepEqual(classifyIntent("design the architecture for a multi-file system"), {
    intent: "deep",
    needsTools: true,
    needsWriteAccess: false,
  });
});

test("opening an app or reading media uses tools and does not write files", () => {
  assert.equal(isLocalComputerTask("open blender"), true);
  assert.deepEqual(classifyIntent("open blender"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("watch Video: C:\\clips\\demo.mp4"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.equal(classifyIntent("hi").intent, "casual");
  assert.equal(classifyIntent("install ffmpeg").needsTools, true);
  assert.equal(classifyIntent("eject the flash drive").needsTools, true);
  assert.equal(classifyIntent("eject the flash drive").needsWriteAccess, false);
  assert.equal(classifyIntent("what is a usb stick").needsTools, false);
  assert.equal(classifyIntent("what is a usb stick").needsWriteAccess, false);
  assert.equal(classifyIntent("explain how to install ffmpeg").needsTools, false);
  assert.deepEqual(classifyIntent("turn on bluetooth"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("is chrome running"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("can you check the percentage of my system"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.deepEqual(classifyIntent("create a website"), {
    intent: "code",
    needsTools: true,
    needsWriteAccess: true,
  });
});

test("images require the vision pipeline", () => {
  assert.deepEqual(classifyIntent("what is shown here", true), {
    intent: "image",
    needsTools: true,
    needsWriteAccess: false,
  });
});

test("follow-ups about a claimed file require evidence and do not grant writes", () => {
  assert.equal(refersToPriorAction("did you successfully create it"), true);
  assert.equal(refersToPriorAction("how did you know about the image request"), false);
  assert.equal(classifyIntent("how did you know about the image request").needsTools, false);
  assert.equal(imageStaysWithVision("analyse"), true);
  assert.equal(imageStaysWithVision("change the button color"), false);
  assert.deepEqual(classifyIntent("did you successfully create it"), {
    intent: "explain",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.equal(answerRequiresEvidence("what type of file is it that you created"), true);
  assert.deepEqual(classifyIntent("brief me on this folder C:\\Users\\PC\\ollama-ui"), {
    intent: "explain",
    needsTools: true,
    needsWriteAccess: false,
  });
  assert.equal(answerRequiresEvidence("hi"), false);
});

test("short file operations are simple actions", () => {
  assert.equal(isSimpleAction("create a file named ola in my pc folder"), true);
  assert.equal(isSimpleAction("create a complete application from scratch"), false);
  assert.equal(isSimpleAction("Run: git diff HEAD and show me what changed"), true);
});
