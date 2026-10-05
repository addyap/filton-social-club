import { eventAnchor, formatShortDate, recentlyAddedEvents } from '../data/club'
import { useToday } from '../today'
import { StarIcon } from './Icons'

/**
 * Slim band under the hero listing events added to the site in the last few
 * days, each linking down to its poster. Driven by {@link recentlyAddedEvents},
 * so an entry appears the day an event is added and drops off 7 days later —
 * and the whole strip hides itself once nothing is new.
 */
export function NewEventsStrip() {
  const events = recentlyAddedEvents(useToday())
  if (events.length === 0) return null

  return (
    <section
      aria-label="Recently added events"
      className="border-b-2 border-club-gold/40 bg-club-green-dark font-sans-ui text-club-cream"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-club-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-club-green-dark">
          <StarIcon className="h-3.5 w-3.5" />
          Just added
        </span>
        <ul className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm sm:text-base">
          {events.map((event, i) => (
            <li key={event.date} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-club-gold/40" aria-hidden="true">
                  ·
                </span>
              )}
              <a
                href={`#${eventAnchor(event.date)}`}
                className="rounded-full px-1 font-semibold text-club-cream transition hover:text-club-gold focus-visible:text-club-gold focus-visible:outline-none"
              >
                <span className="text-club-gold">{formatShortDate(event.date)}</span>
                <span className="mx-1.5 opacity-30" aria-hidden="true">
                  —
                </span>
                {event.act}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
