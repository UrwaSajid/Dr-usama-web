import { createClient } from '@/lib/supabase/server'
import type { Resource, ResourceFormData } from '@/types/course'

export async function getResources(chapterId: string): Promise<Resource[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('position', { ascending: true })

  if (error) throw error
  return (data ?? []) as Resource[]
}

export async function createResource(
  chapterId: string,
  formData: ResourceFormData
): Promise<Resource> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('resources')
    .insert({ ...formData, chapter_id: chapterId })
    .select()
    .single()

  if (error) throw error
  return data as Resource
}

export async function updateResource(
  id: string,
  formData: Partial<ResourceFormData>
): Promise<Resource> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('resources')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Resource
}

export async function deleteResource(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) throw error
}

export async function reorderResources(
  updates: { id: string; position: number }[]
): Promise<void> {
  const supabase = createClient()
  await Promise.all(
    updates.map(({ id, position }) =>
      supabase.from('resources').update({ position }).eq('id', id)
    )
  )
}
