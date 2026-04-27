import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const courseId = searchParams.get('courseId')
  const supabase = createClient()

  let query = supabase
    .from('announcements')
    .select('*, course:courses(id,slug,title,color), professor:profiles(id,full_name,avatar_url)')
    .eq('is_published', true)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (courseId) query = query.eq('course_id', courseId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { data, error } = await supabase
    .from('announcements')
    .insert({ ...body, professor_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('announcements')
  return NextResponse.json(data, { status: 201 })
}
