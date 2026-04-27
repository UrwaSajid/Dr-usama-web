'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface Props { params: { id: string } }

export default function EditAnnouncementPage({ params }: Props) {
  const router  = useRouter()
  const [courses, setCourses]   = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [saving,  setSaving]    = useState(false)
  const [form, setForm]         = useState({
    title: '', body: '', course_id: '', is_pinned: false, is_published: true,
  })

  useEffect(() => {
    Promise.all([
      fetch(`/api/announcements/${params.id}`).then(r => r.json()),
      fetch('/api/courses').then(r => r.json()),
    ]).then(([ann, cs]) => {
      setForm({
        title:      ann.title      ?? '',
        body:       ann.body       ?? '',
        course_id:  ann.course_id  ?? '',
        is_pinned:  ann.is_pinned  ?? false,
        is_published: ann.is_published ?? true,
      })
      setCourses(cs)
      setLoading(false)
    }).catch(() => { toast.error('Failed to load'); setLoading(false) })
  }, [params.id])

  function update(key: string, val: string | boolean) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.body.trim()) return
    setSaving(true)
    try {
      const res = await fetch(`/api/announcements/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, course_id: form.course_id || null }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success('Announcement updated!')
      router.push('/professor/announcements')
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="font-comic text-2xl text-coral-400 animate-pulse">Loading…</div>
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/professor/announcements"
        className="inline-flex items-center gap-1.5 font-body text-sm text-ink-400 hover:text-coral-500 transition-colors mb-6"
      >
        ← Back to Announcements
      </Link>

      <div className="mb-8">
        <div className="chapter-label mb-1">Editing</div>
        <h1 className="font-comic text-4xl text-ink-900" style={{ textShadow: '2px 2px 0 #D85A30' }}>
          Edit Announcement
        </h1>
      </div>

      {/* Preview */}
      {(form.title || form.body) && (
        <div className="mb-6">
          <div className="chapter-label mb-2">Preview</div>
          <div className="speech-bubble">
            {form.title && <h3 className="font-comic text-lg text-ink-900 mb-1">{form.title}</h3>}
            {form.body  && <p className="font-body text-sm text-ink-600">{form.body}</p>}
          </div>
          <div className="flex items-center gap-3 mt-3 ml-4">
            <div className="w-8 h-8 rounded-full bg-coral-400 border-2 border-ink-900 flex items-center justify-center">
              <span className="font-comic text-white text-xs">DU</span>
            </div>
            <span className="font-body text-xs text-ink-400">Dr. Muhammad Usama</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="comic-panel p-8 space-y-5">
        <div className="panel-number">Edit Post</div>
        <div className="pt-4 space-y-5">
          <div>
            <label className="chapter-label block mb-1">Title *</label>
            <input
              required
              value={form.title}
              onChange={e => update('title', e.target.value)}
              className="w-full border-2 border-ink-900 rounded px-3 py-2.5 font-body text-sm focus:border-coral-400 outline-none shadow-ink-sm"
            />
          </div>

          <div>
            <label className="chapter-label block mb-1">Message *</label>
            <textarea
              required
              rows={5}
              value={form.body}
              onChange={e => update('body', e.target.value)}
              className="w-full border-2 border-ink-200 rounded px-3 py-2.5 font-body text-sm focus:border-coral-400 outline-none resize-none"
            />
          </div>

          <div>
            <label className="chapter-label block mb-1">Course (optional)</label>
            <select
              value={form.course_id}
              onChange={e => update('course_id', e.target.value)}
              className="w-full border-2 border-ink-200 rounded px-3 py-2.5 font-body text-sm focus:border-coral-400 outline-none bg-white"
            >
              <option value="">All students (global)</option>
              {courses.map((c: any) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            {[
              { key: 'is_pinned',    label: form.is_pinned    ? 'Pinned to top'                : 'Not pinned'    },
              { key: 'is_published', label: form.is_published ? 'Published — visible to all'  : 'Draft'         },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => update(key, !form[key as keyof typeof form])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-ink-900 transition-colors ${form[key as keyof typeof form] ? 'bg-coral-400' : 'bg-ink-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white border border-ink-300 transition-transform ${form[key as keyof typeof form] ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
                <span className="font-body text-sm text-ink-700">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving || !form.title || !form.body}>
              {saving ? 'Saving…' : 'Save Changes →'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push('/professor/announcements')}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
