'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'

/**
 * Hero — "The Sidebar"
 *
 * Breaks the full-width convention. A narrow sidebar panel
 * on the left holds all the metadata (avatar, role, stats,
 * links). The rest of the viewport is dominated by the name
 * in enormous type. Like a developer's IDE — sidebar + canvas.
 * Unexpected layout that feels native to a dev.
 */
export function HeroSidebar() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative flex overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Left sidebar panel */}
      <motion.aside
        initial={reduced ? false : { opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="hidden lg:flex flex-col justify-between w-72 flex-shrink-0 border-r border-white/[0.04] px-6 py-8"
      >
        {/* Top — avatar + identity */}
        <div>
          <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-white/[0.06] ring-offset-2 ring-offset-bg-primary mb-5">
            <Image
              src={aboutPic}
              alt="Vitor Mesquita"
              width={56}
              height={56}
              className="object-cover object-top w-full h-full"
              priority
            />
          </div>

          <h2 className="font-sans font-bold text-text-heading text-xl leading-tight">
            Vitor
            <br />
            Mesquita
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
              Available
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/[0.04] my-6" />

          {/* Meta info */}
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-muted/40 block mb-1">Role</span>
              <span className="text-sm text-text-secondary font-body">Frontend Developer</span>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-muted/40 block mb-1">Experience</span>
              <span className="text-sm text-text-secondary font-body">6+ years</span>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-muted/40 block mb-1">Projects</span>
              <span className="text-sm text-text-secondary font-body">20+ shipped</span>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-muted/40 block mb-1">Location</span>
              <span className="text-sm text-text-secondary font-body">Spain, EU</span>
            </div>
          </div>
        </div>

        {/* Bottom — CTAs */}
        <div className="flex flex-col gap-2">
          <a
            href="#contact"
            className="font-mono text-xs tracking-wider px-5 py-2.5 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer text-center"
          >
            Get in touch
          </a>
          <a
            href="#work"
            className="font-mono text-xs tracking-wider px-5 py-2.5 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 hover:text-text-heading transition-all cursor-pointer text-center"
          >
            View work
          </a>
        </div>
      </motion.aside>

      {/* Main canvas — massive name */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-16 py-28 sm:py-24">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          className="w-full"
        >
          <h1
            className="font-sans font-bold leading-[0.82] select-none"
            style={{ fontSize: 'clamp(4rem, min(18vw, 18vh), 16rem)' }}
          >
            <span className="text-text-heading block">VITOR</span>
            <span className="text-text-heading/15 block">MESQUITA</span>
          </h1>

          {/* Sub — only visible on desktop below the name */}
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 text-sm text-text-secondary/40 font-body max-w-sm hidden lg:block"
          >
            Turning wild ideas into polished interfaces — one component at a time.
          </motion.p>

          {/* Mobile-only info (since sidebar is hidden) */}
          <div className="lg:hidden mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/[0.06]">
                <Image
                  src={aboutPic}
                  alt="Vitor Mesquita"
                  width={48}
                  height={48}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">
                  Frontend Developer
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-muted/40">Available</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-secondary/50 font-body max-w-sm">
              6+ years, 20+ projects, based in Spain.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#contact" className="font-mono text-xs tracking-wider px-6 py-2.5 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer">Get in touch</a>
              <a href="#work" className="font-mono text-xs tracking-wider px-6 py-2.5 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 transition-all cursor-pointer">Work</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.25 }}
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
