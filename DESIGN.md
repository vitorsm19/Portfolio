# Design

**Signal.** A light-first editorial system: cool concrete paper, near-black ink,
one signal vermillion. Oversized condensed display type carries the page, real
work is shown at full brightness, and every hairline separates real content.
The reference points are broadsheet and spec sheet, not developer-portfolio.

Dials: `DESIGN_VARIANCE 8` / `MOTION_INTENSITY 6` / `VISUAL_DENSITY 3`.

## Color

Light is the baseline. Dark is a designed counterpart, not an inversion. Tokens
live on `:root`, dark overrides under `:root[data-theme="dark"]`, and everything
resolves through Tailwind v4 `@theme`.

| Role | Light | Dark |
|---|---|---|
| paper | `#e9eaec` | `#101113` |
| paper-lift | `#f4f5f6` | `#191b1e` |
| paper-deep | `#dedfe2` | `#0a0b0c` |
| ink | `#101113` | `#f2f3f5` |
| ink-body | `#34363b` | `#c6c9ce` |
| ink-mute | `#5b5e65` | `#8b8f97` |
| accent | `#e23a0e` | `#ff4a22` |
| accent-deep | `#b02a08` | `#ff6a45` |
| on-accent | `#ffffff` | `#100604` |

Rules of use:

- The ground is **cool concrete**, never cream and never pure white. Beige,
  brass, clay and oxblood are out: that palette family is the default reach for
  anything that wants to look premium, and it makes the brand invisible.
- **One accent, page-wide.** Vermillion appears on roughly 3% of the surface:
  the primary CTA, the ordinals in Process, the lead engagement block, the
  Contact section, and the full stop after the name.
- `accent` clears 3:1 and is only used for large type, fills and rules.
  `accent-deep` clears 4.5:1 and is the one used for small accent text.
- Depth comes from three neutral planes, hairlines, tinted shadows and grain.
  Never from glows, never from pure-black drop shadows.

## Typography

- **Thunder** (owned, condensed, weights 500 and 700 only) is the display face.
  Uppercase, `line-height: 0.86`, no added tracking. Loaded through
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

`max-w-[1400px]`, 12-column grids, asymmetric by default. Radius is locked at
**2px** on every surface, image and button. Nothing on this page is a pill.

Eight sections, eight different layout families, so no two read alike:

| Section | Family |
|---|---|
| Hero | Asymmetric manifesto with a spec rail in the margin |
| Clients | Ruled logo wall, marks only, no captions |
| Work | One full-bleed lead case, then a two-up image index |
| About | Portrait split with a fact grid, closing on the stack |
| Engagements | Asymmetric four-cell grid, lead cell filled in accent |
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
- Emerald as the accent
- Alternating light and dark section bands
- Public hourly pricing tables with a "most popular" badge
- Marquees, anywhere
- Dimmed screenshots. The work is the proof; it is shown at full brightness.
