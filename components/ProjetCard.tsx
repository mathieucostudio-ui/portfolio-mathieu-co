'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Projet } from '@/lib/projets'
import RevealOnScroll from './RevealOnScroll'
import CursorLabel from './CursorLabel'

interface ProjetCardProps {
  projet: Projet
  index: number
}

export default function ProjetCard({ projet, index }: ProjetCardProps) {
  return (
    <RevealOnScroll index={index}>
      <CursorLabel label="Voir le projet →">
        <Link
          href={`/projets/${projet.id}`}
          className="group block bg-paper p-8 border-t-2 border-transparent hover:border-accent transition-colors duration-300"
        >
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-mono text-[11px] text-accent tracking-[0.08em]">{projet.num}</span>
            <span className="font-mono text-[10px] text-ink-40 tracking-[0.08em] uppercase">{projet.type}</span>
          </div>

          <div className="relative h-[200px] mb-[18px] overflow-hidden">
            {projet.thumbnail ? (
              <Image
                src={projet.thumbnail}
                alt={projet.titre}
                fill
                className="object-cover transition-transform duration-500 ease-reveal group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full img-placeholder transition-transform duration-500 ease-reveal group-hover:scale-[1.06]" />
            )}
          </div>

          <h3 className="font-display italic font-medium text-2xl leading-tight mb-2 text-ink">
            {projet.titre}
          </h3>
          <p className="font-ui font-medium text-xs text-ink-60">
            {projet.lieu} — {projet.palette}
          </p>
        </Link>
      </CursorLabel>
    </RevealOnScroll>
  )
}
