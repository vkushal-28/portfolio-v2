# Claude Code prompt — Developer ID Badge (About section)

> **How to use:**
> 1. Put `developer-avatar.svg` (it comes with this prompt) in `src/assets/`.
> 2. Paste everything below the line into Claude Code, after Phase 7 (About) is built. You can also add it to `docs/BUILD_PROMPT.md` under new phase at last.

---

Replace the portrait placeholder in the About section's right column with a **Developer ID badge** component. Build it from the shared design tokens and the reusable-component rules in `docs/BUILD_PROMPT.md`. Stop and summarise when done.

## 1. Files to create
- `src/components/ui/IdBadge.tsx`: the badge (lanyard, clip, card, fields, footer).
- `src/components/ui/DeveloperAvatar.tsx`: the animated illustration, converted from `src/assets/developer-avatar.svg`.
  - The SVG is **self-contained**. Its own `<style>` block defines the colour palette (`--ac`, `--s2`, `--ln4`…) and all the `av-*` animations, so it renders identically anywhere.
  - Convert it to a React component:
    - Keep that `<style>` block, rendered as `<style>{svgCss}</style>` inside the `<svg>`.
    - Turn `class` into `className`.
    - Turn the inline `style="…"` strings into style objects. Keep the `var(--…)` and `color-mix()` values.
    - Keep every `av-*` class name.
    - Mark it `aria-hidden`.
  - Don't rely on the page's tokens inside the SVG, or the colours turn black.
- `src/hooks/useLocalTime.ts`: returns the formatted current time for a given IANA time zone and refreshes every 20s. Clear the interval on unmount.
- Keyframes and the `av-*` animation classes go in `src/styles/index.css` (section 6). Use plain CSS for these, because they're infinite decorative loops.
- Badge data lives in `src/data/profile.ts` (`badge` object, see section 5). Never hard-code it.

## 2. Structure (top to bottom)
```
<div class="stage">            relative, padding-top 92px, perspective 1200px
  <Lanyard/>                   static strap
  <Clip/>                      static grey clip
  <div class="swing">          gentle sway animation
    <article class="badge">    the card; 3D tilt on hover
      punched hole
      header row
      illustration panel (DeveloperAvatar)
      name + title
      fields row (Based / Exp / Status)
      "Now →" row
      footer (barcode + live local time)
```

## 3. Exact styling (use the Phase 2 tokens: bg, s1–s3, ln1–ln4, tx, tx2, tx3, mu, mu2, ac, ac2)
- **Stage:** `relative; padding-top: 92px; perspective: 1200px`.
- **Lanyard** (`aria-hidden`):
  - Box: absolutely positioned at `top: -24px`, centred, `30px × 112px`, radius 4px, bg `s3`, 1px `ln3` border, overflow hidden.
  - Inside: the text `KUSHAL · VALA · KUSHAL · VALA ·` in mono 9px, `letter-spacing .3em`, colour `ac` at 80% opacity, with `writing-mode: vertical-rl`.
- **Clip** (`aria-hidden`):
  - Absolute at `top: 87px`, centred, `46px × 24px`, radius 7px, z-index 2.
  - Background `linear-gradient(180deg, #5a5f69, #2c3036)`, 1px `#6b717c` border, shadow `0 4px 10px rgba(0,0,0,.5)`.
  - It does **not** swing.
- **Swing wrapper:** `transform-origin: 50% -80px`. Keyframe `sway`: rotate −1.6° → 1.6° → −1.6° over 7s, ease-in-out, infinite.
- **Card (`article`):** `aria-label="Developer ID: Kushal Vala, Senior Full Stack Developer"`.
  - Box: relative, overflow hidden, radius 22px, 1px `ln3` border.
  - Background: `linear-gradient(165deg, s2, s1 70%)`.
  - Shadow: `0 40px 80px -30px rgba(0,0,0,.85)`.
  - `transform-style: preserve-3d`.
  - Transition: transform 0.7s spring, border-color 0.4s, box-shadow 0.5s.
  - `::before`: a 4px lime (`ac`) strip along the top edge.
  - `::after` (light sweep):
    - A 115° gradient: transparent 35% → `ac` at 13% → `rgba(255,255,255,.07)` 50% → transparent 60%.
    - `background-size: 250% 100%`.
    - Auto-plays every 7s (`background-position 130% → -30%`, holding the first 70% of the cycle), starting after 1.5s.
  - **Hover / keyboard focus-within:**
    - `rotateY(-9deg) rotateX(5deg) translateY(-6px)`.
    - Border becomes `color-mix(ac 50%, ln3)`.
    - Adds a lime glow shadow `0 0 40px -12px color-mix(ac 35%)`.
    - The sweep runs once across the card (1.1s).
    - Use a Motion `whileHover` with the spring preset, or CSS. Pick one, not both.
- **Punched hole:** absolute at `top: 12px`, centred, `58px × 10px`, pill shape, bg `bg`, 1px `ln3` border.
- **Header row:** padding `30px 22px 0`, mono 11px, `letter-spacing .14em`, colour `mu2`. Left `DEV · ACCESS`; right `KV-08` in `ac`.
- **Illustration panel:**
  - Box: margin `16px 22px 0`, height 220px, radius 14px, 1px `ln2` border, overflow hidden, background `radial-gradient(circle at 30% 20%, s3, bg)`.
  - Layers, back to front:
    1. A dot grid: `radial-gradient(ln3 1px, transparent 1px)` at 14px, 60% opacity.
    2. A lime scan band: 70px tall, transparent → `ac` 14% → transparent, moving top→bottom in a 4s linear loop.
    3. Four 18px lime corner brackets (2px borders, 12px inset).
    4. `DeveloperAvatar`: absolute, bottom-aligned, centred, width 72%, height 96%. It floats `translateY 0 → -6px` over 6s. On card hover it gets a `drop-shadow(0 0 10px ac 35%)` glow.
    5. A small mono 10px label `[ YOUR ILLUSTRATION ]` in `mu2`, top-centre. Render it only when no real artwork is supplied (prop `artworkSrc?`; if given, render an `<img>` in place of the SVG).
- **Name block:** padding `20px 22px 0`. `Kushal Vala` at 26px, weight 600, tracking −0.03em. `Senior Full Stack Developer` at 15px in `ac`.
- **Fields row** (`<dl>`):
  - Box: margin `18px 22px 0`, a 3-column grid with 1px `ln2` gaps, radius 12px.
  - Each cell: bg `s1`, padding `10px 12px`.
  - `dt`: mono 10px uppercase, `letter-spacing .12em`, `mu2`.
  - `dd`: 14px `tx`.
  - Values: Based **Calgary, AB** · Exp **8+ yrs** · Status **Open**. Status is in `ac`, with a 6px pulsing lime dot (reuse `PulseDot`).
- **Now row:** margin `16px 22px 0`, padding `10px 12px`, radius 10px, bg `s3`, 1px `ln2` border, 13px `tx2`. It starts with the mono 11px label `NOW → ` in `mu2`, then `Full Stack Developer @ Enbridge`.
- **Footer:**
  - Box: flex space-between, aligned to the bottom, margin `18px 22px 22px`, padding-top 16px, 1px **dashed** `ln3` top border.
  - Left: a decorative barcode, `150px × 34px`, 75% opacity, `aria-hidden`. Draw it with a `repeating-linear-gradient(90deg, tx2 0 2px, transparent 2px 4px, tx2 4px 5px, transparent 5px 8px, tx2 8px 11px, transparent 11px 13px, tx2 13px 14px, transparent 14px 17px)`.
  - Right: a right-aligned mono 11px `LOCAL TIME` label, then the time at 15px in `tx` followed by `MT` in `ac`.
  - The time comes from `useLocalTime('America/Edmonton')`, formatted with `Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit' })`. It must handle daylight saving automatically and fall back to an empty string if `Intl` throws.

## 4. The illustration (`DeveloperAvatar`)
Use the SVG exactly as supplied. It shows:
- a developer behind a laptop, with the back of the lid facing the viewer;
- the arms going down behind the lid edges, so **no hands are visible**;
- headphones on, glasses, and eyes looking down at the screen;
- a lime screen glow on the face;
- code symbols rising out of the laptop;
- a coffee mug with steam on the **left** of the desk and a small potted plant on the **right**;
- a lime halo and a slowly turning dashed ring behind them.

Don't redraw or "improve" it.

## 5. Data (`src/data/profile.ts` → `badge`)
```ts
badge: {
  lanyardText: 'KUSHAL · VALA · KUSHAL · VALA ·',
  header: { left: 'DEV · ACCESS', right: 'KV-08' },
  name: 'Kushal Vala',
  title: 'Senior Full Stack Developer',
  fields: [
    { label: 'Based', value: 'Calgary, AB' },
    { label: 'Exp', value: '8+ yrs' },
    { label: 'Status', value: 'Open', accent: true, pulse: true },
  ],
  now: 'Full Stack Developer @ Enbridge',
  timeZone: 'America/Edmonton',
  timeZoneLabel: 'MT',
  artworkSrc: undefined as string | undefined, // set to a real illustration later
}
```

## 6. Animation CSS
The `av-*` animations below are **already inside `developer-avatar.svg`**. Don't duplicate them in `index.css`. Add only the badge-level rules (`sway`, `sheenAuto`, `avFloat`) and the two hover speed-ups at the bottom. The full list is kept here for reference.
```css
@keyframes sway{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.6deg)}}
@keyframes sheenAuto{0%,70%{background-position:130% 0}100%{background-position:-30% 0}}
@keyframes avFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes avBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes avGlint{0%,75%{opacity:0;transform:translateX(-6px)}85%{opacity:1}100%{opacity:0;transform:translateX(6px)}}
@keyframes avGlow{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes avRise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-60px);opacity:0}}
@keyframes avSteam{0%{transform:translateY(0);opacity:0}30%{opacity:.8}100%{transform:translateY(-12px);opacity:0}}
@keyframes avLid{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes avArm{0%,100%{transform:translateY(0)}50%{transform:translateY(1.6px)}}
@keyframes avPlant{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
@keyframes spin{to{transform:rotate(360deg)}}

.av-eye{transform-box:fill-box;transform-origin:center;animation:avBlink 5s ease-in-out infinite}
.av-glint{animation:avGlint 4.5s ease-in-out infinite}
.av-screenglow{animation:avGlow 3s ease-in-out infinite}
.av-orbit{transform-box:fill-box;transform-origin:center;animation:spin 40s linear infinite}
.av-rise{animation:avRise 4.2s ease-out infinite}
.av-steam{animation:avSteam 2.6s ease-out infinite}
.av-lidglow{animation:avLid 2.4s ease-in-out infinite;filter:drop-shadow(0 0 4px var(--color-ac))}
.av-arm{animation:avArm .5s ease-in-out infinite}
.av-plant{transform-box:fill-box;transform-origin:50% 100%;animation:avPlant 4.5s ease-in-out infinite}

/* faster "typing" while the badge is hovered */
.id-badge:hover .av-arm{animation-duration:.3s}
.id-badge:hover .av-rise{animation-duration:2.6s}
```
- In `DeveloperAvatar`, some elements already set an `animation-delay` (the second steam wisp, the right arm, the rising code). Keep those delays.
- The SVG defines its own `--ac`, `--s2`, `--ln4`, `--tx`… on the `<svg>` element, so it doesn't depend on how the Tailwind tokens are named. The colours already match the portfolio palette exactly.
- **Check before finishing:** render the badge and compare the illustration with `developer-avatar.svg` opened in a browser on a dark background. Nothing should be black or missing.

## 7. Behaviour and accessibility
- The whole badge reveals with the shared `Reveal` component when the About section scrolls into view.
- `prefers-reduced-motion: reduce`:
  - Stop the sway, sheen, float and every `av-*` loop.
  - Keep the hover tilt, but make it instant or very short.
  - The clock still updates.
- Every decorative element (lanyard, clip, hole, barcode, illustration, corner brackets, scan band) is `aria-hidden`. Screen readers should read the name, title, fields, now-row and local time as normal text.
- It stays within the right column at every width. On phones, the column stacks under the About text and the badge stays centred with a `max-width: 380px`.
- The facts grid under the badge (Based in / Focus / Experience / Domains) stays as it is.

**Done when:**
- The badge matches this spec.
- The time ticks correctly for Calgary.
- Hover tilts the badge and speeds up the typing.
- Reduced motion is respected.
- `npm run build` and `npm run lint` pass.
