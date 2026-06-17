'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic hover — the wrapped element drifts toward the cursor and springs
 * back on leave. Subtle (low strength) to stay "quietly confident". Inert
 * under reduced motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 15, mass: 0.1 })
  const sy = useSpring(y, { stiffness: 160, damping: 15, mass: 0.1 })

  if (reduced) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className ?? ''}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
