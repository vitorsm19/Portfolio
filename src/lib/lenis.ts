import type Lenis from 'lenis'

/**
 * Module-level handle to the single Lenis instance created by <SmoothScroll/>.
 * Lets non-React call sites (nav, scroll-to-top) drive smooth scrolling without
 * threading context everywhere.
 */
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/** Smooth-scroll to an absolute Y. Falls back to native if Lenis is off. */
export function scrollToY(y: number) {
  if (lenis) {
    lenis.scrollTo(y, { duration: 1.2 })
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

/** Smooth-scroll to an element id, accounting for the floating navbar. */
export function scrollToId(id: string, offset = -16) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 })
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
