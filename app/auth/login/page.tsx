'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      // Ensure professor profile row exists in DB before entering dashboard
      await fetch('/api/auth/profile', { method: 'POST' })
      toast.success('Welcome back, Professor!')
      // Hard redirect so the fresh session cookie is sent on the next request
      window.location.href = '/professor/dashboard'
    } catch (err: any) {
      toast.error(err?.message ?? 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5EE] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Panel header */}
        <div className="comic-panel halftone overflow-visible">
          <div className="panel-number">Professor Access</div>

          {/* Top accent */}
          <div className="h-2 bg-coral-400 border-b-2 border-ink-900" />

          <div className="p-8 pt-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-coral-400 border-2 border-ink-900 rounded flex items-center justify-center shadow-ink-sm">
                <span className="font-comic text-white text-base">DU</span>
              </div>
              <div>
                <div className="font-comic text-xl text-ink-900 leading-tight">Dr. Usama</div>
                <div className="font-body text-xs text-ink-500">Classroom Universe</div>
              </div>
            </div>

            <h1 className="font-comic text-3xl text-ink-900 mb-1">Professor Login</h1>
            <p className="font-body text-sm text-ink-500 mb-7">
              Access the professor dashboard to manage courses and content.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="chapter-label block mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="professor@university.edu"
                  className="w-full border-2 border-ink-900 rounded px-3 py-2.5 font-body text-sm bg-white
                             focus:border-coral-400 focus:outline-none transition-colors shadow-ink-sm"
                />
              </div>

              <div>
                <label className="chapter-label block mb-1" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-2 border-ink-900 rounded px-3 py-2.5 font-body text-sm bg-white
                             focus:border-coral-400 focus:outline-none transition-colors shadow-ink-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-magnetic py-3 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in…' : 'Enter the Dashboard →'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t-2 border-ink-100 text-center">
              <a href="/" className="font-body text-sm text-ink-400 hover:text-coral-500 transition-colors">
                ← Back to the Classroom Universe
              </a>
            </div>
          </div>
        </div>

        <p className="text-center font-body text-xs text-ink-400 mt-4">
          Only the professor can log in. Students access courses without signing in.
        </p>
      </div>
    </main>
  )
}
