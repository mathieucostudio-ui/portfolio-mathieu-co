import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'
import MinimalFooter from '@/components/MinimalFooter'

// Email réel du studio (voir Closing.tsx) — pas le domaine placeholder du
// handoff. Pas de numéro de téléphone réel disponible : la ligne est
// omise plutôt que d'afficher un faux numéro (même principe que le
// tableau meta de la page Projet).
const CONTACT_EMAIL = 'mathieu.co.studio@gmail.com'

export const metadata = {
  title: 'Contact — Mathieu&Co',
  description: 'Discutons de votre projet — Mathieu&Co, studio d’architecture et design d’intérieur à Cotonou.',
}

export default function ContactPage() {
  return (
    <main className="bg-paper min-h-screen">
      <Navbar />

      <section
        className="pt-40 px-10 pb-24 grid gap-16 max-w-[1180px] mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}
      >
        <div>
          <div className="font-display italic font-medium text-[clamp(40px,5.5vw,64px)] leading-[1.05] mb-6 text-ink">
            Discutons de
            <br />
            votre projet
          </div>
          <p className="font-ui text-base leading-relaxed text-ink-60 max-w-[420px] mb-12">
            Villa, aménagement intérieur, local commercial — décrivez votre projet, nous revenons
            vers vous sous 48h.
          </p>

          <div className="flex flex-col border-t border-hairline">
            <div className="flex justify-between py-[18px] border-b border-hairline">
              <span className="font-mono text-[11px] tracking-[0.08em] text-ink-40 uppercase">
                Email
              </span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-ui font-medium text-[13px] text-ink hover:text-accent transition-colors">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex justify-between py-[18px] border-b border-hairline">
              <span className="font-mono text-[11px] tracking-[0.08em] text-ink-40 uppercase">
                Studio
              </span>
              <span className="font-ui font-medium text-[13px] text-ink">Cotonou, Bénin</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>

      <MinimalFooter />
    </main>
  )
}
