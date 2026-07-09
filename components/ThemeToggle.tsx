'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="font-ui text-[10px] tracking-[0.12em] uppercase border border-hairline text-ink px-4 py-2.5 hover:border-accent hover:text-accent transition-colors duration-300"
    >
      {dark ? 'Mode clair' : 'Mode sombre'}
    </button>
  )
}
