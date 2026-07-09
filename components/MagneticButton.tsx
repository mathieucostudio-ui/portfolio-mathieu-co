'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MouseEvent, ReactNode, useRef, useState } from 'react'

const MotionLink = motion(Link)

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  href?: string
}

// CTA magnétique : le bouton (ou lien, si `href` est fourni) suit le
// curseur avec un facteur d'amortissement (~0.3), revient au centre au
// mouseleave.
const DAMPING = 0.3

export default function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setOffset({
      x: (e.clientX - centerX) * DAMPING,
      y: (e.clientY - centerY) * DAMPING,
    })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  const shared = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: offset.x, y: offset.y },
    transition: { type: 'spring' as const, stiffness: 150, damping: 12, mass: 0.5 },
    className,
  }

  if (href) {
    return (
      <MotionLink ref={ref} href={href} {...shared}>
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button ref={ref} type={type} onClick={onClick} {...shared}>
      {children}
    </motion.button>
  )
}
