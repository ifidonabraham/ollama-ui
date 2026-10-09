import { readFileSync } from "node:fs";
import path from "node:path";

export interface DevTool {
  id: string;
  name: string;
  kind: string;
  status: "installed" | "declared" | "absent";
  projects: number;
  prefer_over: string[];
  when: string;
  evidence: string[];
}

export interface DevCatalog {
  schema: number;
  updated: string;
  reusable: string;
  audit: { projects: number; manifests: number; note: string };
  tools: DevTool[];
  listed_not_downloaded?: {
    website: string[];
    web3d: string[];
    files: string[];
    desktop3d: string[];
  };
}

const TASKS: Record<string, string> = {
  website: "next",
  "3d": "three",
  scrape: "httpx",
  "python-api": "fastapi",
  mobile: "react-native",
  "node-api": "express",
};

let cached: DevCatalog | null = null;

export function loadDevCatalog(file = path.join(process.cwd(), "resources", "dev-catalog.json")): DevCatalog {
  if (cached && file === path.join(process.cwd(), "resources", "dev-catalog.json")) return cached;
  const catalog = JSON.parse(readFileSync(file, "utf8")) as DevCatalog;
  if (file === path.join(process.cwd(), "resources", "dev-catalog.json")) cached = catalog;
  return catalog;
}

export function toolById(catalog: DevCatalog, id: string): DevTool | null {
  return catalog.tools.find((tool) => tool.id === id) ?? null;
}

/** The stack to use for a kind of work, based on what is actually installed. */
export function preferredTool(task: string, catalog: DevCatalog): DevTool | null {
  const id = TASKS[task];
  if (!id) return null;
  return toolById(catalog, id);
}

export function renderDevResourceNote(catalog: DevCatalog): string {
  const ready = catalog.tools.filter((tool) => tool.status === "installed").map((tool) => tool.name);
  const missing = catalog.tools.filter((tool) => tool.status === "absent").map((tool) => tool.name);
  const declared = catalog.tools.filter((tool) => tool.status === "declared").map((tool) => tool.name);
  return [
    "Development resources are listed in resources/dev-catalog.json. Other local projects can read the same catalog.",
    "A website uses Next.js, React, and TypeScript. Do not start a plain HTML page when Next.js is installed or the workspace already depends on next.",
    "A 3D section uses three.js with React Three Fiber inside that web app.",
    `Installed here: ${ready.join(", ")}.`,
    `Already named in a project file, and only for that project: ${declared.join(", ")}.`,
    `Not installed. Do not import them until the user adds them: ${missing.join(", ")}.`,
    "Match the open workspace. A Vite project stays on Vite. A Django requirements file stays on Django.",
    "A 3D object in Blender is built by Blender through bpy. A 3D section of a website uses three.js.",
    "shadcn/ui, tRPC, Drizzle, Prisma, NextAuth, Clerk, Stripe, MDX, Sanity, Leaflet, and Mapbox are on disk in %LOCALAPPDATA%\\Fonia\\resources\\web-libs. They are not part of this Fonia app. Clerk, Stripe, Sanity, and Mapbox still need your own account keys.",
    "Names still left in listed_not_downloaded were not installed.",
  ].join(" ");
}

export function devResourceNote(): string {
  try {
    return renderDevResourceNote(loadDevCatalog());
  } catch {
    return "";
  }
}
