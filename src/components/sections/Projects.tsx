'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { SectionTag } from '@/components/ui/SectionTag'
import { projects } from '@/data/projects'

const pad = (n: number) => String(n).padStart(2, '0')

export function Projects() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-12">
      <Reveal className="rule pt-6">
        <SectionTag>selected-work</SectionTag>
      </Reveal>

      <Reveal y={28} blur>
        <h2 className="mt-8 lg:mt-12 font-sans font-bold text-text-heading leading-[0.96] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)]">
          Selected work
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
          Six years contributing to products used by large audiences, shipped with
          teams, not solo.
        </p>
      </Reveal>

      <div className="mt-14 grid lg:mt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Sticky media — desktop only. Crossfades to the project in view. */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div className="surface relative aspect-[4/3] overflow-hidden rounded-2xl">
              {projects.map((p, i) => {
                const isActive = i === active
                return (
                  <motion.div
                    key={p.name}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.05 }}
                    transition={{
                      duration: reduced ? 0 : isActive ? 0.5 : 1.1,
                      ease: isActive ? [0.22, 1, 0.36, 1] : 'linear',
                    }}
                    style={{ zIndex: isActive ? 2 : 1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={p.snippet}
                      alt={`${p.title} interface`}
                      fill
                      className="object-cover"
                      style={{ filter: 'brightness(0.55)' }}
                      sizes="45vw"
                    />
                    <div className="absolute left-5 top-5">
                      <Image
                        src={p.logo}
                        alt={`${p.title} logo`}
                        width={72}
                        height={72}
                        className="h-14 w-14 object-contain drop-shadow-xl"
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Project list */}
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <Reveal key={p.name}>
              <motion.a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.5, margin: '-30% 0px -45% 0px' }}
                className="group rule block py-8 lg:py-10"
              >
                {/* Mobile media */}
                <div className="surface relative mb-5 aspect-[16/10] overflow-hidden rounded-xl lg:hidden">
                  <Image
                    src={p.snippet}
                    alt={`${p.title} interface`}
                    fill
                    className="object-cover"
                    style={{ filter: 'brightness(0.6)' }}
                    sizes="100vw"
                  />
                  <div className="absolute left-4 top-4">
                    <Image
                      src={p.logo}
                      alt={`${p.title} logo`}
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-sm tabular-nums text-text-muted">{pad(i + 1)}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-semibold text-text-heading transition-colors group-hover:text-accent lg:text-3xl">
                        {p.title}
                      </h3>
                      <span className="text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                        &#8599;
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-accent">{p.role}</p>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
                      {p.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="meta-tag rounded-full px-2.5 py-0.5 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
