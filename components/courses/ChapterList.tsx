'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { accordionContent } from '@/lib/animations'
import ResourceCard from '@/components/resources/ResourceCard'
import { cn } from '@/lib/cn'
import type { Chapter } from '@/types/course'

interface ChapterListProps {
  chapters: Chapter[]
  courseColor?: string
}

export default function ChapterList({ chapters, courseColor = '#D85A30' }: ChapterListProps) {
  const [openId, setOpenId] = useState<string | null>(chapters[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {chapters.map((chapter, idx) => {
        const isOpen = openId === chapter.id
        const resourceCount = chapter.resources?.length ?? 0

        return (
          <div key={chapter.id} className="chapter-accordion-header-wrapper">
            {/* Header */}
            <button
              onClick={() => setOpenId(isOpen ? null : chapter.id)}
              className={cn('chapter-accordion-header w-full text-left', isOpen && 'open')}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                {/* Chapter number */}
                <div
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-ink-900 rounded font-comic text-sm shadow-ink-sm"
                  style={{ background: isOpen ? courseColor : '#F7F5EE', color: isOpen ? '#fff' : '#2C2C2A' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Chapter label */}
                  <div className="chapter-label mb-0.5">Chapter {idx + 1}</div>
                  {/* Title */}
                  <div className="font-body font-bold text-ink-900 text-base truncate">
                    {chapter.title}
                  </div>
                  {/* Description */}
                  {chapter.description && (
                    <div className="font-body text-xs text-ink-500 mt-0.5 truncate">
                      {chapter.description}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className="ink-stamp text-ink-500 border-ink-300 hidden sm:inline-flex">
                  {resourceCount} {resourceCount === 1 ? 'resource' : 'resources'}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-ink-400 text-lg"
                >
                  ▾
                </motion.span>
              </div>
            </button>

            {/* Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  variants={accordionContent}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="chapter-accordion-body"
                >
                  <div className="p-4 space-y-3">
                    {!chapter.resources?.length ? (
                      <p className="text-center text-ink-400 text-sm py-4 font-body">
                        No resources uploaded yet.
                      </p>
                    ) : (
                      chapter.resources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
