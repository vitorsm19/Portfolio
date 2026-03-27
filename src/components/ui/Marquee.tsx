'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function Marquee({
  text,
  speed = 30,
  className = '',
}: {
  text: string
  speed?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const items = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="mx-8 whitespace-nowrap">
      {text}
    </span>
  ))
  return (
    <div className={`overflow-hidden py-5 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap tracking-[0.5em]!"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' as const }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  )
}
