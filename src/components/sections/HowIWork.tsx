'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientLabel } from '@/components/ui/GradientLabel'

const steps: { title: string; body: string }[] = [
  {
    title: 'Quick fit call',
    body: 'A 20-minute intro to understand the role, your team, the stack, and timeline.',
  },
  {
    title: 'Scope & availability',
    body: 'We align on engagement type (hourly, monthly, dedicated), start date, and weekly hours.',
  },
  {
    title: 'Contract & kickoff',
    body: 'Straightforward contract, NDA if needed, and immediate ramp-up inside your tools and codebase.',
  },
  {
    title: 'Delivery inside your workflow',
    body: 'Tickets, PRs, code reviews, standups — embedded in your team the same way an employee would be.',
  },
  {
    title: 'Weekly progress, clean handoff',
    body: 'Measurable output, regular check-ins, documented work. No surprises at the end of the engagement.',
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
  visible: { transition: { staggerChildren: 0.08 } },
} as const

export function HowIWork() {
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
          <GradientLabel tracking="0.22em">How I Work</GradientLabel>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-5 text-5xl sm:text-6xl lg:text-[6rem] font-bold text-text-heading leading-[0.92] tracking-tight!"
        >
          From first call to{' '}
          <span
            className="about-italic-accent text-6xl sm:text-6xl lg:text-7xl tracking-tight!"
            style={{
              fontFamily: '"PP Playground", cursive',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            shipped.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg lg:text-xl text-text-secondary max-w-2xl leading-relaxed font-body"
        >
          Premium contractor delivery without the agency overhead. I work hourly, monthly,
          part-time, or full-time contract — minimum 3 months preferred.
        </motion.p>

        <motion.ol variants={stagger} className="mt-12 space-y-4">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="flex items-start gap-5 lg:gap-7 py-5 service-card-divider border-t"
            >
              <span className="service-card-number font-mono text-2xl lg:text-3xl font-bold leading-none shrink-0 pt-1 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h3 className="text-lg lg:text-2xl font-bold text-text-heading tracking-wider!">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-base lg:text-lg text-text-secondary leading-relaxed font-[family-name:var(--font-body)] tracking-wider!">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </div>
  )
}
