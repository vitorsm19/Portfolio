'use client'

import { Reveal } from '@/components/motion/Reveal'
import { SectionTag } from '@/components/ui/SectionTag'
import { skills } from '@/data/skills'
import { SkillIcon } from '@/components/ui/SkillIcon'

const primary = skills.filter((s) => s.tier === 'primary')
const secondary = skills.filter((s) => s.tier === 'secondary')

export function Skills() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <Reveal className="rule pt-6">
          <SectionTag>the-stack</SectionTag>
        </Reveal>
        <Reveal y={28} blur>
          <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.96] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)]">
            Tools I reach for
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
            Deep in the React, Next.js, and TypeScript world, comfortable across the
            wider frontend stack.
          </p>
        </Reveal>
      </div>

      <style>{`
        @keyframes skillsMarqueeRight { 0% { transform: translateX(0); } 100% { transform: translateX(-10%); } }
        @keyframes skillsMarqueeLeft { 0% { transform: translateX(-10%); } 100% { transform: translateX(0); } }
        .skills-row-primary { animation: skillsMarqueeRight 10s linear infinite; }
        .skills-row-secondary { animation: skillsMarqueeLeft 14s linear infinite; }
        .skills-marquee:hover .skills-row-primary,
        .skills-marquee:hover .skills-row-secondary { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .skills-row-primary, .skills-row-secondary { animation: none; }
        }
      `}</style>

      <div className="skills-marquee relative mt-12 overflow-hidden lg:mt-16">
        {/* Primary row — scrolls right */}
        <div className="mb-4 flex skills-row-primary">
          {Array(10)
            .fill(primary)
            .flat()
            .map((skill, i) => (
              <div
                key={`p-${skill.name}-${i}`}
                className="group mx-3 flex shrink-0 items-center gap-3.5 rounded-2xl border border-line bg-[color-mix(in_oklab,var(--color-overlay)_3%,transparent)] px-5 py-3.5"
              >
                <span className="grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-110">
                  <SkillIcon skill={skill} size="primary" />
                </span>
                <span className="whitespace-nowrap text-base font-semibold uppercase text-text-secondary transition-colors duration-300 group-hover:text-text-heading lg:text-lg">
                  {skill.label}
                </span>
              </div>
            ))}
        </div>

        {/* Secondary row — scrolls left */}
        <div className="flex skills-row-secondary">
          {Array(10)
            .fill(secondary)
            .flat()
            .map((skill, i) => (
              <div
                key={`s-${skill.name}-${i}`}
                className="group mx-2.5 flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-[color-mix(in_oklab,var(--color-overlay)_2%,transparent)] px-3.5 py-2.5"
              >
                <span className="grayscale transition duration-500 group-hover:grayscale-0">
                  <SkillIcon skill={skill} size="secondary" />
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                  {skill.label}
                </span>
              </div>
            ))}
        </div>

        {/* Edge fades — match the section band */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-secondary to-transparent lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-secondary to-transparent lg:w-32" />
      </div>
    </div>
  )
}
