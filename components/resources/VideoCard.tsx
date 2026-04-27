import { formatDuration } from '@/lib/utils'
import type { Resource } from '@/types/course'

interface VideoCardProps { resource: Resource }

export default function VideoCard({ resource }: VideoCardProps) {
  return (
    <div className="resource-card group">
      <div className="flex items-center gap-4">
        {/* Film reel icon */}
        <div className="flex-shrink-0 w-11 h-11 relative">
          <div className="w-full h-full bg-ink-900 border-2 border-ink-700 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-ink-600 rounded-full border border-ink-400 flex items-center justify-center">
              <div className="w-2 h-2 bg-ink-300 rounded-full" />
            </div>
          </div>
          {/* Sprocket holes */}
          {[0, 90, 180, 270].map(deg => (
            <div
              key={deg}
              className="absolute w-2 h-2 bg-ink-200 rounded-full border border-ink-400"
              style={{
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateY(-160%) translate(-50%,-50%)`,
              }}
            />
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <span className="chapter-label block mb-0.5">Video Lecture</span>
          <p className="font-body font-bold text-sm text-ink-900 truncate">{resource.title}</p>
          {resource.description && (
            <p className="font-body text-xs text-ink-500 truncate mt-0.5">{resource.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {resource.duration_sec && (
            <span className="font-mono text-xs text-ink-400">
              {formatDuration(resource.duration_sec)}
            </span>
          )}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-comic text-xs px-3 py-1 bg-ink-900 text-[#F7F5EE] border-2 border-ink-700 rounded shadow-ink-sm hover:bg-ink-700 transition-colors"
          >
            Watch ▶
          </a>
        </div>
      </div>
    </div>
  )
}
