'use client'
import { motion } from 'framer-motion'
import { staggerContainer, bubblePop } from '@/lib/animations'
import SpeechBubble from '@/components/ui/SpeechBubble'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types/course'

interface AnnouncementFeedProps {
  announcements: Announcement[]
}

export default function AnnouncementFeed({ announcements }: AnnouncementFeedProps) {
  if (!announcements.length) {
    return (
      <div className="text-center py-16">
        <p className="font-comic text-3xl text-ink-300">No announcements yet</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-12"
    >
      {announcements.map((ann, idx) => (
        <motion.div
          key={ann.id}
          variants={bubblePop}
          custom={idx}
          className="flex gap-5 items-start"
        >
          {/* Avatar column */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-ink-900 bg-coral-50 shadow-ink-sm flex items-center justify-center overflow-hidden">
              {ann.professor?.avatar_url ? (
                <img src={ann.professor.avatar_url} alt="Professor" className="w-full h-full object-cover" />
              ) : (
                <span className="font-comic text-xl text-coral-400">DU</span>
              )}
            </div>
            {/* Timeline stem */}
            <div className="w-px flex-1 bg-ink-200 min-h-[2rem]" />
          </div>

          {/* Bubble */}
          <div className="flex-1 pb-4">
            {/* Pinned badge */}
            {ann.is_pinned && (
              <div className="mb-2 flex items-center gap-1">
                <span className="ink-stamp text-coral-600 border-coral-300 text-[10px]">
                  📌 Pinned
                </span>
              </div>
            )}

            <SpeechBubble className="relative">
              {/* Course tag */}
              {ann.course && (
                <div
                  className="inline-block font-comic text-xs px-2 py-0.5 rounded mb-2 border border-ink-200"
                  style={{ background: ann.course.color + '22', color: ann.course.color }}
                >
                  {ann.course.title}
                </div>
              )}

              <h3 className="font-comic text-lg text-ink-900 leading-tight mb-1">
                {ann.title}
              </h3>
              <p className="font-body text-sm text-ink-600 leading-relaxed">{ann.body}</p>

              <div className="mt-3 flex items-center gap-2 text-xs text-ink-400">
                <span className="font-body">
                  {ann.professor?.full_name ?? 'Dr. Muhammad Usama'}
                </span>
                <span>·</span>
                <span className="font-mono">{formatDate(ann.created_at)}</span>
              </div>
            </SpeechBubble>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
