'use client'

import { useState, useEffect } from 'react'
import { smoothScrollTo } from '@/lib/smooth-scroll'

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!showScrollTop) return null

  return (
    <button
      onClick={() => smoothScrollTo(0, 1200)}
      className="fixed bottom-6 right-6 z-40 w-9 h-9 rounded-full border border-white/8 bg-bg-primary/60 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-pointer animate-[fadeIn_0.3s_ease-out]"
      aria-label="Back to top"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
