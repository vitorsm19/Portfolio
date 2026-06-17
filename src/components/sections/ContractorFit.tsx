'use client'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SectionTag } from '@/components/ui/SectionTag'

const values: { title: string; body: string }[] = [
  {
    title: 'I own outcomes, not tickets.',
    body: 'Architecture, decisions, and the small details. You get a senior who thinks about the product, not just the task in front of them.',
  },
  {
    title: 'No surprises.',
    body: 'I over-communicate, flag risks early, and keep the work visible, so you always know where things stand.',
  },
  {
    title: 'Production quality by default.',
    body: 'Typed, tested, accessible, and fast. The kind of frontend you don’t have to babysit once I hand it over.',
  },
  {
    title: 'Easy to drop in.',
    body: 'I adapt to your stack, tools, and rituals and start contributing quickly, the way a good teammate would.',
  },
]

export function ContractorFit() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-12">
      <Reveal className="rule pt-6">
        <SectionTag>what-you-get</SectionTag>
      </Reveal>

      <Reveal y={28} blur>
        <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.96] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)]">
          What you can count on
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Whatever the project, this is how I show up.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:mt-16" gap={0.1}>
        {values.map((v) => (
          <StaggerItem key={v.title}>
            <div className="rule pt-6">
              <h3 className="text-xl font-semibold text-text-heading lg:text-2xl">{v.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary lg:text-lg">
                {v.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
