import type { Config } from 'tailwindcss'

// Couleurs mappées sur les variables CSS sémantiques (app/globals.css :root/.dark),
// pas des hex figés : mêmes noms de token en clair et en sombre, seule la
// valeur change via la classe .dark (voir Tokens.dc.html du handoff design,
// section "variables sémantiques").
const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--bg)',
          alt: 'var(--bg-alt)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          60: 'var(--ink-60)',
          40: 'var(--ink-40)',
        },
        hairline: 'var(--hairline)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        ui: ['var(--font-ui)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '2px',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(.16,1,.3,1)',
      },
      transitionDuration: {
        reveal: '600ms',
      },
    },
  },
  plugins: [],
}
export default config
