'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { TextReveal } from '@/components/motion/TextReveal'
import { Magnetic } from '@/components/motion/Magnetic'
import { scrollToId } from '@/lib/lenis'
import aboutPic from '@/assets/about-pic.png'
import aboutPicLight from '@/assets/about-pic-light.jpg'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 110])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 lg:px-12 pt-28 pb-24"
    >
      {/* soft accent glow — calm, barely there */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] right-[-10%] h-[55vh] w-[55vh] rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgb(var(--color-accent-rgb)) 0%, transparent 70%)' }}
      />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="h-11 w-11 overflow-hidden rounded-full ring-1 ring-[color-mix(in_oklab,var(--color-overlay)_16%,transparent)]">
            <Image
              src={aboutPic}
              alt="Vitor Mesquita"
              width={44}
              height={44}
              className="img-dark h-full w-full object-cover object-top"
              priority
            />
            <Image
              src={aboutPicLight}
              alt="Vitor Mesquita"
              width={44}
              height={44}
              className="img-light h-full w-full object-cover object-top"
              priority
            />
          </span>
          <span className="text-sm text-text-secondary">
            Vitor Mesquita, Senior Frontend Contractor
          </span>
          <span className="flex items-center gap-2 text-sm text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-status-online opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-online" />
            </span>
            Available
          </span>
        </motion.div>

        <TextReveal
          as="h1"
          mount
          delay={0.25}
          text="I help product teams ship frontends they can rely on."
          className="mt-8 lg:mt-10 max-w-[15ch] font-sans font-bold text-text-heading leading-[0.94] tracking-[0] text-[clamp(2.75rem,8vw,6rem)]"
        />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-7 max-w-xl text-lg lg:text-xl leading-relaxed text-text-secondary"
        >
          A senior React, Next.js &amp; TypeScript developer who slots into your team,
          owns the frontend, and communicates every step. Remote across Europe.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <button
              onClick={() => scrollToId('contact')}
              className="btn-primary cursor-pointer rounded-full px-6 py-3 text-sm font-medium"
            >
              Get in touch
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => scrollToId('work')}
              className="btn-ghost cursor-pointer rounded-full px-6 py-3 text-sm font-medium"
            >
              See selected work
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-muted sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <span className="h-7 w-px overflow-hidden bg-[color-mix(in_oklab,var(--color-overlay)_20%,transparent)]">
          <motion.span
            className="block h-3 w-full bg-accent"
            animate={reduced ? {} : { y: [-12, 28] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
