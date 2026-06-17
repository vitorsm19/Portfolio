'use client'

import { useState } from 'react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SectionTag } from '@/components/ui/SectionTag'
import { faqs } from '@/data/faq'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-12">
      <Reveal className="rule pt-6">
        <SectionTag>faq</SectionTag>
      </Reveal>

      <Reveal y={28} blur>
        <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.96] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)]">
          Questions, answered
        </h2>
      </Reveal>

      <Stagger className="mt-10 lg:mt-14" gap={0.07}>
        {faqs.map((f, i) => (
          <StaggerItem key={f.q}>
            <details open={open === i} className="group rule py-5">
              <summary
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(open === i ? null : i)
                }}
                className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden"
              >
                <span className="text-lg font-semibold text-text-heading lg:text-xl">{f.q}</span>
                <span className="shrink-0 text-2xl font-light leading-none text-text-muted transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg">
                {f.a}
              </p>
            </details>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
