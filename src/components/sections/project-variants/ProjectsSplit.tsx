'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { projects } from '@/data/projects'

/**
 * Projects v7 — "Split Cards"
 * Each project: screenshot on one side, info on the other.
 * Alternating sides per project (left/right zigzag).
 * Magazine editorial layout. Spacious, deliberate.
 */

function pad(n: number) { return String(n).padStart(2, '0') }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
} as const

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } } as const

export function ProjectsSplit() {
  const reduced = useReducedMotion()
  const initial = reduced ? false : ('hidden' as const)

  return (
    <section aria-label="Projects" className="relative overflow-hidden">
      <div className="relative z-2 pt-28 lg:pt-40 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <motion.div variants={fadeUp}><GradientLabel tracking="0.28em">Featured Work</GradientLabel></motion.div>
            <motion.h2 variants={fadeUp} className="mt-5 text-5xl sm:text-6xl lg:text-[7rem] font-bold text-text-heading leading-[0.9] tracking-tight!">
              <span className="text-7xl sm:text-6xl lg:text-8xl tracking-tight!" style={{ fontFamily: '"PP Playground", cursive', fontWeight: 500, fontStyle: 'italic' }}>Projects</span>
            </motion.h2>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-16 mt-12 pb-20 lg:pb-32 space-y-16 lg:space-y-24">
        {projects.map((project, i) => {
          const isEven = i % 2 === 0
          return (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-10 items-center cursor-pointer`}
            >
              {/* Screenshot */}
              <div className="lg:w-1/2 w-full rounded-xl overflow-hidden border border-white/[0.04] group-hover:border-accent/15 transition-colors duration-500">
                <div className="relative aspect-video">
                  <Image
                    src={project.snippet}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover brightness-[0.45] group-hover:brightness-[0.3] group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Image src={project.logo} alt={`${project.title} logo`} width={80} height={80} className="w-16 h-16 object-contain drop-shadow-2xl" />
                  </div>
                  <span className="absolute top-4 right-4 text-white/20 text-lg group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500">&#8599;</span>
                </div>
              </div>

              {/* Info */}
              <div className={`lg:w-1/2 ${isEven ? '' : 'lg:text-right'}`}>
                <span className="font-mono text-[11px] text-text-muted/20 tracking-[0.3em]">{pad(i + 1)}</span>
                <h3 className="relative inline-block mt-2 text-3xl lg:text-4xl font-bold text-text-heading leading-tight after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:bg-accent after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out">{project.title}</h3>
                <p className="mt-3 text-text-secondary/70 text-sm lg:text-base leading-relaxed font-body">{project.description}</p>
                <div className={`flex flex-wrap gap-1.5 mt-4 ${isEven ? '' : 'lg:justify-end'}`}>
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/[0.06] text-text-muted/40">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
