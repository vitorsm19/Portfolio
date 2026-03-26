'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { skills } from '@/data/skills'
import { SkillIcon } from '@/components/ui/SkillIcon'

const primarySkills = skills.filter((s) => s.tier === 'primary')
const secondarySkills = skills.filter((s) => s.tier === 'secondary')

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const staggerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

const iconPop = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-bg-primary overflow-hidden py-16 px-6 lg:py-0 lg:min-h-[480px] flex items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-0">
        {/* ---- Left column: Skills cascade ---- */}
        <motion.div
          className="flex flex-col gap-6 w-full lg:w-[58%]"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Focused on — gradient label */}
          <p className="gradient-text-accent font-bold tracking-wide text-sm uppercase lg:pl-6 text-center lg:text-left">
            Focused on
          </p>

          {/* Primary skills — large, prominent */}
          <motion.div
            className="flex flex-row flex-wrap items-end justify-center lg:justify-start gap-3 lg:gap-4 lg:pl-8"
            variants={prefersReducedMotion ? undefined : staggerContainer}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {primarySkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={prefersReducedMotion ? undefined : iconPop}
                className="grayscale lg:grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                <SkillIcon skill={skill} size="primary" />
              </motion.div>
            ))}
          </motion.div>

          {/* Also knowledgeable in — gradient label */}
          <p className="gradient-text-accent font-bold tracking-wide text-sm uppercase text-center lg:text-left lg:pl-6 pt-6">
            but also knowledgeable in
          </p>

          {/* Secondary skills — compact cluster */}
          <motion.div
            className="grid grid-cols-4 lg:flex lg:flex-row lg:flex-wrap items-end justify-items-center lg:justify-start gap-2 lg:gap-3 lg:pl-10"
            variants={prefersReducedMotion ? undefined : staggerSlow}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {secondarySkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={prefersReducedMotion ? undefined : iconPop}
                className="grayscale lg:grayscale hover:grayscale-0 transition-all duration-500 hover:scale-125 cursor-pointer"
              >
                <SkillIcon skill={skill} size="secondary" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- Right column: TECH/STACK heading ---- */}
        <motion.h2
          className="lg:w-[42%] text-7xl lg:text-8xl font-bold text-text-muted leading-[0.85] text-center lg:text-right select-none"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block">TECH/</span>
          <span className="block">STACK</span>
        </motion.h2>
      </div>
    </section>
  )
}
