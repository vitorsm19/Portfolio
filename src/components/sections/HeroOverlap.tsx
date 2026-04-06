'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import heroPic from '@/assets/hero-alternative-pic.png'

/**
 * Hero — "The Overlap"
 *
 * Name in massive type, with the avatar OVERLAPPING the letters.
 * Role text runs vertically on the right edge. Asymmetric,
 * editorial, fashion-house energy. Bold overlapping composition
 * where the photo and the type collide intentionally.
 */
export function HeroOverlap() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative flex items-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-16 py-28 sm:py-24">
        {/* Name — fills the width */}
        <div className="relative">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-sans font-bold leading-[0.78] select-none"
            style={{ fontSize: 'clamp(4rem, min(22vw, 18vh), 16rem)' }}
          >
            <span className="text-text-heading block">VITOR</span>
            <span className="text-text-heading/15 block">MESQUITA</span>
          </motion.h1>

          {/* Avatar — overlapping the name from right */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
            className="absolute right-[5%] lg:right-[15%] top-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-32 h-40 lg:w-44 lg:h-56 rounded-2xl overflow-hidden ring-1 ring-white/[0.06] shadow-2xl">
              <Image
                src={heroPic}
                alt="Vitor Mesquita"
                width={176}
                height={224}
                className="object-cover object-top w-full h-full"
                priority
              />
              {/* Bottom gradient */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(3,2,2,0.5) 0%, transparent 40%)' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom row — staggered info */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          {/* Left — pitch */}
          <div className="max-w-md">
            <p className="text-base lg:text-lg text-text-secondary leading-relaxed font-body">
              Turning wild ideas into polished interfaces.
              <span className="text-text-muted/40"> — </span>
              <span className="text-accent">6+ years</span> crafting web apps
              for brands that don&apos;t settle.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="font-mono text-sm tracking-wider px-7 py-3 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer"
              >
                Let&apos;s work together
              </a>
              <a
                href="#work"
                className="font-mono text-sm tracking-wider px-7 py-3 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 hover:text-text-heading transition-all cursor-pointer"
              >
                See my work
              </a>
            </div>
          </div>

          {/* Right — role + location */}
          <div className="flex items-center gap-6 text-right">
            <div>
              <div className="flex items-center gap-2 justify-end">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/60">
                  Open to work
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/30 mt-1">
                Spain, EU
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vertical text — right edge */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden sm:flex"
      >
        <span
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-text-muted/20"
          style={{ writingMode: 'vertical-rl' }}
        >
          Frontend Developer — Portfolio 2026
        </span>
      </motion.div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
