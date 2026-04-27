'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatFileSize } from '@/lib/utils'
import type { Resource } from '@/types/course'

interface PDFCardProps { resource: Resource }

export default function PDFCard({ resource }: PDFCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="resource-card cursor-pointer group"
      style={{ perspective: 800 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
      >
        {/* Front */}
        <div style={{ backfaceVisibility: 'hidden' }} className="flex items-center gap-4">
          {/* Scroll icon */}
          <div className="flex-shrink-0 w-10 h-12 relative">
            <div className="absolute inset-0 bg-coral-50 border-2 border-ink-900 rounded-sm" />
            <div className="absolute top-0 left-0 right-0 h-2 bg-coral-200 border-b border-ink-900 rounded-t-sm" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-coral-200 border-t border-ink-900 rounded-b-sm" />
            <div className="absolute inset-x-1 top-3 bottom-3 flex flex-col justify-center gap-0.5">
              {[1,2,3].map(i => (
                <div key={i} className="h-px bg-ink-300" />
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="chapter-label block mb-0.5">PDF Document</span>
            <p className="font-body font-bold text-sm text-ink-900 truncate">{resource.title}</p>
            {resource.description && (
              <p className="font-body text-xs text-ink-500 truncate mt-0.5">{resource.description}</p>
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {resource.file_size && (
              <span className="font-mono text-xs text-ink-400">
                {formatFileSize(resource.file_size)}
              </span>
            )}
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="font-comic text-xs px-3 py-1 bg-coral-400 text-white border-2 border-ink-900 rounded shadow-ink-sm hover:bg-coral-600 transition-colors"
            >
              Open
            </a>
          </div>
        </div>

        {/* Back (flip) */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
          className="flex items-center justify-center bg-coral-50 rounded"
        >
          <div className="text-center p-4">
            <div className="font-comic text-2xl text-coral-400 mb-1">📄</div>
            <p className="font-body text-xs text-ink-600">{resource.title}</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-comic text-xs px-4 py-1.5 bg-coral-400 text-white border-2 border-ink-900 rounded shadow-ink-sm"
            >
              Download PDF
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
