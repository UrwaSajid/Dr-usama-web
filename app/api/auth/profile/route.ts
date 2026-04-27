import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Called right after login to ensure a profiles row exists.
// Uses the service-role key so it bypasses RLS.
export async function POST() {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user          = session.user
    const isProfessor   = user.email === process.env.NEXT_PUBLIC_PROFESSOR_EMAIL

    const admin = createAdminClient()
    const { error } = await admin.from('profiles').upsert(
      {
        id:              user.id,
        email:           user.email ?? '',
        full_name:       isProfessor ? 'Dr. Muhammad Usama' : (user.email ?? ''),
        is_professor:    isProfessor,
        avatar_url:      null,
        bio:             null,
        title:           isProfessor ? 'Assistant Professor' : null,
        institution:     isProfessor ? 'National University of Computer and Emerging Sciences' : null,
        years_exp:       0,
        publications:    0,
        students_taught: 0,
      },
      { onConflict: 'id', ignoreDuplicates: false }
    )

    if (error) throw error
    return NextResponse.json({ isProfessor })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
