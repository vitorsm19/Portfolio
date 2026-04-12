'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { projects } from '@/data/projects'

/**
 * Projects v16 — "Radial Menu"
 * Projects arranged as tabs in a horizontal bar.
 * Selected project expands into a full detail view
 * below with screenshot and info. The tabs act as
 * a filter/selector. Clean, app-like, functional.
 */

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function ProjectsRadial() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const project = projects[active]

  return (
    <section aria-label="Projects" className="relative overflow-hidden">
      <div className="relative z-2 pt-28 lg:pt-40 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <GradientLabel tracking="0.28em">Featured Work</GradientLabel>
          <h2 className="mt-5 text-5xl sm:text-6xl lg:text-[7rem] font-bold text-text-heading leading-[0.9] tracking-tight!">
            <span
              className="text-7xl sm:text-6xl lg:text-8xl tracking-tight!"
              style={{
                fontFamily: '"PP Playground", cursive',
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              Projects
            </span>
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-16 mt-12 pb-20 lg:pb-32">
        {/* Tab selector bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {projects.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full border cursor-pointer transition-all duration-500 ${
                active === i
                  ? 'border-accent/30 bg-accent/10 text-accent'
                  : 'border-white/[0.06] text-text-muted/50 hover:border-white/[0.12] hover:text-text-heading'
              }`}
            >
              <Image
                src={p.logo}
                alt=""
                width={24}
                height={24}
                className={`w-5 h-5 object-contain transition-all duration-500 ${active === i ? '' : 'grayscale opacity-50'}`}
              />
              <span className="font-mono text-xs tracking-wider">{p.title}</span>
            </button>
          ))}
        </div>

        {/* Detail view */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Screenshot — large */}
              <div className="lg:w-3/5 relative aspect-video lg:aspect-auto lg:min-h-[500px]">
                <Image
                  src={project.snippet}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-primary/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent lg:hidden" />
              </div>

              {/* Info panel */}
              <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-center relative">
                <span className="font-mono text-[11px] text-text-muted/20 tracking-[0.3em] mb-2 pe-2">
                  {pad(active + 1)}
                </span>

                <Image
                  src={project.logo}
                  alt=""
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain mb-4"
                />

                <h3 className="text-3xl lg:text-4xl font-bold text-text-heading leading-tight">
                  {project.title}
                </h3>
                <p className="mt-4 text-text-secondary/70 text-base leading-relaxed font-body">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/[0.06] text-text-muted/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-sm tracking-wider px-6 py-2.5 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer self-start"
                >
                  Visit project <span>&#8599;</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
