'use client'

import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { clients } from '@/data/projects'

/**
 * The proof, immediately under the hero. Marks only, no captions: the names
 * are the credibility and a category label under each one adds nothing.
 *
 * Each mark is an alpha mask filled with a single ink colour, so five logos
 * from five different source files read as one row rather than five palettes.
 */
export function Clients() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <Stagger
        className="grid grid-cols-2 items-center gap-y-10 border-y border-line py-10 sm:grid-cols-3 lg:grid-cols-5 lg:py-12"
        gap={0.08}
      >
        {clients.map((client) => (
          <StaggerItem key={client.name} className="flex justify-center">
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={client.name}
              className="inline-flex"
            >
              <span
                aria-hidden
                className={`logo-mark ${client.size}`}
                style={{
                  aspectRatio: `${client.logo.width} / ${client.logo.height}`,
                  maskImage: `url(${client.logo.src})`,
                  WebkitMaskImage: `url(${client.logo.src})`,
                }}
              />
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
