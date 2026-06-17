'use client'

import { createElement } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease, inView } from '@/lib/motion'

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

/**
 * Signature heading entrance: words rise out of a clip mask, staggered.
 * Reads as one calm, deliberate motion. Collapses to static text under
 * prefers-reduced-motion (the words are always real DOM text — never gated).
 */
export function TextReveal({
  text,
  as = 'div',
  className,
  delay = 0,
  stagger = 0.055,
  mount = false,
}: {
  text: string
  as?: Tag
  className?: string
  delay?: number
  stagger?: number
  /** Play on mount instead of on scroll-into-view. Use above the fold so the
   *  text never depends on a scroll trigger that won't fire (headless, hidden tabs). */
  mount?: boolean
}) {
  const reduced = useReducedMotion()
  if (reduced) return createElement(as, { className }, text)

  const words = text.split(' ')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = motion[as] as any

  const trigger = mount
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: inView }

  return (
    <Comp
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word: string, i: number) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '115%', opacity: 0 },
              visible: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: ease.out } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Comp>
  )
}
