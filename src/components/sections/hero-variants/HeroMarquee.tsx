'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Hero — "Kinetic Marquee"
 * Oversized name scrolling horizontally in opposite directions.
 * Multiple rows at different speeds/sizes. Name becomes
 * the background texture. Centered card overlay with identity.
 */
export function HeroMarquee() {
  const reduced = useReducedMotion()

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  const marqueeRows = [
    { text: 'VITOR MESQUITA', size: 'clamp(3rem, 12vw, 10rem)', opacity: 0.04, speed: 40, direction: 1 },
    { text: 'FRONTEND DEVELOPER', size: 'clamp(2rem, 8vw, 6rem)', opacity: 0.025, speed: 55, direction: -1 },
    { text: 'VITOR MESQUITA', size: 'clamp(3.5rem, 14vw, 12rem)', opacity: 0.05, speed: 35, direction: 1 },
    { text: 'REACT / NEXT.JS / TYPESCRIPT', size: 'clamp(1.5rem, 5vw, 4rem)', opacity: 0.02, speed: 50, direction: -1 },
    { text: 'VITOR MESQUITA', size: 'clamp(2.5rem, 10vw, 8rem)', opacity: 0.035, speed: 45, direction: 1 },
  ]

  const repeat = 8

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Scrolling text layers */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none" aria-hidden="true">
        {marqueeRows.map((row, i) => (
          <div key={i} className="overflow-hidden whitespace-nowrap">
            <motion.div
              className="inline-block whitespace-nowrap font-sans font-bold"
              style={{
                fontSize: row.size,
                color: `rgba(255,255,255,${row.opacity})`,
                lineHeight: 1.1,
              }}
              animate={
                reduced
                  ? {}
                  : {
                      x: row.direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'],
                    }
              }
              transition={{
                x: { duration: row.speed, repeat: Infinity, ease: 'linear' },
              }}
            >
              {Array.from({ length: repeat })
                .map(() => `${row.text}  //  `)
                .join('')}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Center vignette to push focus inward */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(3,2,2,0.85) 80%)',
        }}
      />

      {/* Center identity card */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
        className="relative z-10 flex flex-col items-center text-center px-8 py-10 rounded-2xl border border-white/[0.06] bg-bg-primary/80 backdrop-blur-xl max-w-md mx-6"
      >
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-4 ring-offset-bg-primary mb-5">
          <Image
            src={aboutPic}
            alt={siteConfig.name}
            width={80}
            height={80}
            className="object-cover object-top w-full h-full"
            priority
          />
        </div>

        {/* Name */}
        <h1
          className="font-sans font-bold leading-[0.88] select-none"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          <span className="text-text-heading">VITOR</span>{' '}
          <span className="text-text-muted/40">MESQUITA</span>
        </h1>

        {/* Role */}
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent mt-3">
          Frontend Developer
        </span>

        {/* Tagline */}
        <p className="mt-4 text-sm text-text-secondary leading-relaxed font-body">
          I build{' '}
          <span className="text-accent font-medium">
            {typed}
            <span className="animate-pulse">|</span>
          </span>{' '}
          web&nbsp;apps
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-6">
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

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
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
            View work
          </a>
        </div>
      </motion.div>

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
