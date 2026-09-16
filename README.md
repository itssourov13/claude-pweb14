# Alex Morgan — Personal Website

Premium personal website (portfolio + writing + consulting conversion). Built
with Next.js 15 (App Router), TypeScript strict, and Tailwind CSS v4.

**Full planning package:** [`project-planning/README.md`](project-planning/README.md)
**Agent entry point:** [`AGENTS.md`](AGENTS.md)

## Status

Phase **P0 (Foundation) + P1 (core shell/design system) scaffolded**: tokens,
fonts, header/footer, theming, primitives kit, CI, lint/format/test config.
Not yet done: content collections (Velite), section components, motion,
contact form endpoint, SEO/JSON-LD, e2e suite. See
`project-planning/05-roadmap/development-roadmap.md` for the full phase plan
and `project-planning/05-roadmap/task-breakdown.md` for granular tasks.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in real values before wiring the
contact form (Resend + Upstash) in Phase P5.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Local dev server |
| `pnpm build` | Production build |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` (strict) |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm test` | Vitest unit tests |
| `pnpm e2e` | Playwright e2e (once written) |

## Conventions

Tokens are law — see `project-planning/01-brand/design-guidelines.md`. Never
hard-code a hex/px value in a component; consume the CSS variables mapped in
`src/app/globals.css`. Folder layout follows
`project-planning/03-architecture/folder-structure.md` exactly.
