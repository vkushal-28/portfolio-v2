# Kushal Vala — Portfolio

Single-page developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4 and Motion.

## Getting started

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev       # local dev server with HMR
```

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                           |
| `npm run build`        | Type-check and build a static site into `dist/`     |
| `npm run preview`      | Serve the built `dist/` locally to check production |
| `npm run lint`         | ESLint                                              |
| `npm run format`       | Prettier (with Tailwind class sorting)              |
| `npm run format:check` | Prettier in check mode (for CI)                     |

## Editing content

All copy lives in `src/data/` — sections never hard-code text.

| File                              | Content                                                       |
| --------------------------------- | ------------------------------------------------------------- |
| `profile.ts`                      | Name, headline, about, stats, email, résumé URL, portrait     |
| `socials.ts`                      | GitHub / LinkedIn / X links                                   |
| `experience.ts`                   | Journey timeline (newest first)                               |
| `skills.ts`                       | Skill groups and the core stack                               |
| `services.ts`, `workflow.ts`      | Services and the "How I work" steps                           |
| `projects.ts`                     | Projects, links and screenshots                               |
| `seo.ts`                          | Site URL, page title/description, social card, JSON-LD        |
| `hero.ts`, `about.ts`, `journey.ts`, `toolkit.ts`, `offer.ts`, `work.ts`, `contact.ts` | Section-level copy |

Images: import them from `src/assets/` (or put them in `public/`) and set `profile.portrait` / `project.image`.
The résumé goes in `public/resume.pdf`.

### Contact form

The form posts through `sendMessage()` in `src/lib/contact.ts`, which currently only simulates a send.
Wire it to [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com) or a serverless function before going live.

## Project structure

```
src/
  components/
    ui/        shared presentational components (Button, Card, FilterTabs, WindowFrame…)
    motion/    animation components and presets (Reveal, Stagger, Marquee, Orbit…)
    layout/    Navbar, MobileMenu, Footer, SkipLink, ScrollProgress
  sections/    one file per page section, composed from ui/ and motion/
  data/        all content (see above)
  hooks/ lib/  small utilities
  styles/      Tailwind theme tokens, keyframes and custom utilities
```

Every animation respects `prefers-reduced-motion`.

## Deploy

`npm run build` outputs a fully static site in `dist/`. It's a single page with no client-side routes, so no rewrite rules are needed.

Before deploying, set `siteUrl` in `src/data/seo.ts` to your domain so the Open Graph and canonical URLs are correct.

### Vercel

1. Push the repo to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Vercel detects Vite: build command `npm run build`, output directory `dist`.
3. Deploy. Each push to the default branch redeploys; pull requests get preview URLs.

Or from the CLI: `npx vercel` (preview) and `npx vercel --prod`.

### Netlify

1. Import the repo at [app.netlify.com/start](https://app.netlify.com/start).
2. Build command `npm run build`, publish directory `dist`.
3. Deploy.

Or from the CLI: `npx netlify deploy --build` (draft) and `npx netlify deploy --build --prod`.
