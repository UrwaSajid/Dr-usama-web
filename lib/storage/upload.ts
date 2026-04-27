import { createClient } from '@/lib/supabase/client'

export type Bucket = 'pdfs' | 'videos' | 'images'

export async function uploadFile(
  bucket: Bucket,
  path: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  const supabase = createClient()

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, cacheControl: '3600' })

  if (error) throw error

  // getPublicUrl is a local operation — no network call, no DB round-trip.
  // Requires the storage bucket to be set to public in Supabase dashboard.
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: Bucket, path: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

export function getPublicUrl(bucket: Bucket, path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export function getBucketForType(mimeType: string): Bucket {
  if (mimeType === 'application/pdf') return 'pdfs'
  if (mimeType.startsWith('video/')) return 'videos'
  return 'images'
}

export function buildStoragePath(courseSlug: string, chapterId: string, filename: string): string {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  return `${courseSlug}/${chapterId}/${Date.now()}_${sanitized}`
}
