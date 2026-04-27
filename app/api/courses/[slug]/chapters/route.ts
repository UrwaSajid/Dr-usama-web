import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

interface Params { params: { slug: string } }

export async function GET(_: Request, { params }: Params) {
  const supabase = createClient()
  const { data: course } = await supabase.from('courses').select('id').eq('slug', params.slug).single()
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

  const { data, error } = await supabase
    .from('chapters')
    .select('*, resources(*)')
    .eq('course_id', course.id)
    .order('position')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request, { params }: Params) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: course } = await supabase.from('courses').select('id').eq('slug', params.slug).single()
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

  const body = await request.json()
  const { data, error } = await supabase
    .from('chapters')
    .insert({ ...body, course_id: course.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('courses')
  return NextResponse.json(data, { status: 201 })
}
