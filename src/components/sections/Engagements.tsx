'use client'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { TextReveal } from '@/components/motion/TextReveal'
import { engagements } from '@/data/engagements'
import { siteConfig } from '@/data/site'

/**
 * Four ways in, on an asymmetric grid so nothing reads as a pricing table.
 * The lead offer is a solid accent block: it is the one place on the page
 * where the brand colour carries a whole surface.
 */
export function Engagements() {
  const [lead, ...rest] = engagements

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-12 items-end gap-x-8 gap-y-6">
        <TextReveal
          as="h2"
          text="How teams bring me in"
          className="display display-md col-span-12 lg:col-span-8"
        />
        <Reveal className="col-span-12 lg:col-span-4 lg:pb-2">
          <p className="max-w-[36ch] text-lg leading-snug text-ink-body lg:ml-auto">
            Pick the one closest to where you are. If none of them fit, describe the role and we
            will shape it.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid grid-cols-12 gap-5 lg:mt-20" gap={0.1}>
        <StaggerItem className="col-span-12 lg:col-span-7">
          <div className="on-accent flex h-full flex-col rounded-[14px] bg-accent-surface p-8 text-on-accent-surface lg:p-10">
            <div className="flex items-start justify-between gap-6">
              <h3 className="display display-sm text-on-accent-surface">{lead.title}</h3>
              <p className="shrink-0 text-right">
                <span className="meta block">From</span>
                <span className="font-display text-xl font-bold leading-none tracking-[-0.012em] opacity-75 lg:text-2xl">
                  <span className="text-[0.62em] opacity-80">{siteConfig.rate.symbol}</span>
                  {siteConfig.rate.amount}
                  <span className="text-[0.55em] opacity-80">{siteConfig.rate.unit}</span>
                </span>
              </p>
            </div>
            <p className="mt-4 max-w-[44ch] text-lg leading-relaxed">{lead.summary}</p>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {lead.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-current opacity-60" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        {rest.map((item, i) => (
          <StaggerItem
            key={item.id}
            className={
              i === 0 ? 'col-span-12 lg:col-span-5' : 'col-span-12 sm:col-span-6 lg:col-span-6'
            }
          >
            <div
              className={`panel panel-hover flex h-full flex-col p-8 lg:p-9 ${
                i === 1 ? 'bg-paper-deep bg-none' : ''
              }`}
            >
              <h3 className="display display-sm">{item.title}</h3>
              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-ink-body">
                {item.summary}
              </p>
              <ul className="mt-6 space-y-2">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink">
                    <span
                      aria-hidden
                      className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
