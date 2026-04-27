'use client'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
  magnetic?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  magnetic = true,
  ...props
}: ButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } =
    useMagneticButton<HTMLButtonElement>()

  const base = 'inline-flex items-center justify-center gap-2 font-comic tracking-wider border-2 border-ink-900 transition-colors duration-200 relative overflow-hidden cursor-none select-none'

  const variants = {
    primary: 'bg-coral-400 text-white shadow-ink hover:bg-coral-600',
    outline: 'bg-transparent text-ink-900 shadow-ink hover:bg-coral-50',
    ghost:   'bg-transparent text-ink-700 border-transparent shadow-none hover:bg-ink-50',
    danger:  'bg-red-600 text-white border-red-800 shadow-[3px_3px_0_#991b1b] hover:bg-red-700',
  }

  const sizes = {
    sm: 'text-sm px-4 py-1.5 rounded',
    md: 'text-base px-6 py-2.5 rounded',
    lg: 'text-lg px-8 py-3.5 rounded',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button
      ref={magnetic ? ref : undefined}
      onMouseMove={magnetic ? handleMouseMove : undefined}
      onMouseLeave={magnetic ? handleMouseLeave : undefined}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}
