import { createClient } from '@/lib/supabase/server'
import type { Announcement, AnnouncementFormData, Profile } from '@/types/course'

export async function listAnnouncements(courseId?: string): Promise<Announcement[]> {
  const supabase = createClient()
  let query = supabase
    .from('announcements')
    .select('*, course:courses(id, slug, title, color), professor:profiles(id, full_name, avatar_url)')
    .eq('is_published', true)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (courseId) query = query.eq('course_id', courseId)

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as Announcement[]
}

export async function createAnnouncement(
  formData: AnnouncementFormData,
  professorId: string
): Promise<Announcement> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('announcements')
    .insert({ ...formData, professor_id: professorId })
    .select()
    .single()

  if (error) throw error
  return data as Announcement
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('announcements').delete().eq('id', id)
  if (error) throw error
}

// ─── Profiles ───────────────────────────────────────────────

export async function getProfessorProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_professor', true)
    .single()

  if (error) return null
  return data as Profile
}

export async function updateProfile(
  id: string,
  updates: Partial<Profile>
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
  if (error) throw error
}
