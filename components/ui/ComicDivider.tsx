import { cn } from '@/lib/cn'

interface ComicDividerProps {
  label?: string
  variant?: 'default' | 'coral'
  className?: string
}

export default function ComicDivider({ label, variant = 'default', className }: ComicDividerProps) {
  return (
    <div className={cn('ink-divider my-8', variant === 'coral' && 'ink-divider-coral', className)}>
      {label && (
        <span className="font-comic text-sm tracking-widest text-ink-500 px-2 uppercase">
          {label}
        </span>
      )}
    </div>
  )
}
