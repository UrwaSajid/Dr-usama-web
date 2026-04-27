import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface HalftoneCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'coral' | 'dense'
  noBorder?: boolean
}

export default function HalftoneCard({
  children,
  className,
  variant = 'default',
  noBorder = false,
}: HalftoneCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white overflow-hidden',
        !noBorder && 'ink-border',
        variant === 'default' && 'halftone',
        variant === 'coral'   && 'halftone halftone-coral',
        variant === 'dense'   && 'halftone halftone-dense',
        className
      )}
    >
      {children}
    </div>
  )
}
