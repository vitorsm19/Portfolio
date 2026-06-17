'use client'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SectionTag } from '@/components/ui/SectionTag'
import { Magnetic } from '@/components/motion/Magnetic'
import { services } from '@/data/services'
import { siteConfig } from '@/data/site'
import { scrollToId } from '@/lib/lenis'

function formatPrice(s: (typeof services)[number]) {
  if (s.pricing.type === 'custom') return 'Custom'
  const suffix = s.pricing.type === 'hourly' ? '/hr' : ''
  return `€${s.pricing.amount}${suffix}`
}

export function Services() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-12">
      <Reveal className="rule pt-6">
        <SectionTag>services</SectionTag>
      </Reveal>

      <Reveal y={28} blur>
        <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.96] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)]">
          What I can own
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
          Four ways teams bring me in. Pick the one that matches where you are,
          or tell me what you need and we&apos;ll shape it together.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16" gap={0.1}>
        {services.map((service) => (
          <StaggerItem key={service.id} className="h-full">
            <div className="surface flex h-full flex-col rounded-2xl p-7 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-text-heading lg:text-2xl">
                  {service.title}
                </h3>
                {service.featured && (
                  <span className="meta-tag shrink-0 rounded-full border-accent/30 px-2.5 py-0.5 text-[11px] text-accent">
                    Most common
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-accent">{service.subtitle}</p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {service.description}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {service.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-text-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="rule mt-6 flex items-center justify-between pt-5">
                <span className="text-xs text-text-muted">{service.pricing.label}</span>
                <span className="text-lg font-semibold text-text-heading">
                  {formatPrice(service)}
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button
              onClick={() => scrollToId('contact')}
              className="btn-primary cursor-pointer rounded-full px-6 py-3 text-sm font-medium"
            >
              Start a conversation
            </button>
          </Magnetic>
          <span className="text-sm text-text-muted">{siteConfig.availability}</span>
        </div>
      </Reveal>
    </div>
  )
}
