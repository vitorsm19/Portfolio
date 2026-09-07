'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { TextReveal } from '@/components/motion/TextReveal'
import { Magnetic } from '@/components/motion/Magnetic'
import { scrollToId } from '@/lib/lenis'
import { siteConfig, CTA } from '@/data/site'
import { ease } from '@/lib/motion'

export function Hero() {
  const reduced = useReducedMotion()
  const { headline, lede, rail } = siteConfig.hero

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: ease.out, delay },
        }

  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[100dvh] flex-col justify-between px-5 pt-24 pb-10 sm:px-8 lg:px-12 lg:pt-24"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-14 lg:gap-20">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 lg:col-span-9">
            <TextReveal
              as="h1"
              mount
              delay={0.15}
              text={headline}
              accentSuffix="."
              className="display display-lg"
            />
          </div>

          {/* Qualifying facts, in the margin where a spec block belongs. */}
          <motion.dl
            {...enter(0.75)}
            className="col-span-12 self-end lg:col-span-3 lg:border-l lg:border-line lg:pl-6"
          >
            {rail.map((item) => (
              // Label and value share a row on small screens so the rail does
              // not push the hero's CTAs off the fold.
              <div
                key={item.label}
                className="rule-top flex items-baseline justify-between gap-4 py-2.5 lg:block lg:py-3"
              >
                <dt className="meta shrink-0">{item.label}</dt>
                <dd className="text-right text-sm text-ink lg:mt-1 lg:text-left">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="grid grid-cols-12 items-end gap-x-8 gap-y-8 border-t border-line pt-8">
          <motion.p
            {...enter(0.55)}
            className="col-span-12 max-w-[46ch] text-lg leading-snug text-ink-body sm:text-xl lg:col-span-7"
          >
            {lede}
          </motion.p>

          <motion.div
            {...enter(0.65)}
            className="col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:justify-end"
          >
            <Magnetic strength={0.22}>
              <button onClick={() => scrollToId('contact')} className="btn btn-solid cursor-pointer">
                {CTA.contact}
              </button>
            </Magnetic>
            <button onClick={() => scrollToId('work')} className="btn btn-line cursor-pointer">
              {CTA.work}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
