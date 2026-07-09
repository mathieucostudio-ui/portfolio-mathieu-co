import { notFound } from 'next/navigation'
import { getAllProjets, getProjetById, getAdjacentProjets } from '@/lib/projets'
import { getImagesFromFolder } from '@/lib/drive'
import Navbar from '@/components/Navbar'
import ProjetIntro from '@/components/ProjetIntro'
import Demarche from '@/components/Demarche'
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

  // If selectedImages is defined, build image objects directly — no Drive API call needed
  let images: { id: string; name: string; url: string }[] = []
  if (projet.selectedImages && projet.selectedImages.length > 0) {
    images = projet.selectedImages.map((imgId) => ({
      id: imgId,
      name: imgId,
      url: `https://lh3.googleusercontent.com/d/${imgId}`,
    }))
  } else {
    // Fallback: fetch from Drive API for projects without selectedImages
    try {
      images = await getImagesFromFolder(projet.driveId)
    } catch {
      images = []
    }
  }

  const heroImage = images[0] ?? null
  const galerieImages = images.slice(1)

  return (
    <main className="bg-paper min-h-screen">
      <Navbar />
      <ProjetIntro projet={projet} heroImage={heroImage} />
      <Demarche images={galerieImages.map((img) => img.url)} />
      <Galerie images={galerieImages} />
      <ProjetNav prev={prev} next={next} />
    </main>
  )
}
