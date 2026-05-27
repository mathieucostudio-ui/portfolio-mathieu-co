'use client'

import { motion } from 'framer-motion'

const valeurs = [
  {
    num: '01',
    titre: 'Matériaux locaux',
    texte: "Iroko, wengé, latérite — nous célébrons les ressources du Bénin et d'Afrique de l'Ouest dans chaque projet.",
  },
  {
    num: '02',
    titre: 'Lumière & Espace',
    texte: 'La lumière naturelle tropicale est notre premier outil de design. Nous la guidons, la filtrons et la magnifions.',
  },
  {
    num: '03',
    titre: 'Sur mesure',
    texte: 'Chaque projet est unique. Nous co-créons avec nos clients pour produire des espaces qui leur ressemblent.',
  },
]

export default function Studio() {
  return (
    <section className="bg-creme py-32 px-8 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24"
        >
          <div>
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-sable mb-6">
              Le Studio
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-ebene leading-tight">
              Architecture &amp;
              <br />
              <span className="italic">Design d'Intérieur</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-montserrat text-sm font-light text-ebene/60 leading-relaxed">
              Mathieu&amp;Co est un studio freelance basé à Cotonou, Bénin, opérant sur un marché
              local et international francophone. Notre signature visuelle combine style contemporain
              africain, végétation tropicale, éclairage chaleureux et matériaux locaux.
            </p>
            <p className="font-montserrat text-sm font-light text-ebene/60 leading-relaxed mt-4">
              Chaque espace est conçu pour durer — esthétiquement, fonctionnellement et
              émotionnellement.
            </p>
          </div>
        </motion.div>

        {/* Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ebene/10">
          {valeurs.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-creme p-10"
            >
              <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-sable mb-6">
                {v.num}
              </p>
              <h3 className="font-cormorant text-2xl font-light text-ebene mb-4">{v.titre}</h3>
              <p className="font-montserrat text-sm font-light text-ebene/50 leading-relaxed">
                {v.texte}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between mt-20 pt-12 border-t border-ebene/10"
        >
          <div>
            <p className="font-cormorant text-2xl font-light text-ebene">Votre projet nous intéresse.</p>
            <p className="font-montserrat text-sm text-ebene/50 mt-1">Discutons de votre vision.</p>
          </div>
          <a
            href="mailto:mathieu.co.studio@gmail.com"
            className="mt-6 md:mt-0 font-montserrat text-[10px] tracking-[0.3em] uppercase text-ebene border border-ebene px-8 py-4 hover:bg-ebene hover:text-creme transition-all duration-300"
          >
            mathieu.co.studio@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
