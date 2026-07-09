'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const range = doc.scrollHeight - doc.clientHeight
      setProgress(range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-accent z-[60] pointer-events-none transition-[width] duration-100 ease-linear"
      style={{ width: `${progress * 100}%` }}
    />
  )
}
