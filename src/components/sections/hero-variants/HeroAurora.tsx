'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'

/**
 * Hero 2 — "Spotlight Drift" (rebuilt)
 * Animated SVG spotlight beam sweeps across the viewport.
 * Name revealed through dramatic light. Floating emerald particles
 * drift upward. Theatrical, cinematic, premium.
 */
export function HeroAurora() {
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Floating particles
  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      opacity: number
      fadeSpeed: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticle = () => {
      if (particles.length > 40) return
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: 1 + Math.random() * 2.5,
        speedY: -(0.3 + Math.random() * 0.6),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0.1 + Math.random() * 0.3,
        fadeSpeed: 0.0005 + Math.random() * 0.001,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (Math.random() < 0.15) spawnParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.y += p.speedY
        p.x += p.speedX
        p.opacity -= p.fadeSpeed

        if (p.opacity <= 0 || p.y < -20) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-bg-primary"
      style={{ minHeight: '100dvh' }}
      aria-label="Hero"
    >
      {/* Spotlight SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1.5s ease' }}
      >
        <defs>
          <radialGradient id="spot-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.07)" />
            <stop offset="60%" stopColor="rgba(16,185,129,0.02)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {!reduced && (
          <ellipse cx="50%" cy="40%" rx="35%" ry="45%" fill="url(#spot-grad)">
            <animate
              attributeName="cx"
              values="30%;55%;40%;65%;30%"
              dur="20s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="35%;50%;40%;55%;35%"
              dur="25s"
              repeatCount="indefinite"
            />
          </ellipse>
        )}
      </svg>

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Horizontal light beam */}
      <motion.div
        className="absolute top-[42%] left-0 w-full h-px z-[2]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={mounted ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          transformOrigin: 'left',
          background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.2), rgba(16,185,129,0.05), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 lg:px-16 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
        {/* Left — identity */}
        <div className="flex-1 flex flex-col items-center lg:items-start">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
              Available for hire
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 50, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
            className="font-sans font-bold leading-[0.85] select-none text-center lg:text-left"
            style={{ fontSize: 'clamp(3.5rem, min(20vw, 16vh), 12rem)' }}
          >
            <span className="text-text-heading">VITOR</span>
            <br />
            <span className="text-text-muted/35">MESQUITA</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-8 text-sm lg:text-base text-text-secondary leading-relaxed font-body max-w-md text-center lg:text-left"
          >
            I build{' '}
            <span className="text-accent font-medium">
              {typed}
              <span className="animate-pulse">|</span>
            </span>{' '}
            web apps
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
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
          </motion.div>
        </div>

        {/* Right — avatar + stats card */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col items-center gap-6 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
                transform: 'scale(2)',
              }}
            />
            <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-4 ring-offset-bg-primary relative">
              <Image
                src={aboutPic}
                alt={siteConfig.name}
                width={112}
                height={112}
                className="object-cover object-top w-full h-full"
                priority
              />
            </div>
          </div>

          <div className="text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">
              Frontend Developer
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/50 mt-1">
              Spain, EU
            </p>
          </div>

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
