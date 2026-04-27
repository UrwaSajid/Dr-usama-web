'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DeleteButton from '@/components/ui/DeleteButton'
import toast from 'react-hot-toast'

export default function ProfessorCoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/courses')
    if (res.ok) setCourses(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function deleteCourse(slug: string) {
    const res = await fetch(`/api/courses/${slug}`, { method: 'DELETE' })
    if (!res.ok) throw new Error((await res.json()).error)
    toast.success('Course deleted')
    load()
  }

  if (loading) {
    return <div className="font-comic text-2xl text-coral-400 animate-pulse">Loading…</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="chapter-label mb-1">Manage</div>
          <h1 className="font-comic text-4xl text-ink-900" style={{ textShadow: '2px 2px 0 #D85A30' }}>
            Courses
          </h1>
          <p className="font-body text-ink-500 mt-1">
            {courses.length} course{courses.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link
          href="/professor/courses/new"
          className="font-comic text-sm px-5 py-2.5 border-2 border-ink-900 rounded bg-ink-900 text-white shadow-ink-sm hover:bg-ink-700 transition-colors"
        >
          + New Course
        </Link>
      </div>

      {/* Course list */}
      {courses.length > 0 ? (
        <div className="comic-panel overflow-hidden">
          <div className="panel-number">All Courses</div>
          <div className="divide-y divide-ink-100 pt-6">
            {courses.map(course => {
              const chapterCount  = course.chapters?.length ?? 0
              const resourceCount = (course.chapters ?? []).reduce(
                (acc: number, ch: any) => acc + (ch.resources?.length ?? 0), 0
              )
              return (
                <div key={course.id} className="flex items-center justify-between px-5 py-4 hover:bg-ink-50 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="w-4 h-10 rounded flex-shrink-0 border-2 border-ink-900"
                      style={{ background: course.color }}
                    />
                    <div className="min-w-0">
                      <div className="font-body font-bold text-sm text-ink-900 truncate">{course.title}</div>
                      {course.subtitle && (
                        <div className="font-body text-xs text-ink-400 truncate">{course.subtitle}</div>
                      )}
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-xs text-ink-400">
                          {chapterCount} chapter{chapterCount !== 1 ? 's' : ''}
                        </span>
                        <span className="font-mono text-xs text-ink-400">
                          {resourceCount} resource{resourceCount !== 1 ? 's' : ''}
                        </span>
                        <span className={`font-comic text-xs px-2 py-0.5 rounded border ${
                          course.is_published
                            ? 'border-green-400 text-green-600 bg-green-50'
                            : 'border-ink-300 text-ink-400 bg-ink-50'
                        }`}>
                          {course.is_published ? '✓ Live' : '○ Draft'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <Link
                      href={`/courses/${course.slug}`}
                      target="_blank"
                      className="font-comic text-xs px-3 py-1.5 border-2 border-ink-200 rounded hover:border-ink-400 transition-colors"
                    >
                      ↗ View
                    </Link>
                    <Link
                      href={`/professor/courses/${course.slug}/edit`}
                      className="font-comic text-xs px-3 py-1.5 border-2 border-coral-400 text-coral-600 rounded hover:bg-coral-50 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      label="Delete"
                      confirmMessage={`Delete "${course.title}"? This will remove all its chapters and resources permanently.`}
                      onDelete={() => deleteCourse(course.slug)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="comic-panel p-16 text-center">
          <p className="font-comic text-3xl text-ink-200 mb-3">No courses yet</p>
          <p className="font-body text-sm text-ink-400 mb-6">Create your first course to get started.</p>
          <Link
            href="/professor/courses/new"
            className="font-comic text-sm px-6 py-2.5 border-2 border-coral-400 text-coral-600 rounded hover:bg-coral-50 transition-colors"
          >
            + Create First Course
          </Link>
        </div>
      )}
    </div>
  )
}
