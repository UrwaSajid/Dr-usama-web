'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { slugify } from '@/lib/utils'
import Button from '@/components/ui/Button'
import ResourceUploader from '@/components/resources/ResourceUploader'
import { cn } from '@/lib/cn'
import toast from 'react-hot-toast'

const COLORS = ['#D85A30','#993C1D','#7A2E14','#5F5E5A','#2C2C2A','#444441']

export default function NewCoursePage() {
  const router = useRouter()

  // Phase 1 — course details
  const [loading, setLoading]   = useState(false)
  const [form, setForm]         = useState({
    title: '', subtitle: '', description: '', color: COLORS[0], is_published: false,
  })

  // Phase 2 — chapter/resource management (after course created)
  const [course, setCourse]           = useState<any>(null)
  const [chapters, setChapters]       = useState<any[]>([])
  const [newChapterTitle, setNewChapterTitle] = useState('')
  const [addingChapter, setAddingChapter]     = useState(false)
  const [openChapter, setOpenChapter]         = useState<string | null>(null)

  function update(key: string, val: string | boolean) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleCreateCourse(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      const created = await res.json()
      setCourse(created)
      setChapters([])
      toast.success('Course created! Now add chapters and resources.')
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  async function loadChapters() {
    if (!course) return
    const res = await fetch(`/api/courses/${course.slug}`)
    if (!res.ok) return
    const data = await res.json()
    setChapters((data.chapters ?? []).sort((a: any, b: any) => a.position - b.position))
  }

  async function addChapter() {
    if (!newChapterTitle.trim() || !course) return
    setAddingChapter(true)
    try {
      const res = await fetch(`/api/courses/${course.slug}/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newChapterTitle,
          description: '',
          position: chapters.length,
          is_published: true,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success('Chapter added!')
      setNewChapterTitle('')
      await loadChapters()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to add chapter')
    } finally {
      setAddingChapter(false)
    }
  }

  // ── Phase 2: chapter & resource management ──────────────────
  if (course) {
    return (
      <div className="max-w-3xl">
        <Link
          href="/professor/dashboard"
          className="inline-flex items-center gap-1.5 font-body text-sm text-ink-400 hover:text-coral-500 transition-colors mb-6"
        >
          ← Back to Dashboard
        </Link>

        {/* Course created banner */}
        <div className="comic-panel p-5 mb-8 flex items-center justify-between flex-wrap gap-3">
          <div className="panel-number">Course Created</div>
          <div className="pt-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-ink-900 flex-shrink-0" style={{ background: course.color }} />
              <h1 className="font-comic text-2xl text-ink-900">{course.title}</h1>
            </div>
            {course.subtitle && (
              <p className="font-body text-sm text-ink-500 mt-0.5 ml-7">{course.subtitle}</p>
            )}
          </div>
          <Link
            href={`/professor/courses/${course.slug}/edit`}
            className="font-comic text-sm px-4 py-1.5 border-2 border-ink-200 rounded hover:border-coral-400 transition-colors"
          >
            Full Edit Page →
          </Link>
        </div>

        {/* Chapter management */}
        <div className="space-y-4">
          <h2 className="font-comic text-2xl text-ink-900">Chapters & Resources</h2>

          {/* Add chapter input */}
          <div className="flex gap-2">
            <input
              value={newChapterTitle}
              onChange={e => setNewChapterTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addChapter()}
              placeholder="New chapter title…"
              className="flex-1 border-2 border-ink-200 rounded px-3 py-2 text-sm font-body focus:border-coral-400 outline-none"
            />
            <Button size="sm" onClick={addChapter} disabled={addingChapter || !newChapterTitle.trim()}>
              {addingChapter ? '…' : '+ Add Chapter'}
            </Button>
          </div>

          {/* Chapter list */}
          {chapters.map((chapter: any, idx: number) => (
            <div key={chapter.id} className="comic-panel overflow-hidden">
              <button
                className="w-full text-left px-5 py-3 flex items-center justify-between hover:bg-coral-50 transition-colors"
                onClick={() => setOpenChapter(openChapter === chapter.id ? null : chapter.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center border-2 border-ink-900 rounded font-comic text-xs bg-coral-50">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <span className="font-body font-bold text-sm text-ink-900">{chapter.title}</span>
                  <span className="ink-stamp text-ink-400 border-ink-200 text-[10px]">
                    {chapter.resources?.length ?? 0} resources
                  </span>
                </div>
                <span className="text-ink-400">{openChapter === chapter.id ? '▲' : '▼'}</span>
              </button>

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
                              await fetch(`/api/courses/${course.slug}/chapters/${chapter.id}/resources`, {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: r.id }),
                              })
                              loadChapters()
                            }}
                            className="text-red-400 hover:text-red-600 text-xs font-body"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <ResourceUploader
                    chapterId={chapter.id}
                    courseSlug={course.slug}
                    onSuccess={loadChapters}
                  />
                </div>
              )}
            </div>
          ))}

          {chapters.length === 0 && (
            <div className="comic-panel p-8 text-center">
              <p className="font-comic text-xl text-ink-300">No chapters yet</p>
              <p className="font-body text-sm text-ink-400 mt-1">Add your first chapter above.</p>
            </div>
          )}

          {/* Finish */}
          <div className="flex gap-3 pt-4 border-t-2 border-ink-100">
            <Button onClick={() => router.push('/professor/dashboard')}>
              Finish → Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push(`/professor/courses/${course.slug}/edit`)}>
              Open Full Edit Page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Phase 1: course details form ────────────────────────────
  return (
    <div className="max-w-2xl">
      <Link
        href="/professor/dashboard"
        className="inline-flex items-center gap-1.5 font-body text-sm text-ink-400 hover:text-coral-500 transition-colors mb-6"
      >
        ← Back to Dashboard
      </Link>
      <div className="mb-8">
        <div className="chapter-label mb-1">New Course</div>
        <h1 className="font-comic text-4xl text-ink-900" style={{ textShadow: '2px 2px 0 #D85A30' }}>
          Create Course
        </h1>
        <p className="font-body text-sm text-ink-400 mt-1">Fill in the details, then add chapters and upload resources.</p>
      </div>

      <form onSubmit={handleCreateCourse} className="comic-panel p-8 space-y-5">
        <div className="panel-number">Course Details</div>
        <div className="pt-4 space-y-5">
          {/* Title */}
          <div>
            <label className="chapter-label block mb-1">Course Title *</label>
            <input
              required
              value={form.title}
              onChange={e => update('title', e.target.value)}
              placeholder="e.g. Generative AI"
              className="w-full border-2 border-ink-900 rounded px-3 py-2.5 font-body text-sm focus:border-coral-400 outline-none shadow-ink-sm"
            />
            {form.title && (
              <p className="font-mono text-xs text-ink-400 mt-1">slug: {slugify(form.title)}</p>
            )}
          </div>

          {/* Subtitle */}
          <div>
            <label className="chapter-label block mb-1">Subtitle</label>
            <input
              value={form.subtitle}
              onChange={e => update('subtitle', e.target.value)}
              placeholder="e.g. From Transformers to Diffusion Models"
              className="w-full border-2 border-ink-200 rounded px-3 py-2.5 font-body text-sm focus:border-coral-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="chapter-label block mb-1">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder="Course overview for students…"
              className="w-full border-2 border-ink-200 rounded px-3 py-2.5 font-body text-sm focus:border-coral-400 outline-none resize-none"
            />
          </div>

          {/* Color */}
          <div>
            <label className="chapter-label block mb-2">Panel Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => update('color', c)}
                  className="w-9 h-9 rounded border-3 transition-all"
                  style={{
                    background: c,
                    borderColor: form.color === c ? '#2C2C2A' : 'transparent',
                    boxShadow: form.color === c ? '2px 2px 0 #2C2C2A' : 'none',
                    transform: form.color === c ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => update('is_published', !form.is_published)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full border-2 border-ink-900 transition-colors',
                form.is_published ? 'bg-coral-400' : 'bg-ink-200'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white border border-ink-300 transition-transform',
                  form.is_published ? 'translate-x-5' : 'translate-x-1'
                )}
              />
            </button>
            <span className="font-body text-sm text-ink-700">
              {form.is_published ? 'Published — visible to students' : 'Draft — hidden from students'}
            </span>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading || !form.title}>
              {loading ? 'Creating…' : 'Create Course & Add Content →'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
