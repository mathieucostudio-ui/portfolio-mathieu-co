'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Closing from '@/components/Closing'
import JournalFilters from '@/components/JournalFilters'
import JournalCard from '@/components/JournalCard'
import { getAllArticles } from '@/lib/journal'
import { getAllProjets } from '@/lib/projets'

const articles = getAllArticles()
const projets = getAllProjets()

export default function JournalPage() {
  const [filter, setFilter] = useState('Tous')
  const filtered = filter === 'Tous' ? articles : articles.filter((a) => a.categorie === filter)

  return (
    <main className="bg-paper min-h-screen">
      <Navbar />

      <header className="pt-40 px-10 pb-14">
        <div className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase mb-4.5">
          Nouveau — Section Journal
        </div>
        <div className="font-display italic font-medium text-[clamp(44px,6vw,72px)] leading-[1.05] mb-5 text-ink">
          Journal
        </div>
        <p className="font-ui text-base leading-relaxed text-ink-60 max-w-[560px]">
          Notes de chantier, choix de matière, retours d&apos;expérience — écrites par Mathieu, au
          fil des projets.
        </p>
      </header>

      <div className="px-10 pb-10 border-b border-hairline">
        <JournalFilters active={filter} onSelect={setFilter} />
      </div>

      <section className="px-10 pt-14 pb-[120px]">
        <div
          className="grid gap-px bg-hairline"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}
        >
          {filtered.map((article, i) => (
            <JournalCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>

      <Closing projets={projets} />
    </main>
  )
}
