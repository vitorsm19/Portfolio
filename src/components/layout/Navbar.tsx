'use client'

import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { scrollToId, scrollToY } from '@/lib/lenis'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { CTA } from '@/data/site'

const LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Engagements', id: 'engagements' },
] as const

export function Navbar() {
  const [stuck, setStuck] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setStuck(y > 24))

  return (
    <header
      data-stuck={stuck}
      className="site-header fixed inset-x-0 top-0 z-50 h-16"
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
      >
        <button
          onClick={() => scrollToY(0)}
          className="cursor-pointer font-display text-xl font-bold uppercase leading-none tracking-tight text-ink"
        >
          Vitor Mesquita<span className="text-accent">.</span>
        </button>

        <div className="flex items-center gap-5 sm:gap-7">
          <div className="hidden items-center gap-6 sm:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="link-wipe cursor-pointer text-sm text-ink-body transition-colors hover:text-ink"
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToId('contact')}
            className="btn btn-solid btn-sm cursor-pointer"
          >
            {CTA.contact}
          </button>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
