/**
 * One motion language for the page.
 *
 * Every entrance is a *reveal*, never a float: content is masked and then
 * uncovered, the way ink lands on a printed page. Ease-out only, no bounce,
 * no infinite loops. Motion exists to sequence attention, not to decorate.
 */

export const ease = {
  /** House curve for entrances. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Longer travel, softer landing. */
  glide: [0.25, 1, 0.5, 1] as const,
} as const

/** Fire once, slightly before the block is fully on screen. */
export const inView = { once: true, amount: 0.2, margin: '0px 0px -12% 0px' } as const

export const stagger = (staggerChildren = 0.07, delayChildren = 0) =>
  ({
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }) as const
