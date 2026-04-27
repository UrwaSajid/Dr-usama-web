'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

const SIDEBAR_LINKS = [
  { href: '/professor/dashboard',             label: 'Dashboard'      },
  { href: '/professor/courses',               label: 'Courses'        },
  { href: '/professor/announcements',          label: 'Announcements'  },
]

export default function ProfessorLayout({ children }: { children: React.ReactNode }) {
  const { user, isProfessor, loading } = useAuth()
  const router   = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && (!user || !isProfessor)) {
      router.replace('/auth/login')
    }
  }, [user, isProfessor, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5EE] flex items-center justify-center">
        <div className="font-comic text-2xl text-coral-400 animate-pulse">Loading…</div>
      </div>
    )
  }

  if (!user || !isProfessor) return null

  return (
    <div className="min-h-screen bg-[#F7F5EE] flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-ink-900 border-r-4 border-coral-400 flex flex-col">
        {/* Brand */}
        <div className="p-5 border-b-2 border-ink-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-coral-400 border-2 border-coral-200 rounded flex items-center justify-center">
              <span className="font-comic text-white text-xs">DU</span>
            </div>
            <span className="font-comic text-white text-base tracking-wide">Professor</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {SIDEBAR_LINKS.map(link => {
            const active = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded font-body text-sm transition-colors',
                  active
                    ? 'bg-coral-400 text-white border-l-2 border-coral-200'
                    : 'text-ink-300 hover:bg-ink-700 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-ink-700">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-ink-400 hover:text-coral-400 transition-colors font-body"
          >
            ← View Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
