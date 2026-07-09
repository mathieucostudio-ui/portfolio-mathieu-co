'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface HeroProps {
  heroImages: string[]
}

type SlideType = 'photo' | 'model' | 'video'

interface Slide {
  type: SlideType
  caption: string
  image?: string
}

const stats = [
  { num: '10', label: 'Projets réalisés' },
  { num: '04', label: 'Quartiers, Cotonou' },
  { num: '100%', label: 'Sur-mesure' },
]

const WHEEL_LOCK_MS = 650
const TOUCH_THRESHOLD = 50

export default function Hero({ heroImages }: HeroProps) {
  const slides: Slide[] = [
    { type: 'photo', caption: 'Façade sud', image: heroImages[0] },
    { type: 'photo', caption: 'Piscine & véranda', image: heroImages[1] },
    { type: 'model', caption: 'Maquette 3D' },
    { type: 'video', caption: 'Survol drone — toiture & patio' },
    { type: 'photo', caption: 'Patio intérieur', image: heroImages[2] },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [introPhase, setIntroPhase] = useState<'in' | 'out' | 'done'>('in')
  const wheelLock = useRef(false)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem('hero-intro-shown')) {
      setIntroPhase('done')
      return
    }
    sessionStorage.setItem('hero-intro-shown', '1')
    const t1 = setTimeout(() => setIntroPhase('out'), 1300)
    const t2 = setTimeout(() => setIntroPhase('done'), 2000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.9))))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSlide = (i: number) => {
    const n = slides.length
    setActiveIndex(((i % n) + n) % n)
  }
  const nextSlide = () => goToSlide(activeIndex + 1)
  const prevSlide = () => goToSlide(activeIndex - 1)

  const handleWheel: React.WheelEventHandler = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
    if (wheelLock.current || Math.abs(e.deltaX) < 12) return
    e.preventDefault()
    wheelLock.current = true
    if (e.deltaX > 0) nextSlide()
    else prevSlide()
    setTimeout(() => {
      wheelLock.current = false
    }, WHEEL_LOCK_MS)
  }
  const handleTouchStart: React.TouchEventHandler = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const handleTouchEnd: React.TouchEventHandler = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > TOUCH_THRESHOLD) {
      if (dx < 0) nextSlide()
      else prevSlide()
    }
    touchX.current = null
  }

  const active = slides[activeIndex]
  const rotY = -24 + scrollProgress * 48
  const rotX = -16 + scrollProgress * 6
  const typeLabel = active.type === 'video' ? 'Vidéo' : 'Photo'
  const activeCounter = `${String(activeIndex + 1).padStart(2, '0')} / 0${slides.length} — ${
    active.type === 'model' ? 'Maquette 3D' : typeLabel
  }`

  return (
    <header className="relative flex flex-col bg-paper" style={{ minHeight: 'max(640px, 100vh)' }}>
      {introPhase !== 'done' && (
        <div
          className="fixed inset-0 z-[100] bg-paper flex items-center justify-center transition-opacity duration-[650ms]"
          style={{
            opacity: introPhase === 'in' ? 1 : 0,
            pointerEvents: introPhase === 'in' ? 'auto' : 'none',
          }}
        >
          <div className="relative w-[280px] h-[120px]">
            <div
              className="absolute left-0 top-[18px] w-full h-px bg-accent origin-left"
              style={{ animation: 'lineDraw .6s cubic-bezier(.16,1,.3,1) .1s both' }}
            />
            <div
              className="absolute left-0 top-[52px] w-full h-px bg-hairline origin-left"
              style={{ animation: 'lineDraw .6s cubic-bezier(.16,1,.3,1) .25s both' }}
            />
            <div
              className="absolute left-0 top-[86px] w-[58%] h-px bg-hairline origin-left"
              style={{ animation: 'lineDraw .6s cubic-bezier(.16,1,.3,1) .4s both' }}
            />
            <div
              className="absolute left-0 top-7 font-display italic font-medium text-[40px] leading-none text-ink opacity-0"
              style={{ animation: 'heroFadeIn .5s ease .55s forwards' }}
            >
              Mathieu&amp;Co
            </div>
          </div>
        </div>
      )}

      <div
        className="relative flex-1 min-h-0 overflow-hidden"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Backdrop flouté, visible uniquement derrière la maquette 3D */}
        <div
          className="absolute inset-0 z-0 bg-[repeating-linear-gradient(120deg,var(--hairline)_0_16px,transparent_16px_32px)] transition-opacity duration-700"
          style={{
            opacity: active.type === 'model' ? 1 : 0,
            filter: 'blur(22px) brightness(.5) saturate(.8)',
            transform: 'scale(1.12)',
          }}
        />

        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              zIndex: i === activeIndex ? 2 : 1,
              opacity: i === activeIndex ? 1 : 0,
              pointerEvents: i === activeIndex ? 'auto' : 'none',
            }}
          >
            {slide.type === 'model' ? (
              <>
                <div className="absolute left-10 top-[110px] font-mono text-[10px] tracking-[0.1em] text-ink-40 uppercase leading-relaxed">
                  Maquette volumétrique
                  <br />
                  Villa F. — aperçu 3D
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
                  style={{ perspective: 1400, transform: i === activeIndex ? 'scale(1)' : 'scale(0.86)' }}
                >
                  <div
                    className="absolute w-[260px] h-14 rounded-full"
                    style={{ background: 'var(--ink-40)', filter: 'blur(22px)', transform: 'translateY(96px)' }}
                  />
                  <div
                    className="relative w-px h-px"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translate3d(0,40px,0) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                    }}
                  >
                    <CubeFace w={200} h={100} z={80} />
                    <CubeFace w={200} h={100} z={-80} ry={180} />
                    <CubeFace w={160} h={100} x={100} ry={90} />
                    <CubeFace w={160} h={100} x={-100} ry={-90} />
                    <CubeFace w={200} h={160} y={-50} rx={90} />
                    <CubeFace w={200} h={160} y={50} rx={-90} />
                    <CubeFace w={160} h={86} x={20} y={-93} z={65} />
                    <CubeFace w={160} h={86} x={20} y={-93} z={-65} ry={180} />
                    <CubeFace w={130} h={86} x={100} y={-93} ry={90} />
                    <CubeFace w={130} h={86} x={-60} y={-93} ry={-90} />
                    <CubeFace w={160} h={130} x={20} y={-136} rx={90} accent />
                    <CubeFace w={160} h={130} x={20} y={-50} rx={-90} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,var(--hairline)_0_16px,transparent_16px_32px)]">
                  {slide.image && (
                    <Image
                      src={slide.image}
                      alt={slide.caption}
                      fill
                      className="object-cover"
                      priority={i === 0}
                      sizes="100vw"
                    />
                  )}
                </div>
                <div className="absolute left-10 top-[110px] font-mono text-[10px] tracking-[0.14em] text-ink-40 uppercase">
                  {typeLabel} — {slide.caption}
                </div>
                {slide.type === 'video' && (
                  <>
                    <div className="absolute left-1/2 top-1/2 -translate-x-[56%] -translate-y-1/2 w-0 h-0 border-y-[15px] border-y-transparent border-l-[24px] border-l-accent opacity-85" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-accent opacity-55" />
                  </>
                )}
              </>
            )}
          </div>
        ))}

        <div
          className="absolute left-0 right-0 bottom-0 z-[3] pointer-events-none"
          style={{ height: '55%', background: 'linear-gradient(to bottom, transparent, var(--bg) 92%)' }}
        />

        <div className="absolute right-10 top-[110px] z-[3] text-right pointer-events-none">
          <div className="w-16 h-px bg-accent ml-auto" />
          <div className="mt-1.5 font-mono text-[10px] text-accent tracking-[0.08em]">N.01 — COTONOU</div>
        </div>

        <button
          onClick={prevSlide}
          aria-label="Précédent"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-[4] p-3 font-ui font-light text-3xl text-ink transition-[color,transform] duration-150 hover:text-accent hover:-translate-x-0.5 active:scale-90"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          aria-label="Suivant"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-[4] p-3 font-ui font-light text-3xl text-ink transition-[color,transform] duration-150 hover:text-accent hover:translate-x-0.5 active:scale-90"
        >
          ›
        </button>
      </div>

      <div className="relative flex-none z-[3] px-10 pb-[72px]">
        <div className="flex items-center gap-3.5 mb-7">
          <span className="font-mono text-[10px] tracking-[0.08em] text-ink-40 uppercase">{activeCounter}</span>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Aller à la diapositive ${i + 1}`}
                className="w-4 h-0.5 p-0 border-none transition-colors duration-300"
                style={{ background: i === activeIndex ? 'var(--accent)' : 'var(--hairline)' }}
              />
            ))}
          </div>
        </div>
        <h1 className="font-display italic font-medium leading-[0.98] text-[clamp(48px,8vw,104px)] max-w-[920px] text-ink">
          Architecture &amp; design
          <br />
          d&apos;intérieur sur-mesure
        </h1>
        <p className="my-6 font-ui text-ink-60 text-[clamp(15px,1.6vw,18px)] leading-relaxed max-w-[520px]">
          Studio basé à Cotonou. Matériaux locaux, lumière naturelle, gestes précis — chaque projet
          dessiné comme un plan, construit comme une maison.
        </p>
        <div className="flex gap-12 flex-wrap">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display italic font-medium text-[40px] leading-none text-accent">{s.num}</div>
              <div className="mt-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

interface CubeFaceProps {
  w: number
  h: number
  x?: number
  y?: number
  z?: number
  rx?: number
  ry?: number
  accent?: boolean
}

// Une face du wireframe volumétrique (maquette 3D CSS pure, cf. README du
// handoff : pas un vrai viewer IFC/BIM, juste une évocation en perspective
// pilotée par le scroll).
function CubeFace({ w, h, x = 0, y = 0, z = 0, rx = 0, ry = 0, accent = false }: CubeFaceProps) {
  const transform = [
    x || y || z ? `translate3d(${x}px,${y}px,${z}px)` : '',
    ry ? `rotateY(${ry}deg)` : '',
    rx ? `rotateX(${rx}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        transform,
        border: `1px solid ${accent ? 'var(--accent)' : 'var(--ink-40)'}`,
        background: 'var(--ink-40)',
        opacity: 0.12,
      }}
    />
  )
}
