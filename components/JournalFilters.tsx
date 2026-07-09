'use client'

const CATEGORIES = ['Tous', 'Méthode', 'Chantier', 'Regard']

interface JournalFiltersProps {
  active: string
  onSelect: (categorie: string) => void
}

export default function JournalFilters({ active, onSelect }: JournalFiltersProps) {
  return (
    <div className="flex gap-3 flex-wrap mb-14">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2.5 font-mono font-medium text-[11px] tracking-[0.08em] uppercase border transition-colors duration-300 ${
            active === cat ? 'border-accent text-accent' : 'border-hairline text-ink-60 hover:border-ink-40'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
