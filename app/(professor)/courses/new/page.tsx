'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

const COLORS = ['#D85A30','#993C1D','#7A2E14','#5F5E5A','#2C2C2A','#444441']

export default function NewCoursePage() {
  const router = useRouter()
  const [loading, setLoading]   = useState(false)
  const [form, setForm]         = useState({
    title: '', subtitle: '', description: '', color: COLORS[0], is_published: false,
  })

  function update(key: string, val: string | boolean) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
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
      const course = await res.json()
      toast.success('Course created!')
      router.push(`/professor/courses/${course.slug}/edit`)
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="chapter-label mb-1">New Chapter</div>
        <h1 className="font-comic text-4xl text-ink-900" style={{ textShadow: '2px 2px 0 #D85A30' }}>
          Create Course
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="comic-panel p-8 space-y-5">
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
              <p className="font-mono text-xs text-ink-400 mt-1">
                slug: {slugify(form.title)}
              </p>
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
              className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-ink-900 transition-colors ${form.is_published ? 'bg-coral-400' : 'bg-ink-200'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white border border-ink-300 transition-transform ${form.is_published ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </button>
            <span className="font-body text-sm text-ink-700">
              {form.is_published ? 'Published — visible to students' : 'Draft — hidden from students'}
            </span>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading || !form.title}>
              {loading ? 'Creating…' : 'Create Course →'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
