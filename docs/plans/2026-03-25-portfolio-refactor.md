# Implementation Plan: Portfolio Refactor — React SPA to Next.js + TypeScript + Tailwind

**Date:** 2026-03-25
**Design Doc:** `REFACTOR_PLAN.md` (project root)
**Estimated Tasks:** 40

## Overview

Full architecture refactor of a React 18 + Vite 4 portfolio SPA into Next.js 15 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + framer-motion 12. Eliminates 11 unnecessary dependencies, centralizes hardcoded data, fixes accessibility violations, replaces GitHub-hosted images with local assets, adds choreographed animations, and implements mobile-first responsive design across 5 breakpoints.

**Key decisions:**
- Framework: Next.js 15 (App Router) — SSR/SSG, file-based routing, image optimization, SEO readiness
- CSS: Tailwind CSS 4 — utility-first, CSS-first config
- Carousel: Native CSS scroll-snap — zero dependencies
- Scope: Portfolio as single `/` route, architecture ready for future pages
- SEO: Deferred to a separate task

**Target folder structure:**

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/    (Header, SocialSidebar, EmailSidebar, ScrollToTop)
│   ├── sections/  (Hero, About, Skills, Projects, ProjectCard, Contact)
│   ├── icons/     (10 SVG icon components + barrel index)
│   └── ui/        (SkillIcon)
├── data/          (site.ts, skills.ts, navigation.ts)
├── hooks/         (useTypewriter.ts)
├── lib/           (github.ts)
└── assets/        (images + PDF)
```

---

## Tasks

### Task 1: Initialize Next.js project and install all dependencies
**File:** `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`
**Time:** ~5 minutes

**Steps:**
1. Run `npx create-next-app@latest` in a temp directory with TypeScript, Tailwind, App Router, src directory, and import alias `@/*`
2. Copy generated config files into the portfolio project root: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`
3. Rewrite `package.json` with updated dependencies and Next.js scripts
4. Run `npm install` to generate the new `package-lock.json`
5. Delete Vite-specific files: `vite.config.js`, `index.html`

**Dependency migration (full version map):**

| Package | Current | Target | Notes |
|---|---|---|---|
| `next` | — (new) | `^15` | Framework replacement for Vite |
| `react` | `^18.2.0` | `^19` | Required by Next.js 15 |
| `react-dom` | `^18.2.0` | `^19` | Required by Next.js 15 |
| `framer-motion` | `^9.0.2` | `^12` | Only production dep kept. Breaking changes v9→v12: `exitBeforeEnter` removed (use `mode="wait"`), some `useAnimation` patterns renamed |
| `typescript` | — (new) | `^5` | Strict mode, bundler moduleResolution |
| `@types/node` | — (new) | `^22` | Node.js type definitions |
| `@types/react` | `^18.0.26` | `^19` | Must match React 19 |
| `@types/react-dom` | `^18.0.9` | `^19` | Must match React 19 |
| `tailwindcss` | — (new) | `^4` | v4 uses CSS-first config |
| `@tailwindcss/postcss` | — (new) | `^4` | PostCSS plugin for Tailwind v4 |
| `postcss` | — (new) | `^8` | Required by Tailwind |
| `eslint` | — (new) | `^9` | Latest, used by Next.js |
| `eslint-config-next` | — (new) | `^15` | Must match Next.js version |
| `prettier` | — (new) | `^3` | Code formatting |
| `eslint-config-prettier` | — (new) | `^10` | Prevents ESLint/Prettier conflicts |

**Dependencies REMOVED:**

| Package | Reason |
|---|---|
| `vite`, `@vitejs/plugin-react` | Replaced by Next.js |
| `axios` | Replaced by native `fetch()` |
| `react-glider` | Replaced by CSS scroll-snap |
| `react-simple-typewriter` | Replaced by custom `useTypewriter` hook |
| `react-intersection-observer` | Unused — never imported in any component |
| `@fortawesome/fontawesome-svg-core` | Replaced by inline SVG icon components |
| `@fortawesome/free-regular-svg-icons` | Replaced by inline SVG icon components |
| `@fortawesome/free-solid-svg-icons` | Replaced by inline SVG icon components |
| `@fortawesome/react-fontawesome` | Replaced by inline SVG icon components |

**Verify:**
```bash
npm run dev
npx tsc --version   # should report 5.x
npx next --version  # should report 15.x
npm ls --depth=0    # no peer dep warnings
```

**Commit:** `chore: initialize Next.js 15 project with TypeScript and Tailwind`

---

### Task 2: Add ESLint + Prettier configuration
**File:** `.eslintrc.cjs`, `.prettierrc`, `package.json`, `.gitignore`
**Time:** ~3 minutes

**Steps:**
1. Create `.eslintrc.cjs` extending `next/core-web-vitals`, `next/typescript`, and `prettier`
2. Create `.prettierrc` with formatting rules (no semicolons, single quotes, trailing commas, 100 print width)
3. Add scripts to `package.json`: `"format"`, `"typecheck"`
4. Update `.gitignore` with Next.js entries: `.next/`, `out/`, `*.tsbuildinfo`, `.eslintcache`

**Code:**
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

**Verify:**
```bash
npm run lint
npm run format
```

**Commit:** `chore: add ESLint and Prettier configuration`

---

### Task 3: Configure Tailwind with design tokens
**File:** `tailwind.config.ts`, `src/app/globals.css`
**Time:** ~5 minutes

**Steps:**
1. Configure `tailwind.config.ts` extending the default theme with the portfolio's exact color palette, font family, and custom animation easings
2. Create `src/app/globals.css` with:
   - Tailwind directives (`@tailwind base/components/utilities`)
   - CSS custom properties for the gradient utility (deduplicated from 5 current copies in Header.css, Hero.css, Skills.css)
   - Noise overlay styles (static `body::before` with `noise.png`)
   - Custom scrollbar styles (webkit)
   - `prefers-reduced-motion` media query to disable animations globally for accessibility

**Code:**
```ts
// tailwind.config.ts — theme.extend
colors: {
  accent: '#4a77ff',
  bg: { primary: '#030202', secondary: '#141414' },
  text: { primary: '#e5e5e5', secondary: '#a3a3a3', muted: '#3d3d3d', heading: '#e0e0e0' },
  line: 'rgb(244, 244, 245)',
},
fontFamily: { sans: ['Fira Sans', ...defaultTheme.fontFamily.sans] },
```

```css
/* globals.css — reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Verify:**
```bash
npm run dev
# Confirm Tailwind classes compile — check browser for correct bg/text colors
```

**Commit:** `feat: configure Tailwind with portfolio design tokens and global styles`

---

### Task 4: Create centralized site config
**File:** `src/data/site.ts`
**Time:** ~3 minutes

**Steps:**
1. Create `src/data/` directory
2. Create `site.ts` extracting ALL hardcoded personal data from:
   - Name `"Vitor Mesquita"` — `Hero.jsx:23`
   - GitHub username `"vitorsm19"` — `App.jsx:32`, `Header.jsx:21`, `Hero.jsx:29,35`, `Projects.jsx:27,59`, `Projects.css:162,168`
   - Email — `App.jsx:56-57`, `Contact.jsx:39`
   - LinkedIn URL — `App.jsx:19`, `Contact.jsx:33`
   - Phone number — `Contact.jsx:40`
   - Location `"Budapest"` — `Hero.jsx:27-31`
   - `"EU Citizen"` — `Hero.jsx:27`
   - Hero text, about paragraphs, contact text, typewriter words — `Hero.jsx`, `About.jsx`, `Contact.jsx`
3. Export as `siteConfig` with `as const` for literal types

**Verify:**
```bash
npx tsc --noEmit src/data/site.ts
```

**Commit:** `feat: create centralized site config with all personal data`

---

### Task 5: Create skills data array
**File:** `src/data/skills.ts`
**Time:** ~5 minutes

**Steps:**
1. Define `Skill` interface with: `name`, `label`, `viewBox`, `svgContent` (raw SVG inner HTML string), `tier: 'primary' | 'secondary'`
2. Extract SVG data from all 15 components in `src/components/SkillsLogo.jsx` (339 lines)
3. Primary tier (5, displayed large): Vue, Nuxt, React, Next, TypeScript
4. Secondary tier (10, displayed small): HTML, CSS, JavaScript, Angular, Node, Tailwind, Bootstrap, C#, .NET, jQuery
5. Some SVGs have complex structures (groups, transforms, circles) — store raw SVG `children` as a string for `dangerouslySetInnerHTML` rendering

**Verify:**
```bash
npx tsc --noEmit src/data/skills.ts
# Confirm array has exactly 15 entries
```

**Commit:** `feat: create skills data array replacing 339-line SkillsLogo.jsx`

---

### Task 6: Create navigation data
**File:** `src/data/navigation.ts`
**Time:** ~2 minutes

**Steps:**
1. Define `NavItem` interface: `id`, `label`, `iconName`
2. Export array with 4 items: about, skills, projects, contact

**Code:**
```ts
export const navigationItems: NavItem[] = [
  { id: 'about', label: 'About Me', iconName: 'info' },
  { id: 'skills', label: 'Skills', iconName: 'code' },
  { id: 'projects', label: 'Projects', iconName: 'document' },
  { id: 'contact', label: 'Contact', iconName: 'message' },
]
```

**Verify:**
```bash
npx tsc --noEmit src/data/navigation.ts
```

**Commit:** `feat: create navigation data config`

---

### Task 7: Create custom useTypewriter hook
**File:** `src/hooks/useTypewriter.ts`
**Time:** ~3 minutes

**Steps:**
1. Create `src/hooks/` directory
2. Implement hook with params: `words[]`, `typeSpeed` (default 100), `deleteSpeed` (default 60), `delaySpeed` (default 3000), `loop` (default true)
3. State machine: type forward → pause → delete backward → advance word → repeat
4. Returns current text string
5. This replaces the `react-simple-typewriter` dependency (entire package)

**Verify:**
```bash
npx tsc --noEmit src/hooks/useTypewriter.ts
```

**Commit:** `feat: create custom useTypewriter hook replacing react-simple-typewriter`

---

### Task 8: Create typed GitHub API fetch utility
**File:** `src/lib/github.ts`
**Time:** ~2 minutes

**Steps:**
1. Create `src/lib/` directory
2. Define `GitHubRepo` interface: `id`, `name`, `description`, `html_url`, `stargazers_count`
3. Export `fetchRepos(username: string)` using native `fetch()` — replaces `axios`
4. Filter: `stargazers_count > 0` AND `name !== 'Portfolio'`
5. Return typed array, throw on network error

**Verify:**
```bash
npx tsc --noEmit src/lib/github.ts
```

**Commit:** `feat: create typed GitHub API utility replacing axios`

---

### Task 9: Create all icon components (replacing FontAwesome)
**File:** `src/components/icons/*.tsx`, `src/components/icons/index.ts`
**Time:** ~5 minutes

**Steps:**
1. Create `src/components/icons/` directory
2. Define shared `IconProps` interface: `size?` (default 24), `className?`, `aria-hidden?` (default true)
3. Create 10 icon components, each a typed SVG using `currentColor`:

| File | Replaces | Source |
|---|---|---|
| `ArrowUpIcon.tsx` | `faArrowUp` | `App.jsx` scroll-to-top |
| `InfoIcon.tsx` | `faInfoCircle` | `Header.jsx` nav |
| `CodeIcon.tsx` | `faCode` | `Header.jsx` nav |
| `DocumentIcon.tsx` | `faSheetPlastic` | `Header.jsx` nav |
| `MessageIcon.tsx` | `faMessage` | `Header.jsx` nav |
| `ExternalLinkIcon.tsx` | `faLink` | `Projects.jsx` card |
| `ChevronLeftIcon.tsx` | `faChevronLeft` | `Projects.jsx` carousel |
| `ChevronRightIcon.tsx` | `faChevronRight` | `Projects.jsx` carousel |
| `GitHubIcon.tsx` | inline SVG | `App.jsx:33-41`, `Projects.jsx:31-41` |
| `LinkedInIcon.tsx` | inline SVG | `App.jsx:22-30` |

4. Drop `faFileDownload` — imported in `App.jsx` but never used
5. Create `index.ts` barrel file re-exporting all icons

**Verify:**
```bash
npx tsc --noEmit src/components/icons/index.ts
```

**Commit:** `feat: create inline SVG icon components replacing FontAwesome`

---

### Task 10: Create SkillIcon component
**File:** `src/components/ui/SkillIcon.tsx`
**Time:** ~3 minutes

**Steps:**
1. Create `src/components/ui/` directory
2. Accept `Skill` object from `src/data/skills.ts` as prop
3. Render SVG with `role="img"`, `aria-label={skill.label}`
4. Render label text underneath
5. Apply tier-based sizing: primary = large (75px on desktop), secondary = small (25px on desktop, 32px on mobile for touch targets)
6. This single ~40-line component replaces the entire 339-line `SkillsLogo.jsx`

**Verify:**
```bash
npx tsc --noEmit src/components/ui/SkillIcon.tsx
```

**Commit:** `feat: create generic SkillIcon renderer replacing SkillsLogo.jsx`

---

### Task 11: Create Contact section
**File:** `src/components/sections/Contact.tsx`
**Time:** ~3 minutes

**Steps:**
1. Mark as `'use client'` (framer-motion requires client)
2. Import `siteConfig` — pull heading, body text, email, phone, LinkedIn URL
3. framer-motion: `fadeUp` animation, `viewport={{ once: true, amount: 0.3 }}`
4. Staggered entrance: heading → body → links (0.15s stagger between children)
5. `rel="noreferrer noopener"` + `target="_blank"` on external links
6. Tailwind: no fixed height (was `height: 200px`), centered, padding via responsive classes
7. Include GitHub link on mobile (currently missing from Contact — only accessible via desktop sidebar)
8. Responsive: full width centered at all breakpoints, content always visible

**Verify:**
```bash
npm run dev
# Navigate to / — Contact section renders at bottom with all links
```

**Commit:** `feat: create Contact section with staggered animation and accessibility`

---

### Task 12: Create About section
**File:** `src/components/sections/About.tsx`
**Time:** ~3 minutes

**Steps:**
1. `'use client'` for framer-motion
2. Import `siteConfig` — pull about paragraphs
3. framer-motion: `fadeInLeft` for title, `fadeInRight` for text, `viewport={{ once: true }}`
4. Slide distance: 60px (was 500px — too aggressive)
5. Fix WCAG contrast: heading color from `#3D3D3D` (1.8:1 ratio on `#030202`) to at least `#5A5A5A`
6. No fixed height (was `height: 400px`)
7. Responsive:
   - **Mobile:** Stack vertically, title centered, text below. Use `fadeUp` instead of horizontal slides (horizontal feels wrong on narrow screens)
   - **lg+:** Side-by-side (current desktop), `fadeInLeft`/`fadeInRight`

**Verify:**
```bash
npm run dev
# Scroll to About — animation plays once, text readable, no overflow
```

**Commit:** `feat: create About section with contrast fix and responsive layout`

---

### Task 13: Create Skills section
**File:** `src/components/sections/Skills.tsx`
**Time:** ~5 minutes

**Steps:**
1. `'use client'` for framer-motion
2. Import `skills` from `src/data/skills.ts`, filter by `tier`
3. Render primary (5 large) and secondary (10 small) using `SkillIcon`
4. Gradient text on section headings ("TECH/STACK") using shared gradient utility class from `globals.css`
5. framer-motion: stagger primary icons (0.1s each = 0.5s total), stagger secondary (0.05s each = 0.5s total)
6. Slide distance: 60px (was 500px)
7. Hover micro-interactions:
   - Primary: `grayscale → color` + `translateY(-2px)` lift
   - Secondary: `grayscale → color` + `scale(1.15)` (was 1.3 — too aggressive)
8. Responsive:
   - **Mobile:** Stack vertically, title on top. Primary in 3+2 grid, secondary in 5+5 grid. Secondary logos at 32px (was 25px, too small for touch). **Disable grayscale on mobile** (no hover state — show in color by default)
   - **sm:** Primary logos in row of 5
   - **lg+:** Side-by-side (current desktop), grayscale enabled

**Verify:**
```bash
npm run dev
# Scroll to Skills — logos render, grayscale on desktop, color on mobile
```

**Commit:** `feat: create Skills section with staggered icons and responsive grid`

---

### Task 14: Create Hero section
**File:** `src/components/sections/Hero.tsx`
**Time:** ~5 minutes

**Steps:**
1. `'use client'` for `useTypewriter` hook + framer-motion
2. Import `useTypewriter` from `src/hooks/useTypewriter.ts`
3. Import `siteConfig` — pull name, headings, location, typewriter words, tagline
4. Import images locally via Next.js `<Image>`:
   - `about-pic.png` (was GitHub raw URL at `Hero.jsx:35`)
   - `hungary-flag.png` (was GitHub raw URL at `Hero.jsx:29`)
5. Gradient text on "FRONTEND" using shared gradient utility
6. Gray gradient on "DEVELOPER" via Tailwind `bg-gradient-to-r from-text-secondary to-text-primary bg-clip-text text-transparent`
7. Choreographed entrance (triggers on mount, NOT scroll):
   - Stagger children with 0.15s delay
   - Sequence: name (0s) → "FRONTEND" (0.15s) → "DEVELOPER" (0.3s) → location (0.45s) → photo with scale 0.95→1.0 (0.6s) → tagline (0.75s)
8. **Keep typewriter tagline visible on mobile** (currently `display: none` below 1000px — loses personality). Wrap to 2 lines, reduce font size to `text-base`
9. Responsive:
   - **Mobile:** Stack vertically — photo on top (~180px), name centered, headings at `text-4xl`
   - **sm:** Photo 240px, headings `text-5xl`
   - **md:** Headings `text-6xl`, photo 300px
   - **lg+:** Side-by-side, photo 400px, headings `text-7xl` (current 6rem)
   - Use `clamp()` for fluid heading sizes: `font-size: clamp(2.25rem, 5vw + 1rem, 6rem)`

**Verify:**
```bash
npm run dev
# Page loads — hero animates in sequence, typewriter types, images load locally (check Network tab — no github.com requests)
```

**Commit:** `feat: create Hero section with choreographed entrance and local images`

---

### Task 15: Create ProjectCard component
**File:** `src/components/sections/ProjectCard.tsx`
**Time:** ~3 minutes

**Steps:**
1. Define typed props: `title`, `repoName`, `link`, `description`, `image?`
2. Card with cover image area + content area (repo description + links)
3. Use `GitHubIcon` and `ExternalLinkIcon` from `src/components/icons`
4. Import local images for known projects:
   - `todo-project.jpg` (was GitHub raw URL in `Projects.css:162`)
   - `mozify-preview.jpeg` (was GitHub raw URL in `Projects.css:168`)
5. `rel="noreferrer noopener"` + `target="_blank"` on all external links
6. Hover: link color `text-secondary → text-primary`, icon `translateX(2px)` nudge
7. Responsive: cards adapt to container width (not fixed 300px or 250px)

**Verify:**
```bash
npx tsc --noEmit src/components/sections/ProjectCard.tsx
```

**Commit:** `feat: create ProjectCard component with local images`

---

### Task 16: Create Projects section with scroll-snap carousel
**File:** `src/components/sections/Projects.tsx`
**Time:** ~5 minutes

**Steps:**
1. `'use client'` (useState/useEffect for API fetch)
2. Use `fetchRepos()` from `src/lib/github.ts` instead of axios
3. Add loading skeleton state (shimmer cards)
4. Add error state with graceful message
5. CSS scroll-snap carousel replacing react-glider:
   - Container: `overflow-x-auto snap-x snap-mandatory`
   - Children: `snap-start`
   - Arrow buttons (`ChevronLeftIcon`/`ChevronRightIcon`) using `scrollBy()` — visible on `lg+` only
   - Dot indicators tracking `scrollLeft` — always visible
6. framer-motion: `fadeUp` on title + carousel container, `once: true`
7. No per-card animation (would fight scroll-snap)
8. Responsive:
   - **Mobile:** 1 card full width, swipe to scroll, arrows hidden
   - **md:** 2 cards visible
   - **lg+:** 3 cards visible, arrow buttons shown

**Verify:**
```bash
npm run dev
# Scroll to Projects — repos load, carousel snaps, arrows work on desktop
```

**Commit:** `feat: create Projects section with scroll-snap carousel and loading states`

---

### Task 17: Create Header with accessibility fixes
**File:** `src/components/layout/Header.tsx`
**Time:** ~5 minutes

**Steps:**
1. `'use client'` (onClick handlers)
2. Import `navigationItems` from `src/data/navigation.ts`
3. Import icons from `src/components/icons`, map `iconName` → component via lookup object
4. Import logo locally via `<Image>` (was GitHub raw URL at `Header.jsx:21`)
5. **Fix critical accessibility violations:**
   - Current: `<a onClick>` wrapping `<li>` (invalid HTML, not keyboard-navigable)
   - Fix: `<nav aria-label="Main"><ul><li><button aria-label="Navigate to {label}">` structure
   - Buttons are natively keyboard-focusable (fixes missing `href` issue)
6. Gradient pill hover: recreate with Tailwind `group-hover` + `transition-all duration-500` + gradient utility class
7. Navigation: `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })` (was `document.querySelector`)
8. Responsive:
   - **Mobile:** Logo centered, nav pills in row below. Icons only (no expand-on-hover). Icon color → accent on tap/active
   - **lg+:** Logo left, pills right, full expand-on-hover with gradient background
   - Add subtle backdrop-blur on scroll for visual separation

**Verify:**
```bash
npm run dev
# Click each nav pill — smooth scroll to section. Tab through pills with keyboard — focus visible, Enter activates
```

**Commit:** `feat: create Header with semantic HTML and keyboard navigation`

---

### Task 18: Create SocialSidebar
**File:** `src/components/layout/SocialSidebar.tsx`
**Time:** ~2 minutes

**Steps:**
1. Fixed left sidebar with `LinkedInIcon` + `GitHubIcon` + vertical line
2. Links from `siteConfig.linkedin.url` and `siteConfig.github.url`
3. `aria-label` on each link, `rel="noreferrer noopener"`, `target="_blank"`
4. Hover: `text-accent` + `translateY(-2px)` (currently no hover effect on social icons)
5. Hidden below `lg` breakpoint: Tailwind `hidden lg:flex`

**Verify:**
```bash
npx tsc --noEmit src/components/layout/SocialSidebar.tsx
```

**Commit:** `feat: create SocialSidebar with hover effects and aria labels`

---

### Task 19: Create EmailSidebar
**File:** `src/components/layout/EmailSidebar.tsx`
**Time:** ~2 minutes

**Steps:**
1. Fixed right sidebar with vertical email text + vertical line
2. Email from `siteConfig.email`
3. `writing-mode: vertical-rl` via Tailwind arbitrary value `[writing-mode:vertical-rl]`
4. Hidden below `lg`: Tailwind `hidden lg:flex`

**Verify:**
```bash
npx tsc --noEmit src/components/layout/EmailSidebar.tsx
```

**Commit:** `feat: create EmailSidebar with vertical text`

---

### Task 20: Create ScrollToTop button
**File:** `src/components/layout/ScrollToTop.tsx`
**Time:** ~2 minutes

**Steps:**
1. `'use client'` (onClick handler)
2. `ArrowUpIcon`, `aria-label="Scroll to top"`
3. `window.scrollTo({ top: 0, behavior: 'smooth' })` on click
4. Hover: `bg-accent` + `scale(1.05)` pop effect
5. Touch target: min 44x44px on mobile (WCAG 2.2), smaller on `lg+` (current 2rem/32px)
6. Fixed `bottom-4 right-4`, z-index above content

**Verify:**
```bash
npx tsc --noEmit src/components/layout/ScrollToTop.tsx
```

**Commit:** `feat: create ScrollToTop button with WCAG touch target`

---

### Task 21: Create root layout
**File:** `src/app/layout.tsx`
**Time:** ~3 minutes

**Steps:**
1. Import Fira Sans via `next/font/google` with weights 400, 600, 700 (replaces render-blocking CSS `@import` from `App.css:1`)
2. Import `globals.css`
3. Set `<html lang="en" className={firaFont.className}>` with dark scheme
4. Basic metadata: title `"Portfolio - Vitor Mesquita"`, description — minimal, full SEO deferred
5. Google Tag Manager script from current `index.html:10-14` (preserve existing analytics)

**Verify:**
```bash
npm run dev
# Check Elements tab — Fira Sans applied to body, no render-blocking font request
```

**Commit:** `feat: create root layout with next/font and metadata`

---

### Task 22: Create home page
**File:** `src/app/page.tsx`
**Time:** ~3 minutes

**Steps:**
1. Import all section components: Hero, About, Skills, Projects, Contact
2. Import layout components: Header, SocialSidebar, EmailSidebar, ScrollToTop
3. Assemble page with section `id` attributes for scroll navigation: `id="about"`, `id="skills"`, `id="projects"`, `id="contact"`
4. Content container: `max-w-7xl mx-auto` (replaces manual `max-width: 1200px` repeated in every section)
5. No fixed heights on any section — content-driven sizing with generous padding
6. `min-h-screen` on Hero section only

**Verify:**
```bash
npm run dev
# Full site renders — all 6 sections visible, nav scrolls to correct sections, typewriter works, projects load, images local
```

**Commit:** `feat: create home page assembling all sections`

---

### Task 23: Move static assets to correct locations
**File:** `public/noise.png`, `public/favicon.ico`, `public/CV_VitorMesquita.pdf`
**Time:** ~2 minutes

**Steps:**
1. Move `src/assets/noise.png` → `public/noise.png` (referenced in `globals.css`, not imported in components)
2. Copy `src/assets/icon.png` → `public/favicon.ico` (or generate proper favicon from it)
3. Move `src/assets/CV_VitorMesquita.pdf` → `public/CV_VitorMesquita.pdf` (direct download link)
4. Keep in `src/assets/`: `logo.png`, `about-pic.png`, `hungary-flag.png`, `todo-project.jpg`, `mozify-preview.jpeg` (imported by Next.js `<Image>` for optimization)

**Verify:**
```bash
npm run dev
# Noise overlay visible, favicon in browser tab, /CV_VitorMesquita.pdf accessible
```

**Commit:** `chore: move static assets to public directory`

---

### Task 24: Delete old JSX component files
**File:** `src/components/*.jsx`, `src/main.jsx`, `src/App.jsx`
**Time:** ~2 minutes

**Steps:**
1. Delete 9 old component files:
   - `src/main.jsx`
   - `src/App.jsx`
   - `src/components/Header.jsx`
   - `src/components/Hero.jsx`
   - `src/components/About.jsx`
   - `src/components/Skills.jsx`
   - `src/components/SkillsLogo.jsx`
   - `src/components/Projects.jsx`
   - `src/components/Contact.jsx`

**Verify:**
```bash
npm run dev
# No import errors — all imports now resolve to new TSX files
```

**Commit:** `chore: delete old JSX component files`

---

### Task 25: Delete old CSS files and directory
**File:** `src/index.css`, `src/css/*.css`, `src/css/`
**Time:** ~2 minutes

**Steps:**
1. Delete 8 CSS files:
   - `src/index.css`
   - `src/css/App.css`
   - `src/css/Header.css`
   - `src/css/Hero.css`
   - `src/css/About.css`
   - `src/css/Skills.css`
   - `src/css/Projects.css`
   - `src/css/Contact.css`
2. Delete `src/css/` directory
3. This removes: duplicate resets, 5 copies of the base64 gradient SVG, dead `@keyframes noise` animation (50 lines, never applied), `!important` transform overrides, all commented-out dead code blocks

**Verify:**
```bash
npm run dev
# No missing CSS import errors — all styles now from Tailwind + globals.css
```

**Commit:** `chore: delete old CSS files and directory`

---

### Task 26: Verify clean dependency tree
**File:** `package.json`
**Time:** ~2 minutes

**Steps:**
1. Run `npm ls --depth=0` and verify:
   - **Production deps (2):** `framer-motion@^12`, `next@^15` (peers: `react@^19`, `react-dom@^19`)
   - **Dev deps (~11):** `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `eslint`, `eslint-config-next`, `prettier`, `eslint-config-prettier`
2. Confirm NONE of these appear: `axios`, `react-glider`, `glider-js`, `react-simple-typewriter`, `react-intersection-observer`, `@fortawesome/*`, `vite`, `@vitejs/plugin-react`
3. Run `npm audit` — no high/critical vulnerabilities

**Verify:**
```bash
npm ls --depth=0
npm audit
npm run build
```

**Commit:** `chore: verify clean dependency tree`

---

### Task 27: Delete REFACTOR_PLAN.md from project root
**File:** `REFACTOR_PLAN.md`
**Time:** ~1 minute

**Steps:**
1. Delete `REFACTOR_PLAN.md` from project root (superseded by this executable plan in `docs/plans/`)

**Verify:**
```bash
ls REFACTOR_PLAN.md  # should not exist
```

**Commit:** `chore: remove superseded plan file`

---

### Task 28: TypeScript strict check
**File:** all `.ts` and `.tsx` files
**Time:** ~3 minutes

**Steps:**
1. Run `npx tsc --noEmit`
2. Fix any remaining type errors — common ones:
   - Missing type annotations on event handlers
   - Implicit `any` in callback parameters
   - Null safety on `document.getElementById`
3. Confirm `tsconfig.json` has `strict: true`

**Verify:**
```bash
npx tsc --noEmit  # zero errors
```

**Commit:** `fix: resolve all TypeScript strict mode errors`

---

### Task 29: ESLint + Prettier pass
**File:** all source files
**Time:** ~2 minutes

**Steps:**
1. Run `npm run format` to auto-format all files
2. Run `npm run lint` and fix any warnings:
   - Missing `key` props in lists
   - Unused variables/imports
   - React hooks dependency arrays

**Verify:**
```bash
npm run format
npm run lint  # zero warnings
npx prettier --check "src/**/*.{ts,tsx,css}"  # exits 0
```

**Commit:** `style: format all files with Prettier and fix lint warnings`

---

### Task 30: Production build verification
**File:** N/A (build output)
**Time:** ~3 minutes

**Steps:**
1. Run `npm run build` — should complete with zero warnings
2. Run `npm run start` — preview production build
3. Verify in browser:
   - No 404s in Network tab
   - No console errors
   - No `github.com` raw URL requests (all images local)
   - Noise overlay renders
   - Scrollbar styled
   - Fira Sans loaded (no FOUT)

**Verify:**
```bash
npm run build  # clean build
npm run start  # preview at localhost:3000
```

**Commit:** N/A (verification only)

---

### Task 31: Visual regression — Header
**File:** N/A (manual check)
**Time:** ~2 minutes

**Steps:**
1. Logo loads locally (not from github.com)
2. Nav pills have gradient hover animation on `lg+`
3. Nav pills show icons only on mobile, icon turns accent color on tap
4. Clicking each pill smooth-scrolls to correct section
5. Tab through pills — focus ring visible, Enter activates scroll
6. Backdrop-blur effect on scroll (if implemented)

**Verify:** Manual browser check at desktop and mobile viewport sizes

**Commit:** N/A (verification only)

---

### Task 32: Visual regression — Hero
**File:** N/A (manual check)
**Time:** ~2 minutes

**Steps:**
1. Photo loads locally, optimized by Next.js `<Image>` (check Network — WebP/AVIF format)
2. "FRONTEND" has pink→blue gradient text
3. "DEVELOPER" has gray gradient text
4. Typewriter animates through words with correct timing
5. Hungary flag loads locally
6. Staggered entrance plays on page load (name → headings → location → photo → tagline)
7. **Tagline visible on mobile** (was previously hidden)
8. Responsive: photo stacks above text on mobile, side-by-side on lg+

**Verify:** Manual browser check at mobile, tablet, and desktop viewports

**Commit:** N/A (verification only)

---

### Task 33: Visual regression — About
**File:** N/A (manual check)
**Time:** ~1 minute

**Steps:**
1. Slide-in animation plays ONCE on scroll (not every time)
2. Heading contrast readable (was #3D3D3D on #030202 = failing WCAG)
3. Text renders correctly from `siteConfig`
4. No content overflow or clipping (no fixed height)
5. Stacks vertically on mobile, side-by-side on lg+

**Verify:** Manual browser check

**Commit:** N/A (verification only)

---

### Task 34: Visual regression — Skills
**File:** N/A (manual check)
**Time:** ~2 minutes

**Steps:**
1. 5 primary logos display at large size, 10 secondary at small size
2. Desktop: grayscale filter, hover reveals color with lift/scale
3. Mobile: logos in color (no grayscale — touch has no hover)
4. Secondary logos at 32px on mobile (not 25px — WCAG touch target)
5. Staggered icon reveal animation
6. Gradient text on "TECH/STACK" headings

**Verify:** Manual browser check at mobile and desktop

**Commit:** N/A (verification only)

---

### Task 35: Visual regression — Projects
**File:** N/A (manual check)
**Time:** ~2 minutes

**Steps:**
1. GitHub API repos load (check Network tab)
2. Loading skeleton shows while fetching
3. Error message shows gracefully if API fails (test by going offline)
4. Scroll-snap carousel works — swipe on mobile, arrows on desktop
5. Cards display title, description, GitHub + Live links
6. Dot indicators reflect scroll position
7. Responsive: 1 card mobile, 2 tablet, 3 desktop

**Verify:** Manual browser check + offline test

**Commit:** N/A (verification only)

---

### Task 36: Visual regression — Contact
**File:** N/A (manual check)
**Time:** ~1 minute

**Steps:**
1. CTA heading and text render from `siteConfig`
2. LinkedIn, Email, Phone links all work
3. **GitHub link accessible on mobile** (was missing from Contact — only in desktop sidebar)
4. Staggered fade-up animation plays once

**Verify:** Manual browser check

**Commit:** N/A (verification only)

---

### Task 37: Visual regression — Sidebars + ScrollToTop
**File:** N/A (manual check)
**Time:** ~1 minute

**Steps:**
1. Left sidebar (social): visible on lg+ with LinkedIn + GitHub icons + vertical line
2. Right sidebar (email): visible on lg+ with vertical email text + vertical line
3. Both hidden on mobile
4. Social icon hover: accent color + subtle lift
5. Scroll-to-top: fixed bottom-right, visible after scrolling, smooth scroll on click
6. Touch target at least 44x44px on mobile

**Verify:** Manual browser check at mobile and desktop

**Commit:** N/A (verification only)

---

### Task 38: Visual regression — Global
**File:** N/A (manual check)
**Time:** ~1 minute

**Steps:**
1. Noise overlay visible (subtle grain texture over entire page)
2. Custom scrollbar styled (webkit)
3. Dark theme consistent: `#030202` background, `#141414` surface sections
4. All animations play once (no replay on re-scroll)
5. No `!important` overrides needed (check DevTools Computed styles)

**Verify:** Manual browser check

**Commit:** N/A (verification only)

---

### Task 39: Test reduced motion preference
**File:** N/A (accessibility check)
**Time:** ~2 minutes

**Steps:**
1. Enable "Reduce motion" in OS settings (or Chrome DevTools → Rendering → `prefers-reduced-motion: reduce`)
2. Reload page — all elements should appear instantly in final position
3. No slide-in, fade, or stagger animations
4. Typewriter should still work (it's text content, not motion)
5. Hover effects may still work (they're user-initiated, not auto-playing)

**Verify:** Toggle reduced motion in DevTools, reload, verify no animations

**Commit:** N/A (verification only)

---

### Task 40: Test all responsive breakpoints
**File:** N/A (responsive check)
**Time:** ~3 minutes

**Steps:**
1. Test at 5 viewport widths:
   - **375px** (iPhone SE) — mobile layout, stacked sections, no sidebars, tagline wraps
   - **640px** (sm) — slightly larger cards, expanded skill grid
   - **768px** (md) — 2 project cards, larger headings
   - **1024px** (lg) — sidebars appear, side-by-side layouts, grayscale on skills, nav pill hover
   - **1440px** (xl) — max-width container, generous whitespace
2. No horizontal scrollbar at any width
3. No text overflow or clipping
4. All interactive elements accessible at all sizes

**Verify:** Chrome DevTools responsive mode at each width

**Commit:** N/A (verification only)

---

## Progress Tracker

- [x] Task 1: Initialize Next.js project and install all dependencies
- [x] Task 2: Add ESLint + Prettier configuration
- [x] Task 3: Configure Tailwind with design tokens
- [x] Task 4: Create centralized site config
- [x] Task 5: Create skills data array
- [x] Task 6: Create navigation data
- [x] Task 7: Create custom useTypewriter hook
- [x] Task 8: Create typed GitHub API fetch utility
- [x] Task 9: Create all icon components (replacing FontAwesome)
- [x] Task 10: Create SkillIcon component
- [x] Task 11: Create Contact section
- [x] Task 12: Create About section
- [x] Task 13: Create Skills section
- [x] Task 14: Create Hero section
- [x] Task 15: Create ProjectCard component
- [x] Task 16: Create Projects section with scroll-snap carousel
- [x] Task 17: Create Header with accessibility fixes
- [x] Task 18: Create SocialSidebar
- [x] Task 19: Create EmailSidebar
- [x] Task 20: Create ScrollToTop button
- [x] Task 21: Create root layout
- [x] Task 22: Create home page
- [x] Task 23: Move static assets to correct locations
- [x] Task 24: Delete old JSX component files
- [x] Task 25: Delete old CSS files and directory
- [x] Task 26: Verify clean dependency tree
- [ ] Task 27: Delete REFACTOR_PLAN.md from project root
- [x] Task 28: TypeScript strict check
- [x] Task 29: ESLint + Prettier pass
- [x] Task 30: Production build verification
- [ ] Task 31: Visual regression — Header
- [ ] Task 32: Visual regression — Hero
- [ ] Task 33: Visual regression — About
- [ ] Task 34: Visual regression — Skills
- [ ] Task 35: Visual regression — Projects
- [ ] Task 36: Visual regression — Contact
- [ ] Task 37: Visual regression — Sidebars + ScrollToTop
- [ ] Task 38: Visual regression — Global
- [ ] Task 39: Test reduced motion preference
- [ ] Task 40: Test all responsive breakpoints

## Notes

- **SEO is explicitly deferred** — no meta tags, OG images, structured data, sitemap, or robots.txt in this refactor. Will be a separate task.
- **Visual design stays the same** — this is an architecture refactor, not a redesign. Colors, layout, typography, and personality are preserved.
- **framer-motion v9→v12 breaking changes:** `AnimatePresence exitBeforeEnter` removed (use `mode="wait"`), some `useAnimation` patterns renamed to `useAnimate`. These are handled inline during component creation tasks.
- **Tailwind v4 uses CSS-first config** — the `tailwind.config.ts` file format may differ from v3 documentation. Use the v4 docs for reference.
- **The old `REFACTOR_PLAN.md`** at project root contains the original design rationale, appendices on animation strategy, and responsive strategy. This executable plan incorporates all of that content but in task-granular format. The original file is deleted in Task 27.
- Animation appendix details (shared variants, per-section choreography, hover interactions, reduced-motion support) are integrated directly into Tasks 3, 11-14, 17-20.
- Responsiveness appendix details (breakpoint system, per-section responsive plans, general improvements) are integrated directly into Tasks 3, 11-22, 40.
