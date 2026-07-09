import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

interface DemarcheProps {
  images: string[]
}

// Contenu générique (même texte pour tous les projets) — le handoff design
// n'a jamais fourni de contenu Démarche par-projet, seulement ce gabarit
// à 4 étapes fixes (cf. plan d'implémentation, décision Q1).
const STEPS = [
  {
    num: '01',
    title: 'Croquis',
    desc: 'Premières intentions à la main — orientation, patio, vues.',
    imgLabel: 'Croquis — implantation',
  },
  {
    num: '02',
    title: 'Plan & coupes',
    desc: 'Mise au point des volumes, choix des matières (latérite, iroko).',
    imgLabel: 'Plan — RDC & coupe',
  },
  {
    num: '03',
    title: 'Chantier',
    desc: 'Suivi hebdomadaire, ajustements sur site avec les artisans.',
    imgLabel: 'Chantier — gros œuvre',
  },
  {
    num: '04',
    title: 'Livré',
    desc: 'Réception, retouches finales, remise des clés.',
    imgLabel: 'Livré — façade sud',
  },
]

export default function Demarche({ images }: DemarcheProps) {
  // Complète jusqu'à 4 images en répétant la dernière disponible plutôt
  // que de laisser une case vide (cf. plan : "pad si <4").
  const stepImages: (string | undefined)[] = [...images.slice(0, 4)]
  while (stepImages.length > 0 && stepImages.length < 4) {
    stepImages.push(stepImages[stepImages.length - 1])
  }

  return (
    <div className="px-10 pb-[100px]">
      <div className="flex items-baseline justify-between gap-6 flex-wrap mb-11">
        <div className="font-display italic font-medium text-[32px] leading-[1.1] text-ink">
          Démarche
        </div>
        <div className="font-mono text-[11px] tracking-[0.1em] text-ink-40 uppercase">
          Du croquis à la livraison
        </div>
      </div>

      <div className="flex flex-wrap gap-px bg-hairline">
        {STEPS.map((step, i) => (
          <RevealOnScroll key={step.num} index={i} className="flex-1 basis-[220px]">
            <div className="bg-paper p-[26px] h-full">
              <div className="relative h-[150px] mb-[18px] overflow-hidden">
                {stepImages[i] ? (
                  <Image src={stepImages[i]!} alt={step.imgLabel} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full img-placeholder" />
                )}
                <span className="absolute left-3 bottom-2.5 font-mono text-[9px] text-ink-40 tracking-[0.06em] uppercase">
                  {step.imgLabel}
                </span>
              </div>
              <div className="font-mono text-[11px] text-accent tracking-[0.08em] mb-2.5">
                {step.num}
              </div>
              <div className="font-display italic font-medium text-xl mb-2 text-ink">
                {step.title}
              </div>
              <div className="font-ui text-[13px] leading-relaxed text-ink-60">{step.desc}</div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
