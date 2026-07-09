import journalData from '@/data/journal.json'

export interface ArticleBlock {
  type: 'p' | 'quote'
  text: string
}

export interface Article {
  slug: string
  categorie: string
  titre: string
  excerpt: string
  date: string
  temps: string
  auteur: string
  image: string | null
  corps: ArticleBlock[] | null
}

export function getAllArticles(): Article[] {
  return journalData as Article[]
}

export function getArticleBySlug(slug: string): Article | undefined {
  return (journalData as Article[]).find((a) => a.slug === slug)
}

export function getAdjacentArticles(slug: string): {
  prev: Article | null
  next: Article | null
} {
  const articles = journalData as Article[]
  const index = articles.findIndex((a) => a.slug === slug)
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  }
}
