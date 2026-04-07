'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'

/**
 * Hero — "The Rotating Role"
 *
 * Name is huge and permanent. Below it, a rotating word carousel
 * flips through what Vitor does — not adjectives, but actual
 * deliverables. "ships React apps" → "scales Next.js platforms" →
 * "crafts pixel-perfect UIs". The name stays, the role evolves.
 */

const ROLES = [
  'ships React apps',
  'scales Next.js platforms',
  'crafts pixel-perfect UIs',
  'builds design systems',
  'delivers on deadline',
]

export function HeroRotate() {
  const reduced = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-16 py-28 sm:py-24">
        {/* Top row — avatar + availability */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/[0.06] ring-offset-2 ring-offset-bg-primary">
            <Image
              src={aboutPic}
              alt="Vitor Mesquita"
              width={48}
              height={48}
              className="object-cover object-top w-full h-full"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted/50">
              Available for projects
            </span>
          </div>
        </motion.div>

        {/* Name — the anchor, massive */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          className="font-sans font-bold leading-[0.82] select-none"
          style={{ fontSize: 'clamp(4rem, min(20vw, 16vh), 14rem)' }}
        >
          <span className="text-text-heading">VITOR</span>
          <br />
          <span className="text-text-heading">MESQUITA</span>
        </motion.h1>

        {/* Rotating role — the differentiator */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 h-12 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl lg:text-2xl font-body"
            >
              <span className="text-text-muted/50">who </span>
              <span className="text-accent font-medium">{ROLES[roleIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-white/[0.04] mt-8 mb-8"
          style={{ transformOrigin: 'left' }}
        />

        {/* Bottom row — pitch + CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <p className="text-sm text-text-secondary/60 font-body max-w-sm leading-relaxed">
            Senior frontend developer with 6+ years of experience building
            for brands in sports, retail, and tech. Based in Spain, EU citizen,
            working worldwide.
          </p>

          <div className="flex flex-wrap items-center gap-4">
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
          </div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
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
