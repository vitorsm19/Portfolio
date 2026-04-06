'use client'

import { useEffect } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import heroPic from '@/assets/hero-alternative-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Floating Glass v2 — "Cross Current"
 *
 * Name card floats center-right, a tall portrait card
 * overlaps from the left at a different depth. Stats card
 * hangs top-right, tagline card bottom-center, availability
 * badge top-left. Cards cross and overlap each other —
 * deliberate collisions that create visual tension.
 */
export function HeroGlass2() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 35, damping: 28 })
  const sy = useSpring(my, { stiffness: 35, damping: 28 })

  const l = (mul: number) => ({
    x: useTransform(sx, [-0.5, 0.5], [mul, -mul]),
    y: useTransform(sy, [-0.5, 0.5], [mul * 0.65, -mul * 0.65]),
  })

  const p1 = l(10)   // name — slow drift
  const p2 = l(-22)   // photo — opposite direction
  const p3 = l(16)    // stats
  const p4 = l(-12)   // tagline
  const p5 = l(28)    // badge — fastest

  useEffect(() => {
    if (reduced) return
    const h = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [reduced, mx, my])

  const glass = 'rounded-xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md shadow-2xl'
  const fade = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, scale: 0.93, filter: 'blur(10px)' } as const),
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    transition: { delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Glows */}
      <div className="absolute pointer-events-none" style={{ top: '35%', left: '55%', transform: 'translate(-50%,-50%)', width: '650px', height: '650px', background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '25%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(110,231,183,0.03) 0%, transparent 60%)', filter: 'blur(35px)' }} />

      {/* Name card — center-right, z-20 */}
      <motion.div
        className="absolute z-20 top-[28%] right-[8%] lg:right-[18%]"
        style={{ x: reduced ? 0 : p1.x, y: reduced ? 0 : p1.y }}
      >
        <motion.div {...fade(0.1)} className={`${glass} p-7 lg:p-9`}>
          <h1
            className="font-sans font-bold leading-[0.84] select-none"
            style={{ fontSize: 'clamp(2.8rem, min(12vw, 10vh), 7rem)' }}
          >
            <span className="text-text-heading">VITOR</span>
            <br />
            <span className="text-text-muted/30">MESQUITA</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Portrait card — left, overlapping name card, z-15 */}
      <motion.div
        className="absolute z-[15] top-[20%] left-[4%] lg:left-[10%]"
        style={{ x: reduced ? 0 : p2.x, y: reduced ? 0 : p2.y }}
      >
        <motion.div {...fade(0.25)} className={`${glass} p-3`}>
          <div className="w-28 h-36 lg:w-36 lg:h-48 rounded-lg overflow-hidden">
            <Image src={heroPic} alt={siteConfig.name} width={144} height={192} className="object-cover object-top w-full h-full" priority />
          </div>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-muted/40 mt-2 px-1">
            Frontend Developer
          </p>
        </motion.div>
      </motion.div>

      {/* Stats card — top-right, z-10 */}
      <motion.div
        className="absolute z-10 top-[12%] right-[5%] lg:right-[8%]"
        style={{ x: reduced ? 0 : p3.x, y: reduced ? 0 : p3.y }}
      >
        <motion.div {...fade(0.4)} className={`${glass} p-4`}>
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
        </motion.div>
      </motion.div>

      {/* Tagline + CTAs card — bottom-center, z-25 */}
      <motion.div
        className="absolute z-25 bottom-[14%] left-[10%] lg:left-[25%]"
        style={{ x: reduced ? 0 : p4.x, y: reduced ? 0 : p4.y }}
      >
        <motion.div {...fade(0.5)} className={`${glass} p-5 max-w-sm`}>
          <p className="text-sm text-text-secondary leading-relaxed font-body mb-4">
            I build{' '}
            <span className="text-accent font-medium">{typed}<span className="animate-pulse">|</span></span>{' '}
            web apps for brands that care about craft.
          </p>
          <div className="flex items-center gap-3">
            <a href="#contact" className="font-mono text-xs tracking-wider px-5 py-2 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer">Hire me</a>
            <a href="#work" className="font-mono text-xs tracking-wider px-5 py-2 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 transition-all cursor-pointer">Work</a>
          </div>
        </motion.div>
      </motion.div>

      {/* Availability badge — top-left, z-30, fastest parallax */}
      <motion.div
        className="absolute z-30 top-[25%] left-[20%] lg:left-[30%]"
        style={{ x: reduced ? 0 : p5.x, y: reduced ? 0 : p5.y }}
      >
        <motion.div {...fade(0.6)} className={`${glass} px-4 py-2.5 flex items-center gap-2`}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/60">Available</span>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="w-px h-8 bg-text-muted/20 overflow-hidden">
          <motion.div className="w-full h-4 bg-text-muted/40" animate={{ y: [0, 24] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </motion.div>
    </section>
  )
}
