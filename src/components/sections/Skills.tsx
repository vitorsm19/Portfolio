'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { skills } from '@/data/skills'
import { SkillIcon } from '@/components/ui/SkillIcon'

const primarySkills = skills.filter((s) => s.tier === 'primary')
const secondarySkills = skills.filter((s) => s.tier === 'secondary')

export function Skills() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="Technical skills"
      className="relative py-24 lg:py-36 bg-bg-secondary overflow-hidden"
    >
      <style>{`
        @keyframes skillsMarqueeRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-10%); }
        }
        @keyframes skillsMarqueeLeft {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(0); }
        }
        .skills-row-primary { animation: skillsMarqueeRight 35s linear infinite; }
        .skills-row-secondary { animation: skillsMarqueeLeft 45s linear infinite; }
        @media (max-width: 640px) {
          .skills-row-primary { animation-duration: 4s; }
          .skills-row-secondary { animation-duration: 6s; }
        }
      `}</style>

      {/* Background ghost text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none pt-24 lg:pt-42"
        aria-hidden="true"
      >
        <span className="skill-stack-ghost text-[50vw] md:text-[20vw] font-bold uppercase tracking-tight! leading-none">
          STACK
        </span>
      </div>

      {/* Heading — centered */}
      <motion.div
        className="relative z-10 text-center px-6 mb-16 lg:mb-24"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <GradientLabel tracking="0.22em">Tech Stack</GradientLabel>
        <h2 className="mt-5 text-5xl sm:text-6xl lg:text-[6.5rem] font-bold text-text-heading leading-[0.9] tracking-tight!">
          Tools I work with.
        </h2>
      </motion.div>

      {/* Primary skills — marquee scrolling RIGHT */}
      <div className="relative z-10 mb-8">
        <div className="flex skills-row-primary">
          {Array(10).fill(primarySkills).flat().map(
            (skill, i) => (
              <div
                key={`${skill.name}-${i}`}
                className="skill-pill group shrink-0 flex items-center gap-4 lg:gap-5 mx-4 lg:mx-6 px-5 lg:px-7 py-4 lg:py-5 rounded-2xl border backdrop-blur-sm cursor-pointer"
              >
                <div className="skill-icon-wrapper">
                  <SkillIcon skill={skill} size="primary" />
                </div>
                <span className="text-lg lg:text-xl font-bold text-text-muted group-hover:text-text-heading transition-colors duration-500 tracking-wider! uppercase whitespace-nowrap">
                  {skill.label}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Secondary skills — marquee scrolling LEFT (opposite direction) */}
      <div className="relative z-10">
        <div className="flex skills-row-secondary">
          {Array(10).fill(secondarySkills).flat().map(
            (skill, i) => (
              <div
                key={`${skill.name}-${i}`}
                className="skill-pill-secondary group shrink-0 flex items-center gap-3 mx-3 lg:mx-4 px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl border cursor-pointer"
              >
                <div className="skill-icon-wrapper">
                  <SkillIcon skill={skill} size="secondary" />
                </div>
                <span className="text-sm font-medium text-text-muted group-hover:text-text-secondary transition-colors duration-500 tracking-wider! whitespace-nowrap">
                  {skill.label}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Edge fades — left and right */}
      <div className="absolute inset-y-0 left-0 w-24 lg:w-40 bg-linear-to-r from-bg-secondary to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 lg:w-40 bg-linear-to-l from-bg-secondary to-transparent z-20 pointer-events-none" />
    </section>
  )
}
