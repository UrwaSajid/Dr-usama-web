'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import DeleteButton from '@/components/ui/DeleteButton'
import ResourceUploader from '@/components/resources/ResourceUploader'
import { cn } from '@/lib/cn'
import toast from 'react-hot-toast'

interface Props { params: { slug: string } }

export default function EditCoursePage({ params }: Props) {
  const router     = useRouter()
  const [course,   setCourse]   = useState<any>(null)
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [newChapterTitle, setNewChapterTitle] = useState('')
  const [addingChapter,  setAddingChapter]   = useState(false)
  const [openChapter,    setOpenChapter]     = useState<string | null>(null)

  async function load() {
    const res = await fetch(`/api/courses/${params.slug}`)
    if (!res.ok) { router.replace('/professor/dashboard'); return }
    const data = await res.json()
    setCourse(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [params.slug])

  async function saveCourse(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/courses/${params.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: course.title,
          subtitle: course.subtitle,
          description: course.description,
          color: course.color,
          is_published: course.is_published,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success('Course saved!')
    } catch (err: any) {
      toast.error(err?.message ?? 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function addChapter() {
    if (!newChapterTitle.trim()) return
    setAddingChapter(true)
    try {
      const res = await fetch(`/api/courses/${params.slug}/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newChapterTitle,
          description: '',
          position: (course.chapters?.length ?? 0),
          is_published: true,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success('Chapter added!')
      setNewChapterTitle('')
      load()
    } catch (err: any) {
      toast.error(err?.message)
    } finally {
      setAddingChapter(false)
    }
  }

  async function togglePublishCourse() {
    const updated = { ...course, is_published: !course.is_published }
    setCourse(updated)
    await fetch(`/api/courses/${params.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: updated.is_published }),
    })
    toast.success(updated.is_published ? 'Course published!' : 'Course unpublished')
  }

  if (loading) {
    return <div className="font-comic text-2xl text-coral-400 animate-pulse">Loading…</div>
  }

  const chapters = (course.chapters ?? []).sort((a: any, b: any) => a.position - b.position)

  return (
    <div>
      <Link
        href="/professor/dashboard"
        className="inline-flex items-center gap-1.5 font-body text-sm text-ink-400 hover:text-coral-500 transition-colors mb-6"
      >
        ← Back to Dashboard
      </Link>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="chapter-label mb-1">Editing</div>
          <h1 className="font-comic text-4xl text-ink-900" style={{ textShadow: '2px 2px 0 #D85A30' }}>
            {course.title}
          </h1>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/courses/${params.slug}`}
            target="_blank"
            className="font-comic text-sm px-4 py-2 border-2 border-ink-200 rounded hover:border-coral-400 transition-colors"
          >
            ↗ Preview
          </Link>
          <button
            onClick={togglePublishCourse}
            className={cn(
              'font-comic text-sm px-4 py-2 border-2 rounded transition-colors',
              course.is_published
                ? 'border-ink-900 bg-ink-900 text-white'
                : 'border-coral-400 text-coral-600'
            )}
          >
            {course.is_published ? '✓ Published' : '○ Draft'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course details form */}
        <div className="lg:col-span-1">
          <form onSubmit={saveCourse} className="comic-panel p-6 space-y-4">
            <div className="panel-number">Course Info</div>
            <div className="pt-4 space-y-4">
              <div>
                <label className="chapter-label block mb-1">Title</label>
                <input
                  value={course.title}
                  onChange={e => setCourse((c: any) => ({ ...c, title: e.target.value }))}
                  className="w-full border-2 border-ink-200 rounded px-3 py-2 text-sm font-body focus:border-coral-400 outline-none"
                />
              </div>
              <div>
                <label className="chapter-label block mb-1">Subtitle</label>
                <input
                  value={course.subtitle ?? ''}
                  onChange={e => setCourse((c: any) => ({ ...c, subtitle: e.target.value }))}
                  className="w-full border-2 border-ink-200 rounded px-3 py-2 text-sm font-body focus:border-coral-400 outline-none"
                />
              </div>
              <div>
                <label className="chapter-label block mb-1">Description</label>
                <textarea
                  rows={4}
                  value={course.description ?? ''}
                  onChange={e => setCourse((c: any) => ({ ...c, description: e.target.value }))}
                  className="w-full border-2 border-ink-200 rounded px-3 py-2 text-sm font-body focus:border-coral-400 outline-none resize-none"
                />
              </div>
              <Button type="submit" size="sm" disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>

        {/* Chapters management */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-comic text-2xl text-ink-900">Chapters</h2>
            <span className="ink-stamp text-ink-500 border-ink-300">
              {chapters.length} chapters
            </span>
          </div>

          {/* Add chapter */}
          <div className="flex gap-2">
            <input
              value={newChapterTitle}
              onChange={e => setNewChapterTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addChapter()}
              placeholder="New chapter title…"
              className="flex-1 border-2 border-ink-200 rounded px-3 py-2 text-sm font-body focus:border-coral-400 outline-none"
            />
            <Button size="sm" onClick={addChapter} disabled={addingChapter || !newChapterTitle.trim()}>
              {addingChapter ? '…' : '+ Add'}
            </Button>
          </div>

          {/* Chapter list */}
          {chapters.map((chapter: any, idx: number) => (
            <div key={chapter.id} className="comic-panel overflow-hidden">
              {/* Chapter header */}
              <div className="px-5 py-3 flex items-center justify-between hover:bg-coral-50 transition-colors">
                <button
                  className="flex items-center gap-3 flex-1 text-left"
                  onClick={() => setOpenChapter(openChapter === chapter.id ? null : chapter.id)}
                >
                  <div className="w-7 h-7 flex items-center justify-center border-2 border-ink-900 rounded font-comic text-xs bg-coral-50">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <span className="font-body font-bold text-sm text-ink-900">{chapter.title}</span>
                  <span className="ink-stamp text-ink-400 border-ink-200 text-[10px]">
                    {chapter.resources?.length ?? 0} resources
                  </span>
                  <span className="text-ink-400 ml-auto mr-3">{openChapter === chapter.id ? '▲' : '▼'}</span>
                </button>
                <DeleteButton
                  label="✕"
                  confirmMessage={`Delete chapter "${chapter.title}"? All its resources will also be removed.`}
                  onDelete={async () => {
                    const res = await fetch(`/api/courses/${params.slug}/chapters/${chapter.id}`, { method: 'DELETE' })
                    if (!res.ok) throw new Error((await res.json()).error)
                    toast.success('Chapter deleted')
                    if (openChapter === chapter.id) setOpenChapter(null)
                    load()
                  }}
                  className="font-comic text-xs px-2 py-1 border-2 border-red-200 text-red-400 rounded hover:bg-red-50 hover:border-red-400 transition-colors flex-shrink-0"
                />
              </div>

              {/* Chapter body — resource uploader */}
              {openChapter === chapter.id && (
                <div className="border-t-2 border-ink-100 p-5">
                  {/* Existing resources */}
                  {(chapter.resources ?? []).length > 0 && (
                    <div className="mb-4 space-y-2">
                      {chapter.resources.map((r: any) => (
                        <div key={r.id} className="flex items-center justify-between text-sm border border-ink-100 rounded px-3 py-2 bg-white">
                          <span className="font-body text-ink-700 flex items-center gap-2">
                            <span>{r.type === 'pdf' ? '📄' : r.type === 'video' ? '🎬' : '🔗'}</span>
                            {r.title}
                          </span>
                          <button
                            onClick={async () => {
                              await fetch(`/api/courses/${params.slug}/chapters/${chapter.id}/resources`, {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: r.id }),
                              })
                              load()
                            }}
                            className="text-red-400 hover:text-red-600 text-xs font-body"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Uploader */}
                  <ResourceUploader
                    chapterId={chapter.id}
                    courseSlug={params.slug}
                    onSuccess={load}
                  />
                </div>
              )}
            </div>
          ))}

          {!chapters.length && (
            <div className="comic-panel p-8 text-center">
              <p className="font-comic text-xl text-ink-300">No chapters yet</p>
              <p className="font-body text-sm text-ink-400 mt-1">Add your first chapter above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
