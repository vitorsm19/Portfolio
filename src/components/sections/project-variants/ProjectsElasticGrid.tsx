'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { projects } from '@/data/projects'

/**
 * Projects v22 — "Elastic Grid"
 * Inspired by Codrops' elastic grid scroll effect.
 * Two columns where left column scrolls faster than right,
 * creating a soft elastic lag as you scroll. Cards
 * feel like they're connected by invisible springs.
 */

function pad(n: number) { return String(n).padStart(2, '0') }

function ElasticCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
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
      className="group block rounded-xl overflow-hidden border border-white/[0.06] hover:border-accent/20 transition-colors duration-500 cursor-pointer"
    >
      <div className="relative aspect-[4/3]">
        <Image src={project.snippet} alt={`${project.title} screenshot`} fill className="object-cover brightness-[0.4] group-hover:brightness-[0.25] group-hover:scale-105 transition-all duration-700" sizes="(max-width: 1024px) 100vw, 45vw" />
        <div className="absolute top-4 left-4">
          <Image src={project.logo} alt="" width={60} height={60} className="w-12 h-12 object-contain drop-shadow-xl" />
        </div>
        <span className="absolute top-4 right-4 font-mono text-[10px] text-white/20 tracking-[0.2em]">{pad(index + 1)}</span>
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <h3 className="relative inline-block text-xl lg:text-2xl font-bold text-white leading-tight after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:bg-accent after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out">{project.title}</h3>
          <p className="mt-1 text-white/40 text-sm font-body line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[9px] tracking-wider uppercase text-white/25">{t}</span>
            ))}
          </div>
        </div>
        <span className="absolute bottom-5 right-5 text-white/20 group-hover:text-accent transition-all duration-500">&#8599;</span>
      </div>
    </motion.a>
  )
}

export function ProjectsElasticGrid() {
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
              <ElasticCard key={p.name} project={p} index={i * 2} />
            ))}
          </motion.div>

          {/* Right column — scrolls slower, offset start */}
          <motion.div className="flex flex-col gap-6 lg:gap-8 lg:mt-20" style={{ y: reduced ? 0 : rightY }}>
            {rightProjects.map((p, i) => (
              <ElasticCard key={p.name} project={p} index={i * 2 + 1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
