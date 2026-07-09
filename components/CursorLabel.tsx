'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MouseEvent, ReactNode, useState } from 'react'

interface CursorLabelProps {
  children: ReactNode
  label: string
  className?: string
}

// Label qui suit la souris au survol d'un conteneur (carte projet, carte
// article) — "Voir le projet →", "Lire l'article →".
export default function CursorLabel({ children, label, className }: CursorLabelProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      className={`relative ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ left: pos.x, top: pos.y }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-ink text-paper font-ui text-[11px] tracking-[0.08em] uppercase px-3 py-2"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
