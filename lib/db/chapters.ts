import { createClient } from '@/lib/supabase/server'
import type { Chapter, ChapterFormData } from '@/types/course'

export async function getChapters(courseId: string): Promise<Chapter[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('chapters')
    .select('*, resources(*)')
    .eq('course_id', courseId)
    .order('position', { ascending: true })

  if (error) throw error
  return (data ?? []) as Chapter[]
}

export async function createChapter(
  courseId: string,
  formData: ChapterFormData
): Promise<Chapter> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('chapters')
    .insert({ ...formData, course_id: courseId })
    .select()
    .single()

  if (error) throw error
  return data as Chapter
}

export async function updateChapter(
  id: string,
  formData: Partial<ChapterFormData>
): Promise<Chapter> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('chapters')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Chapter
}

export async function reorderChapters(
  updates: { id: string; position: number }[]
): Promise<void> {
  const supabase = createClient()
  await Promise.all(
    updates.map(({ id, position }) =>
      supabase.from('chapters').update({ position }).eq('id', id)
    )
  )
}

export async function deleteChapter(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('chapters').delete().eq('id', id)
  if (error) throw error
}
