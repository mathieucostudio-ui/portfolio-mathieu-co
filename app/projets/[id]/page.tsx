import { notFound } from 'next/navigation'
import { getAllProjets, getProjetById, getAdjacentProjets } from '@/lib/projets'
import { getImagesFromFolder } from '@/lib/drive'
import Navbar from '@/components/Navbar'
import ProjetIntro from '@/components/ProjetIntro'
import Galerie from '@/components/Galerie'
import ProjetNav from '@/components/ProjetNav'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  const projets = getAllProjets()
  return projets.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const projet = getProjetById(id)
  if (!projet) return {}
  return {
    title: `${projet.titre} — Mathieu&Co`,
    description: projet.description,
    openGraph: {
      title: `${projet.titre} — Mathieu&Co`,
      description: projet.description,
    },
  }
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const projet = getProjetById(id)
  if (!projet) notFound()

  const { prev, next } = getAdjacentProjets(id)

  let allImages: { id: string; name: string; url: string }[] = []
  try {
    allImages = await getImagesFromFolder(projet.driveId)
  } catch {
    allImages = []
  }

  // Filter and reorder by selectedImages when defined
  let images = allImages
  if (projet.selectedImages && projet.selectedImages.length > 0) {
    const indexed = new Map(allImages.map((img) => [img.id, img]))
    images = projet.selectedImages
      .map((id) => indexed.get(id))
      .filter((img): img is { id: string; name: string; url: string } => img !== undefined)
  }

  const heroImage = images[0] ?? null
  const galerieImages = images.slice(1)

  return (
    <main className="bg-ebene min-h-screen">
      <Navbar />
      <ProjetIntro projet={projet} heroImage={heroImage} allImages={images} />
      {galerieImages.length > 0 && <Galerie images={galerieImages} allImages={images} heroCount={1} />}
      <ProjetNav prev={prev} next={next} />
    </main>
  )
}
