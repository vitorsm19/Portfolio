'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/site'
import { LinkedInIcon, GitHubIcon } from '@/components/icons'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Contact() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-bg-primary py-16 px-6 lg:py-24">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-text-heading mb-6"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {siteConfig.contact.heading}
        </motion.h2>

        <motion.p
          className="text-text-secondary text-lg lg:text-xl max-w-[50ch] mb-10"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {siteConfig.contact.body}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href={siteConfig.linkedin.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:underline flex items-center gap-2 transition-colors"
          >
            <LinkedInIcon size={20} />
            LinkedIn
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:underline transition-colors"
          >
            {siteConfig.email}
          </a>

          <a
            href={`tel:${siteConfig.phone}`}
            className="text-accent hover:underline transition-colors"
          >
            {siteConfig.phone}
          </a>

          <a
            href={siteConfig.github.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:underline flex items-center gap-2 transition-colors"
          >
            <GitHubIcon size={20} />
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
