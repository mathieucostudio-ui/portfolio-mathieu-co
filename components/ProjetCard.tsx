'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Projet } from '@/lib/projets'

interface ProjetCardProps {
  projet: Projet
  index: number
}

export default function ProjetCard({ projet, index }: ProjetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/projets/${projet.id}`}
        className="group relative block bg-charbon overflow-hidden"
      >
        {/* Thumbnail */}
        <div className="relative w-full h-72 overflow-hidden">
          {projet.thumbnail ? (
            <Image
              src={projet.thumbnail}
              alt={projet.titre}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full img-placeholder" />
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-ebene/0 group-hover:bg-ebene/30 transition-all duration-500" />
        </div>

        {/* Card info */}
        <div className="p-8 flex items-start justify-between bg-charbon group-hover:bg-[#2a2a2a] transition-colors duration-300">
          <div>
            <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-sable mb-3">
              {projet.num}
            </p>
            <h3 className="font-cormorant text-2xl font-light text-blanc mb-1 group-hover:text-sable transition-colors duration-300">
              {projet.titre}
            </h3>
            <p className="font-montserrat text-[11px] text-blanc/40">{projet.lieu}</p>
          </div>
          <div className="text-right">
            <p className="font-montserrat text-[10px] tracking-[0.15em] uppercase text-blanc/30">
              {projet.type}
            </p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-sable">
                Voir →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
