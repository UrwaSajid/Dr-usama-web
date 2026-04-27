import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnnouncementFeed from '@/components/announcements/AnnouncementFeed'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { listAnnouncements } from '@/lib/db/announcements'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Announcements',
  description: 'Latest updates and announcements from Dr. Muhammad Usama.',
}

export default async function AnnouncementsPage() {
  const announcements = await listAnnouncements()

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-ink-900 border-b-4 border-coral-400 py-14 px-4 mb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #F7F5EE 0.7px, transparent 0.7px)',
              backgroundSize: '8px 8px',
            }}
            aria-hidden
          />
          <ScrollReveal threshold={0}>
            <div className="max-w-4xl mx-auto relative">
              <div className="panel-number" style={{ position: 'static', display: 'inline-block', marginBottom: '0.75rem' }}>
                Bulletin Board
              </div>
              <h1
                className="font-comic text-5xl sm:text-6xl text-white"
                style={{ textShadow: '4px 4px 0 #D85A30' }}
              >
                Announcements
              </h1>
              <p className="font-body text-ink-300 mt-2">
                {announcements.length} update{announcements.length !== 1 ? 's' : ''} from the professor
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0.1} threshold={0.05}>
            <AnnouncementFeed announcements={announcements} />
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  )
}
