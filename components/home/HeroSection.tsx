'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import ParticleBackground from './ParticleBackground'
import TypewriterText from '@/components/ui/TypewriterText'
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/animations'
import { useMagneticButton } from '@/hooks/useMagneticButton'

const KnowledgeSphere = dynamic(() => import('./KnowledgeSphere'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center opacity-30">
      <div
        className="w-64 h-64 rounded-full border-2 border-coral-400 border-dashed animate-spin"
        style={{ animationDuration: '8s' }}
      />
    </div>
  ),
})

const TYPEWRITER_TEXTS = [
  'Generative AI',
  'Computer Architecture',
  'Data Science',
  'the Future',
]

export default function HeroSection() {
  const { ref: btnRef, handleMouseMove, handleMouseLeave } =
    useMagneticButton<HTMLAnchorElement>(0.3)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F7F5EE]">

      {/* Particle canvas */}
      <ParticleBackground color="#C04828" count={50} />

      {/* Halftone dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #2C2C2A 0.6px, transparent 0.6px)',
          backgroundSize: '9px 9px',
          opacity: 0.03,
        }}
        aria-hidden
      />


      {/* Corner halftone vignettes */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(216,90,48,0.08) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(44,44,42,0.05) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* ── Two-column grid ───────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24
                      grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">

        {/* LEFT — text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center"
        >
          {/* Name */}
          <motion.div variants={slideInLeft}>
            <h1 className="font-comic leading-[0.9] mb-2">
              <span
                className="block text-[clamp(2rem,5vw,4.5rem)] text-ink-900"
                style={{ WebkitTextStroke: '2px #2C2C2A', textShadow: '4px 4px 0 #D85A30' }}
              >
                DR. MUHAMMAD
              </span>
              <span
                className="block text-[clamp(3rem,8vw,6.5rem)] text-coral-400"
                style={{ WebkitTextStroke: '3px #2C2C2A', textShadow: '7px 7px 0 #2C2C2A' }}
              >
                USAMA
              </span>
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 my-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-ink-900/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-coral-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-ink-900/40" />
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={fadeUp} className="mb-2">
            <p className="font-body text-lg text-ink-600">Teaching</p>
            <div className="font-comic text-3xl sm:text-4xl text-coral-500 leading-tight">
              <TypewriterText texts={TYPEWRITER_TEXTS} />
            </div>
          </motion.div>

          {/* Affiliation */}
          <motion.p variants={fadeUp} className="font-body text-ink-400 text-sm mt-3 mb-8 max-w-sm leading-relaxed">
            National University of Computer and Emerging Sciences
            <span className="mx-2 text-coral-300">·</span>
            Assistant Professor
            <span className="mx-2 text-coral-300">·</span>
            Computer Science
          </motion.p>

          {/* CTA button */}
          <motion.div variants={fadeUp}>
            <a
              ref={btnRef}
              href="/courses"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="btn-magnetic text-base px-7 py-3.5 inline-flex items-center gap-3 no-underline"
            >
              Enter the Classroom Universe
              <span className="text-lg">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — 3-D Knowledge Sphere */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="relative hidden lg:flex items-center justify-center"
          style={{ height: 580, marginTop: '-40px' }}
        >

          {/* Three.js canvas */}
          <div className="w-full h-full">
            <KnowledgeSphere />
          </div>

          {/* Floating label chips */}
          {([
            { label: 'LLMs',         top: '12%',    left: '5%'   },
            { label: 'Transformers', top: '28%',    right: '3%'  },
            { label: 'RISC-V',       top: '52%',    left: '2%'   },
            { label: 'Data Science', bottom: '25%', right: '5%'  },
            { label: 'PyTorch',      bottom: '12%', left: '8%'   },
            { label: 'Attention',    top: '68%',    right: '7%'  },
          ] as Array<{ label: string } & React.CSSProperties>).map(({ label, ...pos }, i) => (
            <div key={label} className="absolute z-20 pointer-events-none" style={pos}>
              <div
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-ink-900/20 rounded-sm bg-[#F7F5EE]/80 text-ink-500 backdrop-blur-sm shadow-sm animate-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Diagonal bottom cut — classic comic-page panel transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10" aria-hidden>
        <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,64 L1440,0 L1440,64 Z" fill="#F7F5EE" />
          <path d="M0,64 L1440,0" stroke="#2C2C2A" strokeWidth="0.5" fill="none" opacity="0.15" />
        </svg>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
      >
        <div className="w-0.5 h-8 bg-gradient-to-b from-coral-400 to-transparent animate-bounce" />
        <span className="font-comic text-[10px] tracking-widest text-ink-400 uppercase">Scroll</span>
      </motion.div>

    </section>
  )
}
