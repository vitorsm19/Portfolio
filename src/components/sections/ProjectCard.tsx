'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { projects } from '@/data/projects'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.55, 0.8, 1],
    [0.82, 0.9, 1, 1, 0.9, 0.82],
  )
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.2, 0.6, 1, 1, 0.6, 0.2],
  )
  const rawY = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [40, 0, 0, 0, -40])

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  const scale = useSpring(rawScale, springConfig)
  const opacity = useSpring(rawOpacity, springConfig)
  const y = useSpring(rawY, springConfig)

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative z-5 block w-[92%] sm:w-[80%] lg:w-[60%] mx-auto my-[5vh] sm:my-[12vh] lg:my-[18vh]"
      style={{ perspective: '2000px' }}
    >
      <motion.div
        className="origin-center will-change-transform"
        style={reduced ? {} : { scale, opacity, y }}
      >
        {/* ===== DESKTOP (sm+): overlay layout — unchanged ===== */}
        <div className="hidden sm:block relative rounded-xl overflow-hidden border border-white/6 group-hover:border-accent/20 transition-colors duration-500 aspect-4/3 lg:aspect-video">
          <Image
            src={project.snippet}
            alt={`${project.title} website screenshot`}
            fill
            className="object-cover blur-[3px] brightness-[0.3] group-hover:blur-[2px] group-hover:brightness-[0.2] group-hover:scale-105 scale-100 transition-all duration-1000 ease-out"
            sizes="(max-width: 1024px) 80vw, 60vw"
          />
          <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={200}
                  height={200}
                  className="w-28 h-28 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
                />
                <span className="font-mono text-[12px] text-white/30 tracking-[0.2em]! uppercase">
                  {pad(index + 1)}
                </span>
              </div>
              <span className="text-white/30 text-xl group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                &#8599;
              </span>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-white group-hover:text-accent transition-colors duration-700 ease-out leading-[1.1]">
                {project.title}
              </h3>
              <p className="mt-3 text-white/75 text-base lg:text-[15px] leading-relaxed max-w-lg font-light! tracking-wider!">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider! uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/40 group-hover:text-accent/70 group-hover:border-accent/20 transition-all duration-700 ease-out"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== MOBILE: editorial magazine layout ===== */}
        <div className="sm:hidden relative rounded-2xl overflow-hidden border border-white/6">
          {/* Full card blurred screenshot */}
          <div className="relative min-h-[45vh]">
            <Image
              src={project.snippet}
              alt={`${project.title} website screenshot`}
              fill
              className="object-cover blur-[3px] brightness-[0.2]"
              sizes="92vw"
            />

            {/* Dark gradient from bottom for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Arrow — top right */}
            <span className="absolute top-4 right-4 text-white/30 text-lg">&#8599;</span>

            {/* Logo — centered, large, the hero element */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={160}
                height={160}
                className="w-24 h-24 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Content — pinned to bottom, layered on gradient */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Tech pills — above the title */}
              <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider! uppercase px-2 py-0.5 rounded-full border border-white/15 text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title — massive, overlapping */}
              <h3 className="text-3xl font-medium text-white leading-none tracking-wide!">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-white/50 text-[14px] leading-normal tracking-wider! font-light!">
                {project.description}
              </p>

              {/* Subtle bottom accent line */}
              <div className="mt-4 h-px w-12 bg-accent/40" />
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  )
}
