'use client'

import Image from 'next/image'
import { Reveal, Wipe, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { TextReveal } from '@/components/motion/TextReveal'
import { siteConfig } from '@/data/site'
import aboutPic from '@/assets/about-pic.jpg'

export function About() {
  const { lede, body, facts } = siteConfig.about

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        {/* Portrait: the one place a face belongs, at a size worth looking at. */}
        <Wipe curtain="bg-paper-deep" className="col-span-12 sm:col-span-6 lg:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] border border-line bg-paper-lift">
            <Image
              src={aboutPic}
              alt="Vitor Mesquita"
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </div>
          <p className="meta mt-3">{siteConfig.name}</p>
        </Wipe>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <TextReveal as="h2" text={lede} className="display display-md" />

          <Stagger className="mt-8 space-y-5 lg:mt-10" gap={0.1}>
            {body.map((paragraph) => (
              <StaggerItem key={paragraph.slice(0, 24)}>
                <p className="max-w-[58ch] text-lg leading-relaxed text-ink-body">{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:mt-14">
              {facts.map((fact) => (
                <div key={fact.label} className="rule-top py-4">
                  <dt className="meta">{fact.label}</dt>
                  <dd className="mt-1 text-base text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
