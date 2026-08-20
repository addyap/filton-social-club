import { useMemo, useState } from 'react'
import {
  eventAnchor,
  formatEventDate,
  upcomingEvents,
  type EntertainmentEvent,
} from '../data/club'
import { posterFor } from '../posters'
import { useToday } from '../today'
import { Photo } from './Photo'
import { SectionHeading } from './SectionHeading'
import { MusicNoteIcon, QuizIcon, TicketIcon } from './Icons'

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const kindStyles = {
  music: {
    label: 'Live music',
    Icon: MusicNoteIcon,
    dot: 'bg-club-green',
    block: 'border-l-club-green bg-club-green/[0.07] text-club-green hover:bg-club-green hover:text-club-cream',
  },
  quiz: {
    label: 'Quiz night',
    Icon: QuizIcon,
    dot: 'bg-club-gold',
    block: 'border-l-club-gold bg-club-gold/15 text-club-green-dark hover:bg-club-gold hover:text-club-green-dark',
  },
} as const

function kindOf(event: EntertainmentEvent) {
  return kindStyles[event.kind ?? 'music']
}

/** Splits an ISO date without going through Date, so no timezone can shift the day. */
function parseIso(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return { year, month: month - 1, day }
}

function isoFor(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const monthLabelFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })

/**
 * Month-by-month grid of everything coming up, with each event linking down to
 * its poster in the entertainment section.
 */
export function EventsCalendar() {
  const today = useToday()
  const events = useMemo(() => upcomingEvents(today), [today])

  // Every distinct month that has an event, in order — these are the only
  // months worth paging through.
  const months = useMemo(() => {
    const seen = new Map<string, { key: string; year: number; month: number }>()
    for (const event of events) {
      const { year, month } = parseIso(event.date)
      const key = `${year}-${month}`
      if (!seen.has(key)) seen.set(key, { key, year, month })
    }
    return [...seen.values()]
  }, [events])

  const [monthIndex, setMonthIndex] = useState(0)
  // Clamp rather than trusting the buttons' disabled state: if the index ever
  // strayed out of range the whole calendar would silently render nothing.
  const safeIndex = Math.min(Math.max(monthIndex, 0), months.length - 1)
  const current = months[safeIndex]
  const step = (direction: -1 | 1) =>
    setMonthIndex(Math.min(Math.max(safeIndex + direction, 0), months.length - 1))

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EntertainmentEvent[]>()
    for (const event of events) {
      map.set(event.date, [...(map.get(event.date) ?? []), event])
    }
    return map
  }, [events])

  const monthEvents = useMemo(
    () =>
      current
        ? events.filter((event) => {
            const { year, month } = parseIso(event.date)
            return year === current.year && month === current.month
          })
        : [],
    [events, current],
  )

  if (!current) return null

  const monthLabel = monthLabelFormatter.format(new Date(current.year, current.month, 1))
  // JS weeks start Sunday; shift so Monday is column one.
  const firstWeekday = (new Date(current.year, current.month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate()
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7

  return (
    <section id="calendar" className="relative overflow-hidden bg-club-green-dark/5">
      <div className="pointer-events-none absolute inset-0 text-club-green/[0.04] bg-dot-pattern" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Month by month"
          title="Events Calendar"
          subtitle="Every upcoming night at the club. Pick any event to jump straight to its poster."
        />

        <div className="mt-10 rounded-2xl border border-club-green/10 bg-white p-3 shadow-md sm:p-5">
          {/* Month pager + legend */}
          <div className="flex flex-col gap-4 border-b border-club-green/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={safeIndex <= 0}
                aria-label="Show previous month"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-club-green/20 text-lg text-club-green transition hover:border-club-green hover:bg-club-green/5 disabled:cursor-not-allowed disabled:opacity-35"
              >
                &larr;
              </button>
              <h3 className="min-w-44 text-center text-xl font-bold text-club-green sm:text-2xl">{monthLabel}</h3>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={safeIndex >= months.length - 1}
                aria-label="Show next month"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-club-green/20 text-lg text-club-green transition hover:border-club-green hover:bg-club-green/5 disabled:cursor-not-allowed disabled:opacity-35"
              >
                &rarr;
              </button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans-ui text-xs text-gray-600">
              {Object.entries(kindStyles).map(([key, style]) => (
                <span key={key} className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                  {style.label}
                </span>
              ))}
            </div>
          </div>

          <p aria-live="polite" className="mt-4 font-sans-ui text-xs text-gray-600">
            <span className="font-bold text-club-green">{monthEvents.length}</span>{' '}
            {monthEvents.length === 1 ? 'event' : 'events'} in {monthLabel}.
          </p>

          {/* Grid */}
          <div className="mt-4 overflow-x-auto rounded-xl border border-club-green/10">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-7 border-b border-club-green/10 bg-club-green/[0.04]">
                {weekdayLabels.map((weekday) => (
                  <div
                    key={weekday}
                    className="px-2 py-2 text-center font-sans-ui text-xs font-bold uppercase tracking-wide text-club-green"
                  >
                    {weekday}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({ length: cellCount }, (_, index) => {
                  const dayNumber = index - firstWeekday + 1
                  const inMonth = dayNumber >= 1 && dayNumber <= daysInMonth
                  const iso = inMonth ? isoFor(current.year, current.month, dayNumber) : null
                  const dayEvents = iso ? eventsByDate.get(iso) ?? [] : []

                  return (
                    <div
                      key={iso ?? `pad-${index}`}
                      className={`min-h-24 border-b border-r border-club-green/10 p-1.5 last-of-type:border-r-0 ${
                        inMonth ? 'bg-white' : 'bg-club-green/[0.02]'
                      }`}
                    >
                      {iso && (
                        <>
                          <time
                            dateTime={iso}
                            className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 font-sans-ui text-xs font-bold ${
                              dayEvents.length > 0 ? 'bg-club-gold text-club-green-dark' : 'text-gray-500'
                            }`}
                          >
                            {dayNumber}
                          </time>
                          {dayEvents.map((event) => {
                            const style = kindOf(event)
                            return (
                              <a
                                key={event.date}
                                href={`#${eventAnchor(event.date)}`}
                                title={`${event.act} — ${formatEventDate(event.date)}`}
                                className={`mt-1 block rounded border border-l-4 border-club-green/10 px-1.5 py-1 font-sans-ui text-[11px] leading-tight font-semibold shadow-sm transition ${style.block}`}
                              >
                                <span className="flex items-center gap-1">
                                  <style.Icon className="h-3 w-3 shrink-0" />
                                  <span className="truncate">{event.act}</span>
                                </span>
                                {event.time && <span className="mt-0.5 block truncate opacity-70">{event.time}</span>}
                              </a>
                            )
                          })}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* That month's events in full, with their posters */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {monthEvents.map((event) => {
              const poster = posterFor(event.poster)
              const style = kindOf(event)
              const { day } = parseIso(event.date)
              return (
                <a
                  key={event.date}
                  href={`#${eventAnchor(event.date)}`}
                  className="flex gap-3 rounded-xl border border-club-green/10 bg-club-green/[0.03] p-3 transition hover:border-club-gold hover:bg-white hover:shadow-md"
                >
                  <time
                    dateTime={event.date}
                    className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-white py-1 text-center font-sans-ui shadow-sm ring-1 ring-club-green/10"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wide text-club-gold">
                      {monthLabel.slice(0, 3)}
                    </span>
                    <span className="text-xl font-bold leading-tight text-club-green">{day}</span>
                  </time>

                  <div className="min-w-0 flex-1 font-sans-ui">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        event.kind === 'quiz'
                          ? 'bg-club-gold/20 text-club-green-dark'
                          : 'bg-club-green/10 text-club-green'
                      }`}
                    >
                      <style.Icon className="h-3 w-3" />
                      {style.label}
                    </span>
                    <p className="mt-1 truncate font-bold text-club-green">{event.act}</p>
                    <p className="mt-0.5 text-xs text-gray-600">
                      {[event.time, event.price].filter(Boolean).join(' · ') || 'See poster for details'}
                    </p>
                  </div>

                  {poster && (
                    <Photo
                      jpg={poster.jpg}
                      webp={poster.webp}
                      width={poster.width}
                      height={poster.height}
                      alt={`Poster for ${event.act}`}
                      className="h-16 w-12 shrink-0 rounded object-cover shadow-sm ring-1 ring-club-green/10"
                    />
                  )}
                </a>
              )
            })}
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 font-sans-ui text-xs text-gray-600">
            <TicketIcon className="h-4 w-4 text-club-gold" />
            Advance-ticket shows are marked on each poster below.
          </p>
        </div>
      </div>
    </section>
  )
}
