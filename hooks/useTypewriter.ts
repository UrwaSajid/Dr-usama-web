'use client'
import { useState, useEffect } from 'react'

export function useTypewriter(
  texts: string[],
  { speed = 60, pauseMs = 1800, deleteSpeed = 35 } = {}
) {
  const [displayed, setDisplayed]   = useState('')
  const [textIndex, setTextIndex]   = useState(0)
  const [charIndex, setCharIndex]   = useState(0)
  const [deleting, setDeleting]     = useState(false)

  useEffect(() => {
    const current = texts[textIndex] ?? ''

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1))
          setCharIndex(i => i + 1)
        } else {
          // pause then start deleting
          setTimeout(() => setDeleting(true), pauseMs)
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1))
          setCharIndex(i => i - 1)
        } else {
          setDeleting(false)
          setTextIndex(i => (i + 1) % texts.length)
        }
      }
    }, deleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, textIndex, texts, speed, pauseMs, deleteSpeed])

  return displayed
}
