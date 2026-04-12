'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Hero 3 — "Horizontal Parallax"
 * Oversized name with mouse-tracking parallax layers,
 * editorial magazine feel, layered depth composition.
 */
export function HeroParallax() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 50, damping: 30 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Parallax layers — different speeds
  const bgX = useTransform(springX, [-0.5, 0.5], [30, -30])
  const bgY = useTransform(springY, [-0.5, 0.5], [15, -15])
  const midX = useTransform(springX, [-0.5, 0.5], [-20, 20])
  const midY = useTransform(springY, [-0.5, 0.5], [-10, 10])
  const fgX = useTransform(springX, [-0.5, 0.5], [-50, 50])
  const fgY = useTransform(springY, [-0.5, 0.5], [-25, 25])

  useEffect(() => {
    if (reduced) return

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set(clientX / innerWidth - 0.5)
      mouseY.set(clientY / innerHeight - 0.5)
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [reduced, mouseX, mouseY])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative flex items-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Background layer — giant watermark text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ x: reduced ? 0 : bgX, y: reduced ? 0 : bgY }}
      >
        <span
          className="font-sans font-bold text-white/[0.015] whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 35vw, 28rem)' }}
        >
          FRONTEND
        </span>
      </motion.div>

      {/* Mid layer — decorative lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: reduced ? 0 : midX, y: reduced ? 0 : midY }}
      >
        {/* Horizontal rules */}
        <div
          className="absolute top-[30%] left-0 w-full h-px"
          style={{
            background:
              'linear-gradient(to right, transparent 5%, rgba(16,185,129,0.08) 30%, rgba(16,185,129,0.08) 70%, transparent 95%)',
          }}
        />
        <div
          className="absolute top-[70%] left-0 w-full h-px"
          style={{
            background:
              'linear-gradient(to right, transparent 5%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent 95%)',
          }}
        />
        {/* Vertical accent */}
        <div
          className="absolute left-[12%] top-0 h-full w-px hidden lg:block"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(16,185,129,0.06), transparent)',
          }}
        />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        className="relative z-10 w-full px-6 lg:px-16"
        style={{ x: reduced ? 0 : fgX, y: reduced ? 0 : fgY }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Left column — editorial info */}
          <div className="lg:col-span-4 lg:pr-12">
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="visible"
            >
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent">
                Portfolio
              </span>
            </motion.div>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              className="mt-6"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-white/10 ring-offset-2 ring-offset-bg-primary">
                <Image
                  src={aboutPic}
                  alt={siteConfig.name}
                  width={96}
                  height={96}
                  className="object-cover object-top w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            <motion.p
              custom={0.5}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              className="mt-6 text-base lg:text-lg text-text-secondary leading-relaxed font-body"
            >
              Shipping{' '}
              <span className="text-accent font-medium">
                {typed}
                <span className="animate-pulse">|</span>
              </span>{' '}
              web apps.
              <br />
              On time, on budget, no excuses.
            </motion.p>

            <motion.div
              custom={0.7}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              className="mt-6 flex items-center gap-6"
            >
              <div>
                <span className="text-xl font-bold text-text-heading tabular-nums">20+</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                  Projects
                </p>
              </div>
              <div className="w-px h-6 bg-text-muted/15" />
              <div>
                <span className="text-xl font-bold text-text-heading tabular-nums">6+</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                  Years
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column — massive name */}
          <div className="lg:col-span-8">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 80, filter: 'blur(16px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <h1
                className="font-sans font-bold leading-[0.82] select-none text-right"
                style={{ fontSize: 'clamp(4rem, min(18vw, 22vh), 14rem)' }}
              >
                <span className="block text-text-heading tracking-[0.02em]">VITOR</span>
                <span className="block text-text-muted/30 tracking-[0.02em]">MESQUITA</span>
              </h1>
            </motion.div>

            {/* Bottom right — role + location */}
            <motion.div
              custom={0.9}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              className="mt-6 flex items-center justify-end gap-4"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/50">
                Spain, EU
              </span>
              <span className="w-6 h-px bg-text-muted/20" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
                Frontend Developer
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
          scroll
        </span>
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
