'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { projects } from '@/data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function Projects() {
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
  }

  return (
    <section className="bg-bg-secondary py-16 px-6 lg:py-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <motion.h2
          className="text-5xl lg:text-7xl font-bold text-text-muted text-center mb-12"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          PROJECTS
        </motion.h2>

        {/* Carousel */}
        <motion.div
          className="relative"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Left arrow */}
          <button
            onClick={scrollLeft}
            className="hidden lg:flex absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-bg-primary/80 backdrop-blur text-text-primary hover:bg-bg-primary transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon size={24} />
          </button>

          {/* Scrollbar hiding styles */}
          <style>{`
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide overflow-x-auto snap-x snap-mandatory flex gap-8 pb-4"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={scrollRight}
            className="hidden lg:flex absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-bg-primary/80 backdrop-blur text-text-primary hover:bg-bg-primary transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRightIcon size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
