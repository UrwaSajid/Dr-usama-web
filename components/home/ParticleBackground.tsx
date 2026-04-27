'use client'
import { useRef } from 'react'
import { useParticles } from '@/hooks/useParticles'

interface ParticleBackgroundProps {
  color?: string
  count?: number
  className?: string
}

export default function ParticleBackground({
  color = '#D85A30',
  count = 70,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticles(canvasRef, { color, count, connectionDistance: 120, speed: 0.35 })

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden
    />
  )
}
