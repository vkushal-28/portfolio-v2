# Build Prompt — Kushal Vala Developer Portfolio
### Vite + React + TypeScript + Tailwind CSS + Motion (Framer Motion)

> **How to use:** Save this file in the repo root (e.g. `docs/BUILD_PROMPT.md`), then tell Claude Code:
> *"Read docs/BUILD_PROMPT.md and complete Phase 0 and Phase 1 only. Stop and summarise when done."*
> Then ask for each next phase one at a time.

---

## Phase 0 — Context & working rules (read first, do not code yet)

You are building a single-page developer portfolio for **Kushal Vala, Senior Full Stack Developer** (Calgary, AB). It needs a unique, modern, senior-level design with professional animations. The visual design is already decided. Reproduce it faithfully from this spec.

**Working rules**
1. Work **one phase at a time**. At the end of each phase: run `npm run build` and `npm run lint`, fix all errors, then stop and give a short summary (files created, decisions made, anything you need from me).
2. TypeScript strict mode. No `any`. Every component and data shape is typed.
3. All content lives in `src/data/*.ts`, never hard-coded inside components.
4. Use **Motion** (`motion` package, imported from `motion/react` — the current name of Framer Motion) for all JS animation. Use plain Tailwind/CSS keyframes only for simple infinite loops (spin, marquee, blink, pulse).
5. Respect `prefers-reduced-motion` everywhere (`useReducedMotion()` → disable motion, show final state).
6. Accessibility: semantic HTML, real `<button>`/`<a>`, visible focus rings, `aria-label` on icon-only controls, decorative visuals `aria-hidden`, text contrast ≥ 4.5:1, touch targets ≥ 44px.
7. Fully responsive: 360px phones → 1440px+ desktops. No horizontal scroll at any width.
8. Do **not** use or draw third-party brand logos (React, Node, MongoDB, Claude, etc.). Tech badges are text labels with a coloured dot. If I later add official logo files to `src/assets/logos/`, wire them in then.
9. Don't add libraries beyond those listed in Phase 1 without asking.
10. **Reuse components first.** Build every repeated pattern once, in `components/ui` or `components/motion`, and use it everywhere. Examples: buttons, chips, tags, filter tabs, section headers, cards, window frames, pulsing dots, reveals.
    - Sections are compositions of these components and should contain almost no one-off styling.
    - If you are about to write the same markup or class list a second time, stop and extract a component instead.
    - Components take typed props with sensible defaults, use a `variant`/`size` prop instead of near-duplicate components, accept `className` (merged with `cn()`), and forward refs where it helps.
    - Export everything through `components/ui/index.ts` and `components/motion/index.ts`.

---

## Phase 1 — Project setup

1. Scaffold: `npm create vite@latest portfolio -- --template react-ts`.
2. Install:
   - `tailwindcss` + `@tailwindcss/vite` (Tailwind v4, CSS-first config)
   - `motion` (Framer Motion)
   - `lucide-react` (icons)
   - `clsx` + `tailwind-merge` (a `cn()` helper)
   - `@fontsource-variable/geist` and `@fontsource/jetbrains-mono` (weights 400, 500), or Google Fonts if Fontsource is unavailable
   - Dev: `eslint`, `prettier`, `prettier-plugin-tailwindcss`
3. Configure the `@` → `src` path alias in `vite.config.ts` and `tsconfig`.
4. Folder structure:
```
src/
  assets/            # images, resume.pdf, (optional) logos/
  components/
    layout/          # Navbar, Footer, ScrollProgress
    ui/              # Button, Chip, FilterTabs, SectionHeader, Badge, Container
    motion/          # Reveal, Stagger, Counter, presets.ts
  sections/          # Hero, Marquee, About, Journey, Skills, Projects, Contact
  data/              # profile.ts, experience.ts, skills.ts, projects.ts, socials.ts
  hooks/             # useInViewOnce, useMediaQuery
  lib/               # cn.ts
  styles/            # index.css (tokens, keyframes, utilities)
  App.tsx, main.tsx
```
5. Smooth anchor scrolling: `html { scroll-behavior: smooth; }` plus a `scroll-margin-top: 80px` on sections so the sticky nav doesn't cover headings.

**Done when:** the dev server runs, Tailwind classes work, the fonts load, and `build` and `lint` pass.

---

## Phase 2 — Design system (tokens, motion presets, UI primitives)

### 2.1 Colour tokens (`src/styles/index.css`, Tailwind v4 `@theme`)
Dark theme only. Lime accent.
```
--color-bg:   #0A0B0D   (page)
--color-bg2:  #0C0D10   (alternate section band)
--color-s1:   #0E0F12   (card)
--color-s2:   #121418   (raised card / editor)
--color-s3:   #15171B   (chip / tile)
--color-ln1:  #1A1C21   (faint border / divider)
--color-ln2:  #23262D   (card border)
--color-ln3:  #2E323A   (control border)
--color-ln4:  #3A3F48   (strong border / outline text)
--color-tx:   #EDEBE6   (primary text)
--color-tx2:  #D6D4CF
--color-tx3:  #B4B7BE
--color-mu:   #9A9DA5   (body muted)
--color-mu2:  #7C808A   (labels)
--color-mu3:  #5E626B   (decorative only — not for meaningful text)
--color-ac:   #C8F169   (accent — lime)
--color-ac2:  #E2FF9E   (accent hover)
```
Selection colour: background `ac`, text `bg`.

### 2.2 Typography
- Sans: **Geist** (300–800). Display headings use weight 600–700 with tight tracking (`-0.045em` to `-0.055em`) and line-height 0.92–1.05.
- Mono: **JetBrains Mono** (400/500), for labels, numbers, code, tags, eyebrow text (uppercase, `0.1em` tracking, 12–13px).
- Fluid sizes with `clamp()`: hero name `clamp(46px,6.4vw,96px)`, section H2 `clamp(40px,5.5vw,76px)`, contact H1 `clamp(52px,9vw,140px)`.
- Outlined text style: `color: transparent; -webkit-text-stroke: 1.5px var(--color-tx)`.

### 2.3 Layout
- `Container`: `max-w-[1280px] mx-auto px-[clamp(16px,4vw,48px)]`.
- Section vertical padding: `clamp(80px,10vw,140px)`.
- Radii: cards 20–24px, tiles 12–14px, pills full.

### 2.4 Motion presets (`src/components/motion/presets.ts`)
```ts
export const ease = [0.16, 1, 0.3, 1] as const;           // expo-out
export const spring = { type: 'spring', stiffness: 140, damping: 18, mass: 0.9 };
export const softSpring = { type: 'spring', stiffness: 90, damping: 20 };

export const fadeUp = {
  hidden: { opacity: 0, y: 48, scale: 0.97, filter: 'blur(10px)' },
  show:   { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)', transition: { duration: 1.1, ease } },
};
export const headingIn = {
  hidden: { opacity: 0, y: 70, skewY: 3, clipPath: 'inset(0 0 100% 0)' },
  show:   { opacity: 1, y: 0,  skewY: 0, clipPath: 'inset(-10% -10% -20% -10%)', transition: { duration: 1.2, ease } },
};
export const stagger = (step = 0.08, delay = 0) => ({ show: { transition: { staggerChildren: step, delayChildren: delay } } });
```
- `<Reveal>`: wraps `motion.div` with `initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15, margin: '0px 0px -6% 0px' }}`, plus an optional `delay` prop and a `variant` prop.
- `<Counter to={35} suffix="%" />`: counts from 0 to the target with `animate()` once in view (1.8s, `ease`). Render the final value for screen readers (`aria-label`) and hide the animated digits (`aria-hidden`).
- Every animated component checks `useReducedMotion()`.

### 2.5 Reusable component library (build all of these before any section)

Every section after this phase is assembled from these. Where a later phase describes a look, implement it as a **variant or prop** of one of these components, not as new one-off markup.

**Layout (`components/ui`)**
| Component | Props | Used in |
|---|---|---|
| `Container` | `className` | every section |
| `Section` | `id`, `band?: 'default' \| 'alt'` (bg vs bg2), `bordered?: 'top' \| 'both' \| 'none'`, `className` | every section; sets padding, background, borders and `scroll-margin-top` |
| `SectionHeader` | `index: string` ("01"), `label: string` | About, Journey, Skills, Work, Contact |
| `SectionTitle` | `as?: 'h1' \| 'h2'`, `children` (use `<Accent>` / `<Outline>` / `<Muted>` spans inside), `size?: 'lg' \| 'xl' \| 'display'` | every section heading and the contact headline; animates with `headingIn` |
| `Accent`, `Outline`, `Muted` | `children` | text styling helpers (lime text, outlined stroke text, muted text) in all headings |
| `Eyebrow` / `MonoLabel` | `children`, `tone?: 'muted' \| 'accent'`, `dot?: boolean` | hero eyebrow, "SKILL EXPLORER", "CORE STACK", "EMAIL", "TERMINAL" and other labels |

**Actions**
| Component | Props | Used in |
|---|---|---|
| `Button` | `variant: 'primary' \| 'ghost'`, `size?: 'sm' \| 'md'`, `href?` (renders `<a>`; otherwise `<button>`), `icon?: 'arrow' \| ReactNode`, `download?` | hero CTAs, navbar "Available for work", contact submit |
| `IconButton` | `icon`, `label` (aria-label), `variant?: 'outline' \| 'solid'`, `href?` | project card arrow, mobile menu toggle |
| `NavLink` | `href`, `children`, `trailing?: ReactNode` (↗ / ↑) | navbar, project Live/Code links, contact social list, footer |
| `FilterTabs<T>` | generic: `options: {value: T; label: string}[]`, `value`, `onChange`, `ariaLabel` | Journey filter, Skills explorer tabs, Projects filter (all three must use this one component) |

**Display**
| Component | Props | Used in |
|---|---|---|
| `Chip` | `children`, `variant?: 'tag' \| 'pill' \| 'tile'`, `interactive?` | timeline tags, project stack chips, AI-workflow chips, skill chips |
| `Badge` | `children`, `tone: 'accent' \| 'info' \| 'neutral'`, `dot?` | timeline Experience/Education badge, project category pill, "Currently" status pill |
| `TechPill` | `name`, `color` (dot colour) | hero orbit badges |
| `PulseDot` | `size?`, `color?` | nav "Available", hero eyebrow, section labels, "Now" cap, portrait status |
| `Caret` | `variant?: 'line' \| 'block'` | role typewriter, code card, terminals |
| `Card` | `variant?: 'default' \| 'raised' \| 'bento'`, `hoverLift?: boolean`, `as?`, `className` | project cards, timeline cards, bento cards, contact form card, facts grid |
| `WindowFrame` | `title?`, `variant?: 'editor' \| 'terminal' \| 'browser'`, `children` | hero code card, AI-workflow terminal, project media mock browser (one component, three variants) |
| `StatItem` | `value: number`, `prefix?`, `suffix?`, `label`, `accent?` | About stats (uses `Counter`) |
| `OutlineNumber` | `value: string`, `size?` | timeline chapter numbers, skills explorer watermark |
| `Field` | `label`, `id`, `as?: 'input' \| 'textarea'`, `error?`, plus native input props | every contact form field |

**Motion (`components/motion`)**
| Component / hook | Purpose | Used in |
|---|---|---|
| `Reveal` | fade-up / heading / slide variants, plays once in view, `delay` prop | every block that appears on scroll |
| `Stagger` + `StaggerItem` | staggered children (`step`, `delay`) | bento grid, project grid, stats, tile grids, card content cascades |
| `Counter` | 0 → value count-up in view | `StatItem` |
| `useTypewriter(items, options)` | type / hold / delete loop, returns current text | hero roles (reusable for any future typed text) |
| `RollingText` | vertical word roller in an overflow-hidden slot | hero "I build" line |
| `Marquee` | infinite horizontal scroll, `speed`, `direction`, `pauseOnHover`, `fadeEdges` | marquee band, skills marquee rows |
| `Orbit` | ring with items placed by angle, counter-rotated to stay upright, `size`, `duration`, `reverse`, `dashed` | hero orbit rings |
| `SpotlightSweep` | one-time light sweep across a card when it appears | bento cards |

**Rules for these components**
- Use a small typed variant map per component (`const variants = { primary: '…', ghost: '…' } satisfies Record<Variant, string>`). Don't add a new dependency for this.
- All interactive components share the same spring hover/tap behaviour and focus ring, defined once in the component, not per usage.
- Colours and sizes come only from the Phase 2 tokens. No raw hex values in sections except data-driven colours such as project tints and pill dots.

**Done when:** a temporary `/playground` route (or a section in `App.tsx`) renders every component and each of its variants, and `build` and `lint` pass.

---

## Phase 3 — Content data (`src/data`)

Create typed data files with this exact content.

### profile.ts
- name: `Kushal Vala`, initials: `kv`
- title: `Senior Full Stack Developer`
- location: `Calgary, AB`, timezone label: `Mountain Time`
- headline: `8+ years architecting secure, high-performance web platforms across banking, energy and enterprise — with React, Next.js, TypeScript, Node.js and AWS, accelerated by AI-assisted development.`
- openToRoles (typed one at a time in the hero; the list may grow, so nothing may assume 3 items): `Sr. Full Stack Engineer`, `Sr. Front End Engineer`, `Sr. React Developer`
- rotatingWords: `secure banking platforms`, `scalable microservices`, `fast, accessible UIs`, `cloud-native systems`
- currently: `Full Stack Developer @ Enbridge`
- about paragraphs:
  1. `Senior Full Stack Developer with 8+ years building secure, high-performance platforms for banking, energy and enterprise teams — from real-time digital banking dashboards at CIBC to enterprise applications at Enbridge. I specialize in scalable frontend architecture, Node.js microservices and OAuth 2.0 / JWT / RBAC security.`
  2. `I use AI coding tools — GitHub Copilot, Cursor and Claude Code — to ship faster while holding every line to a rigorous review bar. I mentor developers, drive code reviews and Agile delivery, and partner closely with product, UX, QA and business stakeholders.`
- aboutStatement (H2): `I turn ambiguous problems into calm, well-crafted software — from first sketch to production at scale.` (accent on "calm, well-crafted software", muted on the last clause)
- facts: Based in `Calgary, AB` · Focus `Full-stack · Security` · Experience `8+ years` · Domains `Banking · Energy`
- stats: `35%` higher API throughput · `30%` faster page loads · `50%` faster release cycles · `50K+` daily transactions handled
- marquee: `Microservices`, `Full-Stack Engineering`, `AWS Cloud`, `Performance`, `AI-Assisted Development`, `OAuth · JWT · RBAC`
- placeholders to keep clearly marked: `email: '[you@yourdomain.com]'`, GitHub / LinkedIn / X URLs, `resume.pdf`, portrait image.

### experience.ts (`type: 'Experience' | 'Education'`, plus `when`, `title`, `org`, `desc`, `tags[]`, `hash`)
1. Experience · `Jul 2025 — Present` · **Full Stack Developer** · `Enbridge · Calgary, AB` · hash `a3f9c21`
   desc: `Architecting enterprise web apps with React 19, Next.js (SSR/SSG) and TypeScript across 5+ product modules — 30% faster page loads and green Core Web Vitals in production. Designing secure Node.js microservices with OAuth 2.0 and JWT, and shipping WCAG 2.1 AA-compliant UIs.`
   tags: React 19, Next.js, Node.js, Redis, AWS CloudWatch
2. Experience · `Jan 2023 — Jul 2025` · **MERN Stack Developer** · `CIBC Bank · Toronto, ON` · hash `7be04d8`
   desc: `Built high-traffic digital banking platforms and real-time dashboards processing 50,000+ daily transactions — 35% higher API throughput and dashboard loads cut from 4s to 1.5s. Engineered OAuth 2.0 / JWT / RBAC security, mentored junior developers, and reached 85%+ test coverage.`
   tags: React, Express.js, MongoDB, Passport.js, Jest
3. Experience · `May 2020 — Dec 2022` · **Software Developer** · `Hindustan Construction Company · Mumbai` · hash `c51e6fa`
   desc: `Designed cloud-native, serverless apps with AWS Lambda, CDK and SAM, reducing operational overhead by 40%. Ran containerized microservices on ECS Fargate and built CI/CD pipelines that made releases 50% faster with zero downtime.`
   tags: AWS Lambda, ECS Fargate, Docker, CodePipeline
4. Experience · `Jul 2018 — May 2020` · **Software Developer** · `Infosys · Pune` · hash `0d92b3e`
   desc: `Developed scalable full-stack applications with React, Node.js and Express, improving development efficiency by 30%. Structured modular Node services and validated REST endpoints with Supertest and Jest.`
   tags: JavaScript, React, Express, Supertest
5. Education · `Postgraduate` · **M.Sc. in Information Technology** · `Kadi Sarva Vishwavidhyalaya · Gandhinagar` · hash `e48a17c` · tags: Information Technology
6. Education · `Undergraduate` · **Bachelor of Computer Applications** · `Gujarat University · Ahmedabad` · hash `91fd5b2` · tags: Computer Applications

### skills.ts (5 groups: `name`, `icon` (lucide), `desc`, `items[]`)
1. **Frontend** (icon `AppWindow`): React 19, Next.js (SSR/SSG), TypeScript, Redux, React Query, Tailwind CSS, Material UI, WCAG 2.1 AA
   desc: `Fast, accessible interfaces with modern React, server rendering and smart state management — tuned for Core Web Vitals.`
2. **Backend & Data** (`Database`): Node.js, Express.js, REST APIs, Microservices, MongoDB, PostgreSQL, Redis
   desc: `Secure RESTful APIs and modular microservices backed by well-modelled, well-indexed data.`
3. **Cloud & DevOps** (`Cloud`): AWS Lambda, ECS Fargate, CDK / SAM, Docker, CodePipeline, CloudWatch, CI/CD
   desc: `Serverless and containerized systems on AWS, shipped through automated, zero-downtime pipelines.`
4. **Security & Testing** (`ShieldCheck`): OAuth 2.0, JWT, RBAC, Passport.js, Jest, React Testing Library, Selenium, Supertest
   desc: `Authentication, authorization and layered test suites that keep high-stakes releases safe.`
5. **AI & Workflow** (`Cpu`): Claude Code, Cursor, GitHub Copilot, Agile / Scrum, Jira, Code Reviews, Mentoring
   desc: `AI-accelerated delivery with rigorous human review, run inside collaborative Agile teams.`

Core stack (5 rows): React 19 — UI architecture · Next.js — SSR · SSG · TypeScript — Type-safe at scale · Node.js — APIs · microservices · AWS — Cloud-native.

### services.ts (`title`, `icon` (lucide), `desc`, `deliver[]` (3 items), `metric`, `metricLabel`, `where`, `stack[]`)
The list may grow, so no layout or counter may assume 7 items.
1. **Full-Stack Web Applications** (`AppWindow`) · metric `5+` — product modules architected end to end · Enbridge
   desc: `End-to-end product engineering with React, Next.js, TypeScript and Node.js — from data model and API to a polished, production-ready interface.`
   deliver: Scalable React / Next.js apps with SSR and SSG · Typed, modular codebases that teams can grow · Ownership from architecture through release and production support
   stack: React 19, Next.js, TypeScript, Node.js
2. **Frontend Performance & Accessibility** (`Gauge`) · `4s → 1.5s` — dashboard load time · CIBC
   desc: `Fast, accessible interfaces tuned for Core Web Vitals and enterprise accessibility standards.`
   deliver: Code splitting, lazy loading, virtualization and caching · Green Core Web Vitals and better SEO · WCAG 2.1 AA, cross-browser responsive UIs
   stack: React Query, Redux, Redis, Tailwind CSS
3. **APIs & Microservices** (`Server`) · `35%` — higher API throughput · CIBC
   desc: `Secure RESTful APIs and modular Node.js microservices backed by well-designed data models.`
   deliver: Node.js / Express services with clean, layered architecture · MongoDB and PostgreSQL schemas, indexes and query tuning · Services built for high-throughput, transaction-heavy workloads
   stack: Node.js, Express.js, MongoDB, PostgreSQL
4. **Authentication & Security** (`ShieldCheck`) · `50K+` — daily banking transactions protected · CIBC
   desc: `Banking-grade authentication and authorization that protects critical workflows without slowing users down.`
   deliver: OAuth 2.0 and JWT authentication flows · Role-based access control (RBAC) middleware · Secure session and token handling with Passport.js
   stack: OAuth 2.0, JWT, RBAC, Passport.js
5. **Cloud, Serverless & CI/CD** (`Cloud`) · `50%` — faster release cycles, zero downtime · Hindustan Construction Co.
   desc: `Cloud-native systems on AWS, shipped through automated pipelines that make releases routine.`
   deliver: Serverless apps on AWS Lambda with CDK and SAM · Containerized services on ECS Fargate with load balancing · CI/CD with CodePipeline, CodeBuild and CodeDeploy
   stack: AWS Lambda, ECS Fargate, Docker, CodePipeline
6. **AI-Assisted Delivery & Code Quality** (`Cpu`) · `85%+` — test coverage on banking services · CIBC
   desc: `Faster delivery with AI coding tools, held to a rigorous review and testing bar — plus mentoring that lifts the whole team.`
   deliver: AI-assisted scaffolding, refactoring and test generation · Unit, integration and end-to-end test suites · Code reviews, mentoring and Agile sprint delivery
   stack: Claude Code, Cursor, Jest, Selenium
7. **Website Maintenance & Support** (`Wrench`) · `25%` — fewer regression incidents per release · CIBC
   desc: `Keep production apps fast, secure and healthy long after launch — with monitoring, fixes and upgrades handled before they become problems.`
   deliver: Production monitoring and defect resolution with logs, DevTools and CloudWatch · Performance profiling, dependency and framework upgrades · Regression-safe releases backed by automated tests and CI/CD
   stack: AWS CloudWatch, Chrome DevTools, Jest, CI/CD

### workflow.ts (`title`, `icon`, `desc`, `tag`)
1. **Discover** (`Search`) · `Understand goals, users and constraints with product, UX and business teams.` · tag `Stakeholders`
2. **Architect** (`LayoutGrid`) · `Plan components, APIs, data models, security and performance budgets.` · `System design`
3. **Build** (`Code`) · `Ship in focused sprints with typed, modular code — AI-accelerated, human-reviewed.` · `Agile · AI-assisted`
4. **Test & review** (`ShieldCheck`) · `Unit, integration and end-to-end tests plus code review before anything merges.` · `Jest · RTL · Selenium`
5. **Deploy** (`ArrowUp`) · `Automated pipelines and zero-downtime releases to production.` · `CI/CD`
6. **Maintain** (`Wrench`) · `Monitor, fix and keep improving with profiling, upgrades and support.` · `CloudWatch`

### projects.ts (`cat: 'Fintech' | 'Enterprise' | 'Cloud'`, plus `num`, `meta`, `title`, `desc`, `stack[]`, `tint`)
1. Fintech · `CIBC · 2023–25` · **Real-Time Digital Banking Dashboards** · tint `#C8F169`
   `High-traffic banking platform and analytical dashboards processing 50,000+ daily transactions. Improved API throughput by 35% and cut dashboard load time from 4s to 1.5s.` · React, Next.js, Node.js, MongoDB
2. Enterprise · `Enbridge · 2025–` · **Enterprise Web Platform** · tint `#9CC2FF`
   `Scalable Next.js applications across 5+ product modules with SSR/SSG, caching and virtualization — 30% faster page loads and green Core Web Vitals.` · React 19, Next.js, TypeScript, Redis
3. Fintech · `CIBC · 2023–25` · **Banking Auth & Access Control** · tint `#F7B267`
   `Enterprise authentication and authorization with OAuth 2.0, JWT, Passport.js and RBAC middleware protecting critical transaction workflows for thousands of users.` · OAuth 2.0, JWT, Passport.js, Express
4. Cloud · `HCC · 2020–22` · **Serverless Workflow Automation** · tint `#D4B3FF`
   `Event-driven serverless apps on AWS Lambda, CDK and SAM across 3 production environments — 40% less operational overhead.` · AWS Lambda, CDK, SAM, Node.js
5. Cloud · `HCC · 2020–22` · **Zero-Downtime CI/CD Pipelines** · tint `#7FE0C2`
   `Containerized microservices on ECS Fargate behind load balancers, shipped through CodePipeline — release cycles 50% faster with zero-downtime deploys.` · Docker, ECS Fargate, CodePipeline

### Orbit badges (hero): React `#61DAFB`, Node.js `#8CC84B`, MongoDB `#4DB33D`, Claude `#D97757`, Codex `#EDEBE6`

**Done when:** all data files compile and are exported through `src/data/index.ts`.

---

## Phase 4 — Layout shell: Navbar, scroll progress, footer

> **Applies to Phases 4–12:**
> - Build each section only by composing the Phase 2 components (`Section`, `SectionHeader`, `SectionTitle`, `Card`, `Button`, `FilterTabs`, `Chip`, `Reveal`, `Stagger`…).
> - If a section needs something that doesn't exist yet and the pattern could appear anywhere else, add it to `components/ui` or `components/motion` as a reusable component with props. Don't write it inline.
> - At the end of each phase, list which shared components you used and any new ones you added.

### Navbar (`components/layout/Navbar.tsx`)
- Sticky top, height 72px, `bg` at 72% opacity with `backdrop-blur(14px)`, bottom border `ln1`.
- Left: 34px lime rounded-square logo with mono `kv`, then "Kushal Vala" (600).
- Centre: links About · Journey · Skills · Services · Work · Contact (NavLink underline effect). Hidden under 860px. Add a mobile menu button that opens a full-screen overlay menu (staggered link reveal, focus trap, Esc closes).
- Right: ghost button "Available for work" with an 8px lime dot that pulses (box-shadow ripple, 2s loop). It links to `#contact`.
- **Load:** slides down from `y:-100%` with opacity 0→1 (0.9s, `ease`).
- **Scroll progress:** a 2px bar along the navbar's bottom edge. Gradient `ac→ac2` with a soft lime glow. Use `useScroll()` → `scrollYProgress` → `useSpring` → `scaleX`, origin left.

### Footer
Top border `ln2`. Left: `© 2026 Kushal Vala. Designed & built with care.` Right: "Back to top ↑" NavLink. Muted 14px.

**Done when:** the nav is sticky, the progress bar tracks scroll smoothly, and the mobile menu works with keyboard.

---

## Phase 5 — Hero section

**Background layers** (all `aria-hidden`):
1. A 48px square grid of 1px `ln1` lines that pans diagonally (background-position 0→48px, 6s linear loop). Mask it with a radial ellipse (70%×60% at 50% 30%) so it fades out at the edges.
2. **Orbit system, top-right:**
   - Outer ring: 520px circle, 1px **dashed** `ln3`, positioned `right:-120px; top:-80px`, rotating 360° in 60s linear infinite. It carries 3 badges at 180°, 60° and 300° (React, Node.js, MongoDB).
   - Inner ring: 360px circle, 1px solid `ln1`, positioned `right:0; top:0`, rotating **reverse** in 40s. It carries 2 badges at 135° and 315° (Claude, Codex).
   - Each badge counter-rotates at the same speed so the text stays upright. Badge: pill, bg `s2` at 92%, 1px `ln3` border, mono 12px `tx2`. It has an 18px circular dot holder with a 6px glowing dot in the badge colour and a ring at 40% of that colour. Shadow `0 10px 30px rgba(0,0,0,.45)`.

**Content grid:** two columns `1.35fr / 1fr`, gap ~72px, vertically centred. Stack to one column under 860px.

**Left column (staggered load sequence):**
1. Eyebrow (mono uppercase, `mu`): `● Senior Full Stack Developer — Portfolio ’26`, with the dot in `ac`. Fades up at 0.1s.
2. H1 **on one line** (nowrap on desktop): `Kushal` + outlined `Vala` + lime `.`. Each word sits in an overflow-hidden mask and rises from `y:110%` with a spring at delays 0.15s, 0.28s and 0.40s.
3. **Open-to role typewriter** (its own line, directly under the name, 22px top margin, fades in at 0.6s). There is no label or badge in front of it.
   - Text: `clamp(24px,2.6vw,34px)`, weight 500, tracking `-0.03em`, colour `ac`, nowrap.
   - Fixed height of 1.2em, so the lines below never shift while it types.
   - It cycles through `openToRoles`:
     - Typing starts 1.3s after load, one character every 55–90ms (randomised so it feels human).
     - Each full role holds for 1.8s, then deletes at 24ms per character.
     - It waits 350ms, then types the next role and loops.
   - A 3px × 0.9em lime caret blinks after the text (1s, steps(1)).
   - Build it as a small `useTypewriter(roles)` hook. Clear its timers on unmount.
   - Accessibility: mark the visual text `aria-hidden`. Add a visually hidden `<p>` that reads `Open to roles: Sr. Full Stack Engineer, Sr. Front End Engineer, Sr. React Developer` (generated from the array).
   - Reduced motion: no typing; swap the full role every 3.2s.
4. **"I build" line** (18px below the role, fades in at 0.7s):
   - Shows `I build ⟨phrase⟩`. "I build" is `mu` weight 400; the phrase is `tx` weight 500. Size `clamp(20px,2.1vw,28px)`.
   - The phrase rolls vertically through `rotatingWords`, holding about 4s each (16s full cycle). Use `AnimatePresence`: exit `y:-100%`, enter from `y:100%`, 0.6s `ease`, inside a 1.2em overflow-hidden slot.
   - No caret on this line; only the role line has one.
5. Headline paragraph (18px, `mu`, max-width 540px, 18px top margin) at 0.8s.
6. Buttons (34px top margin) at 0.9s: primary "View selected work" (`#work`) and ghost "Download résumé" (links to `/resume.pdf`, `download`).
7. Bottom meta row at 1.1s: mono uppercase `Scroll to explore ——— Calgary, AB — Mountain Time`, with the rule filling the space between.

**Right column — code card** (fades up at 0.5s):
- A decorative offset back-card behind it (inset 30px −20px −30px 20px, border `ln1`, bg `s1`).
- Window: radius 20px, border `ln3`, bg `s2`, big soft shadow. Title bar has 3 grey dots and a mono filename `~/kushal/profile.ts`.
- Code lines (mono 14px, line-height 1.95) "type in" one after another with a `clipPath inset(0 100% 0 0)→inset(0)` and stepped easing. They start at 1.0s, every 0.35s:
```ts
const engineer = {
  name: "Kushal Vala",
  role: "Senior Full Stack Dev",
  based: "Calgary, AB",
  experience: "8+ years",
  stack: ["React", "Next.js", "Node"],
  openToWork: true
};▍
```
  Syntax colours: keywords `#C792EA`, strings `ac`, numbers/booleans `#F78C6C`, punctuation `tx2`. A lime block cursor blinks at the end.

**Scroll-away effect:** as the hero leaves the viewport, the content grid moves to opacity 0.15, `y:-80`, scale 0.96 and blur 6px. Use `useScroll({ target: heroRef, offset: ['start start', 'end start'] })` + `useTransform`.

**Done when:** the load sequence plays in order, the orbits rotate smoothly with upright badges, and the layout holds from 360px to 1440px.

---

## Phase 6 — Marquee band

- A full-width band with top and bottom borders `ln1`, bg `bg2`, 22px vertical padding.
- One row of marquee words (500 weight, `clamp(22px,2.6vw,34px)`) alternating `mu3` and `tx`, separated by lime `✦`.
- Duplicate the list and translate `0 → -50%` in a 32s linear infinite loop. Pause on hover. `aria-hidden` (purely decorative).

---

## Phase 7 — About section (`#about`, SectionHeader `01 About me`)

- Two columns `1.5fr / 1fr` (stack under 860px).
- **Left:**
  - The H2 statement with `headingIn` reveal.
  - The two paragraphs (18px, line-height 1.75, `mu`) with `fadeUp`, staggered.
  - **Stats row** below a `ln2` top border: 4 columns (auto-fit, min 130px). Each shows a big number (`clamp(36px,3.6vw,48px)`, 600; the first one in `ac`) plus a 14px muted label. Items stagger in at 0.1s steps, and each number uses `<Counter>` (0 → target, starting 0.35s after reveal).
- **Right:**
  - **Portrait card**, 4:5 ratio, radius 20px, `ln2` border, radial dark gradient, 14px dot-grid overlay. A lime scan-light band sweeps top to bottom (4s loop). Show the image if provided, otherwise the mono placeholder `[ Portrait photo ]`. Bottom-left status pill: pulsing lime dot + `Currently: Full Stack Developer @ Enbridge`.
  - **Facts grid** (2×2, 1px `ln2` gaps, radius 16px): mono 11px uppercase label `mu2` plus a 16px value.

---

## Phase 8 — Journey / Timeline (`#journey`, SectionHeader `02 Journey`) — signature section

Section bg `bg2` with top and bottom borders `ln1`.

**Header row:** H2 `Experience & education` (with "&" in `mu3`). On the right, FilterTabs: **All · Experience · Education**. Below the header, a mono line: `$ git log --journey · 06 milestones · scroll to travel ↓`. The count updates with the filter.

**The spine** (centre on desktop, left edge on mobile):
- Base: a 2px vertical line of **flowing dashes** (repeating gradient 10px dash / 14px gap, background-position animated downward, 1.1s linear loop).
- **Scroll fill:** a lime gradient overlay with glow, `scaleY` 0→1 from the top, driven by `useScroll({ target: listRef, offset: ['start 80%', 'end 40%'] })` + `useSpring`.
- **Comets:** two glowing lime streaks (10×160px, transparent→lime gradient, drop-shadow glow) travel from the top of the spine to the bottom in a 6s loop (ease-in-out), the second starting 3s after the first.
- **Top cap:** pill `● Now` with a lime border and pulsing dot.
- **End cap:** a dashed pill link to `#contact` with shimmering gradient text `Next chapter — with you?` (background-position shimmer, 4s loop).

**Each milestone row** (desktop grid `1fr 120px 1fr`; cards alternate left and right):
- **Node (centre):** a 56px circle (bg `bg2`, border `ln4`) with a lucide icon in `ac` (`Briefcase` for Experience, `GraduationCap` for Education).
  - Two ripple rings expand to 2.2× and fade (2.6s loop, second offset 1.3s).
  - A dashed orbit ring at −10px inset rotates in 8s, carrying a 6px glowing lime dot.
  - Enters with spring `scale 0→1, rotate -120→0`.
  - On row hover: the node fills lime, the icon turns `bg`, and it scales to 1.08.
- **Chapter (opposite side of the card):**
  - "CHAPTER" in mono 12px.
  - A big outlined number (`clamp(60px,6.5vw,100px)`, 700, stroke 1px `ln4`) counting down: the newest item is the highest number.
  - The date in mono.
  - Enters from `y:40` with letter-spacing collapsing from `.2em` to `-0.06em`.
  - On row hover, the outline turns lime.
- **Connector:** a 32px horizontal gradient line from the card edge to the node. It draws in with `scaleX 0→1` after the card arrives.
- **Card** (radius 22px, `ln2` border, gradient `#121418 → #0D0E11`):
  - Slides in from its side: left cards from `x:-90, rotate:-3`, right cards from `x:90, rotate:3`, using `spring`.
  - Inner content then cascades in at 0.07s steps:
    - Badge: Experience = bg `ac` / text `bg`; Education = bg `#1E2433` / text `#AFC8FF`. Includes a small dot.
    - Right side of the badge row: mono `commit a3f9c21`.
    - Title (22–30px, 500).
    - Org in `ac`.
    - Date in mono `mu2`.
    - Description (16px `mu`).
    - Tags (mono 12px chips).
  - **Hover:**
    - `y:-6`, plus a soft lime shadow.
    - A **rotating conic-gradient border** fades in: use a `::before` mask with an animated `@property --ang` 0→360deg (3.2s loop), going transparent → `ac` → `tx` → transparent.
    - The title gets a 2px lime underline growing left→right (`background-size 0→100%`, anchored at the bottom — make sure it never animates from the top).
- **Filtering:** wrap the list in `AnimatePresence mode="popLayout"` with `layout` on rows, so changing the filter re-runs the entrance animation and re-flows smoothly.

**Mobile (<860px):** a two-column grid `56px 1fr`. The spine moves to `left:27px`, chapter columns are hidden, connectors are hidden, and every card sits on the right.

---

## Phase 9 — Skills bento (`#skills`, SectionHeader `03 Skills`)

**Header:** H2 `The toolkit.` (lime period) with the right-side paragraph: `Tools change; fundamentals don’t. These are what I reach for to ship reliable, maintainable products.`

**Bento grid:** 12 columns, gap 20px. All cards share radius 24px, `ln2` border, bg `s1` and overflow hidden. Cards stagger in (0, .12s, .22s, .30s). As each card loads, **a soft lime light sweep** (a 110° gradient band) passes across it once.

1. **Skill Explorer** (col-span 7, row-span 2):
   - Top row: mono `SKILL EXPLORER` and, on the right, `37 tools · 5 domains`.
   - FilterTabs for the 5 groups.
   - The active panel animates in with `AnimatePresence` (x: 28→0, opacity):
     - A big outlined watermark number (`01`–`05`, 110–180px, stroke `ln2`) in the top-right.
     - A 56px lime rounded-square with the group icon in `bg`.
     - Group name H3 (28–40px, 600).
     - Mono `0X tools in this domain`.
     - The description.
     - A tile grid (`auto-fill minmax(150px,1fr)`, gap 12px). Each tile shows a mono index `01`, the skill name, and a 2px bottom bar. Tiles stagger in at 0.06s each (`y:18, scale:.94`).
   - Tile hover: lime border, lime-tinted bg, `y:-4`, the index turns lime, and the bottom bar fills left→right.
2. **Core stack** (col-span 5):
   - Mono `CORE STACK` with a pulsing `● daily drivers` in `ac`.
   - 5 rows (grid `36px 1fr auto 24px`): mono index, name (22px), muted sub-label and an arrow.
   - Row hover: a lime gradient sweeps in from the left, padding-left grows to 18px, the name turns lime and the arrow rotates −45°.
3. **AI-assisted workflow** (col-span 5):
   - Background gradient `#121510 → s1`, with a pulsing lime radial glow top-right.
   - Heading `AI speed. Human-grade review.` ("Human-grade" in `ac`).
   - A terminal box (bg `bg`, `ln2` border, mono 13px). Four lines type in, hold, fade and restart on a 10s loop (staggered 0.9s):
     - `› generate — components & test scaffolds`
     - `› refactor — legacy modules, safely`
     - `› review — every AI-written line`
     - `✓ ship with confidence▍` (in `ac`)
   - A 3px lime progress bar fills across the loop.
   - Chips at the bottom: Claude Code, Cursor, GitHub Copilot.
4. **Skill marquee** (col-span 12):
   - Two rows of pills built from all 37 skills (first half / second half), each list duplicated for a seamless loop.
   - Row 1 moves left (48s); row 2 moves right (56s).
   - Edges fade out via a horizontal mask. Pause on hover.
   - Pill: bg `s2`, `ln2` border, 15px, with a lime dot (row 1) or a hollow `mu` dot (row 2). Hover: lime border and text.

**Mobile (<960px):** every bento card spans full width, stacked.

---

## Phase 10 — Services & workflow (`#services`, SectionHeader `04 Services`)

Default background (`bg`) with a top border `ln1`. It sits between Skills and Projects.

**Header:** two columns.
- Left: H2 `What I offer.` ("offer" outlined, lime period).
- Right: paragraph `Seven ways I help teams ship and keep shipping — each one backed by results from banking, energy and enterprise platforms.`

### 10.1 Service index + detail card
A two-column grid `1fr / 1.15fr`, gap `clamp(24px,3vw,40px)`. It stacks under 960px.

- **Index (left):** a list of `ServiceRow` buttons separated by `ln2` borders. Each row is a grid `44px 1fr auto 24px` with min-height 76px:
  - a mono number `01`;
  - the title (`clamp(18px,1.8vw,24px)`, 500);
  - a mono metric on the right, hidden under 560px;
  - an arrow.

  Selecting a row on **click, hover or keyboard focus**:
  - A lime gradient sweeps in from the left (`scaleX 0→1`, origin left). A row that's only hovered shows a partial sweep.
  - The text turns `tx`, and padding-left grows to 20px with a spring.
  - The number and metric turn `ac`, and the arrow rotates −45° and turns lime.

  Use `aria-pressed` and `aria-controls="svc-panel"`, with a visible focus ring.
- **Detail card (right):** position sticky at `top: 96px` on desktop, so it stays beside the list while you scroll. Wrap it in `AnimatePresence mode="wait"` keyed by the active service. It enters with `opacity 0, y:18, scale:.985, blur 6px → final` (0.6s `ease`).
  - Decor: a huge outlined watermark of the service number in the top-right (stroke `ln2`), and a pulsing lime radial glow in the bottom-left (6s loop).
  - A 60px lime rounded-square icon that pops in with a spring. Mono `Service 01 / 07` on the right.
  - Title H3 (`clamp(26px,2.8vw,36px)`, 600) and description (16px `mu`).
  - Mono label `WHAT YOU GET`, then the 3 `deliver` items. Each has a 20px lime check circle, and they stagger in starting at 0.2s, every 0.06s.
  - **Proof box:** `ln2` border, translucent `bg`, radius 16px. The metric is big (`clamp(34px,3.4vw,46px)`, `ac`), with the `metricLabel` under it. On the right, mono `proven at` plus `where`.
  - Stack chips, using the same `Chip` as the timeline tags.
- Build it from shared components: `Card`, `Chip`, `OutlineNumber`, plus a new reusable `ServiceRow`. Add a small `CheckItem` component (the lime check circle with text) and reuse it anywhere a checklist appears.

### 10.2 "How I work" workflow track
Placed below the services grid with `clamp(72px,8vw,110px)` top margin.

- **Header row:** mono label `WORKFLOW`, H3 `How I work.` (`clamp(30px,3.6vw,48px)`, lime period). On the right, a paragraph: `A clear, repeatable process from first conversation to long-term support — so there are no surprises.`
- **Track:** an ordered list of 6 steps in a 6-column grid (3 columns under 1100px; a 1-column vertical list under 620px).
  - Each step has:
    - a 56px circular node (bg `bg`, border `ln4`, lime icon);
    - mono `Step 01` in `ac`;
    - the title (19px, 600);
    - a description (14px `mu`);
    - a mono tag chip.
  - **Connector (desktop only):** a 2px dashed line through the node centres, from the centre of the first column to the centre of the last.
- **Animation, once in view:**
  - The lime fill draws across the line (`scaleX 0→1`, 1.8s `ease`, delay .2s).
  - Steps rise in one by one (`y:26 → 0`, delay `.25s + i × .22s`), and each node pops with spring `scale 0 → 1, rotate -90 → 0`.
  - After that, a glowing lime dot travels along the line from step 1 to step 6 on a 4.5s loop.
- **Hover:** the node fills lime, the icon turns `bg`, and it scales to 1.08 (spring).
- **Mobile (<620px):** each step becomes a grid `56px 1fr`. The node sits on the left spanning all rows, and the text stacks on the right.
- Build it as reusable `ProcessTrack` + `ProcessStep` components that take any number of steps.

### 10.3 CTA strip
Below the workflow, with a 56px top margin: a dashed `ln3` bordered box (radius 24px) holding a flex row that wraps on small screens.
- Left: `Need one of these on your team?` (`tx`) and ` Let’s talk about what you’re building.` (`mu`), at `clamp(20px,2.2vw,28px)` weight 500.
- Right: a primary `Button` "Start a conversation" linking to `#contact`.

---

## Phase 11 — Projects (`#work`, SectionHeader `05 Selected work`)

Section bg `bg2`, top border `ln1`.

**Header:** H2 `Projects`, with FilterTabs on the right: **All · Fintech · Enterprise · Cloud**.

**Grid:** 2 columns, gap 24px (1 column under 860px). When the filter is **All**, the first project is **featured**: it spans both columns with 420px media. All other cards have 300px media. Use `layout` + `AnimatePresence` so filtering animates cards in, out and between positions.

**Card** (radius 24px, `ln2` border, bg `s1`, flex column):
- **Media area:**
  - bg `s2` with a 32px grid pattern, holding a **mock browser window**: 60% width, centred, offset down, radius 16px, `ln3` border, bg `s3`. The window has 3 grey dots, a 45% wide bar in the project `tint`, two grey text bars and a content block.
  - A dashed 180px circle rotates in the top-right corner (30s).
  - Top-left category pill; bottom-right mono `[ screenshot ]` placeholder, replaced by `<img>` when a screenshot is supplied.
  - **Load:** the media wipes up (`clipPath inset(100% 0 0 0) → inset(0)`, 1.1s `ease`). Then the body content cascades in (meta → title → desc/stack, 0.1s steps). The second card in a row is delayed 0.14s.
- **Body** (padding 28px):
  - Mono `01 — CIBC · 2023–25`.
  - Title (24–32px, 500).
  - A 48px circular arrow button (`aria-label="Open case study"`) on the right.
  - Description (16px `mu`).
  - Footer row: stack chips (mono 12px) on the left, `Live ↗` and `Code ↗` NavLinks on the right (placeholder `#` hrefs for now).
- **Hover:**
  - Card `y:-8` (spring) and its border goes to `ln4`.
  - The media visual scales to 1.04 (0.8s).
  - The arrow button rotates −45° and fills lime.
  - Tap: `scale:.985`.

---

## Phase 12 — Contact (`#contact`, SectionHeader `06 Contact`)

- Background: a 700px soft lime radial glow drifting slowly (14s ease-in-out loop of `x/y` ±30/20px).
- Giant H2 (`clamp(52px,9vw,140px)`, 700, line-height .92): `Let’s build` / outlined `something` + lime `great.`, using `headingIn`.
- Two columns `1fr / 1.2fr` (stack on mobile):
  - **Left:**
    - Intro paragraph: `Open to senior full-stack roles and ambitious projects in fintech, energy and enterprise. Have something in mind? My inbox is open.`
    - Mono label `EMAIL`, then the email as a big link (22–32px) with a 3px lime underline sweeping left→right on hover.
    - Mono label `ELSEWHERE`, then a bordered list: GitHub ↗, LinkedIn ↗, X / Twitter ↗, Résumé (PDF) ↗. Each row is a full-width NavLink with hover colour.
  - **Right — form card** (radius 24px, `ln2` border, translucent `s1`):
    - Fields: Your name, Email (two-up on wide screens), "I’m reaching out about", Message (textarea).
    - Each field has a real `<label>` (mono 12px uppercase), a transparent input with a bottom border only that turns `ac` on focus, and placeholder text `mu3`.
    - Primary "Send message" button.
    - Basic client-side validation with inline error text and `aria-invalid`.
    - On submit, `AnimatePresence` swaps the form for a success state: a 64px lime circle with a check icon (spring pop), `Message sent.`, and `Thanks for reaching out — I’ll be in touch soon.`
    - Put submission behind a `sendMessage()` function in `src/lib/contact.ts`. For now it just resolves after 600ms. Leave a TODO for Formspree, EmailJS or a serverless endpoint.
- Footer below (from Phase 4).

---

## Phase 13 — Polish, accessibility, performance, SEO

1. **Responsive QA** at 360, 390, 768, 1024, 1280 and 1440px. Fix any overflow (watch the orbit rings, the hero name and the marquee). Under 560px, hide the "Available for work" button text or the button itself if the nav is crowded.
2. **Reduced motion:** with `prefers-reduced-motion: reduce`:
   - all infinite loops stop;
   - reveals render in their final state;
   - counters show final values;
   - the scroll progress bar can stay.
3. **Keyboard:** visible `ac` focus rings (2px, offset 3px) everywhere, logical tab order, and a skip-to-content link.
4. **Performance:**
   - Use `will-change` only on actively animating elements.
   - Lazy-load images (`loading="lazy"`, explicit width/height).
   - Run the orbit and marquee animations on `transform` only.
   - Aim for Lighthouse ≥ 95 across Performance, Accessibility, Best Practices and SEO.
5. **SEO / meta:**
   - Title `Kushal Vala — Senior Full Stack Developer`.
   - A meta description from the headline.
   - Open Graph and Twitter tags with a 1200×630 OG image placeholder.
   - `theme-color #0A0B0D`.
   - Favicon: the lime `kv` mark.
   - JSON-LD `Person` schema (name, jobTitle, address Calgary AB, sameAs socials).
6. **Component audit:**
   - Search the sections for repeated markup or repeated long class lists, and extract anything duplicated into a shared component.
   - Confirm that all three filters use `FilterTabs`, all window-style boxes use `WindowFrame`, all cards use `Card`, and all CTAs use `Button`.
   - Add a short JSDoc comment on each shared component explaining its props.
7. **Clean-up:** remove the playground, check that no unused deps remain, add a `README.md` with setup and deploy steps (Vercel or Netlify), and add `npm run preview`.

**Final deliverable:**
- `npm run build` produces a static `dist/`.
- A summary listing every placeholder I still need to fill in: email, social URLs, résumé PDF, portrait, project screenshots, live/code links, education years, and the contact form endpoint.
