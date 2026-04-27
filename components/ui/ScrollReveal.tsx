'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type AnimationType = 'fadeUp' | 'slideLeft' | 'slideRight' | 'scale'

const HIDDEN = {
  fadeUp:    { opacity: 0, y: 36 },
  slideLeft: { opacity: 0, x: -48 },
  slideRight:{ opacity: 0, x: 48 },
  scale:     { opacity: 0, scale: 0.9 },
} satisfies Record<AnimationType, object>

const VISIBLE = {
  fadeUp:    { opacity: 1, y: 0 },
  slideLeft: { opacity: 1, x: 0 },
  slideRight:{ opacity: 1, x: 0 },
  scale:     { opacity: 1, scale: 1 },
} satisfies Record<AnimationType, object>

const DURATION: Record<AnimationType, number> = {
  fadeUp: 0.6, slideLeft: 0.55, slideRight: 0.55, scale: 0.5,
}

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  className?: string
  threshold?: number
}

export default function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  className,
  threshold = 0.12,
}: ScrollRevealProps) {
  return (
    <motion.div
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initial={HIDDEN[animation] as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      whileInView={VISIBLE[animation] as any}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: DURATION[animation], ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
