# Design

Editorial-brutalist developer portfolio. Dark-first; light is a co-equal,
purpose-designed theme (warm-neutral whites, not an inversion). The look:
oversized condensed display type, deep negative space, ghost watermark
typography, emerald accent, restrained motion.

## Color

OKLCH-minded tokens, exposed as CSS vars and Tailwind utilities. Dark is the
brand baseline; `:root[data-theme="light"]` overrides.

| Role | Dark | Light |
|---|---|---|
| bg-primary | `#030202` | `#fafafa` |
| bg-secondary | `#141414` | `#f1f1f3` |
| bg-elevated | `#030202` | `#ffffff` |
| text-heading | `#e0e0e0` | `#18181b` |
| text-primary | `#e5e5e5` | `#27272a` |
| text-secondary | `#a3a3a3` | `#52525b` |
| text-muted | `#6b6b6b` | `#71717a` |
| accent | emerald-500 `16 185 129` | emerald-700 `4 120 87` |
| accent-soft | emerald-300 `110 231 183` | emerald-500 `16 185 129` |
| status-online | green-400 (decoupled from brand) | green-500 |
| overlay | white | zinc-900 |

Strategy: **Committed-restrained** — near-black/near-white surface carries the
page, a single emerald accent does the brand work. Accent is used sparingly
(CTAs, active states, one signature word), never as section-wide washes.

## Typography

- **Thunder** (condensed display, weights 300–700) — `--font-sans`. All large
  headings, the hero name, ghost watermarks. Set tight; condensed wants it.
- **Manrope** (`--font-body`) + **DM Sans** fallback — body copy, paragraphs,
  list items, CTAs. Readable, normal tracking.
- **PP Playground** (calligraphic italic) — the **signature accent**, rationed.
  Reserve for at most 2–3 emphasis words across the whole page (e.g. About's
  "delivered.", Contact). Overuse kills it.
- **Monospace** — reserved for genuine technical *metadata only*: stat labels,
  location/role tags, tech-stack pills, the project index. Never on CTAs, never
  as a section eyebrow.

Display tracking is tight (condensed). Body copy uses normal tracking — no
global letter-spacing, no `tracking-wider` on prose.

## Layout

Single long scroll, centered max-width columns (`max-w-5xl`/`6xl`/`7xl`),
fluid `clamp()` heading scale, generous vertical rhythm. Asymmetric editorial
hero (12-col grid: info left, oversized name right). Cards used only where they
are the right affordance (Projects, Services). No eyebrow-on-every-section; the
oversized headings + ghost watermarks are the wayfinding.

## Section cadence

Hero → marquee ticker → About → Projects → Services → Fit (qualify) → Process
→ Skills (marquee) → Contact → footer. Numbered markers appear **only** in
Process (a real ordered sequence) — the one deliberate numbered system.

## Motion

Framer Motion. `fade-up` on scroll-in (staggered within lists), mouse-parallax
hero, infinite marquee tickers, choreographed multi-property card hovers
(easing `cubic-bezier(0.22,1,0.36,1)`). Full `prefers-reduced-motion` fallback.
Ease-out only; no bounce.

## Components

`Marquee`, `GhostText` (inline word-emphasis), `SkillIcon`, `ThemeToggle`
(CSS-driven, no hydration flash), `NoiseOverlay`, `ScrollToTop`. Floating
navbar pill + scroll-to-top pill share a glass treatment via tokens.
