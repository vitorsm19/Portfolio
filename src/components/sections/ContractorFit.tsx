'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientLabel } from '@/components/ui/GradientLabel'

const fits: { title: string; body: string }[] = [
  {
    title: '3+ month React contracts',
    body: 'You need a senior React, Next.js, or TypeScript contractor for a defined engagement with clear deliverables.',
  },
  {
    title: 'Slot into an existing team',
    body: 'You need someone who can ramp up quickly and start contributing inside your workflow, tools, and codebase.',
  },
  {
    title: 'Production-ready, not prototypes',
    body: 'You want frontend delivery that ships to users — typed, tested, accessible, and performant from day one.',
  },
  {
    title: 'Frontend architecture & systems',
    body: 'You need help with frontend architecture, design systems, reusable components, or maintainability.',
  },
  {
    title: 'Performance & Core Web Vitals',
    body: 'Your app is slow, your Lighthouse scores are red, or your codebase is blocking the team. I can stabilize it.',
  },
  {
    title: 'Remote-first European time zones',
    body: 'You work async across European time zones and need a contractor who collaborates the same way.',
  },
]

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
  visible: { transition: { staggerChildren: 0.06 } },
} as const

export function ContractorFit() {
  const reduced = useReducedMotion()
  const initial = reduced ? false : ('hidden' as const)

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={initial}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <GradientLabel tracking="0.22em">Contractor Fit</GradientLabel>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-5 text-5xl sm:text-6xl lg:text-[6rem] font-bold text-text-heading leading-[0.92] tracking-tight!"
        >
          When to bring me{' '}
          <span
            className="about-italic-accent text-6xl sm:text-6xl lg:text-7xl tracking-tight!"
            style={{
              fontFamily: '"PP Playground", cursive',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            in.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg lg:text-xl text-text-secondary max-w-2xl leading-relaxed font-body"
        >
          I&apos;m a good fit when your team needs senior frontend capacity without a long
          hiring cycle. Typical engagements look like:
        </motion.p>

        <motion.div
          variants={stagger}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {fits.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="service-card group rounded-2xl p-6 border flex flex-col"
            >
              <span className="service-card-number text-3xl lg:text-4xl font-bold leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg lg:text-xl font-bold text-text-heading mt-4 mb-2 tracking-wider!">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-[family-name:var(--font-body)] tracking-wider!">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
