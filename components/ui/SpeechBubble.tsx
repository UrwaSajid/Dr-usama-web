import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface SpeechBubbleProps {
  children: ReactNode
  className?: string
  tailSide?: 'left' | 'right'
}

export default function SpeechBubble({
  children,
  className,
  tailSide = 'left',
}: SpeechBubbleProps) {
  return (
    <div
      className={cn(
        'speech-bubble relative',
        tailSide === 'right' && '[&::after]:left-auto [&::after]:right-7 [&::before]:left-auto [&::before]:right-[29px]',
        className
      )}
    >
      {children}
    </div>
  )
}
