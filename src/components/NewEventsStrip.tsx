import { eventAnchor, formatShortDate, recentlyAddedEvents, type EntertainmentEvent } from '../data/club'
import { useToday } from '../today'
import { StarIcon } from './Icons'

/** One scrolling run of the just-added events — duplicated for a seamless loop. */
function AddedRun({ events }: { events: EntertainmentEvent[] }) {
  return (
    <div className="flex w-max items-center">
      {events.map((event) => (
        <a
          key={event.date}
          href={`#${eventAnchor(event.date)}`}
          className="mr-3 flex shrink-0 items-center gap-2 rounded-full px-3 py-1 font-semibold text-club-cream transition hover:text-club-gold focus-visible:text-club-gold focus-visible:outline-none"
        >
          <span className="text-club-gold tabular-nums">{formatShortDate(event.date)}</span>
          <span className="opacity-30" aria-hidden="true">
            —
          </span>
          <span>{event.act}</span>
        </a>
      ))}
    </div>
  )
}

/**
 * Slim band under the hero listing events added to the site in the last few
 * days, scrolling past like the entertainment ticker and each linking down to
 * its poster. Driven by {@link recentlyAddedEvents}, so an entry appears the day
 * an event is added and drops off 7 days later — and the whole strip hides
 * itself once nothing is new.
 */
export function NewEventsStrip() {
  const events = recentlyAddedEvents(useToday())
  if (events.length === 0) return null

  // Roughly constant reading speed regardless of how many were just added.
  const duration = `${Math.max(24, events.length * 10)}s`

  return (
    <section
      aria-label="Recently added events"
      className="relative flex items-stretch border-b-2 border-club-gold/40 bg-club-green-dark font-sans-ui text-sm text-club-cream sm:text-base"
    >
      {/* Pinned label — sits outside the scrolling viewport so it stays put. */}
      <h2 className="z-10 flex shrink-0 items-center gap-1.5 border-r border-club-gold/25 bg-club-gold px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-club-green-dark sm:px-5">
        <StarIcon className="h-3.5 w-3.5" />
        Just added
      </h2>

      <div className="ticker-viewport relative flex-1 overflow-hidden">
        <div
          className="ticker-track flex w-max py-2"
          style={{ '--ticker-duration': duration } as React.CSSProperties}
        >
          <div className="ml-4 flex w-max items-center sm:ml-6">
            <AddedRun events={events} />
          </div>
          {/* Second copy makes the wrap seamless; hidden from screen readers. */}
          <div aria-hidden="true" className="ml-4 flex w-max items-center sm:ml-6">
            <AddedRun events={events} />
          </div>
        </div>
        {/* Soft fade at the trailing edge, so events slide out rather than snap. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-club-green-dark to-transparent"
        />
      </div>
    </section>
  )
}
