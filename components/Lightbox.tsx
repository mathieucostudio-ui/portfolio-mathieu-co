'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { DriveImage } from '@/lib/drive'

interface LightboxProps {
  images: DriveImage[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex)

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : images.length - 1))
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((c) => (c < images.length - 1 ? c + 1 : 0))
  }, [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-ebene/97 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 font-montserrat text-[10px] tracking-[0.3em] uppercase text-blanc/40 hover:text-sable transition-colors z-10 flex items-center gap-2"
      >
        Fermer <span className="text-lg">×</span>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-8 font-montserrat text-[10px] tracking-[0.25em] uppercase text-blanc/30">
        {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35 }}
          className="relative w-full h-full max-w-5xl max-h-[80vh] mx-auto px-16"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[current].url}
            alt={images[current].name}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/10 text-blanc/50 hover:border-sable hover:text-sable transition-all duration-300"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/10 text-blanc/50 hover:border-sable hover:text-sable transition-all duration-300"
          >
            →
          </button>
        </>
      )}

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 px-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className={`h-0.5 transition-all duration-300 ${
                i === current ? 'w-8 bg-sable' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
