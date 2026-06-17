/**
 * Shared motion language. Ease-out only (no bounce), calm + precise.
 * Every reveal builds on these so the whole page feels like one motion system.
 */

export const ease = {
  /** ease-out-expo — the house curve for entrances */
  out: [0.22, 1, 0.36, 1] as const,
  /** softer ease-out-quart — for larger travel */
  quart: [0.25, 1, 0.5, 1] as const,
  /** symmetric — for scrubbed / scroll-linked motion */
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: ease.out },
  },
} as const

/** Container that staggers its direct motion children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) =>
  ({
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }) as const

/** Default viewport config for whileInView — fire once, a little before fully in. */
export const inView = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' } as const
