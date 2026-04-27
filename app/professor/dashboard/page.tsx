import type { Metadata } from 'next'
import Link from 'next/link'
import { listCourses } from '@/lib/db/courses'
import { listAnnouncements } from '@/lib/db/announcements'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Dashboard — Professor' }

export default async function DashboardPage() {
  const [courses, announcements] = await Promise.all([
    listCourses(false),
    listAnnouncements(),
  ])

  const totalChapters   = courses.reduce((acc, c) => acc + (c.chapters?.length ?? 0), 0)
  const totalResources  = courses.reduce(
    (acc, c) => acc + (c.chapters ?? []).reduce((a, ch) => a + (ch.resources?.length ?? 0), 0),
    0
  )

  const STATS = [
    { label: 'Courses',        val: courses.length,       href: '/professor/courses' },
    { label: 'Chapters',       val: totalChapters,        href: '/professor/courses' },
    { label: 'Resources',      val: totalResources,       href: '/professor/courses' },
    { label: 'Announcements',  val: announcements.length, href: '/professor/announcements/new' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="chapter-label mb-1">Overview</div>
        <h1 className="font-comic text-4xl text-ink-900" style={{ textShadow: '2px 2px 0 #D85A30' }}>
          Dashboard
        </h1>
        <p className="font-body text-ink-500 mt-1">Welcome back, Professor. Here's the state of your universe.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STATS.map(({ label, val, href }) => (
          <Link
            key={label}
            href={href}
            className="comic-panel p-5 text-center group no-underline"
          >
            <div className="font-comic text-3xl text-coral-400 group-hover:text-coral-600">{val}</div>
            <div className="font-body text-xs text-ink-500 uppercase tracking-wider mt-1">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="font-comic text-xl text-ink-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/professor/courses/new',            label: '+ New Course'       },
            { href: '/professor/announcements/new',      label: '+ New Announcement' },
            { href: '/courses',                          label: '↗ View Public Site' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-comic text-sm px-5 py-2 border-2 border-ink-900 rounded bg-white shadow-ink-sm hover:shadow-ink-coral hover:border-coral-400 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent courses table */}
      <div className="comic-panel overflow-hidden">
        <div className="panel-number">Courses</div>
        <div className="p-5 pt-8">
          <h2 className="font-comic text-xl text-ink-900 mb-4">Your Courses</h2>
          <div className="divide-y divide-ink-100">
            {courses.map(course => (
              <div key={course.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-ink-900"
                    style={{ background: course.color }}
                  />
                  <div>
                    <div className="font-body font-bold text-sm text-ink-900">{course.title}</div>
                    <div className="font-mono text-xs text-ink-400">
                      {course.chapters?.length ?? 0} chapters · {course.is_published ? '✓ Live' : '○ Draft'}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/professor/courses/${course.slug}/edit`}
                  className="font-comic text-xs px-3 py-1 border-2 border-ink-200 rounded hover:border-coral-400 transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent announcements */}
      {announcements.length > 0 && (
        <div className="comic-panel overflow-hidden mt-6">
          <div className="panel-number">Announcements</div>
          <div className="p-5 pt-8">
            <h2 className="font-comic text-xl text-ink-900 mb-4">Recent Posts</h2>
            <div className="divide-y divide-ink-100">
              {announcements.slice(0, 5).map(ann => (
                <div key={ann.id} className="py-3">
                  <div className="font-body font-bold text-sm text-ink-900">{ann.title}</div>
                  <div className="font-mono text-xs text-ink-400 mt-0.5">{formatDate(ann.created_at)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
