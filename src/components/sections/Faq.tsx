'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { TextReveal } from '@/components/motion/TextReveal'
import { ease } from '@/lib/motion'
import { faqs } from '@/data/faq'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <TextReveal as="h2" text="Before you write" className="display display-md" />

      <Stagger className="mt-10 max-w-3xl lg:mt-14" gap={0.06}>
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <StaggerItem key={f.q}>
              <div className="rule-top">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-sans text-lg font-medium text-ink lg:text-xl">{f.q}</span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-2xl font-light leading-none transition-transform duration-[400ms] ${
                        isOpen ? 'rotate-45 text-accent' : 'text-ink-mute'
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: ease.out }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-6 text-base leading-relaxed text-ink-body lg:text-lg">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          )
        })}
      </Stagger>
    </div>
  )
}
