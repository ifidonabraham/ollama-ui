import { strict as assert } from "node:assert";
import { test } from "node:test";
import { loadDevCatalog, preferredTool, renderDevResourceNote, toolById } from "../lib/devResources";

test("a website prefers the installed Next.js stack over a plain page", () => {
  const catalog = loadDevCatalog();
  const next = toolById(catalog, "next");
  const soup = toolById(catalog, "beautifulsoup");
  const three = toolById(catalog, "three");
  assert.equal(next?.status, "installed");
  assert.equal(next?.prefer_over.includes("html"), true);
  assert.equal(preferredTool("website", catalog)?.id, "next");
  assert.equal(preferredTool("3d", catalog)?.id, "three");
  assert.equal(three?.status, "installed");
  assert.equal(soup?.status, "installed");
  assert.equal(preferredTool("scrape", catalog)?.id, "httpx");
  assert.equal(toolById(catalog, "django")?.status, "installed");
  assert.match(toolById(catalog, "django")?.when ?? "", /Next\.js/);
  assert.equal(toolById(catalog, "flask")?.status, "installed");

  const note = renderDevResourceNote(catalog);
  assert.equal(note.includes("Next.js"), true);
  assert.equal(note.includes("plain HTML"), true);
  assert.equal(note.includes("three.js"), true);
  assert.equal(note.includes("Beautiful Soup"), true);
  assert.equal(note.includes("web-libs"), true);
  assert.equal(note.includes("not part of this Fonia app"), true);
  assert.equal(note.includes("Do not import them"), true);
});
