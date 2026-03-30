'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientLabel } from '@/components/ui/GradientLabel'
import { services } from '@/data/services'
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

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatPrice(s: (typeof services)[number]) {
  if (s.pricing.type === 'custom') return 'Custom'
  const suffix = s.pricing.type === 'hourly' ? '/hr' : ''
  return `\u20AC${s.pricing.amount}${suffix}`
}

export function Services() {
  const reduced = useReducedMotion()
  const initial = reduced ? false : ('hidden' as const)

  return (
    <section aria-label="Services">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <GradientLabel tracking="0.2em">How I Can Help</GradientLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-5 text-5xl sm:text-6xl lg:text-[6rem] font-bold text-text-heading leading-[0.9] tracking-tight!"
          >
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
          </motion.h2>

          <motion.div variants={stagger} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => {
              const isFeatured = service.featured
              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  className={`group relative bg-bg-primary rounded-2xl p-7 lg:p-9 border transition-all duration-500 flex flex-col cursor-pointer ${
                    isFeatured
                      ? 'border-accent/30 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]'
                      : 'border-white/5 hover:border-white/12 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]'
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute top-5 right-5 text-[12px] font-medium pt-1.5 tracking-[0.2em]! uppercase bg-accent/15 text-accent px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}

                  <span className="text-5xl lg:text-6xl font-bold text-accent/20 leading-none select-none">
                    {pad(i + 1)}
                  </span>

                  <h3 className="text-xl lg:text-4xl font-bold text-text-heading mt-4 mb-1 group-hover:text-accent transition-colors duration-500 tracking-wider!">
                    {service.title}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-widest! text-accent/70 mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-base text-text-secondary leading-relaxed mb-5 tracking-wider! font-body">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.slice(0, 4).map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-text-secondary text-base tracking-wider! font-body"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-5 border-t border-white/6 flex items-center justify-between">
                    <span className="text-[12px] font-mono uppercase tracking-widest! text-text-muted">
                      {service.pricing.label}
                    </span>
                    <span className="text-2xl font-bold text-text-heading tracking-wider!">
                      {formatPrice(service)}
                    </span>
                  </div>

                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(service.title)}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 w-full py-3 text-base font-medium rounded-full border border-white/10 text-text-secondary hover:border-accent hover:text-accent transition-all duration-300 tracking-wider!"
                  >
                    Get in touch <span aria-hidden>&#8599;</span>
                  </a>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
