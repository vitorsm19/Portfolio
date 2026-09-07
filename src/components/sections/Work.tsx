'use client'

import Image from 'next/image'
import { Reveal, Wipe, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { TextReveal } from '@/components/motion/TextReveal'
import { featuredProject, projects } from '@/data/projects'

function TechRow({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      {tech.map((t) => (
        <li key={t} className="meta">
          {t}
        </li>
      ))}
    </ul>
  )
}

export function Work() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-12 items-end gap-x-8 gap-y-6">
        <TextReveal
          as="h2"
          text="Selected work"
          className="display display-md col-span-12 lg:col-span-7"
        />
        <Reveal className="col-span-12 lg:col-span-5 lg:pb-2">
          <p className="max-w-[40ch] text-lg leading-snug text-ink-body lg:ml-auto">
            Six years of platforms shipped with teams, not alone. These are the ones you can go
            and use right now.
          </p>
        </Reveal>
      </div>

      {/* Lead case: the strongest logo gets the full width, undimmed. */}
      <article className="mt-14 lg:mt-20">
        <a href={featuredProject.url} target="_blank" rel="noopener noreferrer" className="group block">
          <Wipe className="relative aspect-[16/10] overflow-hidden rounded-[2px] border border-line bg-paper-lift sm:aspect-[2/1] lg:aspect-[21/9]">
            <Image
              src={featuredProject.snippet}
              alt={`${featuredProject.title} platform interface`}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          </Wipe>

          <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-5 border-t border-line pt-6">
            <div className="col-span-12 lg:col-span-4">
              <h3 className="display display-sm inline-flex items-center gap-3">
                {featuredProject.title}
                <span className="text-2xl text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 lg:text-3xl">
                  &#8599;
                </span>
              </h3>
              <p className="meta mt-2">{featuredProject.role}</p>
            </div>

            <p className="col-span-12 max-w-[52ch] text-base leading-relaxed text-ink-body lg:col-span-5">
              {featuredProject.description}
            </p>

            <div className="col-span-12 flex flex-col gap-3 lg:col-span-3">
              <ul className="space-y-1.5">
                {featuredProject.facts.map((f) => (
                  <li key={f} className="text-sm text-ink">
                    {f}
                  </li>
                ))}
              </ul>
              <TechRow tech={featuredProject.tech} />
            </div>
          </div>
        </a>
      </article>

      {/* The rest, image-led, two up. */}
      <Stagger className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24" gap={0.1}>
        {projects.map((p) => (
          <StaggerItem key={p.name}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-line bg-paper-lift">
                {p.snippet ? (
                  <Image
                    src={p.snippet}
                    alt={`${p.title} interface`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-paper-deep p-12">
                    <Image
                      src={p.logo}
                      alt={`${p.title} logo`}
                      className="client-mark h-auto w-2/5 max-w-[220px] object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
                <div>
                  <h3 className="display display-sm">{p.title}</h3>
                  <p className="meta mt-1.5">{p.role}</p>
                </div>
                <span className="mt-1 text-ink-mute transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                  &#8599;
                </span>
              </div>

              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-body">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                {p.facts.map((f) => (
                  <span key={f} className="text-sm text-ink">
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-3">
                <TechRow tech={p.tech} />
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
