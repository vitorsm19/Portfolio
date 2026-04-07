'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/site'

/**
 * Hero — "The Statement"
 *
 * One sentence. That's it. The hero IS the pitch.
 * "Your next project, delivered." in PP Playground italic
 * at massive scale. Ultra-refined, ultra-confident.
 * Inspired by the About section's own headline — elevating
 * the portfolio's strongest line into the opening.
 *
 * Philosophy: If your portfolio is about selling risk reduction
 * and direct results, lead with the promise — not your name.
 */
export function HeroStatement() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Single horizontal line accent */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-px"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: 'center',
          background: 'linear-gradient(90deg, transparent 10%, rgba(16,185,129,0.06) 50%, transparent 90%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 lg:px-16 max-w-5xl">
        {/* Name — large, proud, the anchor */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h1
            className="font-sans font-bold leading-[0.85] select-none"
            style={{ fontSize: 'clamp(3rem, min(18vw, 14vh), 11rem)' }}
          >
            <span className="text-text-heading">VITOR</span>
            <br />
            <span className="text-text-muted/30">MESQUITA</span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-text-muted/50 mb-8"
        >
          Frontend Developer
        </motion.p>

        {/* THE statement — the pitch beneath the name */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="leading-[0.95] select-none"
          style={{ fontSize: 'clamp(1.8rem, min(5vw, 6vh), 3.5rem)' }}
        >
          <span className="text-text-heading/70 font-sans font-bold">Your next project,</span>{' '}
          <span
            className="bg-linear-to-r from-accent to-[#6ee7b7] bg-clip-text text-transparent"
            style={{
              fontFamily: '"PP Playground", cursive',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: '1.15em',
            }}
          >
            delivered.
          </span>
        </motion.p>

        {/* Micro-description */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 text-sm lg:text-base text-text-secondary/60 font-body max-w-lg leading-relaxed"
        >
          6+ years building polished, high-performance web apps for brands that care about craft.
          Skip the agency meetings. Get straight to results.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="font-mono text-sm tracking-wider px-8 py-3.5 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer"
          >
            Let&apos;s talk
          </a>
        </motion.div>
      </div>

      {/* Bottom corners — stats, barely there */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-6 lg:left-16 flex items-center gap-6"
      >
        <div>
          <span className="text-lg font-bold text-text-heading/70 tabular-nums">20+</span>
          <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted/40">Projects</p>
        </div>
        <div className="w-px h-4 bg-text-muted/10" />
        <div>
          <span className="text-lg font-bold text-text-heading/70 tabular-nums">6+</span>
          <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted/40">Years</p>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 right-6 lg:right-16"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/30">
          Spain, EU
        </span>
      </motion.div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-text-muted/20 overflow-hidden">
          <motion.div
            className="w-full h-4 bg-text-muted/40"
            animate={{ y: [0, 24] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
