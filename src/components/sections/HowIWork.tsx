'use client'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SectionTag } from '@/components/ui/SectionTag'

const steps: { title: string; body: string }[] = [
  {
    title: 'A short fit call',
    body: '20 minutes to understand the role, the team, the stack, and the timeline. No pitch, just whether this is a good match.',
  },
  {
    title: 'Scope & availability',
    body: 'We agree on engagement type, start date, and weekly hours, written down clearly so nobody is guessing.',
  },
  {
    title: 'Contract & kickoff',
    body: 'Straightforward contract, NDA if needed, then a fast ramp-up inside your tools, repo, and rituals.',
  },
  {
    title: 'Embedded delivery',
    body: 'Tickets, PRs, reviews, standups. I work inside your team the way an employee would, and I over-communicate by default.',
  },
  {
    title: 'Weekly visibility, clean handoff',
    body: 'Regular check-ins, documented work, no surprises. You always know where things stand and what comes next.',
  },
]

export function HowIWork() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12">
      <Reveal className="rule pt-6">
        <SectionTag>working-together</SectionTag>
      </Reveal>

      <Reveal y={28} blur>
        <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.96] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)]">
          From first call to shipped
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-5 max-w-2xl text-lg text-text-secondary leading-relaxed">
          Premium contractor delivery without the agency overhead. Calm,
          communicative, and predictable, whether hourly, monthly, or dedicated.
        </p>
      </Reveal>

      <Stagger className="mt-12 lg:mt-16" gap={0.1}>
        {steps.map((step, i) => (
          <StaggerItem key={step.title}>
            <div className="rule grid grid-cols-[auto_1fr] gap-5 lg:gap-10 py-6 lg:py-7">
              <span className="font-sans text-2xl lg:text-3xl font-bold text-accent tabular-nums leading-none pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-text-heading">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-base lg:text-lg leading-relaxed text-text-secondary">
                  {step.body}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
