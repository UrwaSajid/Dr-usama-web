'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFile, getBucketForType, buildStoragePath } from '@/lib/storage/upload'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import type { ResourceType } from '@/types/course'

interface ResourceUploaderProps {
  chapterId: string
  courseSlug: string
  onSuccess?: () => void
}

export default function ResourceUploader({ chapterId, courseSlug, onSuccess }: ResourceUploaderProps) {
  const [uploading, setUploading]   = useState(false)
  const [progress, setProgress]     = useState(0)
  const [linkMode, setLinkMode]     = useState(false)
  const [linkUrl, setLinkUrl]       = useState('')
  const [linkTitle, setLinkTitle]   = useState('')
  const [linkDesc, setLinkDesc]     = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return
    const file = acceptedFiles[0]
    setUploading(true)
    setProgress(0)

    try {
      const bucket = getBucketForType(file.type)
      const path   = buildStoragePath(courseSlug, chapterId, file.name)
      const url    = await uploadFile(bucket, path, file)

      const type: ResourceType =
        file.type === 'application/pdf' ? 'pdf'
        : file.type.startsWith('video/') ? 'video'
        : 'other'

      const res = await fetch(`/api/courses/${courseSlug}/chapters/${chapterId}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: file.name.replace(/\.[^.]+$/, ''),
          description: '',
          type,
          url,
          file_size: file.size,
          is_published: true,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed')

      toast.success('Resource uploaded!')
      onSuccess?.()
    } catch (err: any) {
      toast.error(err?.message ?? 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }, [chapterId, courseSlug, onSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'video/*': ['.mp4', '.webm'],
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
    maxFiles: 1,
    disabled: uploading,
  })

  async function submitLink() {
    if (!linkUrl.trim() || !linkTitle.trim()) return
    try {
      const res = await fetch(`/api/courses/${courseSlug}/chapters/${chapterId}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: linkTitle,
          description: linkDesc,
          type: 'link',
          url: linkUrl,
          file_size: null,
          is_published: true,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to add link')
      toast.success('Link added!')
      setLinkUrl(''); setLinkTitle(''); setLinkDesc('')
      onSuccess?.()
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to add link')
    }
  }

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setLinkMode(false)}
          className={cn('font-comic text-sm px-4 py-1.5 border-2 border-ink-900 rounded transition-colors',
            !linkMode ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 hover:bg-ink-50')}
        >
          Upload File
        </button>
        <button
          onClick={() => setLinkMode(true)}
          className={cn('font-comic text-sm px-4 py-1.5 border-2 border-ink-900 rounded transition-colors',
            linkMode ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 hover:bg-ink-50')}
        >
          Add Link
        </button>
      </div>

      {!linkMode ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-3 border-dashed border-ink-300 rounded-lg p-10 text-center cursor-pointer transition-all',
            isDragActive && 'border-coral-400 bg-coral-50',
            uploading   && 'opacity-60 cursor-wait'
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="space-y-2">
              <p className="font-comic text-ink-500">Uploading…</p>
              <div className="w-full bg-ink-100 rounded-full h-2 border border-ink-200">
                <div className="bg-coral-400 h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : isDragActive ? (
            <p className="font-comic text-xl text-coral-500">Drop it here!</p>
          ) : (
            <>
              <div className="text-4xl mb-3">📂</div>
              <p className="font-comic text-ink-600 text-lg">Drag & drop or click to upload</p>
              <p className="font-body text-xs text-ink-400 mt-1">PDF, MP4, WEBM, JPG, PNG — max 500 MB</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3 p-4 border-2 border-ink-200 rounded-lg bg-white">
          <input
            type="text"
            placeholder="Link title *"
            value={linkTitle}
            onChange={e => setLinkTitle(e.target.value)}
            className="w-full border-2 border-ink-200 rounded px-3 py-2 font-body text-sm focus:border-coral-400 outline-none"
          />
          <input
            type="url"
            placeholder="https://... *"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            className="w-full border-2 border-ink-200 rounded px-3 py-2 font-mono text-sm focus:border-coral-400 outline-none"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={linkDesc}
            onChange={e => setLinkDesc(e.target.value)}
            className="w-full border-2 border-ink-200 rounded px-3 py-2 font-body text-sm focus:border-coral-400 outline-none"
          />
          <Button onClick={submitLink} size="sm" disabled={!linkUrl || !linkTitle}>
            Add Link
          </Button>
        </div>
      )}
    </div>
  )
}
