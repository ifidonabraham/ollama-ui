export type JobStatus = "queued" | "running" | "completed" | "failed" | "cancelled";

export interface AgentJob {
  id: string;
  session_id?: string;
  status: JobStatus;
  phase: string;
  model?: string;
  role?: string;
  created_at: number;
  updated_at: number;
  error?: string;
}

import { getAgentJob as getStoredAgentJob, saveAgentJob } from "@/lib/db";

const jobs = new Map<string, AgentJob>();
const steerNotes = new Map<string, string[]>();

/** A note typed while this job is still running. It is read on the next model step. */
export function pushSteerNote(id: string, text: string): boolean {
  const job = jobs.get(id);
  const note = text.trim().slice(0, 2000);
  if (!job || job.status !== "running" || !note) return false;
  const list = steerNotes.get(id) ?? [];
  list.push(note);
  steerNotes.set(id, list);
  return true;
}

export function takeSteerNotes(id?: string): string[] {
  if (!id) return [];
  const list = steerNotes.get(id) ?? [];
  if (list.length) steerNotes.set(id, []);
  return list;
}

export function createJob(id: string, session_id?: string): AgentJob {
  const now = Date.now();
  const job: AgentJob = { id, session_id, status: "queued", phase: "queued", created_at: now, updated_at: now };
  jobs.set(id, job);
  saveAgentJob({ ...job, model: job.model ?? "", role: job.role ?? "" });
  return job;
}

export function getJob(id: string): AgentJob | undefined {
  const current = jobs.get(id);
  if (current) return current;
  const stored = getStoredAgentJob(id);
  if (!stored) return undefined;
  return { ...stored, status: stored.status as JobStatus, model: stored.model || undefined, role: stored.role || undefined };
}

export function updateJob(id: string, patch: Partial<Omit<AgentJob, "id" | "created_at">>): AgentJob | undefined {
  const current = jobs.get(id);
  if (!current) return undefined;
  const next = { ...current, ...patch, updated_at: Date.now() };
  jobs.set(id, next);
  saveAgentJob({ ...next, model: next.model ?? "", role: next.role ?? "" });
  return next;
}

export function cancelJob(id: string): AgentJob | undefined {
  return updateJob(id, { status: "cancelled", phase: "cancelled" });
}

export function isJobCancelled(id?: string): boolean {
  return !!id && jobs.get(id)?.status === "cancelled";
}
