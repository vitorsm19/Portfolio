'use client'

import { Reveal } from '@/components/motion/Reveal'
import { TextReveal } from '@/components/motion/TextReveal'
import { Magnetic } from '@/components/motion/Magnetic'
import { siteConfig, CTA } from '@/data/site'

/**
 * The conversion moment gets the loudest surface on the page. One accent
 * block, one primary action, and the address written out so nobody has to
 * hunt for it.
 */
export function Contact() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    'Frontend contract enquiry',
  )}`

  return (
    <div className="on-accent bg-accent text-on-accent">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <TextReveal
          as="h2"
          text={siteConfig.contact.headline}
          className="display display-lg max-w-[14ch] text-on-accent"
        />

        <div className="mt-12 grid grid-cols-12 items-start gap-x-8 gap-y-10 lg:mt-16">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="max-w-[46ch] text-lg leading-relaxed lg:text-xl">
              {siteConfig.contact.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={0.22}>
                <a href={mailto} className="btn btn-invert">
                  {CTA.contact}
                </a>
              </Magnetic>
              <a
                href={siteConfig.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <dl className="space-y-4">
              <div className="border-t border-[color-mix(in_oklab,currentColor_32%,transparent)] pt-4">
                <dt className="meta">
                  Email
                </dt>
                <dd className="mt-1">
                  <a href={mailto} className="link-wipe text-base break-all">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="border-t border-[color-mix(in_oklab,currentColor_32%,transparent)] pt-4">
                <dt className="meta">
                  Based
                </dt>
                <dd className="mt-1 text-base">Barcelona, remote across Europe</dd>
              </div>
              <div className="border-t border-[color-mix(in_oklab,currentColor_32%,transparent)] pt-4">
                <dt className="meta">
                  Status
                </dt>
                <dd className="mt-1 text-base">{siteConfig.availability}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
