export const club = {
  name: 'Filton & District Social Club',
  legalName: 'Filton & District Social Club Limited',
  address: {
    line1: 'Conygre Grove',
    town: 'Filton',
    city: 'Bristol',
    postcode: 'BS34 7HZ',
  },
  phone: '0117 969 2934',
  facebookUrl: 'https://www.facebook.com/groups/211406802585294/about?locale=en_GB',
  /** Taken from the club's own Google Maps listing (the marker, not the map centre). */
  geo: { latitude: 51.5084313, longitude: -2.5618756 },
  /** Short, stable link to that listing — the long /maps/place/ URL carries session junk. */
  googleMapsUrl: 'https://maps.google.com/?cid=13803555672016475925',
}

/** The club number with the spaces stripped, for tel: links. */
export const clubPhoneHref = `tel:${club.phone.replace(/\s+/g, '')}`

export const openingHours = [
  { period: 'Lunchtime', rows: [{ days: 'Mon to Thu', hours: '1.00pm – 5.00pm' }] },
  { period: 'Evenings', rows: [{ days: 'Mon to Thu', hours: '7.00pm – 11.00pm' }] },
  {
    period: 'Friday & Weekends',
    rows: [
      { days: 'Friday', hours: '1.00pm – 11.00pm' },
      { days: 'Saturday', hours: '12.00pm – 12.00am' },
      { days: 'Sunday', hours: '12.00pm – 10.30pm' },
    ],
  },
]

export const committee = {
  secretary: 'Dave Stadon',
  treasurer: 'Linda Cross',
  chairman: 'Trevor Evenden',
  viceChairman: 'Valma Gibbs',
  healthAndSafety: 'Yvonne Pearce Jones',
  members: [
    'Kevin Bartlett',
    'Kevin Beaty',
    'Mark Porter',
    'Natalie Stadon',
    'Shaun Sedlen',
    'Josie Briffitt',
    'Sally Millett',
    'Brian Mead',
    'Ann Eyres',
    'Tom Mewies',
    'Dan Harris',
    'Simon Davies',
    'Tracey Evenden',
    'Helena Evenden',
  ],
}

// Transcribed from the plaques on the club's memorial bench — kept in the
// order they appear on the bench. The bench itself (the "Any Thoughts
// Bench") is dedicated to Brian Jarrett; that's folded into his entry below
// rather than repeated.
export const tributes = {
  intro:
    'The club’s memorial bench — the “Any Thoughts Bench” — carries these plaques in memory of members and officials we’ve lost.',
  people: [
    { name: 'Nick Hawkins', role: 'Club Treasurer', note: 'Much loved husband, dad & grandad. Forever in our thoughts.' },
    {
      name: 'Tim Richards',
      years: '1952–2023',
      role: 'Club Secretary',
      note: 'Husband, dad, step-dad, Grampy, Silly Grampy and Step Grampy. Forever in our hearts. Missed by many.',
    },
    { name: 'Keith Jay', role: 'Club Secretary', note: 'Much loved husband, dad & grandad. Forever in our thoughts.' },
    {
      name: 'Brian Jarrett',
      years: '1956–2012',
      role: 'Loyal club member',
      note: 'Much loved brother, always in our thoughts — love from sisters Marilyn and Diane. The bench itself is dedicated to Brian’s memory.',
    },
    { name: 'Janet Porter', role: 'Life-long member', note: 'Forever loved wife, mother & grandmother. Always in our thoughts.' },
    {
      name: 'Stephen Alexander Jones',
      role: 'Loyal club member',
      note: 'Much loved husband, dad and grandad. Forever in our thoughts.',
    },
    { name: 'John Organ', role: 'Longtime club member', note: 'Sport, jazz & real ale man. Missed by many.' },
    {
      name: 'Roland James Warry',
      years: '1922–2022, aged 99',
      role: 'Life-long member',
      note: 'Loving husband & dad. Loved & missed always.',
    },
  ],
}

export const whatsOn = [
  {
    title: 'Live sport',
    blurb:
      'All the big fixtures live on Sky Sports and TNT Sports — football, boxing and more on the big screen, right at the bar.',
  },
  {
    title: 'Saturday entertainment',
    blurb:
      'Live music every Saturday night on our stage and dance floor — the club\'s big weekly night out. £5 for members, £2 more for guests.',
  },
  {
    title: 'Bingo',
    blurb:
      'Eyes down Wednesday and Sunday. Please note: children under 14 are not permitted in the main room during Sunday bingo sessions.',
  },
  {
    title: 'Skittle teams',
    blurb:
      'Home and away skittles in the Northwest Skittles League, plus a summer skittle competition. Friendly, all-in format — new players always welcome.',
  },
]

export type EntertainmentEvent = {
  /** ISO date — used for sorting and for the machine-readable <time> tag. */
  date: string
  act: string
  /** Shown only where it's confirmed; special nights are often priced separately. */
  price?: string
  /** Doors/stage time as printed on the poster. */
  time?: string
  /** One-line description of what they play. */
  blurb?: string
  /** Matches a `name` in scripts/process-performers.mjs. */
  poster?: string
  /** Defaults to a live act; 'quiz'/'bingo'/'kids' style the card and its fallback icon accordingly. */
  kind?: 'music' | 'quiz' | 'bingo' | 'kids'
  /** Extra facts shown as pills — used by the quiz for team size, prizes and the raffle. */
  details?: string[]
  /** Short corner-ribbon label that pulls a card out as urgent/not-to-miss. Keep it date-free — "This Friday!" reads wrong once the date it meant has passed or is more than a few days out. */
  highlight?: string
  /** ISO date this event was added to the site. Set to the day you add it and
   *  it shows in the "Just added" strip below the hero for 7 days, then drops
   *  off on its own. Leave unset for events that aren't newly announced. */
  addedOn?: string
  /** Set only for advance-ticket shows — the regular Saturday nights are pay on the door. */
  tickets?: {
    /** ISO date sales open. Omit once already on sale. */
    onSaleFrom?: string
    /** Shown once on sale, e.g. "Less than 40 left" or "Plenty available". */
    availability?: string
    /** Styles the badge with more urgency, e.g. for low stock. */
    urgent?: boolean
    /** Sold out — overrides availability with a plain "Sold out" badge. */
    soldOut?: boolean
  }
}

// Adding a future act:
//   1. Save the poster image somewhere.
//   2. Add an entry to `jobs` in scripts/process-performers.mjs with a
//      kebab-case name (that script also handles rotating/cropping a poster
//      out of a collage image).
//   3. Run: node scripts/process-performers.mjs
//   4. Add the event below with `poster` set to the same name.
// Events sort themselves by date, and past ones drop off automatically.
export const entertainmentCalendar = {
  note: 'Members’ prices shown — non-members are £2 extra. Visitors welcome.',
  events: [
    { date: '2026-08-01', act: 'Guy Young', price: '£5', time: '8.45pm', blurb: 'Pop, rock, soul and reggae', poster: 'guy-young' },
    { date: '2026-08-08', act: 'Rowland', price: '£5', time: '9.00pm', poster: 'rowland' },
    { date: '2026-08-15', act: 'Mark Godfrey', price: '£5', time: '9.00pm', blurb: 'Rock, pop, country, reggae, ska, Motown and Northern Soul', poster: 'mark-godfrey' },
    { date: '2026-08-22', act: 'Dresdens', price: '£5', poster: 'dresdens' },
    { date: '2026-08-29', act: 'Ryan Mills', price: '£5', blurb: 'Vocal entertainer, performing live', poster: 'ryan-mills' },
    {
      date: '2026-09-05',
      act: 'Deja Two',
      time: '9.00pm',
      blurb: 'A broad range of music, from the 60s to the present day',
      poster: 'deja-two',
    },
    {
      date: '2026-09-11',
      act: 'Quiz Night',
      kind: 'quiz',
      time: '7.30pm for an 8.00pm start',
      price: '£1 per player',
      blurb: 'Finishes around 10.30pm. Open to members and non-members alike.',
      details: ['Teams of up to 5', 'Cash prize for the winners', 'Raffle on the night'],
      poster: 'quiz-night',
      highlight: "Don't miss it!",
    },
    {
      date: '2026-09-12',
      act: 'Brendan & Kayleigh-Jo',
      blurb: 'Of 7th Stranger — rock, pop, rock ’n’ roll, reggae, country, ballads, duets and medleys',
      poster: 'brendan-kayleigh-jo',
    },
    {
      date: '2026-09-17',
      act: 'Musical Bingo with Stacey Charles',
      kind: 'bingo',
      time: '7.00pm',
      blurb:
        'Third time lucky! This is the new date after two postponements. Tickets bought for the original date are still valid — DM Stacey, ask at the club, or follow the instructions from wherever you bought yours if you can no longer make it.',
    },
    {
      date: '2026-09-19',
      act: 'Dean Oliver',
      time: '9.00pm',
      blurb: 'Solo singer — rock, rock ’n’ roll, pop and reggae, from the 50s to the present day',
      poster: 'dean-oliver',
    },
    {
      date: '2026-09-26',
      act: 'Beth Amis',
      time: '9.00pm',
      blurb: 'Live vocalist, singing the classics from the 60s to current',
      poster: 'beth-amis',
    },
    {
      date: '2026-10-10',
      act: 'The New Jersey Boys',
      blurb: 'The music of Frankie Valli and The Four Seasons, plus Showaddywaddy and other legends',
      poster: 'new-jersey-boys',
      highlight: 'Sold out',
      tickets: { soldOut: true },
    },
    {
      date: '2026-10-17',
      act: 'Lucciano & Frankie',
      time: '9.00pm',
      blurb: 'As seen on Britain’s Got Talent — one night only',
      poster: 'lucciano-frankie',
      tickets: { availability: 'Plenty available' },
    },
    {
      date: '2026-10-31',
      act: 'Stacey Charles',
      time: '8.45pm',
      blurb:
        'A Halloween fancy-dress party — songs from The Killers, Michael Jackson, Rihanna, Nina Simone and more. Dress to impress and win a prize.',
      poster: 'halloween-party',
      highlight: 'Halloween',
    },
    {
      date: '2026-11-01',
      act: 'Children’s Halloween Party',
      time: '2.30pm – 4.30pm',
      blurb:
        'A spooky afternoon for the kids with entertainer Johnny — disco, games and fancy dress. Come in your best Halloween costume!',
      poster: 'childrens-halloween-party',
      kind: 'kids',
      highlight: 'For the kids',
      addedOn: '2026-10-05',
    },
    {
      date: '2026-11-07',
      act: 'Abbaholics',
      blurb: 'The ultimate ABBA tribute, with Disco Dollz',
      poster: 'abbaholics',
      tickets: { availability: 'Plenty available' },
    },
    {
      date: '2026-11-14',
      act: 'Men Behaving Badly',
      tickets: { onSaleFrom: '2026-09-12' },
    },
    {
      date: '2026-12-12',
      act: 'The Top of the Pops Live Showband',
      blurb: 'Xmas Special — floor-filling Motown, soul, Northern Soul, 70s and 80s',
      poster: 'top-of-the-pops-xmas',
      tickets: { onSaleFrom: '2026-10-03' },
    },
    {
      date: '2026-12-24',
      act: 'Encore',
      tickets: { onSaleFrom: '2026-10-03' },
    },
    {
      date: '2026-12-31',
      act: 'The Treasury Band',
      blurb: 'New Year’s Eve — live music, good friends, great memories. Let’s see in 2027 together!',
      poster: 'new-years-eve',
      tickets: { onSaleFrom: '2026-10-03' },
    },
    { date: '2027-02-20', act: 'The Fabulous Remakes', blurb: '50s & 60s Jukebox Gold show', poster: 'the-remakes' },
    { date: '2027-03-20', act: 'Boo-Ga-Loo', blurb: 'Music of the sensational 70s — Wizzard, Slade, T Rex, Bay City Rollers, Sweet', poster: 'boo-ga-loo' },
    { date: '2027-05-22', act: 'Outatime', time: '9.00pm', blurb: '80s synth-pop tribute — Duran Duran, Pet Shop Boys, Erasure, Depeche Mode', poster: 'outatime' },
  ] satisfies EntertainmentEvent[],
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatEventDate(iso: string) {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`))
}

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

export function formatShortDate(iso: string) {
  return shortDateFormatter.format(new Date(`${iso}T00:00:00Z`))
}

/** Ticket badge text/urgency for an event, or null if it's pay on the door. */
export function ticketStatus(event: EntertainmentEvent, now = new Date()) {
  const tickets = event.tickets
  if (!tickets) return null
  if (tickets.soldOut) {
    return { onSale: false as const, urgent: true, text: 'Sold out' }
  }
  const today = now.toISOString().slice(0, 10)
  if (tickets.onSaleFrom && tickets.onSaleFrom > today) {
    return { onSale: false as const, urgent: false, text: `Tickets on sale ${formatShortDate(tickets.onSaleFrom)}` }
  }
  return {
    onSale: true as const,
    urgent: Boolean(tickets.urgent),
    text: tickets.availability ? `Tickets on sale now — ${tickets.availability}` : 'Tickets on sale now',
  }
}

/** Upcoming events, soonest first. Falls back to the full list once every event is past. */
export function upcomingEvents(now = new Date()): EntertainmentEvent[] {
  const today = now.toISOString().slice(0, 10)
  const sorted = [...entertainmentCalendar.events].sort((a, b) => a.date.localeCompare(b.date))
  const upcoming = sorted.filter((e) => e.date >= today)
  return upcoming.length > 0 ? upcoming : sorted
}

/** How long a newly added event stays in the "Just added" strip. */
export const NEW_EVENT_WINDOW_DAYS = 7

/**
 * Events added within the last {@link NEW_EVENT_WINDOW_DAYS} days that haven't
 * happened yet, soonest event first. Drives the "Just added" strip, which
 * hides itself once this is empty.
 */
export function recentlyAddedEvents(now = new Date()): EntertainmentEvent[] {
  const today = now.toISOString().slice(0, 10)
  const cutoff = new Date(now.getTime() - NEW_EVENT_WINDOW_DAYS * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  return entertainmentCalendar.events
    .filter((e) => e.addedOn && e.addedOn >= cutoff && e.addedOn <= today && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Anchor id for an event's card, so the ticker can jump straight to its poster. */
export function eventAnchor(iso: string) {
  return `event-${iso}`
}

const monthFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

const dayFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

/** "August 2026" — the ticker's month divider. */
export function formatEventMonth(iso: string) {
  return monthFormatter.format(new Date(`${iso}T00:00:00Z`))
}

/** "Sat 22" — compact enough for a scrolling ticker. */
export function formatEventDay(iso: string) {
  return dayFormatter.format(new Date(`${iso}T00:00:00Z`))
}

/** Upcoming events bucketed into consecutive months, for the ticker. */
export function eventsByMonth(now = new Date()) {
  const groups: { month: string; events: EntertainmentEvent[] }[] = []
  for (const event of upcomingEvents(now)) {
    const month = formatEventMonth(event.date)
    const current = groups.at(-1)
    if (current?.month === month) current.events.push(event)
    else groups.push({ month, events: [event] })
  }
  return groups
}

export const skittles = {
  league: 'Northwest Skittles League, Division 3',
  format: 'All-in',
  homeNight: 'Home games are played on Wednesday evenings at the club',
  contactName: 'Kath',
  contactPhone: '07954 604105',
}

export const facilities = [
  'Function room with stage, dance floor and disco lighting for live entertainment',
  'Pool table and darts board',
  'Skittle alley — home to our winter league skittle team',
  'Fruit machines and a weekly members’ Tote draw',
  'Room hire available for parties, wakes and private functions',
  'Dog friendly throughout the club',
  'Members only bar — no smoking or vaping on the premises',
]

export const bar = {
  intro:
    'A proper members’ bar with cask ale, stout, cider and lager on tap, plus a full range of spirits and soft drinks.',
  onTap: ["Thatchers Dry cider", "Caffrey's Black Stout", 'Brew XI Best Bitter', 'Carling lager'],
}
