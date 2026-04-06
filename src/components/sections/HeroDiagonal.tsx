'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import heroPic from '@/assets/hero-alternative-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Hero — "Split Diagonal"
 * Viewport split diagonally. Left dark with name/role,
 * right has subtle accent gradient with avatar and stats.
 * Elements slide in from opposing directions. Fashion-editorial.
 */
export function HeroDiagonal() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  return (
    <section
      className="relative overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Diagonal accent panel — right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.03) 0%, rgba(16,185,129,0.01) 100%)',
        }}
      />

      {/* Diagonal line */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div
          className="absolute h-full w-px"
          style={{
            left: '50%',
            background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.12), transparent)',
            transform: 'rotate(-8deg)',
            transformOrigin: 'top center',
          }}
        />
      </motion.div>

      {/* Content wrapper */}
      <div className="relative z-10 flex items-center" style={{ minHeight: '100dvh' }}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 px-6 lg:px-16 items-center">
          {/* Left — Name + Role */}
          <div className="flex flex-col justify-center pt-24 sm:pt-20 lg:pt-0">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -50, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
            >
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-accent" />
                Frontend Developer
              </span>
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, x: -60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
              className="font-sans font-bold leading-[0.82] select-none"
              style={{ fontSize: 'clamp(3.5rem, min(16vw, 14vh), 10rem)' }}
            >
              <span className="text-text-heading block">VITOR</span>
              <span className="text-text-muted/30 block">MESQUITA</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="mt-8 text-sm lg:text-base text-text-secondary leading-relaxed font-body max-w-sm"
            >
              I build{' '}
              <span className="text-accent font-medium">
                {typed}
                <span className="animate-pulse">|</span>
              </span>{' '}
              web&nbsp;apps
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="font-mono text-sm tracking-wider px-7 py-3 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer"
              >
                Get in touch
              </a>
              <a
                href="#work"
                className="font-mono text-sm tracking-wider px-7 py-3 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 hover:text-text-heading transition-all cursor-pointer"
              >
                View work
              </a>
            </motion.div>
          </div>

          {/* Right — Avatar + Stats */}
          <div className="flex flex-col items-center lg:items-end justify-center gap-8 pb-16 lg:pb-0">
            {/* Avatar — large */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
              />
              <div className="w-40 h-48 lg:w-48 lg:h-56 rounded-2xl overflow-hidden ring-1 ring-white/[0.06] relative">
                <Image
                  src={heroPic}
                  alt={siteConfig.name}
                  width={192}
                  height={224}
                  className="object-cover object-top w-full h-full"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(3,2,2,0.6) 0%, transparent 50%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex items-center gap-8"
            >
              <div className="text-center lg:text-right">
                <span className="text-3xl font-bold text-text-heading tabular-nums">20+</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                  Projects
                </p>
              </div>
              <div className="w-px h-8 bg-text-muted/15" />
              <div className="text-center lg:text-right">
                <span className="text-3xl font-bold text-text-heading tabular-nums">6+</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                  Years
                </p>
              </div>
            </motion.div>

            {/* Location + availability */}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/60">
                  Available
                </span>
              </div>
              <span className="w-4 h-px bg-text-muted/20" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/40">
                Spain, EU
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">scroll</span>
        <div className="w-px h-6 bg-text-muted/30 overflow-hidden">
          <motion.div
            className="w-full h-3 bg-text-muted/60"
            animate={{ y: [0, 20] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
