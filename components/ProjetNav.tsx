import Link from 'next/link'
import { Projet } from '@/lib/projets'

interface ProjetNavProps {
  prev: Projet | null
  next: Projet | null
}

export default function ProjetNav({ prev, next }: ProjetNavProps) {
  return (
    <nav className="px-10 py-16 flex justify-between gap-6 flex-wrap border-t border-hairline">
      {prev ? (
        <Link href={`/projets/${prev.id}`} className="group max-w-[320px] hover:text-accent transition-colors">
          <div className="font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase mb-2 group-hover:text-accent transition-colors">
            ← Projet précédent
          </div>
          <div className="font-display italic font-medium text-[22px] leading-tight text-ink group-hover:text-accent transition-colors">
            {prev.titre}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/projets/${next.id}`}
          className="group max-w-[320px] text-right ml-auto hover:text-accent transition-colors"
        >
          <div className="font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase mb-2 group-hover:text-accent transition-colors">
            Projet suivant →
          </div>
          <div className="font-display italic font-medium text-[22px] leading-tight text-ink group-hover:text-accent transition-colors">
            {next.titre}
          </div>
        </Link>
      ) : (
        <Link
          href="/#sommaire"
          className="group max-w-[320px] text-right ml-auto hover:text-accent transition-colors"
        >
          <div className="font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase mb-2 group-hover:text-accent transition-colors">
            ↑ Retour aux projets
          </div>
          <div className="font-display italic font-medium text-[22px] leading-tight text-ink group-hover:text-accent transition-colors">
            Portfolio complet
          </div>
        </Link>
      )}
    </nav>
  )
}
