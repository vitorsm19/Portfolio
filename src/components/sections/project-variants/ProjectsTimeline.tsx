'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { projects } from '@/data/projects'

/**
 * Projects v27 — "Progress Timeline"
 * Vertical timeline with projects as milestones.
 * A progress line fills with accent color as you
 * scroll. Each project node sits on the line with
 * info extending to alternating sides.
 */

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function ProjectsTimeline() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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

      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-6 lg:px-16 mt-12 pb-20 lg:pb-32 relative"
      >
        {/* Timeline line — background */}
        <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-white/[0.04] -translate-x-1/2 hidden sm:block" />

        {/* Timeline line — progress fill */}
        <motion.div
          className="absolute left-6 lg:left-1/2 top-0 w-px bg-accent/30 -translate-x-1/2 hidden sm:block"
          style={{ height: reduced ? '100%' : lineHeight }}
        />

        {/* Project nodes */}
        {projects.map((project, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={project.name}
              initial={reduced ? false : { opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className={`relative flex flex-col lg:flex-row items-start mb-16 lg:mb-24 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
            >
              {/* Node dot */}
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent/60 border-2 border-bg-primary z-10 mt-6 hidden sm:block" />

              {/* Content card */}
              <div
                className={`sm:pl-12 lg:pl-0 ${isLeft ? 'lg:pr-16 lg:w-1/2' : 'lg:pl-16 lg:w-1/2'} ${isLeft ? '' : 'lg:ml-auto'}`}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer"
                >
                  {/* Screenshot */}
                  <div className="rounded-xl overflow-hidden border border-white/[0.06] group-hover:border-accent/20 transition-colors duration-500 mb-4">
                    <div className="relative aspect-video">
                      <Image
                        src={project.snippet}
                        alt={`${project.title}`}
                        fill
                        className="object-cover brightness-[0.45] group-hover:brightness-[0.3] group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                      <div className="absolute top-3 left-3">
                        <Image
                          src={project.logo}
                          alt=""
                          width={48}
                          height={48}
                          className="w-10 h-10 object-contain drop-shadow-xl"
                        />
                      </div>
                      <span className="absolute top-3 right-3 text-white/20 group-hover:text-accent transition-all duration-500">
                        &#8599;
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[11px] text-accent/60 tracking-[0.3em] pe-2">
                    {pad(i + 1)}
                  </span>
                  <h3 className="relative inline-block text-2xl lg:text-3xl font-bold text-text-heading leading-tight mt-1 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:bg-accent after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out">
                    {project.title}
                  </h3>
                  <p className="mt-2 lg:mt-2 text-text-secondary/60 text-sm leading-relaxed font-body">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[12px] tracking-wider uppercase text-text-muted/35"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
