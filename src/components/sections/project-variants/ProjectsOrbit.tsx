'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { projects } from '@/data/projects'

/**
 * Projects v13 — "Orbit"
 * Project logos arranged in a circle around a central
 * detail panel. Click a logo to pull it into focus
 * and show the project details in the center.
 * Planetary, radial, unique.
 */

function pad(n: number) { return String(n).padStart(2, '0') }

export function ProjectsOrbit() {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState(0)
  const project = projects[selected]
  const count = projects.length

  return (
    <section aria-label="Projects" className="relative overflow-hidden">
      <div className="relative z-2 pt-28 lg:pt-40 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <GradientLabel tracking="0.28em">Featured Work</GradientLabel>
          <h2 className="mt-5 text-5xl sm:text-6xl lg:text-[7rem] font-bold text-text-heading leading-[0.9] tracking-tight!">
            <span className="text-7xl sm:text-6xl lg:text-8xl tracking-tight!" style={{ fontFamily: '"PP Playground", cursive', fontWeight: 500, fontStyle: 'italic' }}>Projects</span>
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-16 mt-12 pb-20 lg:pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Orbit ring — logos in a circle */}
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0">
            {/* Orbit ring line */}
            <div className="absolute inset-4 lg:inset-8 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-12 lg:inset-20 rounded-full border border-white/[0.03]" />

            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-accent/5 blur-xl" />
            </div>

            {/* Project logos placed in orbit — intentionally imperfect */}
            {projects.map((p, i) => {
              // Per-logo offsets: [angleDegrees, radiusPercent]
              // Items 0 and 3 sit on the true orbit, others drift
              const angleOffsets = [0, -12, 8, 0, -10]
              const radiusOffsets = [0, -4, 3, 0, 5]

              const angle = (i / count) * 360 - 90 + (angleOffsets[i] ?? 0)
              const rad = (angle * Math.PI) / 180
              const radius = 42 + (radiusOffsets[i] ?? 0)
              const x = 50 + radius * Math.cos(rad)
              const y = 50 + radius * Math.sin(rad)
              const isActive = selected === i

              return (
                <motion.button
                  key={p.name}
                  className="absolute cursor-pointer"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring' as const, stiffness: 200, damping: 15 }}
                  onClick={() => setSelected(i)}
                >
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center border transition-all duration-500 ${isActive ? 'border-accent/40 bg-accent/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'}`}>
                    <Image src={p.logo} alt={p.title} width={40} height={40} className={`w-8 h-8 lg:w-10 lg:h-10 object-contain transition-all duration-500 ${isActive ? '' : 'grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`} />
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Screenshot */}
                <div className="rounded-xl overflow-hidden border border-white/[0.06] mb-6">
                  <div className="relative aspect-video">
                    <Image src={project.snippet} alt={`${project.title} screenshot`} fill className="object-cover brightness-[0.4]" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute top-4 right-4">
                      <span className="font-mono text-[10px] text-white/20 tracking-[0.2em]">{pad(selected + 1)}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-text-heading leading-tight">{project.title}</h3>
                <p className="mt-3 text-text-secondary/70 text-base leading-relaxed font-body">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/[0.06] text-text-muted/50">{t}</span>
                  ))}
                </div>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-mono text-sm tracking-wider text-accent hover:text-accent/80 transition-colors cursor-pointer">
                  Visit project <span>&#8599;</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
