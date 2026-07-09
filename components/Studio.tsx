import RevealOnScroll from './RevealOnScroll'
import MagneticButton from './MagneticButton'

const valeurs = [
  {
    num: '01',
    titre: 'Matière & climat',
    texte: 'Iroko, wengé, latérite — choisis pour vieillir avec le climat tropical, pas contre lui.',
  },
  {
    num: '02',
    titre: 'Sur-mesure',
    texte: "Chaque projet part du terrain et de l'usage réel, jamais d'un plan-type.",
  },
  {
    num: '03',
    titre: 'Suivi de chantier',
    texte: 'Du plan masse à la réception — un seul interlocuteur, du premier trait à la clé.',
  },
]

export default function Studio() {
  return (
    <div className="px-10 pb-[120px]">
      <div
        className="grid gap-16"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))' }}
      >
        <div>
          <div className="font-display italic font-medium text-[44px] leading-[1.05] mb-6 text-ink">
            Studio
          </div>
          <p className="font-ui text-base leading-relaxed text-ink-60 max-w-[480px]">
            Mathieu&amp;Co conçoit des villas, intérieurs et espaces collectifs qui tiennent compte
            du climat, de la matière locale et de l&apos;usage réel des lieux. Un studio, un
            architecte, un accompagnement de bout en bout — du plan masse à la réception de chantier.
          </p>
          <MagneticButton
            href="/contact"
            className="inline-block mt-8 px-7 py-4 border border-ink font-ui font-medium text-xs tracking-[0.1em] uppercase text-ink hover:bg-ink hover:text-paper transition-colors duration-300"
          >
            Discuter de votre projet
          </MagneticButton>
        </div>

        <div className="flex flex-col border-t border-hairline">
          {valeurs.map((v, i) => (
            <RevealOnScroll key={v.num} index={i}>
              <div className="flex gap-5 py-6 border-b border-hairline">
                <span className="font-mono text-[11px] leading-relaxed text-accent">{v.num}</span>
                <div>
                  <div className="font-ui font-medium text-[15px] mb-1.5 text-ink">{v.titre}</div>
                  <div className="font-ui text-[13px] leading-relaxed text-ink-60">{v.texte}</div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  )
}
