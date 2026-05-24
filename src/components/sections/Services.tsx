'use client'

import { GradientLabel } from '@/components/ui/GradientLabel'
import { services } from '@/data/services'
import { smoothScrollTo } from '@/lib/smooth-scroll'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function scrollToContact() {
  const el = document.getElementById('contact')
  if (!el) return
  const target = el.getBoundingClientRect().top + window.scrollY - 80
  smoothScrollTo(target, 1200)
}

function formatPrice(s: (typeof services)[number]) {
  if (s.pricing.type === 'custom') return 'Custom'
  const suffix = s.pricing.type === 'hourly' ? '/hr' : ''
  return `\u20AC${s.pricing.amount}${suffix}`
}

export function Services() {
  return (
    <section aria-label="Services">
      <div className="max-w-6xl mx-auto">
        <div>
          <GradientLabel tracking="0.2em">How I Can Help</GradientLabel>
        </div>

        <h2 className="mt-5 text-5xl sm:text-6xl lg:text-[6rem] font-bold text-text-heading leading-[0.9] tracking-tight!">
          <span
            className="text-7xl sm:text-6xl lg:text-8xl tracking-tight!"
            style={{
              fontFamily: '"PP Playground", cursive',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            Services
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const isFeatured = service.featured
            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl p-7 lg:p-9 border flex flex-col cursor-pointer ${
                  isFeatured ? 'service-card-featured' : 'service-card'
                }`}
              >
                {isFeatured && (
                  <span className="service-card-badge absolute top-5 right-5 text-[12px] font-medium pt-1.5 tracking-[0.2em]! uppercase px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}

                <span className="service-card-number text-5xl lg:text-6xl font-bold leading-none select-none">
                  {pad(i + 1)}
                </span>

                <h3 className="text-xl lg:text-4xl font-bold text-text-heading mt-4 mb-1 group-hover:text-accent transition-colors duration-500 tracking-wider!">
                  {service.title}
                </h3>
                <p className="service-card-subtitle text-[11px] font-mono uppercase tracking-widest! mb-4">
                  {service.subtitle}
                </p>
                <p className="text-base text-text-secondary leading-relaxed mb-5 tracking-wider! font-[family-name:var(--font-body)]">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {service.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-text-secondary text-base tracking-wider! font-[family-name:var(--font-body)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="service-card-divider pt-5 border-t flex items-center justify-between">
                  <span className="text-[12px] font-mono uppercase tracking-widest! text-text-muted">
                    {service.pricing.label}
                  </span>
                  <span className="text-2xl font-bold text-text-heading tracking-wider!">
                    {formatPrice(service)}
                  </span>
                </div>

                <button
                  onClick={scrollToContact}
                  className="contact-secondary-cta mt-5 inline-flex items-center justify-center gap-2 w-full py-3 text-base font-medium rounded-full border text-text-secondary hover:text-accent tracking-wider! cursor-pointer"
                >
                  Get in touch <span aria-hidden>&#8599;</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
