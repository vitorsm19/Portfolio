'use client'

import { useEffect } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Floating Glass v3 — "Off-Center Gravity"
 *
 * The name card sits bottom-left, almost falling off the viewport.
 * Everything else orbits the upper-right. The composition feels
 * like gravity is pulling the name down while lighter cards
 * float above. Intentionally off-balance. The name dominates
 * by being the heaviest visual element at the lowest point.
 */
export function HeroGlass3() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 30, damping: 25 })
  const sy = useSpring(my, { stiffness: 30, damping: 25 })

  const l = (mul: number) => ({
    x: useTransform(sx, [-0.5, 0.5], [mul, -mul]),
    y: useTransform(sy, [-0.5, 0.5], [mul * 0.7, -mul * 0.7]),
  })

  const pName = l(8)
  const pAvatar = l(-20)
  const pRole = l(15)
  const pTagline = l(-10)
  const pStats = l(24)
  const pCta = l(-16)

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
    initial: reduced ? false : ({ opacity: 0, scale: 0.92, filter: 'blur(10px)' } as const),
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    transition: { delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Glows — asymmetric to match the off-center composition */}
      <div className="absolute pointer-events-none" style={{ bottom: '20%', left: '25%', transform: 'translate(-50%,0)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none" style={{ top: '15%', right: '15%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(110,231,183,0.04) 0%, transparent 60%)', filter: 'blur(30px)' }} />

      {/* NAME — bottom-left, the heaviest element, z-20 */}
      <motion.div
        className="absolute z-20 bottom-[10%] lg:bottom-[12%] left-[4%] lg:left-[8%]"
        style={{ x: reduced ? 0 : pName.x, y: reduced ? 0 : pName.y }}
      >
        <motion.div {...fade(0.1)} className={`${glass} p-8 lg:p-10`}>
          <h1
            className="font-sans font-bold leading-[0.84] select-none"
            style={{ fontSize: 'clamp(3rem, min(16vw, 13vh), 9rem)' }}
          >
            <span className="text-text-heading">VITOR</span>
            <br />
            <span className="text-text-muted/30">MESQUITA</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* AVATAR — upper-right area, z-15 */}
      <motion.div
        className="absolute z-[15] top-[15%] right-[10%] lg:right-[20%]"
        style={{ x: reduced ? 0 : pAvatar.x, y: reduced ? 0 : pAvatar.y }}
      >
        <motion.div {...fade(0.25)} className={`${glass} p-3`}>
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent/20 ring-offset-2 ring-offset-bg-primary">
            <Image src={aboutPic} alt={siteConfig.name} width={80} height={80} className="object-cover object-top w-full h-full" priority />
          </div>
        </motion.div>
      </motion.div>

      {/* ROLE — upper-center-right, z-10, small */}
      <motion.div
        className="absolute z-10 top-[28%] right-[25%] lg:right-[35%]"
        style={{ x: reduced ? 0 : pRole.x, y: reduced ? 0 : pRole.y }}
      >
        <motion.div {...fade(0.35)} className={`${glass} px-5 py-3`}>
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent flex items-center gap-2">
            <span className="w-5 h-px bg-accent" />
            Frontend Developer
          </span>
        </motion.div>
      </motion.div>

      {/* TAGLINE — mid-right, z-20 */}
      <motion.div
        className="absolute z-20 top-[42%] right-[6%] lg:right-[12%]"
        style={{ x: reduced ? 0 : pTagline.x, y: reduced ? 0 : pTagline.y }}
      >
        <motion.div {...fade(0.45)} className={`${glass} p-5 max-w-[260px]`}>
          <p className="text-sm text-text-secondary leading-relaxed font-body">
            Building{' '}
            <span className="text-accent font-medium">{typed}<span className="animate-pulse">|</span></span>{' '}
            interfaces people love
          </p>
        </motion.div>
      </motion.div>

      {/* STATS — mid-left, z-10, above the name */}
      <motion.div
        className="absolute z-10 top-[30%] left-[6%] lg:left-[15%]"
        style={{ x: reduced ? 0 : pStats.x, y: reduced ? 0 : pStats.y }}
      >
        <motion.div {...fade(0.5)} className={`${glass} p-4`}>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <span className="text-2xl font-bold text-text-heading tabular-nums">20+</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Projects</p>
            </div>
            <div className="w-px h-6 bg-text-muted/15" />
            <div className="text-center">
              <span className="text-2xl font-bold text-text-heading tabular-nums">6+</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Years</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* CTAs — bottom-right, z-25 */}
      <motion.div
        className="absolute z-25 bottom-[18%] right-[8%] lg:right-[15%]"
        style={{ x: reduced ? 0 : pCta.x, y: reduced ? 0 : pCta.y }}
      >
        <motion.div {...fade(0.6)} className={`${glass} p-4 flex items-center gap-3`}>
          <div className="flex items-center gap-2 mr-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
          </div>
          <a href="#contact" className="font-mono text-xs tracking-wider px-5 py-2 rounded-full bg-accent text-white hover:brightness-110 transition-all cursor-pointer">Hire me</a>
          <a href="#work" className="font-mono text-xs tracking-wider px-5 py-2 rounded-full border border-white/10 text-text-secondary hover:border-accent/40 transition-all cursor-pointer">Work</a>
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
