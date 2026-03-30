'use client'

import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useCountUp } from '@/hooks/useCountUp'

export function Hero() {
  const reduced = useReducedMotion()

  /* typewriter for hero */
  const typed = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 2400,
  })

  /* count-up stats */
  const projectCount = useCountUp(20)
  const yearCount = useCountUp(6)

  /* blueprint line animation state */
  const [linesReady, setLinesReady] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    if (reduced) {
      setLinesReady(true)
      setContentReady(true)
      return
    }
    const t1 = setTimeout(() => setLinesReady(true), 100)
    const t2 = setTimeout(() => setContentReady(true), 700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduced])

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-bg-primary" style={{ minHeight: '100dvh' }}>
      {/* blueprint keyframes */}
      <style>{`
        @keyframes drawH { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes drawV { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scrollLine {
          0% { transform: translateY(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
      `}</style>

      {/* ambient glow at grid intersection */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '35%',
          left: '65%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          opacity: contentReady ? 1 : 0,
          transition: 'opacity 1.5s ease 0.5s',
        }}
      />

      {/* grid lines — drawn from center outward */}
      <div
        className="absolute top-[35%] left-0 w-full h-px bg-text-muted/12"
        style={{
          transformOrigin: 'center',
          animation: linesReady ? 'drawH 1.2s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          transform: linesReady ? undefined : 'scaleX(0)',
        }}
      />
      <div
        className="absolute top-0 left-[65%] h-full w-px bg-text-muted/12"
        style={{
          transformOrigin: 'center',
          animation: linesReady ? 'drawV 1.2s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          transform: linesReady ? undefined : 'scaleY(0)',
        }}
      />

      {/* crosshair markers */}
      {[
        { top: '35%', left: '65%', translate: '-50% -50%' },
        { top: '35%', left: '4%', translate: '0 -50%' },
        { top: '35%', left: '96%', translate: '-100% -50%' },
        { top: '6%', left: '65%', translate: '-50% 0' },
        { top: '92%', left: '65%', translate: '-50% -100%' },
      ].map((pos, i) => (
        <span
          key={i}
          className="absolute font-mono text-text-muted/20 text-xs select-none pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
            translate: pos.translate,
            opacity: contentReady ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          +
        </span>
      ))}

      {/* top-left quadrant — role label */}
      <div
        className="absolute top-[18%] left-6 lg:left-16"
        style={{
          opacity: contentReady ? 1 : 0,
          filter: contentReady ? 'blur(0px)' : 'blur(8px)',
          transform: contentReady ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <p className="font-mono text-[10px] tracking-[0.35em]! uppercase text-text-muted">
          Frontend Developer
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em]! uppercase text-text-muted/50 mt-1">
          Available worldwide
        </p>
      </div>

      {/* massive name — crosses the grid intersection */}
      <div className="relative z-10 w-full px-6 lg:px-16" style={{ marginTop: '-2vh' }}>
        <div
          style={{
            opacity: contentReady ? 1 : 0,
            filter: contentReady ? 'blur(0px)' : 'blur(12px)',
            transform: contentReady ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.22,1,0.36,1) 0.1s',
          }}
        >
          <h1
            className="font-sans font-bold leading-[0.85] select-none pt-8"
            style={{ fontSize: 'clamp(3rem, min(25vw, 20vh), 12rem)' }}
          >
            <span className="text-text-heading/90 tracking-[0.05em]!">VITOR</span>
            <br />
            <span className="text-text-muted/35 tracking-[0.05em]!">MESQUITA</span>
          </h1>
        </div>
      </div>

      {/* avatar — centered on mobile, at grid intersection on desktop */}
      <div
        className="absolute left-[65%] top-[35%] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: contentReady ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s',
        }}
      >
        <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-accent/60 ring-offset-2 ring-offset-bg-primary">
          <Image
            src={aboutPic}
            alt={siteConfig.name}
            width={80}
            height={80}
            className="object-cover object-top w-full h-full"
            priority
          />
        </div>
      </div>

      {/* bottom-right info block */}
      <div
        className="absolute bottom-[12%] right-6 lg:right-16 max-w-xs text-right"
        style={{
          opacity: contentReady ? 1 : 0,
          filter: contentReady ? 'blur(0px)' : 'blur(8px)',
          transform: contentReady ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s',
        }}
      >
        {/* typewriter tagline */}
        <p className="text-sm lg:text-base text-text-secondary leading-relaxed font-body">
          I build{' '}
          <span className="text-accent font-medium">
            {typed}
            <span className="animate-pulse">|</span>
          </span>{' '}
          web&nbsp;apps
        </p>

        {/* stats */}
        <div className="flex items-center justify-end gap-6 mt-5">
          <div className="text-right">
            <span
              ref={projectCount.ref}
              className="text-2xl font-bold text-text-heading tabular-nums"
            >
              {projectCount.count}+
            </span>
            <p className="text-[10px] font-mono uppercase tracking-widest! text-text-muted mt-0.5">
              Projects
            </p>
          </div>
          <div className="w-px h-8 bg-text-muted/20" />
          <div className="text-right">
            <span ref={yearCount.ref} className="text-2xl font-bold text-text-heading tabular-nums">
              {yearCount.count}+
            </span>
            <p className="text-[10px] font-mono uppercase tracking-widest! text-text-muted mt-0.5">
              Years
            </p>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: contentReady ? 0.5 : 0,
          transition: 'opacity 1s ease 0.8s',
        }}
      >
        <span className="font-mono text-[10px] tracking-widest! uppercase text-text-muted">
          scroll
        </span>
        <div className="w-px h-6 bg-text-muted/30 overflow-hidden">
          <div
            className="w-full h-3 bg-text-muted/60"
            style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
