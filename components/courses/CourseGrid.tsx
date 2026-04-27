'use client'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'
import CourseCard from './CourseCard'
import type { Course } from '@/types/course'

interface CourseGridProps {
  courses: Course[]
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (!courses.length) {
    return (
      <div className="text-center py-24">
        <p className="font-comic text-3xl text-ink-300">No courses yet</p>
        <p className="font-body text-ink-400 mt-2">Check back soon!</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </motion.div>
  )
}
