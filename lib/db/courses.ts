import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createPublicClient } from '@/lib/supabase/public'
import type { Course, CourseFormData } from '@/types/course'

const COURSE_SELECT = `
  *,
  professor:profiles(id, full_name, avatar_url, title),
  chapters(id, title, description, position, is_published,
    resources(id, title, type, url, position, is_published, file_size, duration_sec)
  )
`

// ─── Cached public reads (used by public pages) ──────────────────────────────

export const listPublishedCourses = unstable_cache(
  async (): Promise<Course[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('courses')
      .select(COURSE_SELECT)
      .eq('is_published', true)
      .order('panel_number', { ascending: true })
    if (error) throw error
    return (data ?? []) as Course[]
  },
  ['courses-published'],
  { revalidate: 300, tags: ['courses'] }
)

export const getCachedCourse = unstable_cache(
  async (slug: string): Promise<Course | null> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('courses')
      .select(COURSE_SELECT)
      .eq('slug', slug)
      .single()
    if (error) return null
    return data as Course
  },
  ['course-detail'],
  { revalidate: 300, tags: ['courses'] }
)

// ─── Uncached reads (used by professor dashboard / editor) ───────────────────

export async function listCourses(publishedOnly = true): Promise<Course[]> {
  const supabase = createClient()
  let query = supabase
    .from('courses')
    .select(COURSE_SELECT)
    .order('panel_number', { ascending: true })
  if (publishedOnly) query = query.eq('is_published', true)
  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as Course[]
}

export async function getCourse(slug: string): Promise<Course | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_SELECT)
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as Course
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export async function upsertCourse(
  formData: CourseFormData & { slug: string; panel_number?: number },
  professorId: string
): Promise<Course> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('courses')
    .upsert({ ...formData, professor_id: professorId })
    .select()
    .single()
  if (error) throw error
  return data as Course
}

export async function deleteCourse(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('courses').delete().eq('id', id)
  if (error) throw error
}

export async function toggleCoursePublish(id: string, published: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('courses')
    .update({ is_published: published })
    .eq('id', id)
  if (error) throw error
}
