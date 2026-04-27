// ============================================================
// types/course.ts  —  Domain types for the platform
// ============================================================

export type ResourceType = 'pdf' | 'video' | 'link' | 'image' | 'other'

export interface Profile {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
  bio: string | null
  title: string | null
  institution: string | null
  years_exp: number
  publications: number
  students_taught: number
  is_professor: boolean
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string | null
  description: string | null
  cover_url: string | null
  color: string
  panel_number: number | null
  professor_id: string | null
  is_published: boolean
  created_at: string
  updated_at: string
  // Joined
  professor?: Profile
  chapters?: Chapter[]
  _count?: { chapters: number; resources: number }
}

export interface Chapter {
  id: string
  course_id: string
  title: string
  description: string | null
  position: number
  is_published: boolean
  created_at: string
  updated_at: string
  // Joined
  resources?: Resource[]
}

export interface Resource {
  id: string
  chapter_id: string
  title: string
  description: string | null
  type: ResourceType
  url: string
  file_size: number | null
  duration_sec: number | null
  position: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: string
  course_id: string | null
  professor_id: string | null
  title: string
  body: string
  is_pinned: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  // Joined
  course?: Pick<Course, 'id' | 'slug' | 'title' | 'color'>
  professor?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>
}

// Form types
export interface CourseFormData {
  title: string
  subtitle: string
  description: string
  color: string
  is_published: boolean
}

export interface ChapterFormData {
  title: string
  description: string
  position: number
  is_published: boolean
}

export interface ResourceFormData {
  title: string
  description: string
  type: ResourceType
  url: string
  is_published: boolean
}

export interface AnnouncementFormData {
  title: string
  body: string
  course_id: string | null
  is_pinned: boolean
}
