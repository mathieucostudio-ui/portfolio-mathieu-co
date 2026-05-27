'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import { DriveImage } from '@/lib/drive'

interface GalerieProps {
  images: DriveImage[]
  allImages?: DriveImage[]
  heroCount?: number
}

export default function Galerie({ images, allImages, heroCount = 0 }: GalerieProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  // Use allImages in lightbox if provided (for unified navigation across hero + gallery)
  const lightboxImages = allImages && allImages.length > 0 ? allImages : images
  const offset = allImages ? heroCount : 0

  if (images.length === 0) return null

  const featured = images[0]
  const secondary = images.slice(1, 3)
  const rest = images.slice(3)

  return (
    <section className="py-16 px-8 md:px-16 bg-ebene">
      <div className="max-w-screen-xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-sable mb-10"
        >
          Galerie images
        </motion.p>

        {/* Hero + 2 vignettes */}
        <div className="flex gap-2 mb-2 h-[60vh]">
          {/* Featured — 60% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-[60%] cursor-pointer overflow-hidden group"
            onClick={() => setLightboxIndex(offset + 0)}
          >
            <Image
              src={featured.url}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="60vw"
            />
            <div className="absolute inset-0 bg-ebene/0 group-hover:bg-ebene/20 transition-all duration-500" />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-blanc bg-ebene/60 backdrop-blur-sm px-3 py-1.5">
                Agrandir
              </span>
            </div>
          </motion.div>

          {/* Two thumbnails — 40% stacked */}
          <div className="flex flex-col gap-2 w-[40%]">
            {secondary.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}
                className="relative flex-1 cursor-pointer overflow-hidden group"
                onClick={() => setLightboxIndex(offset + i + 1)}
              >
                <Image
                  src={img.url}
                  alt={img.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="40vw"
                />
                <div className="absolute inset-0 bg-ebene/0 group-hover:bg-ebene/20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rest grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {rest.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="relative aspect-[4/3] cursor-pointer overflow-hidden group"
                onClick={() => setLightboxIndex(offset + i + 3)}
              >
                <Image
                  src={img.url}
                  alt={img.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-ebene/0 group-hover:bg-ebene/20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
