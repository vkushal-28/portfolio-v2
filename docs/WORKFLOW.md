# Daily workflow — building the portfolio

How to pick up the build each day and take one phase of [`BUILD_PROMPT.md`](./BUILD_PROMPT.md) from start to commit.

---

## Where things stand

| Phase | What | Status |
| --- | --- | --- |
| 0 | Context & working rules | ✅ |
| 1 | Project setup | ✅ |
| 2 | Design system & component library | ✅ |
| 3 | Content data | ✅ |
| 4 | Navbar, scroll progress, footer | ✅ |
| 5 | Hero | ✅ (commit `33c2810`) |
| 6 | Marquee band | ⏭ **next** |
| 7 | About | |
| 8 | Journey / timeline | |
| 9 | Skills bento | |
| 10 | Services & workflow | |
| 11 | Projects | |
| 12 | Contact | |
| 13 | Polish, a11y, performance, SEO | |

Update this table when you commit a phase. `/next-phase` also keeps Claude's own progress memory in sync.

**Open items:** add `public/resume.pdf` (the hero's "Download résumé" link is dead until then).

---

## Starting the day

1. **Open the project** in a terminal and start Claude Code:

   ```bash
   cd ~/"Documents/Claude Code Practice/portfolio-v2"
   claude
   ```

2. **Check you're on the right branch.** All work happens on `v2-design`, not `main`:

   ```text
   ! git branch --show-current
   ! git status --short
   ```

   You want `v2-design` and no output from `git status --short`. `/next-phase` checks both again and asks if something's off.

3. Optionally, **start the dev server** in a second terminal to watch changes live:

   ```bash
   npm run dev
   ```

---

## Building one phase

Run these in order, one phase per session.

### 1. `/next-phase`

Claude finds the next unfinished phase, reads its spec, builds it from the shared components, then runs `build`, `lint` and `/visual-check`. It ends with a summary and stops.

- To build a specific phase: `/next-phase 7`.
- Read the summary's **choices made where the spec was silent** and **anything needed from you**. Answer or correct those before moving on.

### 2. `/visual-check`

`/next-phase` already runs this. Run it again yourself after any follow-up tweaks. It screenshots the site at 1440, 860 and 360px, flags sideways scrolling and console errors, and reviews the shots.

- For a section lower on the page, ask: `/visual-check the #journey section`.

### 3. Look at it yourself

Open `npm run dev` in the browser and check the section at a phone width (DevTools device toolbar). Also turn on **Reduce motion** (macOS: System Settings → Accessibility → Display) and confirm it still looks right without animation.

### 4. `/code-review`

Reviews the uncommitted changes for bugs. `/code-review medium` is a good default. Add `--fix` to apply the fixes.

Optionally run `/simplify` for duplication and reuse cleanups. It fits Phase 0's "reuse components first" rule.

### 5. Commit

Tell Claude **"commit"**. It commits on `v2-design` as `Add <thing> (Phase N)`. Then tick the phase off in the table above.

Push only when you choose to: *"push v2-design"*.

---

## Ending the day

- Commit, or at least know what's uncommitted. `/next-phase` asks about leftovers tomorrow.
- If you stopped mid-phase, tell Claude: *"remember where we stopped"*. It updates its progress memory with what's done and what's left.

---

## Quick reference

| You want to… | Type |
| --- | --- |
| Build the next phase | `/next-phase` |
| Build a specific phase | `/next-phase 9` |
| Screenshot and check layout | `/visual-check` |
| Review changes for bugs | `/code-review medium` |
| Clean up duplication | `/simplify` |
| Run the site locally | `npm run dev` |
| Production build / lint | `npm run build` · `npm run lint` |
| See the component playground | `npm run dev` → `/playground` |
| Run a shell command inside Claude | `! <command>` |

The skills live in `.claude/skills/` (`next-phase`, `visual-check`), so they travel with the repo.
