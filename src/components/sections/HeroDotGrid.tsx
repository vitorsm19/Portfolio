'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Hero — "The Dot Grid"
 *
 * Swiss modernism meets developer precision.
 * Mathematical dot-grid background. Name positioned
 * asymmetrically on the grid. Rational, clean, quiet confidence.
 * No unnecessary decoration. The grid IS the decoration.
 */
export function HeroDotGrid() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  return (
    <section
      className="relative flex items-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      {/* Content — asymmetric placement */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-16 py-28 sm:py-24">
        <div className="grid grid-cols-12 gap-4">
          {/* Top-left: label — col 1-4 */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="col-span-12 lg:col-span-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/[0.06] ring-offset-2 ring-offset-bg-primary flex-shrink-0">
              <Image
                src={aboutPic}
                alt={siteConfig.name}
                width={48}
                height={48}
                className="object-cover object-top w-full h-full"
                priority
              />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent block">
                Frontend Developer
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-muted/40">
                  Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-8" />

          {/* Name — offset right, col 3-12 */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
            className="col-span-12 lg:col-start-3 lg:col-span-10 mt-8 lg:mt-12"
          >
            <h1
              className="font-sans font-bold leading-[0.84] select-none"
              style={{ fontSize: 'clamp(3.5rem, min(16vw, 14vh), 11rem)' }}
            >
              <span className="text-text-heading">VITOR</span>
              <br />
              <span className="text-text-muted/25">MESQUITA</span>
            </h1>
          </motion.div>

          {/* Info — col 1-5 */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="col-span-12 lg:col-span-5 mt-8 lg:mt-12"
          >
            <p className="text-sm lg:text-base text-text-secondary leading-relaxed font-body max-w-sm">
              I build{' '}
              <span className="text-accent font-medium">
                {typed}
                <span className="animate-pulse">|</span>
              </span>{' '}
              web apps for brands that care about craft.
            </p>
          </motion.div>

          {/* Stats — col 6-8 */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="col-span-6 lg:col-span-3 mt-8 lg:mt-12 flex items-end gap-6"
          >
            <div>
              <span className="text-2xl font-bold text-text-heading tabular-nums">20+</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                Projects
              </p>
            </div>
            <div className="w-px h-6 bg-text-muted/10" />
            <div>
              <span className="text-2xl font-bold text-text-heading tabular-nums">6+</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                Years
              </p>
            </div>
          </motion.div>

          {/* CTA — col 9-12 */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="col-span-6 lg:col-span-4 mt-8 lg:mt-12 flex items-end justify-end gap-3"
          >
            <a
              href="#contact"
              className="font-mono text-xs tracking-wider px-6 py-2.5 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer"
            >
              Get in touch
            </a>
            <a
              href="#work"
              className="font-mono text-xs tracking-wider px-6 py-2.5 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 hover:text-text-heading transition-all cursor-pointer"
            >
              Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
