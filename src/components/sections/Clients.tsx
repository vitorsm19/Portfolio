'use client'

import Image from 'next/image'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { clients } from '@/data/projects'

/**
 * The proof, immediately under the hero. Marks only, no captions: the names
 * are the credibility and a category label under each one adds nothing.
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
              className="client-mark inline-flex"
            >
              <Image
                src={client.logo}
                alt={client.name}
                height={56}
                className={`${client.size} w-auto object-contain`}
              />
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
