'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { projects } from '@/data/projects'

/**
 * Elastic-grid layout. Two columns scroll at different speeds with a
 * spring-damped offset, so the cards feel softly tethered as you scroll.
 */

function pad(n: number) { return String(n).padStart(2, '0') }

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="project-card group block rounded-xl overflow-hidden border cursor-pointer"
    >
      <div className="relative aspect-[4/3]">
        <Image src={project.snippet} alt={`${project.title} screenshot`} fill className="project-thumb object-cover group-hover:scale-[1.04]" sizes="(max-width: 1024px) 100vw, 45vw" />
        <div className="absolute top-4 left-4">
          <Image src={project.logo} alt="" width={80} height={80} className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-xl" />
        </div>
        <span className="absolute top-4 right-12 font-mono text-[10px] text-white/45 tracking-[0.2em]">{pad(index + 1)}</span>
        <div className="absolute bottom-0 left-0 right-0 px-5 pt-14 pb-5 bg-gradient-to-t from-black/90 via-black/65 to-transparent">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-soft mb-1.5">{project.role}</p>
          <h3 className="project-card-title inline-block text-xl lg:text-2xl font-bold text-white leading-tight">{project.title}</h3>
          <p className="mt-2 text-white/75 text-sm font-body leading-relaxed line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="project-tech-tag font-mono text-[10px] tracking-[0.14em] uppercase text-white/75 border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <span className="project-arrow absolute top-4 right-4 text-base leading-none">&#8599;</span>
      </div>
    </motion.a>
  )
}

export function Projects() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })

  const leftY = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), { stiffness: 80, damping: 30 })
  const rightY = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), { stiffness: 80, damping: 30 })

  const leftProjects = projects.filter((_, i) => i % 2 === 0)
  const rightProjects = projects.filter((_, i) => i % 2 === 1)

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

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 lg:px-16 mt-12 pb-20 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left column — scrolls faster */}
          <motion.div className="flex flex-col gap-6 lg:gap-8" style={{ y: reduced ? 0 : leftY }}>
            {leftProjects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i * 2} />
            ))}
          </motion.div>

          {/* Right column — scrolls slower, offset start */}
          <motion.div className="flex flex-col gap-6 lg:gap-8 lg:mt-20" style={{ y: reduced ? 0 : rightY }}>
            {rightProjects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i * 2 + 1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
