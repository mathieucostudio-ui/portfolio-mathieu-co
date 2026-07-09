'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-10 py-[22px] transition-all duration-300 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-md border-b border-hairline'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link href="/" className="font-display italic font-medium text-[21px] leading-none text-ink">
          Mathieu&amp;Co
        </Link>

        <div className="hidden md:flex items-center gap-8 flex-wrap">
          <Link
            href="/#sommaire"
            className="font-ui font-medium text-xs tracking-[0.1em] uppercase text-ink hover:text-accent transition-colors duration-300"
          >
            Projets
          </Link>
          <Link
            href="/#studio"
            className="font-ui font-medium text-xs tracking-[0.1em] uppercase text-ink hover:text-accent transition-colors duration-300"
          >
            Studio
          </Link>
          <Link
            href="/journal"
            className="font-ui font-medium text-xs tracking-[0.1em] uppercase text-ink hover:text-accent transition-colors duration-300"
          >
            Journal
          </Link>
          <Link
            href="/contact"
            className="font-ui font-medium text-xs tracking-[0.1em] uppercase text-ink hover:text-accent transition-colors duration-300"
          >
            Contact
          </Link>
          <span className="font-mono text-[11px] tracking-[0.08em] text-ink-40 pl-2 border-l border-hairline">
            FR&nbsp;/&nbsp;EN
          </span>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}
