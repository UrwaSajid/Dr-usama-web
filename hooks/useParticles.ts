'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  radius: number; opacity: number
}

interface ParticleOptions {
  count?: number
  color?: string
  connectionDistance?: number
  speed?: number
}

export function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: ParticleOptions = {}
) {
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  const {
    count = 80,
    color = '#D85A30',
    connectionDistance = 130,
    speed = 0.4,
  } = options

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let W = 0, H = 0

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth
      H = canvas!.height = canvas!.offsetHeight
    }

    function init() {
      resize()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }))
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy

        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        // Draw dot
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = color + Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx!.fill()

        // Connect nearby particles + mouse
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(q.x, q.y)
            const alpha = (1 - dist / connectionDistance) * 0.25
            ctx!.strokeStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0')
            ctx!.lineWidth = 0.8
            ctx!.stroke()
          }
        }

        // Mouse proximity
        const mx = mouseRef.current.x, my = mouseRef.current.y
        const md = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
        if (md < 160) {
          ctx!.beginPath()
          ctx!.moveTo(p.x, p.y)
          ctx!.lineTo(mx, my)
          const alpha = (1 - md / 160) * 0.5
          ctx!.strokeStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0')
          ctx!.lineWidth = 1
          ctx!.stroke()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    init()
    draw()

    window.addEventListener('resize', init)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', init)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [count, color, connectionDistance, speed, canvasRef])
}
