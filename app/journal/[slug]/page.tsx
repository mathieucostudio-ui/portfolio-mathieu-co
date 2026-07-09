import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import MinimalFooter from '@/components/MinimalFooter'
import { getAllArticles, getArticleBySlug, getAdjacentArticles } from '@/lib/journal'

export const revalidate = 3600

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.titre} — Journal Mathieu&Co`,
    description: article.excerpt,
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const { prev, next } = getAdjacentArticles(slug)

  return (
    <main className="bg-paper min-h-screen">
      <article className="max-w-[720px] mx-auto px-10 pt-40">
        <Link
          href="/journal"
          className="font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase hover:text-accent transition-colors"
        >
          ← Journal
        </Link>
        <div className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase my-7">
          {article.categorie}
        </div>
        <h1 className="font-display italic font-medium text-[clamp(34px,5vw,54px)] leading-[1.1] mb-6 text-ink">
          {article.titre}
        </h1>
        <div className="flex gap-5 flex-wrap font-mono text-[11px] text-ink-40 tracking-[0.06em] pb-8 border-b border-hairline mb-10">
          <span>{article.auteur}</span>
          <span>{article.date}</span>
          <span>{article.temps} de lecture</span>
        </div>

        <div className="relative h-[340px] mb-10">
          {article.image ? (
            <Image src={article.image} alt={article.titre} fill className="object-cover" />
          ) : (
            <div className="w-full h-full img-placeholder" />
          )}
        </div>

        <div className="font-ui text-[17px] leading-[1.85] text-ink flex flex-col gap-5 pb-14">
          {article.corps ? (
            article.corps.map((block, i) =>
              block.type === 'quote' ? (
                <div key={i} className="border-l-2 border-accent pl-6 my-2">
                  <p className="font-display italic font-medium text-[22px] leading-relaxed text-ink">
                    « {block.text} »
                  </p>
                </div>
              ) : (
                <p key={i} className="text-ink-60">
                  {block.text}
                </p>
              )
            )
          ) : (
            <div className="border border-hairline border-dashed px-6 py-8 text-center">
              <p className="font-mono text-xs tracking-[0.08em] uppercase text-ink-40">
                Contenu à compléter
              </p>
            </div>
          )}
        </div>
      </article>

      <section className="max-w-[720px] mx-auto px-10 pb-24 flex justify-between gap-6 flex-wrap border-t border-hairline pt-10">
        {prev ? (
          <Link href={`/journal/${prev.slug}`} className="group max-w-[280px] hover:text-accent transition-colors">
            <div className="font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase mb-2">
              ← Article précédent
            </div>
            <div className="font-display italic font-medium text-lg leading-tight text-ink group-hover:text-accent transition-colors">
              {prev.titre}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/journal/${next.slug}`}
            className="group max-w-[280px] text-right ml-auto hover:text-accent transition-colors"
          >
            <div className="font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase mb-2">
              Article suivant →
            </div>
            <div className="font-display italic font-medium text-lg leading-tight text-ink group-hover:text-accent transition-colors">
              {next.titre}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </section>

      <MinimalFooter />
    </main>
  )
}
