import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * The date the page treats as "today".
 *
 * The page is prerendered at build time, so the HTML a visitor first receives
 * was rendered against the build date. If the browser used the real date for
 * its first render, the event lists could differ from that HTML — a Saturday
 * having passed in between is enough — and hydration would fail.
 *
 * So the first client render deliberately reuses the build date, matching the
 * server exactly, and swaps to the real date immediately after mount. Nobody
 * sees the stale list; it only exists for the instant before hydration.
 */
const TodayContext = createContext<Date | null>(null)

declare global {
  interface Window {
    /** Stamped into the HTML by prerender.mjs. */
    __BUILD_DATE__?: string
  }
}

function isoDay(date: Date) {
  return date.toISOString().slice(0, 10)
}

/** The build date the server rendered against, or now if the page wasn't prerendered. */
function buildDate(): Date {
  const stamped = typeof window === 'undefined' ? undefined : window.__BUILD_DATE__
  return stamped ? new Date(`${stamped}T00:00:00Z`) : new Date()
}

export function TodayProvider({ value, children }: { value?: Date; children: ReactNode }) {
  const [today, setToday] = useState<Date>(() => value ?? buildDate())

  useEffect(() => {
    const now = new Date()
    setToday((prev) => (isoDay(prev) === isoDay(now) ? prev : now))
  }, [])

  return <TodayContext.Provider value={today}>{children}</TodayContext.Provider>
}

/** Falls back to the real date so the hook is safe outside a provider. */
export function useToday(): Date {
  return useContext(TodayContext) ?? new Date()
}
