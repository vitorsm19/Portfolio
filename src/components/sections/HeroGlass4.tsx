'use client'

import { useEffect } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import heroPic from '@/assets/hero-alternative-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Floating Glass v4 — "Two Columns"
 *
 * Left column: large glass card with 3/4 portrait photo,
 * availability badge overlapping the bottom edge.
 * Right column: stacked glass cards — name (huge), tagline,
 * stats, and CTAs. Each card at a different parallax depth.
 * The photo is the emotional anchor, the cards are the info.
 * Magazine-editorial meets glass morphism.
 */
export function HeroGlass4() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sx = useSpring(mouseX, { stiffness: 35, damping: 28 })
  const sy = useSpring(mouseY, { stiffness: 35, damping: 28 })

  const photoX = useTransform(sx, [-0.5, 0.5], [10, -10])
  const photoY = useTransform(sy, [-0.5, 0.5], [6, -6])
  const cardX = useTransform(sx, [-0.5, 0.5], [-16, 16])
  const cardY = useTransform(sy, [-0.5, 0.5], [-10, 10])
  const badgeX = useTransform(sx, [-0.5, 0.5], [20, -20])
  const badgeY = useTransform(sy, [-0.5, 0.5], [14, -14])

  useEffect(() => {
    if (reduced) return
    const h = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [reduced, mouseX, mouseY])

  const glass = 'rounded-xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md shadow-2xl'

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Glows */}
      <div className="absolute pointer-events-none" style={{ top: '40%', left: '30%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '20%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(110,231,183,0.03) 0%, transparent 60%)', filter: 'blur(30px)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-16 py-28 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left — Photo card */}
        <motion.div
          style={{ x: reduced ? 0 : photoX, y: reduced ? 0 : photoY }}
          className="relative"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className={`${glass} p-3 lg:p-4`}
          >
            <div className="rounded-lg overflow-hidden aspect-[3/4] max-h-[500px]">
              <Image
                src={heroPic}
                alt={siteConfig.name}
                width={400}
                height={533}
                className="object-cover object-top w-full h-full"
                priority
              />
            </div>
          </motion.div>

          {/* Availability badge — overlapping bottom-right */}
          <motion.div
            style={{ x: reduced ? 0 : badgeX, y: reduced ? 0 : badgeY }}
            className="absolute -bottom-3 -right-2 lg:right-[-16px] z-20"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className={`${glass} px-4 py-2.5 flex items-center gap-2`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/60">Available — Spain</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — Stacked info cards */}
        <motion.div
          style={{ x: reduced ? 0 : cardX, y: reduced ? 0 : cardY }}
          className="flex flex-col gap-4"
        >
          {/* Name card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className={`${glass} p-6 lg:p-8`}
          >
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent flex items-center gap-3 mb-3">
              <span className="w-5 h-px bg-accent" />
              Frontend Developer
            </span>
            <h1
              className="font-sans font-bold leading-[0.84] select-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
            >
              <span className="text-text-heading">VITOR</span>
              <br />
              <span className="text-text-muted/30">MESQUITA</span>
            </h1>
          </motion.div>

          {/* Tagline card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className={`${glass} p-5`}
          >
            <p className="text-sm text-text-secondary leading-relaxed font-body">
              I build{' '}
              <span className="text-accent font-medium">{typed}<span className="animate-pulse">|</span></span>{' '}
              web apps for brands that don&apos;t settle.
            </p>
          </motion.div>

          {/* Stats + CTA card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className={`${glass} p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5`}
          >
            <div className="flex items-center gap-5">
              <div className="text-center">
                <span className="text-xl font-bold text-text-heading tabular-nums">20+</span>
                <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Projects</p>
              </div>
              <div className="w-px h-6 bg-text-muted/15" />
              <div className="text-center">
                <span className="text-xl font-bold text-text-heading tabular-nums">6+</span>
                <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Years</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="#contact" className="font-mono text-xs tracking-wider px-5 py-2 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer">Hire me</a>
              <a href="#work" className="font-mono text-xs tracking-wider px-5 py-2 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 transition-all cursor-pointer">Work</a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="w-px h-8 bg-text-muted/20 overflow-hidden">
          <motion.div className="w-full h-4 bg-text-muted/40" animate={{ y: [0, 24] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </motion.div>
    </section>
  )
}
