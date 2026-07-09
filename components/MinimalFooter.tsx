import Link from 'next/link'

export default function MinimalFooter() {
  return (
    <footer className="px-10 py-10 border-t border-hairline flex justify-between flex-wrap gap-3 font-mono text-[10px] text-ink-40 tracking-[0.04em]">
      <span>© 2026 Mathieu&amp;Co Studio</span>
      <Link href="/" className="hover:text-accent transition-colors">
        Retour à l&apos;accueil
      </Link>
    </footer>
  )
}
