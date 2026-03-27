'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/sections/ProjectCard'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
} as const

export function Projects() {
  const reduced = useReducedMotion()
  const initial = reduced ? false : ('hidden' as const)

  return (
    <section
      aria-label="Projects"
      className="relative overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* Background "WORKS" watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[10%] z-1 select-none px-[3%] text-center hidden lg:block"
        style={{ fontSize: 'clamp(6rem, 15vw, 14rem)', letterSpacing: '0.5em' }}
      >
        <span className="font-bold uppercase text-white/3 tracking-[0.6em]! ps-8 md:ps-32">
          WORKS
        </span>
      </div>

      {/* Section heading */}
      <div className="relative z-2 pt-28 lg:pt-40 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <GradientLabel tracking="0.28em">Featured Work</GradientLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-5xl sm:text-6xl lg:text-[7rem] font-bold text-text-heading leading-[0.9] tracking-tight!"
            >
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
            </motion.h2>
          </motion.div>
        </div>
      </div>

      {/* Project cards — cinematic scroll-driven */}
      <div className="relative z-5 mt-10 pb-20 lg:pb-32">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
