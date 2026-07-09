import type { Metadata } from 'next'
import { Newsreader, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// Applique le thème (localStorage) avant le premier paint pour éviter un
// flash clair/sombre. Défaut clair si rien n'est stocké (décision produit :
// pas de détection prefers-color-scheme).
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

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
    <html
      lang="fr"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  )
}
