# AGENTS.md — Entry point for AI coding agents

> **Read this first. Everything an agent needs to know starts here.**

You are working in the repository of a **premium personal website** (portfolio + writing + consulting conversion). The website code is not built yet — the repository currently contains the complete project planning package plus this pointer.

## 1. Start here (mandatory)

1. Open `project-planning/README.md` and read its **§2 mandatory reading order** (12 files) before writing any code.
2. Then read `project-planning/06-agents/ai-agent-instructions.md` — the global rules that bind every agent (constraints, definition of done, communication).
3. Check current task statuses in `project-planning/05-roadmap/task-breakdown.md` and the decision log (`project-planning/09-decisions/decision-log.md`) — pick up tasks in P-* order.

## 2. Non-negotiable (summary — details in ai-agent-instructions §2)

- TypeScript strict, zero `any` · no new runtime deps without a Decision Log entry · tokens-only styling · performance budgets (LCP ≤ 1.8 s, INP ≤ 200 ms, JS ≤ 150 KB gz) · WCAG 2.2 AA + reduced motion · no cookies/trackers except Plausible · secrets server-only · static-first content · no placeholder copy shipped.

## 3. Ready-to-use prompts

`project-planning/06-agents/prompts/01-…06-*.md` are copy-paste session prompts for phases P0–P7. Use them as handoffs for fresh sessions.

## 4. Rules of engagement

- **Plan first, code second** (goal → acceptance criteria → files → implement → verify → update docs/tasks).
- Verify with the repo gates: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` (+ `pnpm e2e` when present).
- Never fake polish: if you can't verify, say so; never claim green without running the command.
- Docs reflect reality: any behavior change updates the affected docs and task statuses.
- Out-of-scope requests go to `project-planning/09-decisions/notes-and-assumptions.md` as `suggestion` — never built silently.
- Final owner message: What (built) · Evidence (commands + results) · Open items / decisions needed · Next task suggestion.

*The human is the owner and final editor of all copy and strategic decisions. When in doubt, ask — but keep moving through unblocked work first.*
