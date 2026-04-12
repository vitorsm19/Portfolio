'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Projects } from '../Projects'
import { ProjectsSplit } from './ProjectsSplit'
import { ProjectsOrbit } from './ProjectsOrbit'
import { ProjectsRadial } from './ProjectsRadial'
import { ProjectsElasticGrid } from './ProjectsElasticGrid'
import { ProjectsTimeline } from './ProjectsTimeline'

const VARIANTS = [
  { id: 'original', label: 'Original', sublabel: 'Cinematic Scroll', component: Projects },
  { id: 'split', label: 'Option 1', sublabel: 'Split Cards', component: ProjectsSplit },
  { id: 'orbit', label: 'Option 2', sublabel: 'Orbit', component: ProjectsOrbit },
  { id: 'radial', label: 'Option 3', sublabel: 'Tab Selector', component: ProjectsRadial },
  { id: 'elasticgrid', label: 'Option 4', sublabel: 'Elastic Grid', component: ProjectsElasticGrid },
  { id: 'timeline', label: 'Option 5', sublabel: 'Progress Timeline', component: ProjectsTimeline },
] as const

export function ProjectsSwitcher() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const ActiveProjects = VARIANTS[active].component

  return (
    <div className="relative">
      <ActiveProjects key={VARIANTS[active].id} />

      <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-3">
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
                Projects variants ({VARIANTS.length})
              </p>
              <div className="flex flex-col gap-1">
                {VARIANTS.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => { setActive(i); setExpanded(false) }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                      active === i ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-white/5 hover:text-text-heading'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${active === i ? 'bg-accent' : 'bg-text-muted/30'}`} />
                    <div>
                      <span className="font-mono text-xs font-medium block">{v.label}</span>
                      <span className="font-mono text-[10px] text-text-muted block">{v.sublabel}</span>
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          {VARIANTS[active].sublabel}
        </button>
      </div>
    </div>
  )
}
