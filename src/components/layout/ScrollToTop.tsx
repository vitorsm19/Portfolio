'use client'

import { ArrowUpIcon } from '@/components/icons'

export function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-4 right-8 z-10 flex items-center justify-center rounded-full border border-accent bg-transparent text-text-primary cursor-pointer transition-all duration-300 hover:bg-accent hover:scale-105 w-11 h-11 lg:w-8 lg:h-8"
    >
      <ArrowUpIcon size={16} />
    </button>
  )
}
