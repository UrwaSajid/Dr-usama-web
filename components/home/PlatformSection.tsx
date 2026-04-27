'use client'
import { motion } from 'framer-motion'
import { fadeUp, slideInLeft, slideInRight, staggerContainer, scaleIn } from '@/lib/animations'

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Dr. Usama Uploads',
    desc: 'Lecture slides, research papers, video walkthroughs, and reference links go directly into the portal — organized by course and chapter.',
  },
  {
    step: '02',
    title: 'You Get Instant Access',
    desc: 'Content is filterable by type, searchable, and always up to date. No waiting, no cross-app hunting.',
  },
  {
    step: '03',
    title: 'Study on Your Terms',
    desc: 'Available any time — whether revising the night before or catching up on a missed lecture.',
  },
]

export default function PlatformSection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 border-y-4 border-coral-400 py-24 px-4">
      {/* Halftone texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #F7F5EE 0.7px, transparent 0.7px)',
          backgroundSize: '8px 8px',
        }}
        aria-hidden
      />

      {/* Decorative panel grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 bottom-0 left-[30%] w-px bg-white/[0.03]" />
        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-white/[0.03]" />
        <div className="absolute left-0 right-0 top-[50%] h-px bg-white/[0.03]" />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block bg-coral-400 text-ink-900 font-comic tracking-widest text-xs px-3 py-1 mb-6"
          >
            CHAPTER 01 — THE HUB
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-comic text-5xl sm:text-6xl lg:text-7xl text-white"
            style={{ textShadow: '4px 4px 0 #D85A30' }}
          >
            Welcome,{' '}
            <span className="text-coral-400">Students!</span>
          </motion.h2>
        </motion.div>

        {/* Two intro cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <motion.div
            variants={slideInLeft}
            className="border-2 border-coral-400/40 rounded p-7 hover:border-coral-400/70 transition-colors"
          >
            <p className="font-body text-ink-300 text-base leading-relaxed">
              This is your{' '}
              <span className="text-coral-400 font-bold">one-stop academic hub</span> — built so
              you never have to hunt across Google Classroom, LinkedIn, WhatsApp groups, or random
              email threads for what you need.
            </p>
          </motion.div>
          <motion.div
            variants={slideInRight}
            className="border-2 border-coral-400/40 rounded p-7 hover:border-coral-400/70 transition-colors"
          >
            <p className="font-body text-ink-300 text-base leading-relaxed">
              Everything Dr. Muhammad Usama teaches lives here. Lecture slides, research papers,
              assignment briefs, video walkthroughs, reference links, lab guides —{' '}
              <span className="text-coral-400 font-bold">
                organized by course, searchable, and always up to date.
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Callout bubble */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={scaleIn}
          className="relative border-4 border-coral-400 rounded bg-coral-400 px-8 py-7 mb-14 text-center"
        >
          <span className="absolute -top-3 left-8 bg-ink-900 px-3 py-0.5 font-comic text-coral-400 text-xs tracking-widest">
            THOUGHT BUBBLE
          </span>
          <p className="font-comic text-ink-900 text-2xl sm:text-3xl leading-snug">
            No more{' '}
            <em>&ldquo;where did sir post that PDF?&rdquo;</em>
            {' '}moments.
          </p>
        </motion.div>

        {/* Courses mention */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="font-body text-ink-300 text-base leading-relaxed max-w-3xl mx-auto">
            Whether you&apos;re in{' '}
            <span className="font-comic text-coral-400">Generative AI</span>,{' '}
            <span className="font-comic text-coral-400">Computer Architecture</span>, or{' '}
            <span className="font-comic text-coral-400">Data Science</span>{' '}
            — your course content, announcements, deadlines, and resources are right here, exactly
            where you left them.
          </p>
        </motion.div>

        {/* Ink divider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="flex items-center gap-4 justify-center mb-14"
        >
          <div className="h-px flex-1 max-w-[120px] bg-ink-700" />
          <span className="font-comic text-coral-400 text-xl">✦</span>
          <span className="font-comic text-white/60 text-xs tracking-widest uppercase px-2">How It Works</span>
          <span className="font-comic text-coral-400 text-xl">✦</span>
          <div className="h-px flex-1 max-w-[120px] bg-ink-700" />
        </motion.div>

        {/* How it works — 3 steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="border-2 border-ink-700 rounded p-7 relative group hover:border-coral-400 transition-colors duration-300"
            >
              <div className="font-comic text-6xl leading-none mb-4 text-white/10 group-hover:text-coral-400/30 transition-colors duration-300 select-none">
                {step}
              </div>
              <h3 className="font-comic text-white text-lg mb-2">{title}</h3>
              <p className="font-body text-ink-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="text-center border-t-2 border-ink-700 pt-12"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-ink-400 text-base leading-relaxed max-w-2xl mx-auto mb-10"
          >
            This platform is built for students, by someone who understands that your time matters
            and your learning shouldn&apos;t depend on digging through five different apps.
          </motion.p>
          <motion.p
            variants={scaleIn}
            className="font-comic text-2xl sm:text-3xl lg:text-4xl text-white"
            style={{ textShadow: '3px 3px 0 #D85A30' }}
          >
            Bookmark it.{' '}
            <span className="text-coral-400">Check it often.</span>{' '}
            Ace your courses.
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
