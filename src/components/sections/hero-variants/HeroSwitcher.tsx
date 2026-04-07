'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Hero } from '../Hero'
import { HeroAurora } from './HeroAurora'
import { HeroParallax } from '../HeroParallax'
import { HeroMinimal } from './HeroMinimal'
import { HeroMarquee } from './HeroMarquee'
import { HeroDiagonal } from './HeroDiagonal'
import { HeroGlass } from './HeroGlass'
import { HeroStatement } from './HeroStatement'
import { HeroDotGrid } from './HeroDotGrid'
import { HeroOverlap } from './HeroOverlap'
import { HeroRotate } from './HeroRotate'
import { HeroSidebar } from './HeroSidebar'
import { HeroGlass2 } from './HeroGlass2'
import { HeroGlass3 } from './HeroGlass3'
import { HeroGlass4 } from './HeroGlass4'

const HEROES = [
  { id: 'original', label: 'Original', sublabel: 'Blueprint Grid', component: Hero },
  { id: 'spotlight', label: 'Option 1', sublabel: 'Spotlight Drift', component: HeroAurora },
  { id: 'parallax', label: 'Option 2', sublabel: 'Parallax Editorial', component: HeroParallax },
  { id: 'minimal', label: 'Option 3', sublabel: 'Exaggerated Minimal', component: HeroMinimal },
  { id: 'marquee', label: 'Option 4', sublabel: 'Kinetic Marquee', component: HeroMarquee },
  { id: 'diagonal', label: 'Option 5', sublabel: 'Split Diagonal', component: HeroDiagonal },
  { id: 'glass', label: 'Option 6', sublabel: 'Floating Glass', component: HeroGlass },
  { id: 'statement', label: 'Option 7', sublabel: 'The Statement', component: HeroStatement },
  { id: 'dotgrid', label: 'Option 8', sublabel: 'Dot Grid', component: HeroDotGrid },
  { id: 'overlap', label: 'Option 9', sublabel: 'The Overlap', component: HeroOverlap },
  { id: 'rotate', label: 'Option 10', sublabel: 'Rotating Role', component: HeroRotate },
  { id: 'sidebar', label: 'Option 11', sublabel: 'The Sidebar', component: HeroSidebar },
  { id: 'glass2', label: 'Option 12', sublabel: 'Glass — Cross Current', component: HeroGlass2 },
  { id: 'glass3', label: 'Option 13', sublabel: 'Glass — Off-Center', component: HeroGlass3 },
  { id: 'glass4', label: 'Option 14', sublabel: 'Glass — Two Col', component: HeroGlass4 },
] as const

export function HeroSwitcher() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const ActiveHero = HEROES[active].component
  const goPrev = () => setActive((prev) => (prev - 1 + HEROES.length) % HEROES.length)
  const goNext = () => setActive((prev) => (prev + 1) % HEROES.length)

  return (
    <div className="relative">
      <ActiveHero key={HEROES[active].id} />

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
        <button
          onClick={goPrev}
          aria-label="Previous hero variant"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg-primary/80 text-text-heading shadow-lg backdrop-blur hover:bg-white/10 transition-all cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-bg-primary/90 backdrop-blur-xl border border-white/8 rounded-xl p-3 shadow-2xl min-w-[240px] max-h-[70vh] overflow-y-auto"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted px-2 pb-2">
                Hero variants ({HEROES.length})
              </p>
              <div className="flex flex-col gap-1">
                {HEROES.map((hero, i) => (
                  <button
                    key={hero.id}
                    onClick={() => {
                      setActive(i)
                      setExpanded(false)
                    }}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all cursor-pointer
                      ${
                        active === i
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-secondary hover:bg-white/5 hover:text-text-heading'
                      }
                    `}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        active === i ? 'bg-accent' : 'bg-text-muted/30'
                      }`}
                    />
                    <div>
                      <span className="font-mono text-xs font-medium block">{hero.label}</span>
                      <span className="font-mono text-[10px] text-text-muted block">
                        {hero.sublabel}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-full shadow-lg hover:brightness-110 transition-all cursor-pointer font-mono text-xs tracking-wider"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          {HEROES[active].sublabel}
        </button>

        <button
          onClick={goNext}
          aria-label="Next hero variant"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg-primary/80 text-text-heading shadow-lg backdrop-blur hover:bg-white/10 transition-all cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
