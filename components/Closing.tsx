import Link from 'next/link'
import { Projet } from '@/lib/projets'
import RevealOnScroll from './RevealOnScroll'

interface ClosingProps {
  projets: Projet[]
}

// Email réel du studio conservé (déjà en prod) — le handoff utilise un
// domaine placeholder ("contact@mathieuandco.studio") qui n'existe pas
// réellement, contrairement aux quartiers ci-dessous qui sont dérivés des
// vraies données projet plutôt que recopiés en dur du prototype.
const CONTACT_EMAIL = 'mathieu.co.studio@gmail.com'

export default function Closing({ projets }: ClosingProps) {
  const quartiers = Array.from(new Set(projets.map((p) => p.lieu.split(',')[0].trim()))).sort()

  return (
    <>
      <div className="py-[100px] px-10 bg-paper-alt text-center">
        <RevealOnScroll>
          <div className="font-display italic font-medium text-[clamp(26px,3.4vw,38px)] leading-[1.35] max-w-[760px] mx-auto text-ink">
            « Dessiner une maison pour Cotonou, c&apos;est dessiner pour sa lumière — pas contre
            elle. »
          </div>
          <div className="mt-5 font-mono text-[11px] tracking-[0.1em] uppercase text-ink-40">
            Mathieu — Fondateur
          </div>
        </RevealOnScroll>
      </div>

      <footer className="pt-16 px-10 pb-10 border-t border-hairline">
        <div
          className="grid gap-8 mb-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          <div>
            <div className="font-display italic font-medium text-xl mb-2.5 text-ink">
              Mathieu&amp;Co
            </div>
            <div className="font-ui text-xs leading-relaxed text-ink-60">
              Architecture &amp; design d&apos;intérieur
              <br />
              Cotonou, Bénin
            </div>
          </div>
          <div className="flex flex-col gap-2.5 font-ui font-medium text-xs">
            <Link href="/#sommaire" className="hover:text-accent transition-colors">
              Projets
            </Link>
            <Link href="/#studio" className="hover:text-accent transition-colors">
              Studio
            </Link>
            <Link href="/journal" className="hover:text-accent transition-colors">
              Journal
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
          <div className="font-ui text-xs leading-loose text-ink-60">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent transition-colors">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="pt-6 border-t border-hairline flex justify-between flex-wrap gap-3 font-mono text-[10px] text-ink-40">
          <span>© 2026 Mathieu&amp;Co Studio</span>
          <span>{quartiers.join(' · ')}</span>
        </div>
      </footer>
    </>
  )
}
