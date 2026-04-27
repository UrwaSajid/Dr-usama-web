'use client'
import { useRef, useCallback } from 'react'

interface TiltOptions {
  max?: number        // max tilt degrees
  perspective?: number
  scale?: number
  speed?: number
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const {
    max = 12,
    perspective = 1000,
    scale = 1.03,
    speed = 400,
  } = options

  const ref = useRef<T>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width  / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -max
    const rotateY = ((x - centerX) / centerX) *  max

    el.style.transition = `transform ${speed / 4}ms ease`
    el.style.transform = [
      `perspective(${perspective}px)`,
      `rotateX(${rotateX}deg)`,
      `rotateY(${rotateY}deg)`,
      `scale3d(${scale},${scale},${scale})`,
    ].join(' ')
  }, [max, perspective, scale, speed])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = `transform ${speed}ms ease`
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }, [speed])

  return { ref, handleMouseMove, handleMouseLeave }
}
