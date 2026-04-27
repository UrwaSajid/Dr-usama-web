import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CourseGrid from '@/components/courses/CourseGrid'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { listCourses } from '@/lib/db/courses'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'All courses by Dr. Muhammad Usama — Generative AI, Computer Architecture, Data Science.',
}

export default async function CoursesPage() {
  const courses = await listCourses(true)

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-32">
        {/* Page header */}
        <div className="bg-ink-900 border-b-4 border-coral-400 py-10 sm:py-16 px-4 mb-10 sm:mb-16 relative overflow-hidden">
          {/* Halftone bg */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #F7F5EE 0.7px, transparent 0.7px)',
              backgroundSize: '8px 8px',
            }}
            aria-hidden
          />
          <ScrollReveal threshold={0}>
            <div className="max-w-7xl mx-auto relative">
              <div className="panel-number" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>
                The Classroom Universe
              </div>
              <h1
                className="font-comic text-4xl sm:text-5xl lg:text-7xl text-white mt-2"
                style={{ textShadow: '4px 4px 0 #D85A30' }}
              >
                All Courses
              </h1>
              <p className="font-body text-ink-300 text-lg mt-3 max-w-xl">
                Select a panel to enter its world. Each course is a complete story — from first principles to advanced mastery.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <CourseGrid courses={courses} />
          </ScrollReveal>

          {!courses.length && (
            <div className="text-center py-24">
              <p className="font-comic text-4xl text-ink-200 mb-2">Coming Soon</p>
              <p className="font-body text-ink-400">New courses are being prepared. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
