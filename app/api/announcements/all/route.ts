import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Professor-only: returns all announcements regardless of is_published
export async function GET() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('announcements')
    .select('*, course:courses(id,slug,title,color)')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
