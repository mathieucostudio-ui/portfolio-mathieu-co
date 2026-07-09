'use client'

import { FormEvent, useState } from 'react'
import MagneticButton from './MagneticButton'

const inputClass =
  'bg-transparent border-none border-b border-hairline text-ink text-[15px] py-2 outline-none focus:border-accent transition-colors placeholder:text-ink-40'
const labelClass = 'font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase'

// Maquette UI uniquement — aucun appel réseau (cf. brief handoff, confirmé
// hors scope de cette refonte). Le succès est purement local.
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-12">
        <div className="w-12 h-px bg-accent mb-6" />
        <div className="font-display italic font-medium text-[30px] leading-tight mb-3.5 text-ink">
          Message envoyé.
        </div>
        <p className="font-ui text-[15px] leading-relaxed text-ink-60">
          Merci — nous revenons vers vous sous 48h.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
      <div className="grid gap-[22px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Nom</span>
          <input type="text" required placeholder="Votre nom" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email</span>
          <input type="email" required placeholder="vous@exemple.com" className={inputClass} />
        </label>
      </div>

      <div className="grid gap-[22px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Téléphone</span>
          <input type="tel" placeholder="+229 …" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Type de projet</span>
          <select className={inputClass}>
            <option>Villa / résidence</option>
            <option>Design intérieur</option>
            <option>Local commercial</option>
            <option>Immeuble collectif</option>
            <option>Autre</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Budget indicatif</span>
        <select className={inputClass}>
          <option>Moins de 20M FCFA</option>
          <option>20 – 50M FCFA</option>
          <option>50 – 100M FCFA</option>
          <option>Plus de 100M FCFA</option>
          <option>À définir ensemble</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Message</span>
        <textarea
          rows={4}
          placeholder="Parlez-nous de votre terrain, de vos envies, de votre échéance…"
          className={`${inputClass} resize-y font-ui`}
        />
      </label>

      <MagneticButton
        type="submit"
        className="self-start mt-3 px-8 py-4 border border-ink bg-transparent text-ink font-ui font-medium text-xs tracking-[0.1em] uppercase hover:bg-ink hover:text-paper transition-colors duration-300"
      >
        Envoyer
      </MagneticButton>
    </form>
  )
}
