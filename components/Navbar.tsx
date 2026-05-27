'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 transition-all duration-500 ${
        scrolled
          ? 'bg-ebene/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link href="/" className="font-cormorant text-2xl font-light tracking-[0.12em] text-blanc">
          Mathieu<span className="text-sable font-normal">&amp;</span>Co
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/#projets"
            className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-blanc/60 hover:text-sable transition-colors duration-300"
          >
            Projets
          </Link>
          <Link
            href="/#studio"
            className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-blanc/60 hover:text-sable transition-colors duration-300"
          >
            Studio
          </Link>
          <a
            href="mailto:mathieu.co.studio@gmail.com"
            className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-sable border border-sable/40 px-5 py-2.5 hover:bg-sable hover:text-ebene transition-all duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
