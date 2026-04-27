import { createClient } from '@supabase/supabase-js'

// Cookie-free anon client — safe to use inside unstable_cache callbacks
// where Next.js request context (cookies/headers) is not available.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
