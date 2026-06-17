'use client'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SectionTag } from '@/components/ui/SectionTag'
import { GhostText } from '@/components/ui/GhostText'

const facts: { label: string; value: string }[] = [
  { label: 'Based', value: 'Barcelona, remote across Europe' },
  { label: 'Experience', value: '6+ years, product teams' },
  { label: 'Core stack', value: 'React · Next.js · TypeScript' },
  { label: 'Availability', value: 'Open to new projects' },
]

export function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12">
      <Reveal className="rule pt-6">
        <SectionTag>about</SectionTag>
      </Reveal>

      <Reveal y={28} blur>
        <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.96] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)]">
          Frontend you can hand over and{' '}
          <span className="signature text-accent">trust</span>.
        </h2>
      </Reveal>

      <div className="mt-10 lg:mt-16 grid lg:grid-cols-3 gap-10 lg:gap-14">
        <Stagger className="lg:col-span-2 space-y-6" gap={0.12}>
          <StaggerItem>
            <p className="text-lg lg:text-xl leading-relaxed text-text-secondary">
              <GhostText
                text="I'm Vitor, a senior frontend developer with 6+ years building and maintaining high-performance products for global brands across sports, e-commerce, SaaS, and tech."
                highlights={['senior frontend developer', '6+ years', 'sports, e-commerce, SaaS, and tech']}
              />
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lg lg:text-xl leading-relaxed text-text-secondary">
              <GhostText
                text="I work the way a good teammate does: I ramp up fast inside your stack and rituals, communicate clearly, and take real ownership of frontend delivery, from architecture and design systems to performance and the small details."
                highlights={['communicate clearly', 'take real ownership of frontend delivery']}
              />
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lg lg:text-xl leading-relaxed text-text-secondary">
              <GhostText
                text="I work mainly in React, Next.js, and TypeScript. I can drop into an existing team, translate Figma into production-ready interfaces, and help you ship faster with clean, maintainable code. I work remotely across Europe and I'm in it for the long term."
                highlights={['React, Next.js, and TypeScript', 'clean, maintainable code']}
              />
            </p>
          </StaggerItem>
        </Stagger>

        <Stagger className="space-y-0" gap={0.08}>
          {facts.map((f) => (
            <StaggerItem key={f.label}>
              <div className="rule py-4 flex flex-col gap-0.5">
                <span className="text-xs text-text-muted">{f.label}</span>
                <span className="text-base text-text-primary">{f.value}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  )
}
