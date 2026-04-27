import type { Resource } from '@/types/course'

interface LinkCardProps { resource: Resource }

const TYPE_LABELS: Record<string, { label: string; emoji: string }> = {
  link:  { label: 'External Link', emoji: '🔗' },
  image: { label: 'Image',         emoji: '🖼️' },
  other: { label: 'Resource',      emoji: '📎' },
}

export default function LinkCard({ resource }: LinkCardProps) {
  const meta = TYPE_LABELS[resource.type] ?? TYPE_LABELS.other

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-card flex items-center gap-4 no-underline block"
    >
      {/* Stamp icon */}
      <div className="flex-shrink-0 w-10 h-10 border-2 border-ink-900 rounded flex items-center justify-center bg-ink-50 text-lg">
        {meta.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <span className="chapter-label block mb-0.5">{meta.label}</span>
        <p className="font-body font-bold text-sm text-ink-900 truncate group-hover:text-coral-600 transition-colors">
          {resource.title}
        </p>
        {resource.description && (
          <p className="font-body text-xs text-ink-500 truncate mt-0.5">{resource.description}</p>
        )}
      </div>

      <div className="flex-shrink-0">
        <span
          className="ink-stamp text-coral-600 border-coral-300"
          style={{ transform: 'rotate(-2deg)' }}
        >
          Visit →
        </span>
      </div>
    </a>
  )
}
