'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroProps {
  heroImageUrl: string
}

const stats = [
  { value: '09', label: 'Projets réalisés' },
  { value: '05+', label: 'Années d\'expérience' },
  { value: '2', label: 'Pays d\'intervention' },
]

export default function Hero({ heroImageUrl }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt="Mathieu&Co — Architecture & Design d'Intérieur"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-charbon via-ebene to-[#0d0d0d]" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ebene/85 via-ebene/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ebene via-transparent to-ebene/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-16 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl"
        >
          <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-sable mb-6">
            Studio d'Architecture · Cotonou, Bénin
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl font-light leading-[1.05] text-blanc mb-8">
            Architecture
            <br />
            <span className="italic text-sable">&amp; Design</span>
            <br />
            d'Intérieur
          </h1>
          <p className="font-montserrat text-sm font-light text-blanc/50 max-w-md leading-relaxed">
            Espaces contemporains africains alliant matériaux locaux, lumière naturelle et esthétique épurée.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="flex gap-12 mt-16 pt-8 border-t border-white/10"
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-cormorant text-4xl font-light text-sable">{stat.value}</p>
              <p className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-blanc/40 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-blanc/30 rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-sable/60 to-transparent" />
      </motion.div>
    </section>
  )
}
