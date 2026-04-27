'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import Link from 'next/link'

// ─── Shared card texture ──────────────────────────────────────────────────────
function CardTexture() {
  return (
    <>
      {/* Horizontal ruled lines — start below the top margin */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(175,162,140,0.3) 27px, rgba(175,162,140,0.3) 28px)',
        backgroundPositionY: '52px',
      }} />
      {/* Red left margin line */}
      <div className="absolute top-0 bottom-0 left-11 w-px bg-red-300/40" />
      {/* Horizontal top margin line */}
      <div className="absolute top-11 left-0 right-0 h-px bg-[#DDD8CE]/70" />
      {/* Very subtle paper grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      }} />
    </>
  )
}

// ─── Card 01 — Welcome ────────────────────────────────────────────────────────
function Card01() {
  return (
    <div className="relative z-10 pl-16 pr-8 pt-3 pb-6 h-full flex flex-col justify-between">
      <span className="font-mono text-[9px] text-coral-500 uppercase tracking-widest">
        Vol. 01 — Issue #001
      </span>
      <div>
        <h3 className="font-comic text-[3.2rem] text-ink-900 leading-none"
          style={{ textShadow: '3px 3px 0 #D85A30' }}>
          Welcome,
        </h3>
        <h3 className="font-comic text-[3.2rem] text-coral-400 leading-none"
          style={{ textShadow: '3px 3px 0 #2C2C2A' }}>
          Students!
        </h3>
        <div className="flex items-center gap-3 mt-4">
          <div className="h-px w-8 bg-ink-900" />
          <span className="text-coral-400 text-sm">✦</span>
          <div className="h-px w-8 bg-ink-900" />
        </div>
        <p className="font-body text-ink-600 text-sm mt-3 leading-relaxed max-w-xs">
          Your one-stop classroom universe — everything in one place, no more app-hopping.
        </p>
      </div>
      <span className="font-mono text-[9px] text-ink-400 uppercase tracking-wider">
        Swipe or use arrows →
      </span>
    </div>
  )
}

// ─── Card 02 — Professor's note ──────────────────────────────────────────────
function Card02() {
  return (
    <div className="relative z-10 pl-16 pr-8 pt-3 pb-6 h-full flex flex-col justify-between">
      <span className="font-mono text-[9px] text-coral-500 uppercase tracking-widest">
        Professor's Note
      </span>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-[4rem] text-coral-200/70 leading-none -ml-2 -mb-4 select-none pointer-events-none"
          style={{ fontFamily: 'Georgia, serif' }} aria-hidden>"</div>
        <p className="font-body text-ink-800 text-base leading-relaxed font-medium">
          Everything I teach lives in{' '}
          <span className="text-coral-600 font-bold underline decoration-dashed decoration-coral-400 underline-offset-2">
            one place
          </span>
          {' '}— organized, searchable, and always up to date.
        </p>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-ink-900 text-base">Dr. Usama</div>
          <div className="h-px w-20 bg-ink-300 mt-0.5" />
          <span className="font-mono text-[9px] text-ink-400 uppercase tracking-wider mt-0.5 block">
            Asst. Professor · UAF
          </span>
        </div>
        <div className="font-mono text-[9px] tracking-widest uppercase border border-coral-400 text-coral-500 px-2 py-1"
          style={{ transform: 'rotate(-3deg)' }}>
          ★ Official ★
        </div>
      </div>
    </div>
  )
}

// ─── Card 03 — The 5-app problem ─────────────────────────────────────────────
function Card03() {
  return (
    <div className="relative z-10 pl-16 pr-8 pt-3 pb-6 h-full flex flex-col justify-between">
      <span className="font-mono text-[9px] text-coral-500 uppercase tracking-widest">
        Before This Platform
      </span>
      <div className="flex-1 flex flex-col justify-center gap-2.5 my-2">
        {['📧 Email', '💬 WhatsApp', '🔗 LinkedIn', '📁 Google Drive', '🏫 Google Classroom'].map(app => (
          <div key={app} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-red-100 border border-red-300 flex items-center justify-center flex-shrink-0">
              <span className="text-red-400 text-[8px] font-bold">✕</span>
            </div>
            <span className="font-body text-sm text-ink-400 line-through decoration-red-300 decoration-2">{app}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 border-t border-coral-200 pt-3">
        <div className="w-4 h-4 rounded-full bg-coral-400 border border-ink-900 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[8px] font-bold">✓</span>
        </div>
        <span className="font-comic text-sm text-coral-700">This Platform. One place. Done.</span>
      </div>
    </div>
  )
}

// ─── Card 04 — The solution ───────────────────────────────────────────────────
function Card04() {
  return (
    <div className="relative z-10 pl-16 pr-8 pt-3 pb-6 h-full flex flex-col justify-between">
      <span className="font-mono text-[9px] text-coral-500 uppercase tracking-widest">
        The Solution
      </span>
      <p className="font-comic text-xl text-ink-900 leading-snug">
        No more{' '}
        <span className="text-coral-500 italic">"where did sir post that PDF?"</span>{' '}
        moments.
      </p>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {[
          { icon: '🔍', title: 'Searchable',  desc: 'Find any lecture or resource instantly' },
          { icon: '📌', title: 'Organized',   desc: 'Chapters and modules, not scattered chaos' },
          { icon: '🔔', title: 'Up to date',  desc: 'Announcements and updates in real-time' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
            <div>
              <div className="font-comic text-sm text-ink-900 leading-tight">{title}</div>
              <div className="font-body text-xs text-ink-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Card 05 — CTA ───────────────────────────────────────────────────────────
function Card05() {
  return (
    <div className="relative z-10 pl-16 pr-8 pt-3 pb-5 h-full flex flex-col justify-between">
      <span className="font-mono text-[9px] text-coral-500 uppercase tracking-widest">
        Final Word
      </span>
      <p className="font-comic text-2xl text-ink-900 leading-tight"
        style={{ textShadow: '2px 2px 0 #D85A30' }}>
        Bookmark it.<br />Check it often.<br />
        <span className="text-coral-400">Ace your courses.</span>
      </p>
      <div className="flex flex-col gap-2">
        {[
          { emoji: '🤖', label: 'Generative AI',         href: '/courses/generative-ai' },
          { emoji: '⚙️', label: 'Computer Architecture', href: '/courses/computer-architecture' },
          { emoji: '📊', label: 'Data Science',          href: '/courses/data-science' },
        ].map(({ emoji, label, href }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 border border-ink-200 px-3 py-1.5 bg-white/80
                       hover:border-coral-400 hover:bg-coral-50/80 transition-all group no-underline
                       shadow-[2px_2px_0_rgba(44,44,42,0.12)]">
            <span className="text-sm">{emoji}</span>
            <span className="font-comic text-sm text-ink-800 group-hover:text-coral-600 transition-colors flex-1">{label}</span>
            <span className="font-mono text-[9px] text-ink-300 group-hover:text-coral-400 transition-colors">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Card registry ────────────────────────────────────────────────────────────
const CARDS = [Card01, Card02, Card03, Card04, Card05]
const TOTAL  = CARDS.length

// ─── Arrow button ─────────────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick, disabled }: { dir: 'prev' | 'next'; onClick: () => void; disabled: boolean }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticButton<HTMLButtonElement>(0.3)
  return (
    <button
      ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      onClick={onClick} disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous card' : 'Next card'}
      className="w-9 h-9 flex items-center justify-center border-2 border-ink-700
                 text-ink-400 transition-all hover:border-coral-400 hover:text-coral-400
                 hover:shadow-[2px_2px_0_#D85A30] disabled:opacity-20 disabled:cursor-not-allowed
                 disabled:hover:border-ink-700 disabled:hover:text-ink-400 disabled:hover:shadow-none"
    >
      {dir === 'prev' ? '←' : '→'}
    </button>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function WelcomeCards() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.08 })
  const [active, setActive] = useState(0)
  const [swipeDir, setSwipeDir] = useState<1 | -1>(1)

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx))
    if (clamped === active) return
    setSwipeDir(clamped > active ? 1 : -1)
    setActive(clamped)
  }, [active])

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') goTo(active + 1)
    if (e.key === 'ArrowLeft')  goTo(active - 1)
  }

  return (
    <section
      className="relative bg-ink-900 border-t-4 border-coral-400 overflow-hidden"
      aria-label="Welcome from the Professor"
    >
      {/* Subtle bg dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden
        style={{ backgroundImage: 'radial-gradient(#D85A30 0.4px,transparent 0.4px)', backgroundSize: '14px 14px', opacity: 0.03 }} />

      <div ref={sectionRef} className="relative max-w-7xl mx-auto flex flex-col md:flex-row min-h-[480px]">

        {/* ── LEFT: static header + nav ───────────────────────── */}
        <div className="md:w-[320px] shrink-0 flex flex-col justify-between
                        px-10 py-12 border-b-2 md:border-b-0 md:border-r-2 border-ink-700/40">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chapter-label text-coral-400 block mb-2">From the Desk of</span>
            <h2 className="font-comic text-5xl sm:text-6xl text-white leading-none"
              style={{ textShadow: '4px 4px 0 #D85A30' }}>
              The<br />Professor
            </h2>
            <p className="font-body text-ink-400 text-sm mt-4 leading-relaxed max-w-[200px]">
              A personal note before you dive in.
            </p>
          </motion.div>

          {/* Nav controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col gap-4 mt-10 md:mt-0"
          >
            <div className="flex items-center gap-3">
              <ArrowBtn dir="prev" onClick={() => goTo(active - 1)} disabled={active === 0} />
              <span className="font-mono text-sm text-ink-500 w-14 text-center tabular-nums select-none">
                {String(active + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </span>
              <ArrowBtn dir="next" onClick={() => goTo(active + 1)} disabled={active === TOTAL - 1} />
            </div>

            {/* Dot strip */}
            <div className="flex items-center gap-1.5">
              {CARDS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Card ${i + 1}`}
                  animate={{
                    width:      i === active ? 28 : 8,
                    background: i === active ? '#D85A30' : '#444441',
                  }}
                  transition={{ duration: 0.22 }}
                  className="h-2 rounded-full border border-ink-700"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: cue card stack ────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            style={{ maxWidth: 500, height: 320, perspective: '1000px' }}
          >

            {/* ── Ghost cards — create the "stapled stack" depth ── */}
            {/* Bottom card */}
            <div className="absolute inset-0 rounded-[2px]" style={{
              background: '#E2DDCA',
              border: '1px solid rgba(140,130,110,0.35)',
              transform: 'rotate(3.8deg) translate(10px, 10px)',
              boxShadow: '0 3px 12px rgba(0,0,0,0.38)',
            }} />
            {/* Middle card */}
            <div className="absolute inset-0 rounded-[2px]" style={{
              background: '#EDEAD8',
              border: '1px solid rgba(155,145,125,0.35)',
              transform: 'rotate(1.9deg) translate(5px, 5px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.28)',
            }} />

            {/* ── Metal staple ── */}
            <div className="absolute -top-px left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
              {/* Crown */}
              <div className="w-9 h-[5px] rounded-[1.5px]" style={{
                background: 'linear-gradient(180deg, #C8CDD3 0%, #7E8389 55%, #6A6F75 100%)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                border: '0.5px solid #5A5F65',
              }} />
              {/* Legs */}
              <div className="flex justify-between w-[28px]">
                <div className="w-[2px] h-[7px]" style={{ background: 'linear-gradient(180deg,#7E8389,#5A5F65)' }} />
                <div className="w-[2px] h-[7px]" style={{ background: 'linear-gradient(180deg,#7E8389,#5A5F65)' }} />
              </div>
            </div>

            {/* ── Active cue card ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0 rounded-[2px] overflow-hidden bg-[#FDFCF5]
                           cursor-pointer select-none outline-none"
                style={{
                  border: '1px solid rgba(155,145,125,0.5)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.22)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                initial={{ rotateY: swipeDir > 0 ? 90 : -90 }}
                animate={{ rotateY: 0 }}
                exit={{    rotateY: swipeDir > 0 ? -90 : 90 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => goTo((active + 1) % TOTAL)}
                onKeyDown={handleKey}
                tabIndex={0}
                role="button"
                aria-label={`Card ${active + 1} of ${TOTAL} — click to flip`}
              >
                <CardTexture />
                {(() => { const C = CARDS[active]; return <C /> })()}
              </motion.div>
            </AnimatePresence>

          </motion.div>
        </div>

      </div>

      {/* Swipe hint */}
      <motion.p
        initial={{ opacity: 0.45 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1.2 }}
        className="absolute bottom-3 right-6 font-mono text-[9px] text-ink-700 uppercase tracking-widest pointer-events-none"
        aria-hidden
      >
        click card to flip →
      </motion.p>
    </section>
  )
}
