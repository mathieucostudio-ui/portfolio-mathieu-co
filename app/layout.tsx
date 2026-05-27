import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Mathieu&Co — Studio d'Architecture & Design d'Intérieur",
  description:
    "Studio freelance d'architecture et de design d'intérieur basé à Cotonou, Bénin. Projets résidentiels, commerciaux et outdoor avec une signature visuelle africaine contemporaine.",
  keywords: ['architecture', 'design intérieur', 'Cotonou', 'Bénin', 'Mathieu&Co', 'portfolio'],
  openGraph: {
    title: 'Mathieu&Co',
    description: "Studio d'Architecture & Design d'Intérieur · Cotonou, Bénin",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Mathieu&Co',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
