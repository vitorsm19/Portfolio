'use client'

import { createElement, Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease, inView } from '@/lib/motion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'

/**
 * The page's signature entrance: words rise out of a clip mask, staggered, so
 * a heading arrives as one deliberate movement instead of a fade.
 *
 * The words are always real DOM text, never gated on JS, and the whole thing
 * collapses to static under prefers-reduced-motion.
 */
export function TextReveal({
  text,
  accentSuffix,
  as = 'div',
  className,
  delay = 0,
  stagger = 0.06,
  mount = false,
}: {
  text: string
  /** Trailing glyph in the accent colour. The red full stop is the brand mark. */
  accentSuffix?: string
  as?: Tag
  className?: string
  delay?: number
  stagger?: number
  /** Play on mount rather than on scroll-in. Use above the fold. */
  mount?: boolean
}) {
  const reduced = useReducedMotion()
  const label = accentSuffix ? `${text}${accentSuffix}` : text

  if (reduced) {
    return createElement(
      as,
      { className },
      text,
      accentSuffix ? <span className="text-accent">{accentSuffix}</span> : null,
    )
  }

  const words = text.split(' ')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = motion[as] as any

  const trigger = mount
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: inView }

  const wordVariants = {
    hidden: { y: '112%' },
    visible: { y: '0%', transition: { duration: 0.9, ease: ease.glide } },
  }

  return (
    <Comp
      className={className}
      aria-label={label}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word: string, i: number) => (
        // The inter-word space is a sibling of the mask, never a child of it:
        // inside `overflow-hidden` an inline-block it collapses and the words
        // run together.
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          >
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
              {i === words.length - 1 && accentSuffix ? (
                <span className="text-accent">{accentSuffix}</span>
              ) : null}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Comp>
  )
}
