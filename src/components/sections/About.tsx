'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/site'

function useIsLg() {
  const [isLg, setIsLg] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsLg(mq.matches)

    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isLg
}

export function About() {
  const prefersReducedMotion = useReducedMotion()
  const isLg = useIsLg()

  const titleInitial = prefersReducedMotion
    ? false
    : isLg
      ? { opacity: 0, x: -60 }
      : { opacity: 0, y: 30 }

  const textInitial = prefersReducedMotion
    ? false
    : isLg
      ? { opacity: 0, x: 60 }
      : { opacity: 0, y: 30 }

  const animateTo = { opacity: 1, x: 0, y: 0 }

  return (
    <section className="bg-bg-secondary py-16 px-6 lg:py-24">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-12 lg:gap-8">
        {/* ABOUT ME heading */}
        <motion.h2
          className="text-7xl lg:text-8xl font-bold text-text-muted leading-[0.85] text-center lg:text-right"
          initial={titleInitial}
          whileInView={animateTo}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block">ABOUT</span>
          <span className="block">ME</span>
        </motion.h2>

        {/* About text */}
        <motion.div
          className="text-text-secondary text-xl lg:text-2xl max-w-[45ch] text-center lg:text-left"
          initial={textInitial}
          whileInView={animateTo}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {siteConfig.about.paragraphs.map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'mt-4' : ''}>
              {paragraph}
            </p>
          ))}
          <p className="mt-4">
            Check out my <span className="text-accent font-semibold">skills</span> and{' '}
            <span className="text-accent font-semibold">projects</span> below!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
