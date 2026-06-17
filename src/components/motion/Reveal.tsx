'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { ease, inView, stagger } from '@/lib/motion'

type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: React.ReactNode
  delay?: number
  y?: number
  blur?: boolean
  amount?: number
}

/** Single block that fades + rises (optionally de-blurs) when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  blur = false,
  amount,
  className,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ ...inView, amount: amount ?? inView.amount }}
      transition={{ duration: 0.9, ease: ease.out, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers any <StaggerItem> descendants on scroll-in. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  amount,
}: {
  children: React.ReactNode
  className?: string
  gap?: number
  delay?: number
  amount?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...inView, amount: amount ?? inView.amount }}
    >
      {children}
    </motion.div>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
