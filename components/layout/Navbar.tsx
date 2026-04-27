'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/cn'

const navLinks = [
  { href: '/',               label: 'Home'          },
  { href: '/courses',        label: 'Courses'       },
  { href: '/announcements',  label: 'Updates'       },
]

export default function Navbar() {
  const pathname     = usePathname()
  const { isProfessor, user } = useAuth()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#F7F5EE]/95 backdrop-blur-sm border-b-2 border-ink-900 shadow-ink-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-coral-400 border-2 border-ink-900 rounded flex items-center justify-center shadow-ink-sm group-hover:shadow-ink-coral transition-shadow">
            <span className="font-comic text-white text-sm leading-none">DU</span>
          </div>
          <span className="font-comic text-ink-900 text-xl tracking-wide hidden sm:block">
            Dr. Usama
            <span className="text-coral-400">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative font-body font-700 text-sm px-4 py-2 rounded transition-colors',
                    active
                      ? 'text-coral-600'
                      : 'text-ink-700 hover:text-coral-500'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-coral-50 border-2 border-coral-400 rounded"
                      style={{ borderRadius: 4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {isProfessor && (
                <Link
                  href="/professor/dashboard"
                  className="font-comic text-sm px-4 py-1.5 border-2 border-ink-900 rounded bg-ink-900 text-[#F7F5EE] shadow-ink-sm hover:bg-ink-700 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <a
                href="/auth/signout"
                className="font-body text-sm text-ink-500 hover:text-coral-500 transition-colors"
              >
                Sign out
              </a>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="relative font-comic text-sm px-5 py-2 border-2 border-ink-900 rounded bg-coral-400 text-white shadow-[3px_3px_0_#2C2C2A] hover:shadow-[1px_1px_0_#2C2C2A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 inline-flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
              Professor Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={cn('w-6 h-0.5 bg-ink-900 transition-transform duration-200', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('w-6 h-0.5 bg-ink-900 transition-opacity duration-200', menuOpen && 'opacity-0')} />
          <span className={cn('w-6 h-0.5 bg-ink-900 transition-transform duration-200', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#F7F5EE] border-b-2 border-ink-900"
          >
            <ul className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block font-body font-bold text-base py-2 px-3 rounded border-2 transition-colors',
                      pathname === link.href
                        ? 'border-coral-400 text-coral-600 bg-coral-50'
                        : 'border-transparent text-ink-700 hover:border-ink-200'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!user && (
                <li>
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 font-comic text-sm px-3 py-2 border-2 border-ink-900 rounded bg-coral-400 text-white shadow-[3px_3px_0_#2C2C2A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Professor Login
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
