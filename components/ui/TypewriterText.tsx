'use client'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/cn'

interface TypewriterTextProps {
  texts: string[]
  className?: string
  speed?: number
  cursorChar?: string
}

export default function TypewriterText({
  texts,
  className,
  speed = 60,
  cursorChar = '|',
}: TypewriterTextProps) {
  const displayed = useTypewriter(texts, { speed })

  return (
    <span className={cn('inline', className)}>
      {displayed}
      <span className="animate-pulse text-coral-400 ml-0.5">{cursorChar}</span>
    </span>
  )
}
