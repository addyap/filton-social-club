export const club = {
  name: 'Filton & District Social Club',
  legalName: 'Filton & District Social Club Limited',
  address: {
    line1: 'Conygre Grove',
    town: 'Filton',
    city: 'Bristol',
    postcode: 'BS34 7HZ',
  },
  facebookUrl: 'https://www.facebook.com/groups/211406802585294/about?locale=en_GB',
}

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
  /** Set only for advance-ticket shows — the regular Saturday nights are pay on the door. */
  tickets?: {
    /** ISO date sales open. Omit once already on sale. */
    onSaleFrom?: string
    /** Shown once on sale, e.g. "Less than 40 left" or "Plenty available". */
    availability?: string
    /** Styles the badge with more urgency, e.g. for low stock. */
    urgent?: boolean
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
    { date: '2026-08-22', act: 'Dresdens', price: '£5' },
    { date: '2026-08-29', act: 'Ryan Mills', price: '£5' },
    {
      date: '2026-10-10',
      act: 'The New Jersey Boys',
      blurb: 'The music of Frankie Valli and The Four Seasons, plus Showaddywaddy and other legends',
      poster: 'new-jersey-boys',
      tickets: { availability: 'Less than 40 left', urgent: true },
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

export const skittles = {
  league: 'Northwest Skittles League, Division 3',
  format: 'All-in',
  homeNight: 'Home games are played on Wednesday evenings at the club',
  contactName: 'Kath',
  contactPhone: '07954 604105',
}

export const summerSkittles = {
  name: 'Filton and District Summer Skittle League 2026',
  season: '1 June – 24 August 2026',
  weeks: 13,
  format: 'League games are all-in, played on Alley 2',
  cups: ['All In Cup', 'Front First Cup', '4 Corners Cup'],
}

export type SkittleMatch = { pair: string; time: string }

export type SkittleFixtureWeek = {
  week: number
  /** ISO date the week starts. */
  starting: string
  note?: string
  tuesday: SkittleMatch[]
  wednesday: SkittleMatch[]
  thursday: SkittleMatch[]
  friday?: SkittleMatch[]
}

// Transcribed from the club's printed 2026 fixture sheet. Team numbers only —
// see the noticeboard's separate team sheet for names.
export const summerSkittlesFixtures: SkittleFixtureWeek[] = [
  {
    week: 1,
    starting: '2026-06-01',
    tuesday: [{ pair: '1 v 2', time: '8.00pm' }, { pair: '3 v 4', time: '9.00pm' }],
    wednesday: [{ pair: '9 v 10', time: '8.30pm' }],
    thursday: [{ pair: '5 v 6', time: '8.00pm' }, { pair: '7 v 8', time: '9.00pm' }],
  },
  {
    week: 2,
    starting: '2026-06-08',
    tuesday: [{ pair: '8 v 6', time: '8.00pm' }, { pair: '10 v 7', time: '9.00pm' }],
    wednesday: [{ pair: '5 v 9', time: '8.30pm' }],
    thursday: [{ pair: '3 v 1', time: '8.00pm' }, { pair: '4 v 2', time: '9.00pm' }],
  },
  {
    week: 3,
    starting: '2026-06-15',
    note: 'Cup prelims played Monday',
    tuesday: [{ pair: '1 v 7', time: '8.00pm' }, { pair: '8 v 7', time: '9.00pm' }],
    wednesday: [{ pair: '9 v 6', time: '8.00pm' }, { pair: '10 v 3', time: '9.00pm' }],
    thursday: [{ pair: '2 v 4', time: '8.00pm' }, { pair: '5 v 2', time: '9.00pm' }],
  },
  {
    week: 4,
    starting: '2026-06-22',
    tuesday: [{ pair: '2 v 6', time: '8.00pm' }, { pair: '3 v 9', time: '9.00pm' }],
    wednesday: [{ pair: '1 v 4', time: '8.30pm' }],
    thursday: [{ pair: '5 v 7', time: '8.00pm' }, { pair: '8 v 10', time: '9.00pm' }],
  },
  {
    week: 5,
    starting: '2026-06-29',
    tuesday: [{ pair: '5 v 1', time: '8.00pm' }, { pair: '10 v 6', time: '9.00pm' }],
    wednesday: [{ pair: '3 v 2', time: '8.30pm' }],
    thursday: [{ pair: '9 v 7', time: '8.00pm' }, { pair: '8 v 4', time: '9.00pm' }],
  },
  {
    week: 6,
    starting: '2026-07-06',
    tuesday: [{ pair: '5 v 4', time: '8.00pm' }, { pair: '9 v 8', time: '9.00pm' }],
    wednesday: [{ pair: '6 v 1', time: '8.30pm' }],
    thursday: [{ pair: '10 v 3', time: '8.00pm' }, { pair: '7 v 2', time: '9.00pm' }],
  },
  {
    week: 7,
    starting: '2026-07-13',
    tuesday: [{ pair: '1 v 7', time: '8.00pm' }, { pair: '3 v 5', time: '9.00pm' }],
    wednesday: [{ pair: '2 v 8', time: '8.30pm' }],
    thursday: [{ pair: '6 v 9', time: '8.00pm' }, { pair: '4 v 10', time: '9.00pm' }],
  },
  {
    week: 8,
    starting: '2026-07-20',
    note: 'Cup competition games — All In Cup (Tue), Front First Cup (Wed), 4 Corners Cup (Thu)',
    tuesday: [],
    wednesday: [],
    thursday: [],
  },
  {
    week: 9,
    starting: '2026-07-27',
    note: 'Cup competition games — All In Cup (Tue), Front First Cup (Wed), 4 Corners Cup (Thu)',
    tuesday: [],
    wednesday: [],
    thursday: [],
  },
  {
    week: 10,
    starting: '2026-08-03',
    tuesday: [{ pair: '9 v 2', time: '8.00pm' }, { pair: '10 v 5', time: '9.00pm' }],
    wednesday: [{ pair: '7 v 4', time: '8.30pm' }],
    thursday: [{ pair: '8 v 1', time: '8.00pm' }, { pair: '6 v 3', time: '9.00pm' }],
  },
  {
    week: 11,
    starting: '2026-08-10',
    tuesday: [{ pair: '7 v 3', time: '8.00pm' }, { pair: '9 v 1', time: '9.00pm' }],
    wednesday: [{ pair: '2 v 10', time: '8.30pm' }],
    thursday: [{ pair: '6 v 4', time: '8.00pm' }, { pair: '8 v 5', time: '9.00pm' }],
  },
  {
    week: 12,
    starting: '2026-08-17',
    tuesday: [{ pair: '6 v 7', time: '8.00pm' }, { pair: '3 v 8', time: '9.00pm' }],
    wednesday: [{ pair: '4 v 9', time: '8.30pm' }],
    thursday: [{ pair: '2 v 5', time: '8.00pm' }, { pair: '1 v 10', time: '9.00pm' }],
  },
  {
    week: 13,
    starting: '2026-08-24',
    note: 'Cup semi-finals Tue–Thu · All Cup Finals on Friday',
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [{ pair: 'All Cup Finals', time: '' }],
  },
]

export const facilities = [
  'Function room with stage, dance floor and disco lighting for live entertainment',
  'Pool table and darts board',
  'Skittle alley — home to league and summer skittle competitions',
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
