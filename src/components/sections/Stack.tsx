'use client'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SkillIcon } from '@/components/ui/SkillIcon'
import { skills } from '@/data/skills'

const primary = skills.filter((s) => s.tier === 'primary')
const secondary = skills.filter((s) => s.tier === 'secondary')

/**
 * Closing beat of the About section, not a section of its own. The daily
 * stack gets marks; everything else is a plain list, because a logo for
 * every language a contractor has touched reads as padding.
 */
export function Stack() {
  return (
    <div className="mx-auto mt-20 max-w-[1400px] px-5 sm:px-8 lg:mt-28 lg:px-12">
      <Reveal>
        <h3 className="display display-sm border-t border-line pt-8">What I reach for</h3>
      </Reveal>

      <Stagger className="mt-8 flex flex-wrap gap-x-10 gap-y-6" gap={0.06}>
        {primary.map((skill) => (
          <StaggerItem key={skill.name}>
            <div className="flex items-center gap-3">
              <SkillIcon skill={skill} size="secondary" />
              <span className="font-display text-2xl font-bold leading-none tracking-[-0.012em] text-ink lg:text-3xl">
                {skill.label}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
          {secondary.map((skill) => (
            <li key={skill.name} className="meta">
              {skill.label}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
