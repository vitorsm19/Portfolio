'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { services } from '@/data/services'
import { siteConfig } from '@/data/site'

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0, 0.71, 0.2, 1.01] as const },
  },
}

export function Services() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-bg-primary py-20 px-6 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            What I offer
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-heading leading-tight">
            Let&apos;s build something
            <br />
            <span className="gradient-text-accent">extraordinary</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a landing page or a full-scale platform, I deliver production-grade
            solutions that look stunning and perform flawlessly.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-5"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={prefersReducedMotion ? undefined : cardReveal}
              className={`group relative flex flex-col rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                service.featured
                  ? 'border-accent/40 bg-accent/[0.03]'
                  : 'border-text-muted/20 bg-bg-secondary/50 hover:border-text-muted/40'
              }`}
            >
              {/* Featured badge */}
              {service.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg-accent text-white text-[10px] uppercase tracking-[0.15em] font-bold px-4 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              {/* Card content */}
              <div className="flex flex-col flex-1 p-7 lg:p-6 xl:p-7">
                {/* Title block */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-heading mb-1">{service.title}</h3>
                  <p className="text-text-secondary text-sm">{service.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-text-secondary/80 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className="w-4 h-4 mt-0.5 text-accent shrink-0"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.5 4.5L6.5 11.5L2.5 7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-text-primary/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="mt-auto pt-6 border-t border-text-muted/10">
                  {service.pricing.type === 'custom' ? (
                    <>
                      <span className="text-2xl font-bold text-text-heading">Custom</span>
                      <p className="text-text-secondary text-xs mt-1">
                        {service.pricing.label}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-text-secondary text-xs uppercase tracking-wider">
                          {service.pricing.label}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-text-heading">
                          &euro;{service.pricing.amount}
                        </span>
                        {service.pricing.type === 'hourly' && (
                          <span className="text-text-secondary text-sm">/hr</span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                  className={`mt-5 flex items-center justify-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    service.featured
                      ? 'gradient-bg-accent text-white hover:opacity-90 hover:scale-[1.02]'
                      : 'border border-text-muted/30 text-text-primary hover:border-accent hover:text-accent'
                  }`}
                >
                  Get in touch
                </a>
              </div>

              {/* Hover glow for featured card */}
              {service.featured && (
                <div className="absolute inset-0 rounded-2xl gradient-bg-accent opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-text-muted text-sm mt-12"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          All prices are estimates. Final pricing depends on project scope and complexity.
        </motion.p>
      </div>
    </section>
  )
}
