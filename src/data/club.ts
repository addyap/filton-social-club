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
    { date: '2026-10-10', act: 'The New Jersey Boys', blurb: 'The music of Frankie Valli and The Four Seasons, plus Showaddywaddy and other legends', poster: 'new-jersey-boys' },
    { date: '2026-10-17', act: 'Lucciano & Frankie', time: '9.00pm', blurb: 'As seen on Britain’s Got Talent — one night only', poster: 'lucciano-frankie' },
    { date: '2026-11-07', act: 'Abbaholics', blurb: 'The ultimate ABBA tribute, with Disco Dollz', poster: 'abbaholics' },
    { date: '2026-12-12', act: 'The Top of the Pops Live Showband', blurb: 'Xmas Special — floor-filling Motown, soul, Northern Soul, 70s and 80s', poster: 'top-of-the-pops-xmas' },
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
