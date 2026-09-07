# Design

**Signal.** A light-first editorial system: soft green-white paper, green-charcoal
ink, one deep jade. Oversized condensed display type set in sentence case carries
the page, real work is shown at full brightness, and every hairline separates real
content. Editorial, not brutalist: the polarity stops short of black-on-white and
every corner is softened.

Dials: `DESIGN_VARIANCE 8` / `MOTION_INTENSITY 6` / `VISUAL_DENSITY 3`.

## Color

Light is the baseline. Dark is a designed counterpart, not an inversion. Tokens
live on `:root`, dark overrides under `:root[data-theme="dark"]`, and everything
resolves through Tailwind v4 `@theme`.

| Role | Light | Dark |
|---|---|---|
| paper | `#f0f2ee` | `#141916` |
| paper-lift | `#f7f8f5` | `#1d231f` |
| paper-deep | `#e4e7e1` | `#0e1211` |
| ink | `#232e28` | `#eef2ee` |
| ink-body | `#3e4842` | `#c3ccc6` |
| ink-mute | `#5f6a63` | `#8d968f` |
| accent | `#0c6b54` | `#38c79a` |
| accent-deep | `#095444` | `#5fd6b1` |
| accent-surface | `#0c6b54` | `#0d5a47` |
| on-accent-surface | `#ffffff` | `#eaf5f0` |

Rules of use:

- The ground is a **soft green-white**, never cream and never pure white, and
  the ink is a green-charcoal rather than black. Black on white was the first
  pass and it read harsh; this polarity is deliberately shorter.
- **One accent, page-wide.** A deep jade, not the emerald every developer
  portfolio reaches for. It covers roughly 3% of the page: the primary CTA, the
  ordinals in Process, the lead engagement block, the Contact section, and the
  full stop after the name.
- `accent` is the small-element fill and clears 5.7:1 on paper.
  **`accent-surface` is a separate token** for anything filling a whole section.
  In dark they diverge: the button stays a bright mint, the section drops to a
  deep forest, because a full-bleed mint band at night is a floodlight.
- Depth comes from three neutral planes, hairlines, a faint wash on panels,
  green-tinted shadows and grain. Never glows, never pure-black shadows.

## Typography

- **Thunder** (owned, condensed, weights 500 and 700 only) is the display face,
  set in **sentence case**. Condensed all-caps is what made the first pass read
  as brutalist; the same face in sentence case keeps the scale and loses the
  shouting. `line-height: 0.92`, `letter-spacing: -0.012em`. Loaded through
  `next/font/local` and preloaded, because it is the brand.
- **Instrument Sans** is body and UI. Neutral without being Inter.
- **IBM Plex Mono** is metadata only: labels, spec values, tech lists. Never a
  CTA, never a section eyebrow.
- No serif and no script face. Both read as reflex "creative" choices rather
  than decisions, and neither belongs to an engineer's brand.

Scale: `.display-lg` (hero, contact), `.display-md` (section heads),
`.display-sm` (card and item heads). All `clamp()`.

## The full stop

A vermillion period is the mark. It appears after the wordmark in the header,
after the hero headline, and after the name in the footer. Nowhere else.

## Layout

`max-w-[1400px]`, 12-column grids, asymmetric by default. Radius is **14px** on
surfaces and images, **10px** on controls. Nothing on this page is a pill, and
nothing is a hard corner either.

Eight sections, eight different layout families, so no two read alike:

| Section | Family |
|---|---|
| Hero | Name-led masthead with a spec rail in the margin |
| Clients | Ruled logo wall, marks only, masked to one ink colour |
| Work | One full-bleed lead case, then a two-up image index |
| About | Portrait split with a fact grid, closing on the stack |
| Engagements | Asymmetric four-cell grid, lead cell on the accent surface |
| Process | Sticky heading against a ruled ordinal sequence |
| FAQ | Narrow-measure accordion on the page's left edge |
| Contact | Full-bleed accent block |

`#about` is the page's only recessed band, so the recession carries meaning.

## Motion

Framer Motion. Every entrance is a **reveal**, never a float: content is masked
and uncovered, the way ink lands on paper.

- `TextReveal` rises words out of a clip mask. Headings only.
- `Wipe` uncovers images top to bottom.
- `Reveal` / `Stagger` handle everything else.
- `Magnetic` is on the primary CTA only.

Ease-out only (`cubic-bezier(0.16, 1, 0.3, 1)`), no bounce, no infinite loops,
no parallax for its own sake. Full `prefers-reduced-motion` collapse. Scroll
state comes from `useScroll`, never a scroll listener.

## Banned

Things this design deliberately does not do, because every other developer
portfolio does them:

- Floating blurred pill navbars
- Pulsing green availability dots
- Scroll cues at the bottom of the hero
- An eyebrow above every section heading
- Emerald, the accent every other developer portfolio uses. This green is
  deeper and cooler on purpose.
- All-caps display type
- Alternating light and dark section bands
- Public hourly pricing tables with a "most popular" badge
- Marquees, anywhere
- Dimmed screenshots. The work is the proof; it is shown at full brightness.

## Client marks

Every logo on the page is an **alpha mask filled with one ink colour**, not an
image. Filters were tried first and could not do it: they preserve each mark's
own luminance, so a purple crest, a navy cockerel and a red plate came out as
three different greys. Masking throws the source colour away entirely, so five
logos from five different files read as one row.

Each mark carries its own height in `clients[].size`. A tall crest and a wide
wordmark need different heights to carry the same visual weight.
