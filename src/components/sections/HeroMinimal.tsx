'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Hero 4 — "Exaggerated Minimalism"
 * Name devours the entire viewport. Almost nothing else.
 * Single accent line. Brutally stripped down. Maximum negative space.
 * Inspired by high-fashion editorial and architecture portfolios.
 */
export function HeroMinimal() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  return (
    <section
      className="relative flex flex-col justify-between overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Top bar */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 flex items-center justify-between px-6 lg:px-16 pt-28 sm:pt-24"
      >
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-text-muted">
          Frontend Developer
        </span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/50">
            Open to work
          </span>
        </div>
      </motion.div>

      {/* Center — giant name, dominates viewport */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-16">
        {/* The accent line before the name */}
        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-16 h-px bg-accent mb-8"
          style={{ transformOrigin: 'center' }}
        />

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 60, filter: 'blur(16px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="font-sans font-bold leading-[0.82] select-none text-center"
          style={{ fontSize: 'clamp(4rem, min(28vw, 22vh), 16rem)' }}
        >
          <span className="text-text-heading">VITOR</span>
        </motion.h1>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 60, filter: 'blur(16px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-sans font-bold leading-[0.82] select-none text-center -mt-2"
          style={{ fontSize: 'clamp(4rem, min(28vw, 22vh), 16rem)' }}
        >
          <span className="text-text-muted/25">MESQUITA</span>
        </motion.h1>

        {/* Single line tagline */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-sm text-text-secondary/60 font-body text-center"
        >
          Building{' '}
          <span className="text-accent">
            {typed}
            <span className="animate-pulse">|</span>
          </span>{' '}
          interfaces
        </motion.p>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex items-end justify-between px-6 lg:px-16 pb-8"
      >
        {/* Stats — bottom left */}
        <div className="flex items-center gap-6">
          <div>
            <span className="text-lg font-bold text-text-heading tabular-nums">20+</span>
            <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
              Projects
            </p>
          </div>
          <div className="w-px h-5 bg-text-muted/15" />
          <div>
            <span className="text-lg font-bold text-text-heading tabular-nums">6+</span>
            <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Years</p>
          </div>
        </div>

        {/* Scroll — bottom center (absolute) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-8 bg-text-muted/30 overflow-hidden">
            <motion.div
              className="w-full h-4 bg-text-muted/60"
              animate={reduced ? {} : { y: [0, 24] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Location — bottom right */}
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/40">
          Spain, EU
        </span>
      </motion.div>
    </section>
  )
}
