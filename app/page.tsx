import { getAllProjets, Projet } from '@/lib/projets'
import { getImagesFromFolder } from '@/lib/drive'
import Hero from '@/components/Hero'
import Sommaire from '@/components/Sommaire'
import Studio from '@/components/Studio'
import JournalPreview from '@/components/JournalPreview'
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

  // 3 photos réelles du premier projet pour les slides "photo" du hero
  // (les slides "maquette 3D" et "vidéo" n'ont pas d'équivalent dans le
  // pipeline Drive — traitées en repère visuel, cf. plan de la refonte).
  const firstProjet = projets[0]
  const heroImages = [
    firstProjet?.heroImageId
      ? `https://lh3.googleusercontent.com/d/${firstProjet.heroImageId}`
      : projetsWithThumbnails[0]?.thumbnail,
    firstProjet?.selectedImages?.[1]
      ? `https://lh3.googleusercontent.com/d/${firstProjet.selectedImages[1]}`
      : undefined,
    firstProjet?.selectedImages?.[2]
      ? `https://lh3.googleusercontent.com/d/${firstProjet.selectedImages[2]}`
      : undefined,
  ].filter((url): url is string => Boolean(url))

  return (
    <main className="bg-paper min-h-screen">
      <Hero heroImages={heroImages} />
      <section id="sommaire">
        <Sommaire projets={projetsWithThumbnails} />
      </section>
      <section id="studio">
        <Studio />
      </section>
      <JournalPreview />
      <Closing projets={projetsWithThumbnails} />
    </main>
  )
}
