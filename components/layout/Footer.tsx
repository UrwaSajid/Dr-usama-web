import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-900 text-ink-200 border-t-4 border-coral-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-center">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-coral-400 border-2 border-coral-200 rounded flex items-center justify-center">
                <span className="font-comic text-white text-sm">DU</span>
              </div>
              <span className="font-comic text-xl text-white tracking-wide">Dr. Usama<span className="text-coral-400">.</span></span>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed">
              A centralized knowledge universe for students of Computer Science. Every course is a story. Every chapter, a new adventure.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center">
            <h3 className="font-comic text-coral-400 tracking-wider text-lg mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-ink-300">
              {[
                ['Generative AI',        '/courses/generative-ai'],
                ['Computer Architecture','/courses/computer-architecture'],
                ['Data Science',         '/courses/data-science'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-coral-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className="flex flex-col items-center">
            <h3 className="font-comic text-coral-400 tracking-wider text-lg mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-ink-300">
              {[
                ['Home',          '/'],
                ['Announcements', '/announcements'],
].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-coral-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-700 flex items-center justify-center text-xs text-ink-500">
          <p>© {year} Dr. Muhammad Usama · National University of Computer and Emerging Sciences</p>
        </div>
      </div>
    </footer>
  )
}
