'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Projet } from '@/lib/projets'

interface ProjetNavProps {
  prev: Projet | null
  next: Projet | null
}

export default function ProjetNav({ prev, next }: ProjetNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex border-t border-white/8 bg-charbon"
    >
      {prev ? (
        <Link
          href={`/projets/${prev.id}`}
          className="group flex-1 flex flex-col px-10 md:px-16 py-12 border-r border-white/8 hover:bg-[#2a2a2a] transition-colors duration-300"
        >
          <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-blanc/30 mb-3 group-hover:text-sable transition-colors">
            ← Projet précédent
          </span>
          <span className="font-cormorant text-2xl font-light text-blanc group-hover:text-sable transition-colors">
            {prev.num} — {prev.titre}
          </span>
          <span className="font-montserrat text-[11px] text-blanc/30 mt-1">{prev.lieu}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/projets/${next.id}`}
          className="group flex-1 flex flex-col items-end px-10 md:px-16 py-12 hover:bg-[#2a2a2a] transition-colors duration-300"
        >
          <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-blanc/30 mb-3 group-hover:text-sable transition-colors">
            Projet suivant →
          </span>
          <span className="font-cormorant text-2xl font-light text-blanc text-right group-hover:text-sable transition-colors">
            {next.num} — {next.titre}
          </span>
          <span className="font-montserrat text-[11px] text-blanc/30 mt-1">{next.lieu}</span>
        </Link>
      ) : (
        <Link
          href="/#projets"
          className="group flex-1 flex flex-col items-end px-10 md:px-16 py-12 hover:bg-[#2a2a2a] transition-colors duration-300"
        >
          <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-blanc/30 mb-3 group-hover:text-sable transition-colors">
            ↑ Retour aux projets
          </span>
          <span className="font-cormorant text-2xl font-light text-blanc text-right group-hover:text-sable transition-colors">
            Portfolio complet
          </span>
        </Link>
      )}
    </motion.nav>
  )
}
