import {
  eventAnchor,
  eventsByMonth,
  formatEventDay,
  formatEventDate,
  type EntertainmentEvent,
} from '../data/club'
import { MusicNoteIcon, QuizIcon } from './Icons'

/** One month's worth of events, led by a dark month chip. */
function MonthRun({ month, events }: { month: string; events: EntertainmentEvent[] }) {
  return (
    <>
      <span className="ml-6 mr-4 shrink-0 rounded-full bg-club-green-dark px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-club-gold sm:ml-8 sm:text-sm">
        {month}
      </span>
      {events.map((event) => {
        const Icon = event.kind === 'quiz' ? QuizIcon : MusicNoteIcon
        return (
          <a
            key={event.date}
            href={`#${eventAnchor(event.date)}`}
            title={`${event.act} — ${formatEventDate(event.date)}`}
            className="mr-3 flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-club-green-dark transition hover:bg-club-green-dark hover:text-club-gold focus-visible:bg-club-green-dark focus-visible:text-club-gold focus-visible:outline-none"
          >
            <Icon className="h-4 w-4 shrink-0 opacity-70" />
            <span className="font-bold tabular-nums">{formatEventDay(event.date)}</span>
            <span className="opacity-40" aria-hidden="true">
              ·
            </span>
            <span>{event.act}</span>
          </a>
        )
      })}
    </>
  )
}

/**
 * Gold band under the header: every upcoming event scrolling past, grouped by
 * month, each one linking down to its poster.
 */
export function EventTicker() {
  const months = eventsByMonth()
  if (months.length === 0) return null

  const totalEvents = months.reduce((n, m) => n + m.events.length, 0)
  // Roughly a constant reading speed regardless of how full the calendar is.
  const duration = `${Math.max(40, totalEvents * 6)}s`

  const run = (
    <div className="flex w-max items-center">
      {months.map((group) => (
        <MonthRun key={group.month} month={group.month} events={group.events} />
      ))}
    </div>
  )

  return (
    <section
      aria-label="Upcoming events"
      className="ticker-viewport relative overflow-hidden border-y-2 border-club-gold/40 bg-club-gold font-sans-ui text-sm sm:text-base"
    >
      <div className="ticker-track flex w-max py-2.5" style={{ '--ticker-duration': duration } as React.CSSProperties}>
        {run}
        {/* Second copy makes the wrap seamless; hidden from screen readers. */}
        <div aria-hidden="true" className="flex w-max items-center">
          {months.map((group) => (
            <MonthRun key={`dup-${group.month}`} month={group.month} events={group.events} />
          ))}
        </div>
      </div>
    </section>
  )
}
