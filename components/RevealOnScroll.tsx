'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  index?: number
  className?: string
}

// Reveal générique au scroll : opacity 0→1, translateY 28px→0, 700ms
// cubic-bezier(.16,1,.3,1), cascade de 70ms par index. S'appuie sur
// whileInView de Framer Motion (déjà une dépendance) plutôt que sur un
// IntersectionObserver écrit à la main — même idiome, sans dupliquer la
// logique d'observation dans chaque composant.
export default function RevealOnScroll({ children, index = 0, className }: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
