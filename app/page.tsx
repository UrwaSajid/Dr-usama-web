import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import WelcomeCards from '@/components/home/WelcomeCards'
import CourseGrid from '@/components/courses/CourseGrid'
import AnnouncementFeed from '@/components/announcements/AnnouncementFeed'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ComicDivider from '@/components/ui/ComicDivider'
import { listPublishedCourses } from '@/lib/db/courses'
import { listCachedAnnouncements } from '@/lib/db/announcements'

export const revalidate = 120

export default async function HomePage() {
  const [courses, announcements] = await Promise.all([
    listPublishedCourses(),
    listCachedAnnouncements(),
  ])

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <HeroSection />

        {/* WELCOME CARDS */}
        <WelcomeCards />

        {/* COURSES SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="chapter-label block mb-1">The Universe</span>
                <h2
                  className="font-comic text-3xl sm:text-5xl text-ink-900"
                  style={{ textShadow: '3px 3px 0 #D85A30' }}
                >
                  Active Courses
                </h2>
              </div>
              <a
                href="/courses"
                className="hidden sm:inline-block font-comic text-sm px-5 py-2 border-2 border-ink-900 rounded shadow-ink hover:shadow-ink-coral transition-shadow"
              >
                View All →
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} threshold={0.05}>
            <CourseGrid courses={courses.slice(0, 3)} />
          </ScrollReveal>
        </section>

        <ComicDivider label="Latest Intel" />

        {/* ANNOUNCEMENTS PREVIEW */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <ScrollReveal>
            <div className="mb-10">
              <span className="chapter-label block mb-1">From the Professor</span>
              <h2
                className="font-comic text-4xl text-ink-900"
                style={{ textShadow: '3px 3px 0 #D85A30' }}
              >
                Announcements
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05} threshold={0.05}>
            <AnnouncementFeed announcements={announcements.slice(0, 3)} />
          </ScrollReveal>

          {announcements.length > 3 && (
            <ScrollReveal delay={0.1} threshold={0.05}>
              <div className="text-center mt-10">
                <a
                  href="/announcements"
                  className="font-comic text-sm px-6 py-2.5 border-2 border-coral-400 text-coral-600 rounded shadow-ink-coral hover:bg-coral-50 transition-colors"
                >
                  See All Announcements →
                </a>
              </div>
            </ScrollReveal>
          )}
        </section>

        {/* BOTTOM CTA PANEL */}
        <section className="bg-ink-900 border-y-4 border-coral-400 py-20 px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="chapter-label text-coral-400 block mb-3">Final Page</span>
              <h2
                className="font-comic text-3xl sm:text-5xl text-white mb-4"
                style={{ textShadow: '3px 3px 0 #D85A30' }}
              >
                Ready to Learn?
              </h2>
              <p className="font-body text-ink-300 text-lg mb-8">
                Every course is a story. Every chapter, a new adventure.<br />
                Pick a course and start your journey.
              </p>
              <a
                href="/courses"
                className="btn-magnetic text-lg px-8 py-4 inline-flex items-center gap-3 no-underline"
              >
                Explore Courses →
              </a>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
