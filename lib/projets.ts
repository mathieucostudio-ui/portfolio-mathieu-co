import projetsData from '@/data/projets.json'

export interface Projet {
  id: string
  num: string
  titre: string
  lieu: string
  type: string
  palette: string
  description: string
  tags: string[]
  driveId: string
  heroImageId?: string
  selectedImages?: string[]
  thumbnail?: string | null
}

export function getAllProjets(): Projet[] {
  return projetsData as Projet[]
}

export function getProjetById(id: string): Projet | undefined {
  return (projetsData as Projet[]).find((p) => p.id === id)
}

export function getAdjacentProjets(id: string): {
  prev: Projet | null
  next: Projet | null
} {
  const projets = projetsData as Projet[]
  const index = projets.findIndex((p) => p.id === id)
  return {
    prev: index > 0 ? projets[index - 1] : null,
    next: index < projets.length - 1 ? projets[index + 1] : null,
  }
}
