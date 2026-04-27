import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

interface Params { params: { slug: string; chapterId: string } }

export async function DELETE(_: Request, { params }: Params) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase.from('chapters').delete().eq('id', params.chapterId)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidateTag('courses')
  return NextResponse.json({ success: true })
}
