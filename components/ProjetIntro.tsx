'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Projet } from '@/lib/projets'
import { DriveImage } from '@/lib/drive'
import Lightbox from './Lightbox'

interface ProjetIntroProps {
  projet: Projet
  heroImage: DriveImage | null
  allImages?: DriveImage[]
}

export default function ProjetIntro({ projet, heroImage, allImages }: ProjetIntroProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const lightboxImages = allImages && allImages.length > 0 ? allImages : heroImage ? [heroImage] : []

  return (
    <section className="min-h-screen flex flex-col md:flex-row pt-0">
      {/* Left panel — 40% — Info */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full md:w-[40%] bg-charbon flex flex-col justify-between px-10 md:px-14 py-32 min-h-[60vh] md:min-h-screen"
      >
        {/* Back */}
        <Link
          href="/#projets"
          className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-blanc/30 hover:text-sable transition-colors duration-300 flex items-center gap-3"
        >
          <span>←</span> Retour
        </Link>

        {/* Project info */}
        <div className="flex-1 flex flex-col justify-center py-16">
          <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-sable mb-6">
            {projet.num} / 10
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-blanc leading-tight mb-2">
            {projet.titre}
          </h1>
          <p className="font-cormorant text-xl italic text-sable/70 mb-12">
            {projet.lieu}
          </p>

          <div className="space-y-6 mb-12">
            <div>
              <p className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-blanc/30 mb-1">
                Type
              </p>
              <p className="font-montserrat text-sm text-blanc/70">{projet.type}</p>
            </div>
            <div>
              <p className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-blanc/30 mb-1">
                Programme
              </p>
              <p className="font-montserrat text-sm text-blanc/70">{projet.palette}</p>
            </div>
          </div>

          <p className="font-montserrat text-sm font-light text-blanc/50 leading-relaxed max-w-sm">
            {projet.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10">
            {projet.tags.map((tag) => (
              <span
                key={tag}
                className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-sable/60 border border-sable/20 px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Studio branding */}
        <p className="font-montserrat text-[9px] tracking-[0.25em] uppercase text-blanc/20">
          Mathieu&amp;Co · Studio
        </p>
      </motion.div>

      {/* Right panel — 60% — Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
        className={`w-full md:w-[60%] relative min-h-[50vh] md:min-h-screen group${lightboxImages.length > 0 ? ' cursor-zoom-in' : ''}`}
        onClick={() => lightboxImages.length > 0 && setLightboxOpen(true)}
      >
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={`${projet.titre} — ${projet.lieu}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : (
          <div className="w-full h-full img-placeholder" />
        )}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charbon/20 group-hover:to-charbon/30 transition-all duration-500" />
        {lightboxImages.length > 0 && (
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-blanc bg-ebene/60 backdrop-blur-sm px-3 py-1.5">
              Agrandir
            </span>
          </div>
        )}
      </motion.div>

      {lightboxOpen && lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          initialIndex={0}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  )
}
