# Ollama UI Task Orders

Implementation rule: complete and validate one task before starting the next. Do not implement later tasks in parallel.

## Architecture Task 1 - Intent Router
Status: Complete

- [x] Classify casual, explanation, coding, deep coding, and image requests.
- [x] Share the classifier between model routing and tool permissions.
- [x] Run deep requests through a sequential reasoning planner and coding executor.
- [x] Add visible intent and routing reason in the UI.
- [x] Add classifier tests for false positives and short messages.
- [x] Validate that casual requests never inspect files or directories.

## Architecture Task 2 - Planner and Executor Handoff
Status: In progress

- [x] Load a reasoning planner for deep requests.
- [x] Pass only recent conversation context to the planner.
- [x] Persist the planner handoff in Agent session history.
- [x] Release the planner model before loading the coder.
- [x] Pass the plan to the coding executor.
- [x] Persist executor decisions, warnings, and review notes.
- [x] Run verification after execution.
- [ ] Validate planner failure and low-memory fallback behavior.

## Architecture Task 3 - Session Memory
Status: Complete

- [x] Persist conversation and Agent handoff plans.
- [x] Persist inspected files and bounded tool-result summaries.
- [x] Persist decisions, verification commands, current phase, model, and role.
- [x] Reuse session memory in future Agent prompts.
- [x] Avoid automatic workspace rescans when cached context is available.
- [x] Bound stored memory to prevent database and prompt growth.

## Architecture Task 4 - RAM-Aware Scheduling
Status: In progress

- [x] Serialize Agent model operations.
- [x] Track free system RAM and model sizes.
- [x] Estimate model load cost from Ollama model size.
- [x] Track the active model, loaded models, and queue depth.
- [x] Unload the previous model before loading the next one.
- [x] Enforce a model load/inference timeout.
- [x] On a timeout, check whether Ollama is still up. Do not kill `llama-server` while that server is answering.
- [x] Show scheduler state in the UI.
- [ ] Add request cancellation handling to the scheduler.
- [ ] Add a configurable RAM/model retention policy.
- [ ] Validate low-memory fallback, queueing, and timeout behavior.

## Architecture Task 5 - Cancellation and Resumable Jobs
Status: In progress

- [x] Add server-side job identifiers and job state.
- [x] Propagate browser cancellation to Ollama fetches and tool loops.
- [x] Persist running, completed, failed, and cancelled states.
- [x] Expose session job history and reconnectable job-status lookup.
- [ ] Add retry and timeout policy per job phase.
- [ ] Validate cancellation during model inference and command execution.

## Architecture Task 6 - Repository Indexing and Context Selection
Status: Queued

- [ ] Build a persistent, gitignore-aware repository index.
- [ ] Index symbols, files, language, size, and dependencies.
- [ ] Add incremental updates when files change.
- [ ] Select relevant context within a model token budget.
- [ ] Add symbol-aware search and repository summaries.
- [ ] Validate large repositories and ignored files.

## Architecture Task 7 - Automatic Verification and Repair
Status: Queued

- [ ] Detect project package manager and available scripts.
- [ ] Run targeted tests, lint, typecheck, and build after changes.
- [ ] Feed structured failures back to the Agent.
- [ ] Limit automatic repair loops and detect repeated failures.
- [ ] Present verification results with affected files.
- [ ] Add regression tests for the verification pipeline.

## Architecture Task 8 - Capability-Aware Model Routing
Status: Queued

- [ ] Read actual Ollama model metadata and capabilities.
- [ ] Detect tool calling, vision, context length, and model size.
- [ ] Measure response speed and model load cost.
- [ ] Route quick, coding, complex, and image tasks from capabilities.
- [ ] Add fast, balanced, and quality routing policies.
- [ ] Add fallbacks when a selected model rejects tools or images.

## Architecture Task 9 - Workspace Workflow Features
Status: Queued

- [ ] Add conversation search and export/import.
- [ ] Add plan mode and explicit edit/command approvals.
- [ ] Add per-file and per-hunk diff review.
- [ ] Add safe undo, restore, branch, and commit workflows.
- [ ] Add file watchers and stale-context detection.
- [ ] Add user-facing keyboard shortcuts and job history.
