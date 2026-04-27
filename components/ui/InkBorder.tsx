import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface InkBorderProps {
  children: ReactNode
  variant?: 'default' | 'coral' | 'sm'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function InkBorder({
  children,
  variant = 'default',
  className,
  as: Tag = 'div',
}: InkBorderProps) {
  const classes = cn(
    variant === 'default' && 'ink-border',
    variant === 'coral'   && 'ink-border-coral',
    variant === 'sm'      && 'ink-border-sm',
    className
  )

  return <Tag className={classes}>{children}</Tag>
}
