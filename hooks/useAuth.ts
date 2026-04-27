'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/course'

export function useAuth() {
  const [user, setUser]           = useState<User | null>(null)
  const [profile, setProfile]     = useState<Profile | null>(null)
  const [isProfessor, setIsProfessor] = useState(false)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function load(userId: string) {
      try {
        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 5000)
        )
        const query = supabase.from('profiles').select('*').eq('id', userId).single()
        const { data } = await Promise.race([query, timeout]) as { data: Profile | null }
        if (data) {
          setProfile(data)
          setIsProfessor(data.is_professor)
        }
      } catch {
        // DB unreachable or no profile row — leave isProfessor false
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) load(session.user.id).finally(() => setLoading(false))
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) await load(session.user.id)
        else { setProfile(null); setIsProfessor(false) }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    const supabase = createClient()
    // scope: 'local' clears the session from storage only — no network call,
    // so it never hangs regardless of Supabase connectivity.
    await supabase.auth.signOut({ scope: 'local' })
    window.location.href = '/'
  }

  return { user, profile, isProfessor, loading, signOut }
}
