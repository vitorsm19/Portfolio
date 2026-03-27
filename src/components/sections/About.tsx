'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { GhostText } from '@/components/ui/GhostText'
import { siteConfig } from '@/data/site'

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

export function About() {
  const reduced = useReducedMotion()
  const initial = reduced ? false : ('hidden' as const)

  return (
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
          className="mt-5 text-5xl sm:text-5xl lg:text-[5.5rem] font-bold text-text-heading leading-[0.92]"
        >
          Your next project,
          <br className="hidden lg:block" />{' '}
          <span
            className="text-7xl sm:text-6xl lg:text-8xl tracking-tight!"
            style={{
              fontFamily: '"PP Playground", cursive',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            delivered.
          </span>
        </motion.h2>

        <motion.div variants={stagger} className="mt-10 md:mt-14 space-y-8 max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="text-xl lg:text-2xl leading-relaxed text-text-secondary/80"
          >
            <GhostText
              text="I've spent 6+ years building digital products for some of the biggest brands in sports, retail, and tech. Now I deliver that same quality directly to you. Polished, high-performance web apps delivered on time, on budget, and built to scale."
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
              text="Skip the agency meetings. Get straight to results."
              highlights={['Skip the agency meetings.', ' Get straight to results.']}
            />
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
