'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { scrollToId, scrollToY } from '@/lib/lenis'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
] as const

export function Navbar() {
  const reduced = useReducedMotion()

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={reduced ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="nav-pill fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 sm:gap-6 rounded-full px-5 sm:px-6 py-2.5"
    >
      <button
        onClick={() => scrollToY(0)}
        className="link-underline text-sm font-semibold text-text-heading cursor-pointer"
      >
        vitor<span className="text-accent">.</span>
      </button>

      <div className="hidden sm:flex items-center gap-5">
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollToId(l.id)}
            className="link-underline text-sm text-text-secondary hover:text-text-heading transition-colors cursor-pointer"
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="nav-divider flex items-center gap-2 border-l pl-4 sm:pl-5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-status-online opacity-70 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-status-online" />
        </span>
        <span className="hidden sm:inline text-xs text-text-secondary">Available</span>
      </div>

      <div className="nav-divider flex items-center border-l pl-3 sm:pl-4">
        <ThemeToggle />
      </div>
    </motion.nav>
  )
}
