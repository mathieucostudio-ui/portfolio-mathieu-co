import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/journal'
import RevealOnScroll from './RevealOnScroll'
import CursorLabel from './CursorLabel'

interface JournalCardProps {
  article: Article
  index: number
}

export default function JournalCard({ article, index }: JournalCardProps) {
  return (
    <RevealOnScroll index={index}>
      <CursorLabel label="Lire l'article →">
        <Link href={`/journal/${article.slug}`} className="group block bg-paper p-7">
          <div className="relative h-[180px] mb-5 overflow-hidden">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.titre}
                fill
                className="object-cover transition-transform duration-500 ease-reveal group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            ) : (
              <div className="w-full h-full img-placeholder transition-transform duration-500 ease-reveal group-hover:scale-[1.06]" />
            )}
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em] text-accent uppercase mb-2.5">
            {article.categorie}
          </div>
          <div className="font-display italic font-medium text-xl leading-tight mb-2.5 text-ink">
            {article.titre}
          </div>
          <div className="font-ui text-[13px] text-ink-60 mb-3 leading-relaxed">{article.excerpt}</div>
          <div className="font-mono text-[11px] text-ink-40">
            {article.date} · {article.temps}
          </div>
        </Link>
      </CursorLabel>
    </RevealOnScroll>
  )
}
