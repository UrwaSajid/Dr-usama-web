import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

interface Params { params: { slug: string; chapterId: string } }

export async function GET(_: Request, { params }: Params) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('chapter_id', params.chapterId)
    .order('position')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request, { params }: Params) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { data, error } = await supabase
    .from('resources')
    .insert({ ...body, chapter_id: params.chapterId })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('courses')
  return NextResponse.json(data, { status: 201 })
}

export async function DELETE(request: Request) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await request.json()
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('courses')
  return NextResponse.json({ success: true })
}
