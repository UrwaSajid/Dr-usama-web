'use client'
import Link from 'next/link'
import { useTilt } from '@/hooks/useTilt'
import { motion } from 'framer-motion'
import { panelReveal } from '@/lib/animations'
import { cn } from '@/lib/cn'
import type { Course } from '@/types/course'

interface CourseCardProps {
  course: Course
  index?: number
}

const COURSE_ICONS: Record<string, string> = {
  'generative-ai':        '🤖',
  'computer-architecture':'⚙️',
  'data-science':         '📊',
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>({
    max: 10, perspective: 900, scale: 1.03,
  })
  const icon = COURSE_ICONS[course.slug] ?? '📚'
  const chapterCount = course.chapters?.length ?? 0

  return (
    <motion.div
      variants={panelReveal}
      transition={{ delay: index * 0.12 }}
      className="h-auto sm:h-[440px]"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="comic-panel halftone group cursor-none h-full flex flex-col"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Panel number badge */}
        <div className="panel-number">
          Panel #{String(course.panel_number ?? index + 1).padStart(2, '0')}
        </div>

        {/* Color header strip */}
        <div
          className="h-2 w-full border-b-2 border-ink-900"
          style={{ background: course.color }}
        />

        {/* Card body */}
        <div className="p-4 sm:p-6 pt-6 sm:pt-8 flex flex-col flex-1">
          {/* Icon */}
          <div
            className="w-14 h-14 flex items-center justify-center text-3xl border-2 border-ink-900 rounded mb-4 shadow-ink-sm"
            style={{ background: course.color + '22' }}
          >
            {icon}
          </div>

          {/* Title */}
          <h3
            className="font-comic text-2xl text-ink-900 leading-tight mb-1 group-hover:text-coral-600 transition-colors"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.08)' }}
          >
            {course.title}
          </h3>

          {/* Subtitle */}
          {course.subtitle && (
            <p className="font-body text-sm text-coral-500 font-bold mb-3 uppercase tracking-wide">
              {course.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="font-body text-sm text-ink-600 leading-relaxed flex-1 line-clamp-3">
            {course.description}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t-2 border-ink-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="ink-stamp text-coral-600 border-coral-300">
                {chapterCount} {chapterCount === 1 ? 'Chapter' : 'Chapters'}
              </span>
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="font-comic text-sm text-ink-900 border-2 border-ink-900 px-3 py-1 rounded
                         hover:bg-coral-400 hover:text-white hover:border-coral-400 transition-colors shadow-ink-sm"
            >
              Open →
            </Link>
          </div>
        </div>

        {/* Instructor tag */}
        <div className="px-6 pb-4">
          <span className="font-mono text-xs text-ink-400">
            by {course.professor?.full_name ?? 'Dr. Muhammad Usama'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
