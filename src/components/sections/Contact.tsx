'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { siteConfig } from '@/data/site'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
} as const

export function Contact() {
  const reduced = useReducedMotion()
  const initial = reduced ? false : ('hidden' as const)

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={initial}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <GradientLabel tracking="0.26em">{siteConfig.contact.eyebrow}</GradientLabel>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-6 text-5xl sm:text-6xl lg:text-[6.5rem] font-bold text-text-heading leading-[0.92]"
        >
          Need a senior frontend{' '}
          <span
            className="bg-linear-to-r from-accent to-accent-soft bg-clip-text text-transparent text-[4rem] sm:text-[7rem]"
            style={{
              fontFamily: '"PP Playground", cursive',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            contractor?
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-lg lg:text-xl text-text-secondary max-w-2xl leading-relaxed font-body"
        >
          {siteConfig.contact.body}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${siteConfig.email}?subject=Contract%20opportunity%20—%20${encodeURIComponent(
              siteConfig.name,
            )}`}
            className="font-mono text-sm tracking-wider! px-7 py-3.5 rounded-full bg-accent text-white hover:brightness-110 transition-all"
          >
            {siteConfig.contact.primaryCta}
          </a>
          <br className="sm:hidden" />
          <a
            href={siteConfig.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-secondary-cta font-mono text-sm tracking-wider! px-7 py-3.5 rounded-full border text-text-secondary hover:text-text-heading"
          >
            {siteConfig.contact.secondaryCta}
          </a>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-mono text-xs tracking-wider uppercase text-text-muted"
        >
          {siteConfig.availability}
        </motion.p>
      </motion.div>
    </div>
  )
}
