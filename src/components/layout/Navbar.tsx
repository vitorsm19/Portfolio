'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { smoothScrollTo } from '@/lib/smooth-scroll'

const NAV_LINKS = ['About', 'Work', 'Services', 'Contact'] as const

function scrollTo(section: string) {
  const el = document.getElementById(section.toLowerCase())
  if (!el) return
  const target = el.getBoundingClientRect().top + window.scrollY - 80
  smoothScrollTo(target, 1200)
}

export function Navbar() {
  const reduced = useReducedMotion()

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={reduced ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-7 py-3.5 bg-bg-primary/70 backdrop-blur-xl rounded-full border border-white/6 shadow-2xl"
    >
      <button
        onClick={() => smoothScrollTo(0, 1200)}
        className="text-base font-bold text-text-heading tracking-wider! leading-none pt-1 cursor-pointer hover:text-accent transition-colors"
      >
        VM
      </button>

      <div className="hidden sm:flex items-center gap-5 pt-1">
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="text-sm font-medium text-text-secondary hover:text-text-heading transition-colors uppercase tracking-widest! cursor-pointer leading-none"
          >
            {link}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-1 pl-5 border-l border-white/8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="text-sm text-text-secondary leading-none tracking-wider! font-light! font-body">
          Available
        </span>
      </div>
    </motion.nav>
  )
}
