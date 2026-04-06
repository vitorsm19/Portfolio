'use client'

import { useRef, useEffect } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Hero — "Floating Glass"
 * Glassmorphic floating cards at varying depths with parallax.
 * Name broken into separate frosted panels. Emerald glow
 * bleeds through surfaces. Depth-of-field aesthetic. Luxury.
 */
export function HeroGlass() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 })

  // Different parallax intensities per layer
  const layer1X = useTransform(springX, [-0.5, 0.5], [12, -12])
  const layer1Y = useTransform(springY, [-0.5, 0.5], [8, -8])
  const layer2X = useTransform(springX, [-0.5, 0.5], [-18, 18])
  const layer2Y = useTransform(springY, [-0.5, 0.5], [-12, 12])
  const layer3X = useTransform(springX, [-0.5, 0.5], [25, -25])
  const layer3Y = useTransform(springY, [-0.5, 0.5], [16, -16])

  useEffect(() => {
    if (reduced) return
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [reduced, mouseX, mouseY])

  const glassCard =
    'rounded-xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md shadow-2xl'

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Emerald ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '40%',
          left: '45%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '60%',
          left: '65%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(110,231,183,0.03) 0%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Layer 1 — Name panel (deepest) */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-16 pt-24 sm:pt-20"
        style={{ x: reduced ? 0 : layer1X, y: reduced ? 0 : layer1Y }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(16px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          className={`${glassCard} p-8 lg:p-10 max-w-2xl`}
        >
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-accent" />
            Frontend Developer
          </span>
          <h1
            className="font-sans font-bold leading-[0.84] select-none"
            style={{ fontSize: 'clamp(3rem, min(14vw, 12vh), 8rem)' }}
          >
            <span className="text-text-heading">VITOR</span>
            <br />
            <span className="text-text-muted/30">MESQUITA</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Layer 2 — Info cards (mid depth) */}
      <motion.div
        className="absolute z-20 w-full max-w-5xl left-1/2 -translate-x-1/2 px-6 lg:px-16 top-1/2 -translate-y-1/2"
        style={{ x: reduced ? 0 : layer2X, y: reduced ? 0 : layer2Y }}
      >
        <div className="flex flex-col lg:flex-row items-end lg:items-start justify-end gap-4">
          {/* Tagline card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className={`${glassCard} p-5 max-w-xs ml-auto`}
          >
            <p className="text-sm text-text-secondary leading-relaxed font-body">
              I build{' '}
              <span className="text-accent font-medium">
                {typed}
                <span className="animate-pulse">|</span>
              </span>{' '}
              web&nbsp;apps
            </p>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className={`${glassCard} p-5`}
          >
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-2xl font-bold text-text-heading tabular-nums">20+</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                  Projects
                </p>
              </div>
              <div className="w-px h-8 bg-text-muted/15" />
              <div className="text-center">
                <span className="text-2xl font-bold text-text-heading tabular-nums">6+</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                  Years
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Layer 3 — Avatar + CTAs (closest to viewer) */}
      <motion.div
        className="absolute z-30 bottom-[15%] left-6 lg:left-16"
        style={{ x: reduced ? 0 : layer3X, y: reduced ? 0 : layer3Y }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className={`${glassCard} p-5 flex items-center gap-5`}
        >
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent/25 ring-offset-2 ring-offset-bg-primary flex-shrink-0">
            <Image
              src={aboutPic}
              alt={siteConfig.name}
              width={64}
              height={64}
              className="object-cover object-top w-full h-full"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/60">
                Available
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="font-mono text-xs tracking-wider px-5 py-2 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer"
              >
                Hire me
              </a>
              <a
                href="#work"
                className="font-mono text-xs tracking-wider px-5 py-2 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 transition-all cursor-pointer"
              >
                Work
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
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
