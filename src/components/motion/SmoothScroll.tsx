'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '@/lib/lenis'

/**
 * Gentle inertial smooth-scroll (Lenis). Calm, not scroll-jacking — short
 * duration, light lerp. Disabled entirely under prefers-reduced-motion so the
 * page uses native scroll for anyone who asked for less movement.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out-cubic
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    setLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}
