'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const raf     = useRef<number>(0)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top  = `${e.clientY}px`
      }
    }

    function onDown() {
      dotRef.current?.style.setProperty('width', '8px')
      dotRef.current?.style.setProperty('height', '8px')
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(0.75)')
    }

    function onUp() {
      dotRef.current?.style.setProperty('width', '12px')
      dotRef.current?.style.setProperty('height', '12px')
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)')
    }

    function onLinkEnter() {
      dotRef.current?.style.setProperty('width', '6px')
      dotRef.current?.style.setProperty('height', '6px')
      ringRef.current?.style.setProperty('width', '52px')
      ringRef.current?.style.setProperty('height', '52px')
      ringRef.current?.style.setProperty('opacity', '0.8')
    }

    function onLinkLeave() {
      dotRef.current?.style.setProperty('width', '12px')
      dotRef.current?.style.setProperty('height', '12px')
      ringRef.current?.style.setProperty('width', '36px')
      ringRef.current?.style.setProperty('height', '36px')
      ringRef.current?.style.setProperty('opacity', '0.5')
    }

    // Smooth ring follow
    function animate() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top  = `${ring.current.y}px`
      }
      raf.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onLinkEnter)
      el.addEventListener('mouseleave', onLinkLeave)
    })

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="custom-cursor" aria-hidden />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden />
    </>
  )
}
