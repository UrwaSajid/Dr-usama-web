import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()

  try {
    // scope:'local' clears the session cookie immediately — no network round-trip.
    await supabase.auth.signOut({ scope: 'local' })
  } catch {
    // ignore — redirect regardless
  }

  return NextResponse.redirect(new URL('/', request.url))
}
