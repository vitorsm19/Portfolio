'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setCount(target)
      return
    }
    const steps = 36
    const inc = target / steps
    const interval = duration / steps
    let cur = 0
    const id = setInterval(() => {
      cur += inc
      if (cur >= target) {
        setCount(target)
        clearInterval(id)
      } else setCount(Math.floor(cur))
    }, interval)
    return () => clearInterval(id)
  }, [inView, target, duration, reduced])

  return { count, ref }
}
