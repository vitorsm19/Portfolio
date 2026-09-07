'use client'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { TextReveal } from '@/components/motion/TextReveal'
import { process } from '@/data/engagements'

/**
 * The heading holds while the sequence scrolls past it. The ordinals are the
 * only numbered system on the page, because this is the only real sequence.
 */
export function Process() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <TextReveal as="h2" text="From first call to shipping" className="display display-md" />
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[34ch] text-lg leading-snug text-ink-body">
                Contractor delivery without the agency overhead. Predictable, and written down.
              </p>
            </Reveal>
          </div>
        </div>

        <Stagger className="col-span-12 lg:col-span-7 lg:col-start-6" gap={0.1}>
          {process.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="rule-top grid grid-cols-[auto_1fr] gap-x-6 py-7 lg:gap-x-10 lg:py-9">
                <span
                  aria-hidden
                  className="font-display text-3xl font-bold leading-none text-accent tabular-nums lg:text-4xl"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="display display-sm">{step.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-ink-body lg:text-lg">
                    {step.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  )
}
