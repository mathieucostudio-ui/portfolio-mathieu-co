'use client'

import { motion } from 'framer-motion'

export default function Closing() {
  return (
    <section className="bg-ebene py-32 px-8 md:px-16 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-cormorant text-5xl md:text-6xl font-light italic text-blanc leading-tight mb-12">
            "L'espace façonne l'homme.
            <br />
            <span className="text-sable">Faisons-le avec intention."</span>
          </p>

          <div className="w-16 h-px bg-sable/40 mx-auto mb-10" />

          <p className="font-cormorant text-2xl font-light text-blanc/60 tracking-widest">
            Mathieu<span className="text-sable">&amp;</span>Co
          </p>
          <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-blanc/25 mt-3">
            Studio d'Architecture &amp; Design d'Intérieur
          </p>
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-blanc/20 mt-1">
            Cotonou, Bénin · 2025–2026
          </p>
        </motion.div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-24 pt-8 border-t border-white/5">
          <p className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-blanc/20">
            © 2026 Mathieu&amp;Co — Tous droits réservés
          </p>
          <a
            href="mailto:mathieu.co.studio@gmail.com"
            className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-blanc/20 hover:text-sable transition-colors mt-4 md:mt-0"
          >
            mathieu.co.studio@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
