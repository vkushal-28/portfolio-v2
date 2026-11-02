---
name: visual-check
description: Build the portfolio, screenshot it at 1440/860/360px with Playwright, flag horizontal scroll and console errors, and review the shots. Use after finishing a BUILD_PROMPT phase or any visual change, or when the user asks to check how the site looks.
---

# Visual check

Verify the site renders correctly at desktop, the 860px breakpoint, and a 360px phone.

## Steps

1. Build: `npm run build`. Stop and fix if it fails.
2. Serve the build in the background on a fixed port:
   `npx vite preview --port 4317 --strictPort` (use `run_in_background`).
3. Run the screenshot script, writing into the session scratchpad (never the repo):
   `node .claude/skills/visual-check/shot.mjs http://localhost:4317/ <scratchpad>/visual-check [widths] [waitMs]`
   - Default widths `1440,860,360`; default wait 5000ms so load animations finish.
   - To check a section further down, pass its anchor, e.g. `http://localhost:4317/#journey`.
   - Exit code 1 means horizontal overflow or a console error at some width.
4. Read every screenshot with the Read tool and look for: clipped or overlapping text, content cut off at the right edge, elements stuck in their hidden/initial animation state, broken spacing at the 860px breakpoint, and decorative layers covering readable text.
5. Stop the preview server: `pkill -f "vite preview --port 4317"`.
6. Report per width: OK, or the specific problem with the file/line you suspect. Fix issues only if the user asked for fixes or you're inside a phase build; then re-run from step 1.

## Gotchas

- Don't use Chrome's own `--headless --screenshot` for narrow widths: Chrome enforces a ~500px minimum window, so a "360px" shot is really a clipped wider layout. The script uses Playwright viewports, which are exact.
- Playwright comes from the npx cache, driven by the installed Google Chrome; no project dependency is needed. If the script says Playwright is missing, run `npx -y playwright --version` once.
- `whileInView` animations only play for content in the first viewport. Content below the fold appears blank in a top-of-page shot; that's expected. Use an anchor URL to check it.
