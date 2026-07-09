import Link from 'next/link'
import { getAllArticles } from '@/lib/journal'
import RevealOnScroll from './RevealOnScroll'

export default function JournalPreview() {
  const articles = getAllArticles().slice(0, 3)

  return (
    <div className="px-10 pb-[120px]">
      <div className="flex items-baseline justify-between gap-6 flex-wrap mb-10">
        <div className="font-display italic font-medium text-[32px] leading-[1.1] text-ink">
          Derniers articles
        </div>
        <Link
          href="/journal"
          className="font-ui font-medium text-[11px] tracking-[0.08em] uppercase text-ink-60 hover:text-accent transition-colors"
        >
          Voir le journal →
        </Link>
      </div>

      <div
        className="grid gap-px bg-hairline"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        {articles.map((a, i) => (
          <RevealOnScroll key={a.slug} index={i}>
            <Link href={`/journal/${a.slug}`} className="block bg-paper p-6 h-full">
              <div className="font-mono text-[10px] tracking-[0.1em] text-accent uppercase mb-3.5">
                {a.categorie}
              </div>
              <div className="font-display italic font-medium text-xl leading-tight mb-2.5 text-ink">
                {a.titre}
              </div>
              <div className="font-mono text-[11px] text-ink-40">
                {a.date} · {a.temps}
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
