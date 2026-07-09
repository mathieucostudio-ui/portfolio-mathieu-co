'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import RevealOnScroll from './RevealOnScroll'
import { DriveImage } from '@/lib/drive'

interface GalerieProps {
  images: DriveImage[]
}

export default function Galerie({ images }: GalerieProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <div className="px-10 pb-24">
      <div className="grid grid-cols-4 gap-2.5">
        {images.map((img, i) => (
          <RevealOnScroll
            key={img.id}
            index={i}
            className={i % 5 === 0 ? 'col-span-2' : 'col-span-1'}
          >
            <button
              onClick={() => setLightboxIndex(i)}
              className="relative w-full h-[260px] p-0 border-none cursor-pointer overflow-hidden"
            >
              <Image src={img.url} alt={img.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            </button>
          </RevealOnScroll>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  )
}
