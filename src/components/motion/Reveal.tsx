'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { ease, inView, stagger } from '@/lib/motion'

type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: React.ReactNode
  delay?: number
  y?: number
}

/** Block that rises into place on scroll-in. The page's default entrance. */
export function Reveal({ children, delay = 0, y = 18, className, ...rest }: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.8, ease: ease.out, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Uncovers its child top-to-bottom behind a curtain that scales away.
 *
 * Deliberately transform-only: Framer will not interpolate the `clipPath`
 * inset this used to animate, and silently leaves the element masked. `curtain`
 * must match the section background or the reveal ends on a flash of the
 * wrong colour.
 */
export function Wipe({
  children,
  delay = 0,
  className,
  curtain = 'bg-paper',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  curtain?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <div className={`relative ${className ?? ''}`}>
      {children}
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-10 origin-bottom ${curtain}`}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={inView}
        transition={{ duration: 0.95, ease: ease.glide, delay }}
      />
    </div>
  )
}

export function Stagger({
  children,
  className,
  gap = 0.07,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  gap?: number
  delay?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </motion.div>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
