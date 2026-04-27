import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { slugify } from '@/lib/utils'

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('courses')
    .select('*, chapters(id, title, position, is_published, resources(id, title, type, url, position, is_published, file_size, duration_sec))')
    .order('panel_number')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user

  const body = await request.json()
  const slug = slugify(body.title)

  // get next panel number
  const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true })
  const panelNumber = (count ?? 0) + 1

  const { data, error } = await supabase
    .from('courses')
    .insert({ ...body, slug, professor_id: user.id, panel_number: panelNumber })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
