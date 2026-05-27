'use client'

import { motion } from 'framer-motion'
import { Projet } from '@/lib/projets'
import ProjetCard from './ProjetCard'

interface SommaireProps {
  projets: Projet[]
}

export default function Sommaire({ projets }: SommaireProps) {
  return (
    <section className="py-32 px-8 md:px-16 bg-ebene">
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between mb-20 pb-8 border-b border-white/8"
        >
          <div>
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-sable mb-4">
              Portfolio
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-blanc">
              Nos Projets
            </h2>
          </div>
          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-blanc/30 hidden md:block">
            {projets.length} réalisations
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {projets.map((projet, index) => (
            <ProjetCard key={projet.id} projet={projet} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
