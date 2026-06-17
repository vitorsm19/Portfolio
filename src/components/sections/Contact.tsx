'use client'

import { Reveal } from '@/components/motion/Reveal'
import { Magnetic } from '@/components/motion/Magnetic'
import { SectionTag } from '@/components/ui/SectionTag'
import { siteConfig } from '@/data/site'

export function Contact() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    'Contract opportunity: ' + siteConfig.name,
  )}`

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-12">
      <Reveal className="rule pt-6">
        <SectionTag>contact</SectionTag>
      </Reveal>

      <Reveal y={28} blur>
        <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,7vw,5.5rem)]">
          Let&apos;s <span className="signature text-accent">talk</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-6 max-w-xl text-lg lg:text-xl leading-relaxed text-text-secondary">
          {siteConfig.contact.body}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href={mailto}
              className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
            >
              Email me
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={siteConfig.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost rounded-full px-6 py-3 text-sm font-medium"
            >
              LinkedIn
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-6 text-sm text-text-muted">{siteConfig.availability}</p>
      </Reveal>
    </div>
  )
}
