'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DeleteButton from '@/components/ui/DeleteButton'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function ProfessorAnnouncementsPage() {
  const router = useRouter()
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/announcements/all')
    if (res.ok) setAnnouncements(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function deleteAnn(id: string, title: string) {
    const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error((await res.json()).error)
    toast.success('Announcement deleted')
    load()
  }

  if (loading) {
    return <div className="font-comic text-2xl text-coral-400 animate-pulse">Loading…</div>
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="chapter-label mb-1">Bulletin Board</div>
          <h1 className="font-comic text-4xl text-ink-900" style={{ textShadow: '2px 2px 0 #D85A30' }}>
            Announcements
          </h1>
          <p className="font-body text-ink-500 mt-1">
            {announcements.length} post{announcements.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/professor/announcements/new"
          className="font-comic text-sm px-5 py-2.5 border-2 border-ink-900 rounded bg-ink-900 text-white shadow-ink-sm hover:bg-ink-700 transition-colors"
        >
          + New Post
        </Link>
      </div>

      {announcements.length > 0 ? (
        <div className="comic-panel overflow-hidden">
          <div className="panel-number">All Posts</div>
          <div className="divide-y divide-ink-100 pt-6">
            {announcements.map(ann => (
              <div key={ann.id} className="flex items-center justify-between px-5 py-4 hover:bg-ink-50 transition-colors gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {ann.is_pinned && (
                      <span className="font-comic text-[10px] px-1.5 py-0.5 border border-coral-300 text-coral-500 rounded uppercase tracking-wide">Pinned</span>
                    )}
                    <span className="font-body font-bold text-sm text-ink-900 truncate">{ann.title}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="font-mono text-xs text-ink-400">{formatDate(ann.created_at)}</span>
                    {ann.course && (
                      <span
                        className="font-comic text-xs px-2 py-0.5 rounded border border-ink-200 text-ink-500"
                        style={{ borderLeftColor: ann.course.color, borderLeftWidth: 3 }}
                      >
                        {ann.course.title}
                      </span>
                    )}
                  </div>
                  {ann.body && (
                    <p className="font-body text-xs text-ink-400 mt-1 truncate max-w-md">{ann.body}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/professor/announcements/${ann.id}/edit`}
                    className="font-comic text-xs px-3 py-1.5 border-2 border-coral-400 text-coral-600 rounded hover:bg-coral-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    label="Delete"
                    confirmMessage={`Delete "${ann.title}"? This cannot be undone.`}
                    onDelete={() => deleteAnn(ann.id, ann.title)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="comic-panel p-16 text-center">
          <p className="font-comic text-3xl text-ink-200 mb-3">No posts yet</p>
          <p className="font-body text-sm text-ink-400 mb-6">Write your first announcement for students.</p>
          <Link
            href="/professor/announcements/new"
            className="font-comic text-sm px-6 py-2.5 border-2 border-coral-400 text-coral-600 rounded hover:bg-coral-50 transition-colors"
          >
            + Write First Post
          </Link>
        </div>
      )}
    </div>
  )
}
