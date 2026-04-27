'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, PanInfo, useInView } from 'framer-motion'
import Link from 'next/link'

const TOTAL = 5
const CARD_H = 310

// ─── Stack animation per offset ──────────────────────────────
// x values are in pixels — set dynamically from container width
function getAnim(offset: number, cw: number) {
  if (offset <= -2) return { x: -(cw * 1.15), y: 0,  scale: 0.80, rotate: -4,  opacity: 0   }
  if (offset === -1) return { x: -(cw * 1.05), y: 0,  scale: 0.88, rotate: -2,  opacity: 0   }
  if (offset === 0)  return { x: 0,            y: -8, scale: 1,    rotate: 0,   opacity: 1   }
  if (offset === 1)  return { x: 14,           y: 0,  scale: 0.93, rotate: 1.5, opacity: 1   }
  if (offset === 2)  return { x: 24,           y: 4,  scale: 0.87, rotate: 3,   opacity: 1   }
  return                     { x: 32,          y: 8,  scale: 0.82, rotate: 4.5, opacity: 0.5 }
}

// ─── Shared primitives ────────────────────────────────────────
function PanelBadge({ num }: { num: string }) {
  return (
    <div className="absolute top-0 left-0 font-comic text-[10px] tracking-widest bg-ink-900 text-[#F7F5EE] px-2 py-0.5 z-20 leading-tight select-none">
      {num}
    </div>
  )
}

function Dots({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #2C2C2A 0.65px, transparent 0.65px)',
        backgroundSize: '9px 9px',
        opacity,
      }}
      aria-hidden
    />
  )
}

// ─── Card 1 — Welcome splash ──────────────────────────────────
function Card1() {
  return (
    <div className="relative w-full h-full bg-[#F7F5EE] flex">
      <PanelBadge num="#01" />
      <Dots />
      {/* Left text column */}
      <div className="flex flex-col justify-center pl-10 pr-6 pt-6 pb-6 w-[55%]">
        <span className="font-mono text-[9px] text-coral-500 tracking-widest uppercase mb-4 select-none">
          Vol. 01 — Issue #001
        </span>
        <h2 className="font-comic text-4xl sm:text-5xl text-ink-900 leading-[0.92]">
          Welcome,
        </h2>
        <h2 className="font-comic text-4xl sm:text-5xl text-coral-400 leading-[0.92]">
          Students!
        </h2>
        <div className="mt-5 h-[2px] w-16 bg-ink-900" />
        <p className="font-mono text-[9px] text-ink-400 mt-3 tracking-widest uppercase select-none">
          Swipe or use arrows →
        </p>
      </div>
      {/* Right decorative column */}
      <div className="flex-1 relative overflow-hidden border-l-2 border-ink-900/10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #D85A30 0.8px, transparent 0.8px)',
          backgroundSize: '12px 12px',
          opacity: 0.12,
        }} />
        {/* Large coral circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-2 border-coral-400/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-ink-900/10" />
        {/* Coral top strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-coral-400" />
      </div>
    </div>
  )
}

// ─── Card 2 — Mission (lined paper) ──────────────────────────
function Card2() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex"
      style={{
        backgroundColor: '#FEFDF7',
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #E2DDD0 27px, #E2DDD0 28px)',
        backgroundPositionY: '36px',
      }}
    >
      <PanelBadge num="#02" />
      {/* Margin line */}
      <div className="absolute top-0 bottom-0 left-10 w-px bg-coral-200" />
      <div className="pl-14 pr-10 py-8 flex flex-col justify-between w-full">
        <div>
          <span className="font-mono text-[9px] text-ink-400 tracking-widest uppercase block mb-4">
            Professor's Note
          </span>
          <p className="font-body italic text-ink-800 text-base leading-relaxed">
            "Everything I teach lives in one place — organized, searchable, and always up to date."
          </p>
        </div>
        {/* Ink stamp bottom-right */}
        <div className="flex justify-end">
          <div
            className="border-2 border-coral-400 px-4 py-1"
            style={{ transform: 'rotate(-4deg)' }}
          >
            <span className="font-mono text-xs text-coral-500 tracking-widest">★ OFFICIAL ★</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Card 3 — Empathy (inner monologue) ──────────────────────
function Card3() {
  return (
    <div className="relative w-full h-full bg-[#F7F5EE] overflow-hidden flex">
      <PanelBadge num="#03" />
      {/* Diagonal stripe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, transparent 0px, transparent 14px, rgba(216,90,48,0.05) 14px, rgba(216,90,48,0.05) 15px)',
        }}
        aria-hidden
      />
      <Dots opacity={0.025} />
      {/* Main content */}
      <div className="flex flex-col justify-center pl-8 pr-6 py-8 flex-1 pt-10">
        <div className="border-l-2 border-coral-400 pl-4">
          <span className="font-mono text-[9px] text-ink-500 tracking-widest uppercase block mb-2">
            Inner Monologue
          </span>
          <p className="font-body italic text-ink-700 text-sm leading-relaxed">
            "This platform is built for students, by someone who understands that your time matters — and your learning shouldn't depend on digging through five different apps."
          </p>
        </div>
      </div>
      {/* Professor silhouette column */}
      <div className="w-28 flex items-end justify-center pb-6 shrink-0">
        <svg viewBox="0 0 56 80" className="w-16 h-20" aria-hidden>
          <circle cx="28" cy="14" r="12" fill="#2C2C2A" fillOpacity="0.13" />
          <path d="M6 80 C6 52 50 52 50 80" fill="#2C2C2A" fillOpacity="0.13" />
          <rect x="9" y="34" width="38" height="7" rx="2" fill="#2C2C2A" fillOpacity="0.10" />
        </svg>
      </div>
    </div>
  )
}

// ─── Card 4 — Thought bubble panel ───────────────────────────
function Card4() {
  return (
    <div className="relative w-full h-full bg-coral-400 overflow-hidden">
      <PanelBadge num="#04" />
      <Dots opacity={0.07} />
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-6">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Wider thought bubble SVG for landscape */}
          <svg
            viewBox="0 0 420 240"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <ellipse cx="215" cy="108" rx="195" ry="88" fill="white" stroke="#2C2C2A" strokeWidth="3" />
            <circle cx="68"  cy="202" r="12" fill="white" stroke="#2C2C2A" strokeWidth="2.5" />
            <circle cx="48"  cy="218" r="8"  fill="white" stroke="#2C2C2A" strokeWidth="2" />
            <circle cx="34"  cy="230" r="5"  fill="white" stroke="#2C2C2A" strokeWidth="1.5" />
          </svg>
          <div className="relative z-10 text-center px-12 pb-10">
            <p className="font-comic text-xl text-ink-900 leading-snug">
              "No more{' '}
              <span className="text-coral-500">'where did sir post that PDF?'</span>{' '}
              moments."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Card 5 — CTA close panel ────────────────────────────────
function Card5() {
  return (
    <div className="relative w-full h-full bg-ink-900 overflow-hidden flex">
      <PanelBadge num="#05" />
      <Dots opacity={0.07} />
      {/* Left: heading */}
      <div className="flex flex-col justify-center pl-8 pt-8 pb-8 flex-1">
        <span className="font-mono text-[9px] text-coral-500 tracking-widest uppercase block mb-3">
          Final Word
        </span>
        <h3 className="font-comic text-3xl text-white leading-tight">
          Bookmark it.
        </h3>
        <h3 className="font-comic text-3xl text-white leading-tight">
          Check it often.
        </h3>
        <h3 className="font-comic text-3xl text-coral-400 leading-tight">
          Ace your courses.
        </h3>
      </div>
      {/* Right: chips, stamp, starburst */}
      <div className="w-44 shrink-0 flex flex-col justify-between items-start py-8 pr-6 pl-3 border-l border-ink-700 relative">
        {/* Starburst */}
        <svg viewBox="0 0 52 52" className="absolute top-2 right-2 w-10 h-10 fill-coral-400 opacity-70" aria-hidden>
          <path d="M26 0L28.5 19L46 10L34 26L52 26L34 28L46 42L28.5 33L26 52L23.5 33L6 42L18 28L0 26L18 24L6 10L23.5 19Z" />
        </svg>
        <div className="flex flex-col gap-2 mt-8">
          {[
            { label: 'Courses', href: '/courses' },
            { label: 'Updates', href: '/announcements' },
            { label: 'About',   href: '/about' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-comic text-[10px] px-2.5 py-1 border border-[#F7F5EE]/40 text-[#F7F5EE] hover:bg-coral-400 hover:border-coral-400 transition-colors no-underline shadow-[2px_2px_0_rgba(216,90,48,0.5)]"
            >
              {label} →
            </Link>
          ))}
        </div>
        <div
          className="border border-coral-400/50 px-3 py-1"
          style={{ transform: 'rotate(-3deg)' }}
        >
          <span className="font-mono text-[8px] text-coral-400 tracking-widest uppercase">
            ✦ End of Intro ✦
          </span>
        </div>
      </div>
    </div>
  )
}

const CARD_RENDERS = [Card1, Card2, Card3, Card4, Card5]

// ─── Main section ─────────────────────────────────────────────
export default function WelcomeStrip() {
  const [active, setActive]           = useState(0)
  const [entryDone, setEntryDone]     = useState(false)
  const [containerW, setContainerW]   = useState(600)
  const sectionRef                    = useRef<HTMLDivElement>(null)
  const containerRef                  = useRef<HTMLDivElement>(null)
  const isInView                      = useInView(sectionRef, { once: true, margin: '-80px' })

  // Measure card container width responsively
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setContainerW(entry.contentRect.width))
    ro.observe(el)
    setContainerW(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  // Mark entry stagger as done so swipes snap immediately
  useEffect(() => {
    if (!isInView || entryDone) return
    const t = setTimeout(() => setEntryDone(true), TOTAL * 80 + 700)
    return () => clearTimeout(t)
  }, [isInView, entryDone])

  const goTo = useCallback((i: number) => {
    setActive(Math.max(0, Math.min(TOTAL - 1, i)))
  }, [])

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(active + 1)
      if (e.key === 'ArrowLeft')  goTo(active - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, goTo])

  // Simple pointer drag (avoids Framer Motion drag prop conflicts)
  const dragStartX = useRef<number | null>(null)
  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onPointerUp(e: React.PointerEvent) {
    if (dragStartX.current === null) return
    const dx = e.clientX - dragStartX.current
    dragStartX.current = null
    if (dx < -60) goTo(active + 1)
    else if (dx > 60) goTo(active - 1)
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#2C2C2A] border-t-4 border-coral-400 overflow-hidden"
    >
      {/* Light paper halftone on dark bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #F7F5EE 0.45px, transparent 0.45px)',
          backgroundSize: '10px 10px',
          opacity: 0.02,
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-18
                      flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* ── Left column — sits in its own stacking context above cards ── */}
        <div
          className="lg:w-48 shrink-0 flex flex-row lg:flex-col justify-between
                     lg:sticky lg:top-24 relative z-20"
          style={{ alignSelf: 'flex-start' }}
        >
          <div>
            <span className="font-mono text-[10px] text-coral-400 tracking-widest uppercase block mb-2">
              From the desk of
            </span>
            <h2 className="font-comic text-3xl lg:text-4xl text-white leading-tight">
              The<br className="hidden lg:block" /> Professor
            </h2>
            <p className="font-body text-ink-400 text-xs mt-3 max-w-[150px] leading-relaxed hidden lg:block">
              A personal note before you dive in.
            </p>
          </div>

          {/* Nav controls */}
          <div className="flex lg:flex-col gap-3 items-center lg:items-start lg:mt-10">
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to card ${i + 1}`}
                  className="flex items-center py-1.5 px-0.5"
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-5 h-2 bg-coral-400'
                        : 'w-2 h-2 bg-ink-600 hover:bg-ink-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous card"
                className="w-9 h-9 border-2 border-ink-600 text-ink-400
                           hover:border-coral-400 hover:text-coral-400
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-150 flex items-center justify-center
                           hover:-translate-x-0.5 active:scale-95"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2L3 6L8 10" />
                </svg>
              </button>
              <button
                onClick={() => goTo(active + 1)}
                disabled={active === TOTAL - 1}
                aria-label="Next card"
                className="w-9 h-9 border-2 border-ink-600 text-ink-400
                           hover:border-coral-400 hover:text-coral-400
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-150 flex items-center justify-center
                           hover:translate-x-0.5 active:scale-95"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 2L9 6L4 10" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Card stack ── */}
        <div
          ref={containerRef}
          className="relative flex-1 select-none"
          style={{ height: CARD_H + 20 }}
        >
          {/* Drag capture layer — sits over cards, below left column */}
          <div
            className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { dragStartX.current = null }}
            aria-hidden
          />

          {CARD_RENDERS.map((CardComp, i) => {
            const offset = i - active
            const anim   = getAnim(offset, containerW)

            return (
              <motion.div
                key={i}
                className="absolute top-0 left-0 border-2 border-ink-900 overflow-hidden"
                style={{
                  width:     containerW || '100%',
                  height:    CARD_H,
                  zIndex:    offset === 0 ? 5 : Math.max(0, 4 - Math.abs(offset)),
                  boxShadow: offset === 0
                    ? '6px 6px 0 #D85A30'
                    : offset > 0
                    ? '3px 3px 0 rgba(44,44,42,0.5)'
                    : 'none',
                }}
                animate={
                  isInView
                    ? anim
                    : { x: containerW * 1.1, y: 0, scale: 0.9, rotate: 2, opacity: 0 }
                }
                initial={{ x: containerW * 1.1, y: 0, scale: 0.9, rotate: 2, opacity: 0 }}
                transition={{
                  type:      'spring',
                  stiffness: 260,
                  damping:   28,
                  delay:     isInView && !entryDone ? i * 0.08 : 0,
                }}
              >
                <CardComp />
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
