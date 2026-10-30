---
name: next-phase
description: Resume the portfolio build. Find the next unfinished phase of docs/BUILD_PROMPT.md, build it to spec, verify with build/lint and a visual check, then summarise and record progress. Use when the user says "next phase", "continue", "start where we stopped", or names a phase number.
argument-hint: '[phase number, optional]'
---

# Next phase

Build exactly one phase of `docs/BUILD_PROMPT.md`, then stop.

## 1. Orient

- Branch must be `v2-design` (`git branch --show-current`). If not, ask before switching.
- `git status --short` must be clean. If there are uncommitted changes, tell the user what they are and ask whether to commit them as the previous phase, keep them as part of this phase, or stop.
- Find the phase to build:
  - If the user passed a number (`$ARGUMENTS`), use it.
  - Otherwise take the last finished phase from the build-progress memory and the `git log` messages (each phase commit ends in `(Phase N)`), and pick the next one.
  - Say in one line which phase you're starting and why.

## 2. Read the spec

- Read Phase 0 (working rules) and the target phase in full: `grep -n "^## " docs/BUILD_PROMPT.md` gives the line ranges. Also read the "Applies to Phases 4–12" note in Phase 4 when building any section.
- Read the shared components you'll compose (`src/components/ui`, `src/components/motion`) and the data files the phase uses (`src/data`). Don't re-create what exists.

## 3. Build

Follow the Phase 0 rules. These come up most:

- Content lives in `src/data/*.ts`, never hard-coded in a section.
- Compose sections from `components/ui` and `components/motion`. If a pattern could repeat, add it there as a typed component with `variant`/`size`/`className` props, and export it through the folder's `index.ts`.
- Use only Phase 2 colour tokens (no raw hex in sections except data-driven colours).
- Every animation respects `useReducedMotion()`. Decorative layers are `aria-hidden`.
- Add the new section to `src/sections/index.ts` and replace its temporary placeholder in `src/App.tsx`.
- No new dependencies without asking.

## 4. Verify

- `npm run build` and `npm run lint` must both pass; fix everything.
- Run the `visual-check` skill (pass the section's anchor URL if it's below the fold) and fix what it finds.
- Check the phase's own **Done when** line item by item.

## 5. Finish

- Update the build-progress memory: the phase just finished, that it's uncommitted, the next phase, and any open items, spec deviations or gotchas worth keeping.
- Summarise briefly: what you built, files created/changed, shared components used, new shared components added, choices made where the spec was silent, and anything you need from the user.
- Offer to commit. On a yes, commit on `v2-design` with the message `Add <thing> (Phase N)`. Don't push unless asked.
- Then stop. Don't start the following phase.
