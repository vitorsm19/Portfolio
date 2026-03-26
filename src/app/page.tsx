'use client'

import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import Image from 'next/image'
import aboutPic from '@/assets/about-pic.png'
import { siteConfig } from '@/data/site'
import { skills } from '@/data/skills'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { SkillIcon } from '@/components/ui/SkillIcon'
import { useTypewriter } from '@/hooks/useTypewriter'

/* ── data ── */
const primarySkills = skills.filter((s) => s.tier === 'primary')
const secondarySkills = skills.filter((s) => s.tier === 'secondary')
const NAV_LINKS = ['About', 'Work', 'Services', 'Contact'] as const

/* ── animation primitives ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
} as const

/* ── helpers ── */
function smoothScrollTo(targetY: number, duration = 1000) {
  const start = window.scrollY
  const diff = targetY - start
  let startTime: number | null = null

  function easeOutExpo(t: number) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, start + diff * easeOutExpo(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatPrice(s: (typeof services)[number]) {
  if (s.pricing.type === 'custom') return 'Custom'
  const suffix = s.pricing.type === 'hourly' ? '/hr' : ''
  return `\u20AC${s.pricing.amount}${suffix}`
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setCount(target)
      return
    }
    const steps = 36
    const inc = target / steps
    const interval = duration / steps
    let cur = 0
    const id = setInterval(() => {
      cur += inc
      if (cur >= target) {
        setCount(target)
        clearInterval(id)
      } else setCount(Math.floor(cur))
    }, interval)
    return () => clearInterval(id)
  }, [inView, target, duration, reduced])

  return { count, ref }
}

/* ── ghost text renderer ── */
function GhostText({
  text,
  highlights,
  accentWords = [],
  className = '',
}: {
  text: string
  highlights: string[]
  accentWords?: string[]
  className?: string
}) {
  const all = [...highlights, ...accentWords]
  const regex = new RegExp(
    `(${all.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  )
  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isAccent = accentWords.some((w) => w.toLowerCase() === part.toLowerCase())
        const isHighlight = highlights.some((h) => h.toLowerCase() === part.toLowerCase())
        if (isAccent)
          return (
            <span key={i} className="text-accent opacity-100">
              {part}
            </span>
          )
        if (isHighlight)
          return (
            <span key={i} className="opacity-100 text-text-primary">
              {part}
            </span>
          )
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

/* ── section label ── */
function GradientLabel({
  children,
  tracking = '0.25em',
}: {
  children: React.ReactNode
  tracking?: string
}) {
  return (
    <span
      className="inline-block font-mono text-[11px] font-bold uppercase text-accent"
      style={{ letterSpacing: tracking }}
    >
      {children}
    </span>
  )
}

/* ── marquee ── */
function Marquee({
  text,
  speed = 30,
  className = '',
}: {
  text: string
  speed?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const items = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="mx-8 whitespace-nowrap">
      {text}
    </span>
  ))
  return (
    <div className={`overflow-hidden py-5 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' as const }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  )
}

/* ── scroll-driven project card ── */
function ProjectCardScrollDriven({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Wider, more gradual animation range
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.55, 0.8, 1],
    [0.82, 0.9, 1, 1, 0.9, 0.82],
  )
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.2, 0.6, 1, 1, 0.6, 0.2],
  )
  const rawY = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [40, 0, 0, 0, -40])

  // Spring smoothing — makes scroll-driven values feel buttery
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  const scale = useSpring(rawScale, springConfig)
  const opacity = useSpring(rawOpacity, springConfig)
  const y = useSpring(rawY, springConfig)

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative z-[5] block w-[92%] sm:w-[80%] lg:w-[60%] mx-auto my-[5vh] sm:my-[12vh] lg:my-[18vh]"
      style={{ perspective: '2000px' }}
    >
      <motion.div
        className="origin-center will-change-transform"
        style={reduced ? {} : { scale, opacity, y }}
      >
        {/* Card — screenshot as atmospheric background, content layered on top */}
        <div className="relative rounded-xl overflow-hidden border border-white/[0.06] group-hover:border-accent/20 transition-colors duration-500 aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9]">
          {/* Blurred screenshot background */}
          <Image
            src={project.snippet}
            alt={`${project.title} website screenshot`}
            fill
            className="object-cover blur-[3px] brightness-[0.3] group-hover:blur-[2px] group-hover:brightness-[0.2] group-hover:scale-105 scale-100 transition-all duration-1000 ease-out"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 60vw"
          />

          {/* Content layered on the blurred screenshot */}
          <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-8 lg:p-10">
            {/* Top: logo + number + arrow */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={200}
                  height={200}
                  className="w-14 h-14 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
                />
                <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
                  {pad(index + 1)}
                </span>
              </div>
              <span className="text-white/30 text-xl group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                &#8599;
              </span>
            </div>

            {/* Bottom: title + description + tech */}
            <div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:text-accent transition-colors duration-700 ease-out tracking-tight leading-[1.1]">
                {project.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-white/60 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-lg line-clamp-3 sm:line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3 sm:mt-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/40 group-hover:text-accent/70 group-hover:border-accent/20 transition-all duration-700 ease-out"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  )
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function Home6() {
  const reduced = useReducedMotion()
  const initial = reduced ? false : ('hidden' as const)

  /* section refs for scroll nav */
  const aboutRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const refs: Record<string, React.RefObject<HTMLElement | null>> = {
    About: aboutRef,
    Work: workRef,
    Services: servicesRef,
    Contact: contactRef,
  }

  function scrollTo(section: string) {
    const el = refs[section]?.current
    if (!el) return
    const target = el.getBoundingClientRect().top + window.scrollY - 80
    smoothScrollTo(target, 1200)
  }

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
    const t2 = setTimeout(() => setContentReady(true), 1350)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduced])

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans overflow-x-hidden selection:bg-accent/30">
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
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ═══════════ 1. FLOATING PILL NAV ═══════════ */}
      <motion.nav
        aria-label="Main navigation"
        initial={reduced ? false : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 px-5 py-2.5 bg-bg-primary/70 backdrop-blur-xl rounded-full border border-white/[0.06] shadow-2xl"
      >
        <span className="text-sm font-bold text-text-heading tracking-wide">VM</span>

        <div className="hidden sm:flex items-center gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-[11px] font-medium text-text-secondary hover:text-text-heading transition-colors tracking-wide uppercase cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-1 pl-4 border-l border-white/[0.08]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-[11px] font-medium text-text-secondary">Available</span>
        </div>
      </motion.nav>

      {/* ═══════════ 2. HERO — "THE BLUEPRINT" ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
        {/* grid lines — drawn from center outward */}
        <div
          className="absolute top-[35%] left-0 w-full h-px bg-text-muted/[0.12]"
          style={{
            transformOrigin: 'center',
            animation: linesReady ? 'drawH 1.2s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
            transform: linesReady ? undefined : 'scaleX(0)',
          }}
        />
        <div
          className="absolute top-0 left-[65%] h-full w-px bg-text-muted/[0.12]"
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
            transform: contentReady ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-text-muted">
            Frontend Developer
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted/50 mt-1">
            Available worldwide
          </p>
        </div>

        {/* massive name — crosses the grid intersection */}
        <div className="relative z-10 w-full px-6 lg:px-16" style={{ marginTop: '-2vh' }}>
          <div
            style={{
              opacity: contentReady ? 1 : 0,
              transform: contentReady ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            <h1
              className="font-sans font-bold tracking-[-0.06em] leading-[0.85] select-none"
              style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
            >
              <span className="text-text-heading/90">VITOR</span>
              <br />
              <span className="text-text-muted/[0.35]">MESQUITA</span>
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
            transform: contentReady ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s',
          }}
        >
          {/* typewriter tagline */}
          <p className="text-sm lg:text-base text-text-secondary leading-relaxed">
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
              <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                Projects
              </p>
            </div>
            <div className="w-px h-8 bg-text-muted/20" />
            <div className="text-right">
              <span
                ref={yearCount.ref}
                className="text-2xl font-bold text-text-heading tabular-nums"
              >
                {yearCount.count}+
              </span>
              <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
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
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
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

      {/* ═══════════ 3. MARQUEE TICKER ═══════════ */}
      <div className="border-y border-white/[0.06] bg-bg-secondary">
        <Marquee
          text="FRONTEND DEVELOPER  //  AVAILABLE WORLDWIDE  //  LET'S BUILD SOMETHING  //"
          speed={35}
          className="text-text-muted/40 text-lg sm:text-xl font-bold uppercase tracking-[0.15em]"
        />
      </div>

      {/* ═══════════ 4. ABOUT ═══════════ */}
      <section
        ref={aboutRef}
        aria-label="About"
        className="py-28 lg:py-40 px-6 lg:px-16 bg-bg-secondary"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <GradientLabel tracking="0.3em">About</GradientLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-4xl sm:text-5xl lg:text-[5.5rem] font-bold text-text-heading leading-[0.92] tracking-tight"
            >
              Your next project,
              <br className="hidden lg:block" /> delivered.
            </motion.h2>

            <motion.div variants={stagger} className="mt-14 space-y-8 max-w-3xl">
              <motion.p
                variants={fadeUp}
                className="text-xl lg:text-2xl leading-relaxed text-text-secondary/80"
              >
                <GhostText
                  text="I've spent 6+ years shipping production code for some of the biggest brands in sports, retail, and tech. Now I bring that same caliber of work directly to you — polished, high-performance web products delivered on time, on budget, and built to scale."
                  highlights={[
                    '6+ years',
                    'biggest brands',
                    'directly to you',
                    'on time',
                    'on budget',
                    'built to scale',
                  ]}
                />
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-xl lg:text-2xl leading-relaxed text-text-secondary/80"
              >
                <GhostText
                  text="No agency overhead, no bloated timelines. One senior developer, full ownership, zero fluff."
                  highlights={[
                    'No agency overhead',
                    'One senior developer',
                    'full ownership',
                    'zero fluff',
                  ]}
                />
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-xl lg:text-2xl leading-relaxed text-text-secondary/80"
              >
                <GhostText
                  text="Explore my work and services below."
                  highlights={[]}
                  accentWords={['work', 'services']}
                />
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 5. PROJECTS — cinematic scroll gallery ═══════════ */}
      <section
        ref={workRef}
        aria-label="Projects"
        className="relative overflow-hidden"
        style={{ perspective: '2000px' }}
      >
        {/* Background "WORKS" watermark */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[10%] z-[1] select-none px-[3%] text-center"
          style={{ fontSize: 'clamp(4rem, 15vw, 14rem)', letterSpacing: '0.3em' }}
        >
          <span className="font-bold uppercase text-white/[0.03]">WORKS</span>
        </div>

        {/* Section heading */}
        <div className="relative z-[2] pt-28 lg:pt-40 px-6 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={initial}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <GradientLabel tracking="0.28em">Featured Work</GradientLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="mt-5 text-5xl sm:text-6xl lg:text-[7rem] font-bold text-text-heading leading-[0.9] tracking-tight"
              >
                Projects
              </motion.h2>
            </motion.div>
          </div>
        </div>

        {/* Project cards — cinematic scroll-driven */}
        <div className="relative z-[5] mt-10 pb-20 lg:pb-32">
          {projects.map((project, i) => (
            <ProjectCardScrollDriven key={project.name} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════ 7. SERVICES — numbered cards ═══════════ */}
      <section ref={servicesRef} aria-label="Services" className="py-24 lg:py-36 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <GradientLabel tracking="0.2em">How I Can Help</GradientLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-5xl sm:text-6xl lg:text-[6rem] font-bold text-text-heading leading-[0.9] tracking-tight"
            >
              Services
            </motion.h2>

            <motion.div variants={stagger} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((service, i) => {
                const isFeatured = service.featured
                return (
                  <motion.div
                    key={service.id}
                    variants={fadeUp}
                    className={`group relative bg-bg-primary rounded-2xl p-7 lg:p-9 border transition-colors duration-500 flex flex-col ${
                      isFeatured
                        ? 'border-accent/30 hover:border-accent/50'
                        : 'border-white/[0.05] hover:border-white/[0.12]'
                    }`}
                  >
                    {isFeatured && (
                      <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase bg-accent/15 text-accent px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}

                    <span className="text-5xl lg:text-6xl font-bold text-accent/[0.2] leading-none select-none">
                      {pad(i + 1)}
                    </span>

                    <h3 className="text-xl lg:text-2xl font-bold text-text-heading mt-4 mb-1 group-hover:text-accent transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-accent/70 mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6 flex-1">
                      {service.features.slice(0, 4).map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-sm text-text-secondary"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                        {service.pricing.label}
                      </span>
                      <span className="text-2xl font-bold text-text-heading">
                        {formatPrice(service)}
                      </span>
                    </div>

                    <a
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(service.title)}`}
                      className="mt-5 inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-medium rounded-full border border-white/[0.1] text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      Get in touch <span aria-hidden>&#8599;</span>
                    </a>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 8. SKILLS ═══════════ */}
      <section
        aria-label="Technical skills"
        className="py-20 lg:py-32 px-6 lg:px-16 bg-bg-secondary"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <GradientLabel tracking="0.22em">Tech Stack</GradientLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-5xl sm:text-6xl lg:text-[6.5rem] font-bold text-text-heading leading-[0.9] tracking-tight"
            >
              Tools I work with.
            </motion.h2>

            {/* primary */}
            <motion.div
              variants={stagger}
              className="mt-16 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12"
            >
              {primarySkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                >
                  <SkillIcon skill={skill} size="primary" />
                </motion.div>
              ))}
            </motion.div>

            {/* secondary */}
            <motion.div variants={fadeUp} className="mt-14 pt-8 border-t border-white/[0.06]">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted mb-7">
                Also familiar with
              </p>
              <div className="flex flex-wrap gap-7 lg:gap-10">
                {secondarySkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  >
                    <SkillIcon skill={skill} size="secondary" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 9. CONTACT ═══════════ */}
      <section ref={contactRef} aria-label="Contact" className="py-32 lg:py-44 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <GradientLabel tracking="0.26em">Get In Touch</GradientLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-6 text-5xl sm:text-6xl lg:text-[7rem] font-bold text-text-heading leading-[0.9] tracking-tight"
            >
              Let&apos;s build something{' '}
              <span className="bg-gradient-to-r from-[#4a77ff] to-[#8b5cf6] bg-clip-text text-transparent">
                great.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg lg:text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              {siteConfig.contact.body}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-sm tracking-wider px-7 py-3.5 rounded-full bg-accent text-white hover:brightness-110 transition-all"
              >
                Send me an email
              </a>
              <a
                href={siteConfig.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-wider px-7 py-3.5 rounded-full border border-white/[0.1] text-text-secondary hover:border-accent/40 hover:text-text-heading transition-all"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-wider px-7 py-3.5 rounded-full border border-white/[0.1] text-text-secondary hover:border-accent/40 hover:text-text-heading transition-all"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 9. FOOTER MARQUEE ═══════════ */}
      <div className="border-t border-white/[0.06] pt-6">
        <div className="text-6xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-text-heading/[0.05] select-none">
          <Marquee text="LET'S TALK" speed={22} />
        </div>
      </div>

      {/* ═══════════ 10. FOOTER ═══════════ */}
      <footer className="px-6 lg:px-16 pb-10">
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-text-heading tracking-tight">
                {siteConfig.name}
              </p>
              <p className="font-mono text-[10px] text-text-muted/50 mt-1 tracking-wider">
                Turning wild ideas into polished interfaces
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[
                { label: 'GitHub', href: siteConfig.github.url, external: true },
                { label: 'LinkedIn', href: siteConfig.linkedin.url, external: true },
                { label: 'Email', href: `mailto:${siteConfig.email}`, external: false },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="px-4 py-2 text-[11px] font-medium text-text-muted border border-white/[0.07] rounded-full hover:text-text-heading hover:border-white/20 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-text-muted/40 mt-8 text-center">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
