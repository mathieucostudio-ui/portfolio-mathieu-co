import { getAllProjets, Projet } from '@/lib/projets'
import { getImagesFromFolder } from '@/lib/drive'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Sommaire from '@/components/Sommaire'
import Studio from '@/components/Studio'
import Closing from '@/components/Closing'

export const revalidate = 3600

export default async function Home() {
  const projets = getAllProjets()

  const thumbnails = await Promise.allSettled(
    projets.map((p) => {
      if (p.selectedImages && p.selectedImages.length > 0) {
        return Promise.resolve(
          `https://lh3.googleusercontent.com/d/${p.selectedImages[0]}`
        )
      }
      return getImagesFromFolder(p.driveId).then((imgs) => imgs[0]?.url ?? null)
    })
  )

  const projetsWithThumbnails: Projet[] = projets.map((p, i) => ({
    ...p,
    thumbnail:
      thumbnails[i].status === 'fulfilled' ? thumbnails[i].value : null,
  }))

  const firstProjet = projets[0]
  const heroImageUrl = firstProjet?.heroImageId
    ? `https://lh3.googleusercontent.com/d/${firstProjet.heroImageId}`
    : (projetsWithThumbnails[0]?.thumbnail ?? '')

  return (
    <main className="bg-ebene min-h-screen">
      <Navbar />
      <Hero heroImageUrl={heroImageUrl} />
      <section id="projets">
        <Sommaire projets={projetsWithThumbnails} />
      </section>
      <section id="studio">
        <Studio />
      </section>
      <Closing />
    </main>
  )
}
