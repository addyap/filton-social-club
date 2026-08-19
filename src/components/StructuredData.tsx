import { club, openingHours, upcomingEvents, entertainmentCalendar } from '../data/club'

const SITE = 'https://www.filtonsocialclub.co.uk'

/** "1.00pm – 5.00pm" -> ["13:00", "17:00"] for schema.org's 24h opening hours. */
function toIsoTimes(range: string): [string, string] | null {
  const parts = range.split(/[–-]/).map((s) => s.trim())
  if (parts.length !== 2) return null

  const toIso = (t: string) => {
    const m = t.match(/^(\d{1,2})[.:](\d{2})\s*(am|pm)$/i)
    if (!m) return null
    let hour = Number(m[1]) % 12
    if (/pm/i.test(m[3])) hour += 12
    // Midnight closing reads as 12.00am but belongs at the end of the day.
    if (hour === 0 && /12[.:]00\s*am/i.test(t)) hour = 24
    return `${String(hour).padStart(2, '0')}:${m[2]}`
  }

  const from = toIso(parts[0])
  const to = toIso(parts[1])
  return from && to ? [from, to] : null
}

const dayNames: Record<string, string[]> = {
  'Mon to Thu': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  Friday: ['Friday'],
  Saturday: ['Saturday'],
  Sunday: ['Sunday'],
}

function openingSpecs() {
  const specs: { '@type': string; dayOfWeek: string[]; opens: string; closes: string }[] = []
  for (const block of openingHours) {
    for (const row of block.rows) {
      const days = dayNames[row.days]
      const times = toIsoTimes(row.hours)
      if (!days || !times) continue
      specs.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens: times[0],
        closes: times[1] === '24:00' ? '23:59' : times[1],
      })
    }
  }
  return specs
}

/**
 * schema.org markup so search engines can surface the club's address, phone,
 * opening hours and upcoming events as rich results. Built from the same data
 * the page renders, so it can't drift out of sync.
 */
export function StructuredData() {
  const venue = {
    '@type': 'Place',
    name: club.legalName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: club.address.line1,
      addressLocality: club.address.town,
      addressRegion: club.address.city,
      postalCode: club.address.postcode,
      addressCountry: 'GB',
    },
  }

  const graph = [
    {
      '@type': ['NightClub', 'LocalBusiness'],
      '@id': `${SITE}/#club`,
      name: club.name,
      legalName: club.legalName,
      url: SITE,
      telephone: club.phone,
      image: `${SITE}/og-image.jpg`,
      logo: `${SITE}/icon-512.png`,
      description:
        "A friendly members' club in Filton, Bristol — live sport, Saturday night entertainment, bingo, skittle teams, room hire and a dog-friendly bar.",
      address: venue.address,
      sameAs: [club.facebookUrl],
      openingHoursSpecification: openingSpecs(),
      publicAccess: false,
    },
    ...upcomingEvents().map((event) => ({
      '@type': 'Event',
      name: event.act,
      startDate: event.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      description: event.blurb ?? entertainmentCalendar.note,
      location: venue,
      organizer: { '@type': 'Organization', name: club.name, url: SITE },
      ...(event.price
        ? {
            offers: {
              '@type': 'Offer',
              price: event.price.replace(/[^\d.]/g, ''),
              priceCurrency: 'GBP',
              availability: 'https://schema.org/InStock',
              url: SITE,
            },
          }
        : {}),
    })),
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  )
}
