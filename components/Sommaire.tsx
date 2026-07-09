import { Projet } from '@/lib/projets'
import ProjetCard from './ProjetCard'

interface SommaireProps {
  projets: Projet[]
}

export default function Sommaire({ projets }: SommaireProps) {
  return (
    <div className="px-10 py-[120px]">
      <div className="flex items-baseline justify-between gap-6 flex-wrap mb-14">
        <div className="font-display italic font-medium text-[44px] leading-[1.05] text-ink">
          Projets
        </div>
        <div className="font-mono text-[11px] tracking-[0.1em] text-ink-40 uppercase">
          {projets.length} réalisations — Cotonou &amp; environs
        </div>
      </div>

      <div
        className="grid gap-px bg-hairline"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))' }}
      >
        {projets.map((projet, index) => (
          <ProjetCard key={projet.id} projet={projet} index={index} />
        ))}
      </div>
    </div>
  )
}
