import { useEffect, useRef } from 'react'
import { Logo } from './Logo'
import functionRoomStageWebp from '../assets/img/function-room-stage.webp'
import { club, formatShortDate, eventAnchor } from '../data/club'

type HeroProps = {
  /** The next act on the calendar, surfaced as the hero's living proof. */
  featured?: { date: string; act: string; kind?: 'music' | 'quiz' }
}

/**
 * "Lights Up" — the hero stages the moment the club turns from an empty
 * afternoon room into Filton's Saturday night: the disco rig ignites, the room
 * warms, the sign switches on.
 *
 * The markup renders fully composed and lit, so the prerendered HTML and any
 * no-JS visitor still get the finished scene. Two things are pure progressive
 * enhancement, added only after mount and only when motion is welcome:
 *   - the cursor becomes the follow-spot (drives --mx/--my), and pointer
 *     movement parallaxes the light layers (--px/--py);
 *   - the first scroll dims the house lights back down (--scroll).
 */
export function Hero({ featured }: HeroProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    section.classList.add('hero--live')

    let frame = 0
    const onPointer = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        section.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
        section.style.setProperty('--my', `${(y * 100).toFixed(2)}%`)
        // Parallax: -1..1 offset from centre, scaled per layer in CSS.
        section.style.setProperty('--px', (x - 0.5).toFixed(3))
        section.style.setProperty('--py', (y - 0.5).toFixed(3))
      })
    }

    let scrollFrame = 0
    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        const rect = section.getBoundingClientRect()
        // 0 at rest, 1 once the hero has scrolled a full viewport up.
        const progress = Math.min(1, Math.max(0, -rect.top / rect.height))
        section.style.setProperty('--scroll', progress.toFixed(3))
      })
    }

    section.addEventListener('pointermove', onPointer)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      section.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
    }
  }, [])

  const tonight = featured
    ? `${featured.kind === 'quiz' ? 'Next quiz' : 'Live this Saturday'} · ${featured.act}`
    : 'Live music every Saturday night'

  return (
    <section
      ref={ref}
      className="hero relative isolate overflow-hidden bg-club-green-dark text-club-cream"
      aria-label={`${club.name} — welcome`}
    >
      {/* Layer 0 — the room itself, held deep in shadow until the follow-spot finds it. */}
      <div
        className="hero__room pointer-events-none absolute inset-0 bg-cover bg-[position:60%_45%]"
        style={{ backgroundImage: `url(${functionRoomStageWebp})` }}
        aria-hidden="true"
      />
      {/* Layer 1 — colour grade + vignette that turns daylight into night. */}
      <div className="hero__grade pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Layer 2 — the disco rig: light blades sweeping from where the real lamps hang. */}
      <div className="hero__beams pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="hero__beam hero__beam--gold" />
        <span className="hero__beam hero__beam--teal" />
        <span className="hero__beam hero__beam--rose" />
      </div>
      {/* Layer 3 — stage-light bloom drifting in the dark. */}
      <div className="hero__bokeh pointer-events-none absolute inset-0" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      {/* Layer 4 — the follow-spot the cursor is working. */}
      <div className="hero__spot pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content relative mx-auto flex min-h-[82svh] max-w-6xl flex-col items-center justify-center gap-5 px-4 py-16 text-center">
        <span className="hero__kicker font-sans-ui text-[0.7rem] font-bold uppercase tracking-[0.32em] text-club-gold">
          Filton, Bristol · Members &amp; guests welcome
        </span>

        <Logo className="hero__crest h-20 w-20 sm:h-24 sm:w-24" />

        <h1 className="hero__wordmark text-balance text-4xl font-bold leading-[1.05] drop-shadow-sm sm:text-6xl">
          <span className="hero__line">Filton &amp; District</span>
          <span className="hero__line hero__line--sign">Social Club</span>
        </h1>

        <p className="hero__sub max-w-xl font-sans-ui text-base text-club-cream/85 sm:text-lg">
          Live sport, Saturday-night music, bingo and skittles — and a warm welcome
          waiting at the bar.
        </p>

        <a
          href={featured ? `#${eventAnchor(featured.date)}` : '#entertainment'}
          className="hero__tonight group inline-flex items-center gap-2 rounded-full border border-club-gold/45 bg-club-gold/10 px-4 py-1.5 font-sans-ui text-sm font-semibold text-club-gold backdrop-blur-sm transition hover:border-club-gold/80 hover:bg-club-gold/20"
        >
          <span className="hero__pulse" aria-hidden="true" />
          {tonight}
          {featured && (
            <span className="font-normal text-club-cream/70">· {formatShortDate(featured.date)}</span>
          )}
        </a>

        <div className="mt-1 flex flex-wrap justify-center gap-3 font-sans-ui text-sm font-semibold">
          <a
            href="#membership"
            className="rounded-full bg-club-gold px-7 py-3 text-club-green-dark shadow-lg shadow-club-gold/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-club-gold/40 hover:brightness-105 active:translate-y-0"
          >
            Become a Member
          </a>
          <a
            href="#opening-hours"
            className="rounded-full border border-club-cream/45 px-7 py-3 text-club-cream backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-club-cream/80 hover:bg-white/10 active:translate-y-0"
          >
            Opening Hours
          </a>
        </div>

        <a
          href="#entertainment"
          className="hero__scrollcue group absolute bottom-5 left-1/2 -translate-x-1/2 font-sans-ui text-[0.65rem] font-bold uppercase tracking-[0.3em] text-club-cream/55 transition hover:text-club-gold"
          aria-label="Scroll to what's on"
        >
          <span className="block">Step inside</span>
          <span className="hero__chevron mx-auto mt-1 block h-4 w-4 rotate-45 border-b-2 border-r-2 border-current" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
