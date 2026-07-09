import Image from 'next/image'
import { Projet } from '@/lib/projets'
import { DriveImage } from '@/lib/drive'

interface ProjetIntroProps {
  projet: Projet
  heroImage: DriveImage | null
}

export default function ProjetIntro({ projet, heroImage }: ProjetIntroProps) {
  const meta: { label: string; value: string }[] = [
    { label: 'Type', value: projet.type },
    { label: 'Lieu', value: projet.lieu },
  ]
  if (projet.surface) meta.splice(0, 0, { label: 'Surface', value: projet.surface })
  if (projet.livraison) meta.push({ label: 'Livraison', value: projet.livraison })

  return (
    <>
      <header className="relative overflow-hidden" style={{ height: '78vh', minHeight: 520 }}>
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={`${projet.titre} — ${projet.lieu}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 img-placeholder" />
        )}
        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{ height: '60%', background: 'linear-gradient(to bottom, transparent, var(--bg) 95%)' }}
        />
        <div className="absolute left-10 top-[110px] font-mono text-[10px] tracking-[0.14em] text-ink-40 uppercase">
          Photo — {projet.titre}
        </div>
        <div className="absolute left-10 right-10 bottom-14">
          <div className="font-mono text-[11px] text-accent tracking-[0.1em] mb-3.5">
            {projet.num} — {projet.type.toUpperCase()}
          </div>
          <div className="font-display italic font-medium text-[clamp(40px,7vw,88px)] leading-none text-ink">
            {projet.titre}
          </div>
        </div>
      </header>

      <div
        className="px-10 pt-[72px] pb-24 grid gap-16"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))' }}
      >
        <p className="font-ui text-[17px] leading-relaxed text-ink-60 max-w-[560px]">
          {projet.description}
        </p>
        <div className="flex flex-col border-t border-hairline">
          {meta.map((m) => (
            <div key={m.label} className="flex justify-between py-4 border-b border-hairline">
              <span className="font-mono text-[11px] tracking-[0.08em] text-ink-40 uppercase">
                {m.label}
              </span>
              <span className="font-ui font-medium text-[13px] text-ink">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
