import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChapterList from '@/components/courses/ChapterList'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ComicDivider from '@/components/ui/ComicDivider'
import AnnouncementFeed from '@/components/announcements/AnnouncementFeed'
import { getCourse } from '@/lib/db/courses'
import { listAnnouncements } from '@/lib/db/announcements'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await getCourse(params.slug)
  if (!course) return { title: 'Course Not Found' }
  return {
    title: course.title,
    description: course.description ?? undefined,
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const [course, announcements] = await Promise.all([
    getCourse(params.slug),
    listAnnouncements(),
  ])

  if (!course) notFound()

  const publishedChapters = (course.chapters ?? [])
    .filter(c => c.is_published)
    .sort((a, b) => a.position - b.position)

  const courseAnnouncements = announcements.filter(
    a => a.course_id === course.id || !a.course_id
  ).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero banner */}
        <div
          className="relative py-20 px-4 border-b-4 border-ink-900 overflow-hidden"
          style={{ background: course.color + '18' }}
        >
          {/* Halftone */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, ${course.color} 0.8px, transparent 0.8px)`,
              backgroundSize: '7px 7px',
            }}
            aria-hidden
          />

          {/* Panel number strip */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ background: course.color }}
          />

          <ScrollReveal threshold={0}>
          <div className="max-w-5xl mx-auto relative">
            <div className="inline-block bg-ink-900 text-[#F7F5EE] font-comic text-xs tracking-widest px-3 py-1 mb-4">
              Panel #{String(course.panel_number ?? 1).padStart(2, '0')} — {course.subtitle ?? 'Course'}
            </div>

            <h1
              className="font-comic text-5xl sm:text-7xl text-ink-900 leading-tight"
              style={{ textShadow: `4px 4px 0 ${course.color}` }}
            >
              {course.title}
            </h1>

            {course.subtitle && (
              <p className="font-body text-lg mt-2 font-bold uppercase tracking-wide" style={{ color: course.color }}>
                {course.subtitle}
              </p>
            )}

            <p className="font-body text-ink-600 text-base mt-4 max-w-2xl leading-relaxed">
              {course.description}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { label: 'Chapters',  val: publishedChapters.length },
                {
                  label: 'Resources',
                  val: publishedChapters.reduce((acc, ch) => acc + (ch.resources?.filter(r => r.is_published).length ?? 0), 0),
                },
                { label: 'Instructor', val: course.professor?.full_name ?? 'Dr. Muhammad Usama' },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="border-2 border-ink-900 rounded px-4 py-2 bg-white shadow-ink-sm text-center"
                >
                  <div className="chapter-label">{label}</div>
                  <div className="font-comic text-lg text-ink-900">{val}</div>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        </div>

        {/* Content area */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main: chapters */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="mb-8">
                  <span className="chapter-label block mb-1">The Story So Far</span>
                  <h2
                    className="font-comic text-4xl text-ink-900"
                    style={{ textShadow: '2px 2px 0 #D85A30' }}
                  >
                    Chapters
                  </h2>
                </div>
              </ScrollReveal>

              {publishedChapters.length ? (
                <ScrollReveal delay={0.1} threshold={0.05}>
                  <ChapterList chapters={publishedChapters} courseColor={course.color} />
                </ScrollReveal>
              ) : (
                <div className="comic-panel p-10 text-center">
                  <p className="font-comic text-2xl text-ink-300">Chapters coming soon…</p>
                </div>
              )}
            </div>

            {/* Sidebar: announcements */}
            <div className="lg:col-span-1">
              <ScrollReveal animation="slideRight">
                <div className="sticky top-24">
                  <div className="mb-6">
                    <span className="chapter-label block mb-1">Updates</span>
                    <h3 className="font-comic text-2xl text-ink-900">Announcements</h3>
                  </div>
                  {courseAnnouncements.length ? (
                    <div className="space-y-4">
                      {courseAnnouncements.map(ann => (
                        <div key={ann.id} className="speech-bubble text-sm">
                          <div className="font-comic text-ink-900 text-sm mb-1">{ann.title}</div>
                          <p className="font-body text-ink-600 text-xs leading-relaxed line-clamp-3">{ann.body}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-body text-sm text-ink-400">No announcements yet.</p>
                  )}

                  <ComicDivider className="my-6" />

                  {/* Back link */}
                  <a
                    href="/courses"
                    className="font-comic text-sm text-ink-500 hover:text-coral-500 transition-colors flex items-center gap-2"
                  >
                    ← All Courses
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
