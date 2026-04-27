import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 bg-[#F7F5EE]">
        <div className="max-w-lg w-full text-center">
          {/* Comic panel */}
          <div className="comic-panel halftone p-10 relative">
            <div className="panel-number">Panel #404</div>

            {/* Big 404 */}
            <div
              className="font-comic text-[8rem] leading-none text-coral-400 select-none mt-4"
              style={{
                WebkitTextStroke: '3px #2C2C2A',
                textShadow: '6px 6px 0 #2C2C2A',
              }}
            >
              404
            </div>

            {/* Ink divider */}
            <div className="flex items-center gap-3 my-4 justify-center">
              <div className="h-0.5 w-10 bg-ink-900" />
              <span className="font-comic text-coral-400 text-xl">✦</span>
              <div className="h-0.5 w-10 bg-ink-900" />
            </div>

            {/* Message */}
            <h1 className="font-comic text-2xl text-ink-900 mb-2">
              Wrong page, hero.
            </h1>
            <p className="font-body text-ink-500 text-base mb-8 leading-relaxed">
              Looks like this chapter hasn't been written yet — or the professor moved it somewhere else.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="btn-magnetic text-base px-6 py-2.5 inline-flex items-center gap-2 no-underline"
              >
                ← Back to Home
              </Link>
              <Link
                href="/courses"
                className="btn-magnetic btn-outline text-base px-6 py-2.5 inline-flex items-center gap-2 no-underline"
              >
                Browse Courses
              </Link>
            </div>
          </div>

          {/* Ink splash decoration */}
          <div className="mt-6 font-comic text-sm text-ink-400 tracking-wider uppercase">
            — End of Issue —
          </div>
        </div>
      </main>
    </>
  )
}
