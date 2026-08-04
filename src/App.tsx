import { Analytics } from '@vercel/analytics/react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Logo } from './components/Logo'
import { NewsBanner } from './components/NewsBanner'
import { SectionHeading } from './components/SectionHeading'
import { Photo } from './components/Photo'
import {
  TvIcon,
  MusicNoteIcon,
  BingoBallIcon,
  SkittlePinIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  CrownIcon,
  ShieldIcon,
  ClipboardIcon,
  CoinIcon,
  StarIcon,
  DiscoIcon,
  SectionDivider,
} from './components/Icons'
import {
  club,
  openingHours,
  committee,
  whatsOn,
  facilities,
  entertainmentCalendar,
  upcomingEvents,
  formatEventDate,
  skittles,
  summerSkittles,
  summerSkittlesFixtures,
  bar,
} from './data/club'
import functionRoomStage from './assets/img/function-room-stage.jpg'
import functionRoomStageWebp from './assets/img/function-room-stage.webp'
import poolTableStage from './assets/img/pool-table-stage.jpg'
import poolTableStageWebp from './assets/img/pool-table-stage.webp'
import barTaps from './assets/img/bar-taps.jpg'
import barTapsWebp from './assets/img/bar-taps.webp'
import barWide from './assets/img/bar-wide.jpg'
import barWideWebp from './assets/img/bar-wide.webp'
import spiritsShelf from './assets/img/spirits-shelf.jpg'
import spiritsShelfWebp from './assets/img/spirits-shelf.webp'
import fruitMachines from './assets/img/fruit-machines.jpg'
import fruitMachinesWebp from './assets/img/fruit-machines.webp'
import smallBarCorner from './assets/img/small-bar-corner.jpg'
import smallBarCornerWebp from './assets/img/small-bar-corner.webp'
import membershipCard from './assets/img/membership-card.jpg'
import membershipCardWebp from './assets/img/membership-card.webp'
import summerSkittlesSheet from './assets/img/summer-skittles-fixtures.jpg'
import summerSkittlesSheetWebp from './assets/img/summer-skittles-fixtures.webp'
/* Posters are picked up automatically from src/assets/img/posters, so adding a
   new act only means running the poster script and adding the event to club.ts. */
const posterJpgs = import.meta.glob('./assets/img/posters/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const posterWebps = import.meta.glob('./assets/img/posters/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function posterFor(name: string | undefined) {
  if (!name) return undefined
  const jpg = posterJpgs[`./assets/img/posters/${name}.jpg`]
  const webp = posterWebps[`./assets/img/posters/${name}.webp`]
  return jpg && webp ? { jpg, webp } : undefined
}

const gallery = [
  { src: functionRoomStage, webp: functionRoomStageWebp, alt: 'Function room with stage, dance floor and disco lighting' },
  { src: poolTableStage, webp: poolTableStageWebp, alt: 'Pool table with the stage and dance floor behind' },
  { src: barWide, webp: barWideWebp, alt: 'The club bar' },
  { src: spiritsShelf, webp: spiritsShelfWebp, alt: 'Spirits shelf behind the bar' },
  { src: fruitMachines, webp: fruitMachinesWebp, alt: 'Fruit machines' },
  { src: smallBarCorner, webp: smallBarCornerWebp, alt: 'The small bar, with boxing memorabilia on the wall' },
]


const whatsOnIcons: Record<string, typeof TvIcon> = {
  'Live sport': TvIcon,
  'Saturday entertainment': MusicNoteIcon,
  Bingo: BingoBallIcon,
  'Skittle teams': SkittlePinIcon,
}

const committeeRoles = [
  { label: 'Chairman', value: committee.chairman, Icon: CrownIcon },
  { label: 'Vice Chairman', value: committee.viceChairman, Icon: StarIcon },
  { label: 'Secretary', value: committee.secretary, Icon: ClipboardIcon },
  { label: 'Treasurer', value: committee.treasurer, Icon: CoinIcon },
  { label: 'Health & Safety', value: committee.healthAndSafety, Icon: ShieldIcon },
]

function App() {
  const events = upcomingEvents()
  const nextEvent = events[0]
  const [featured, ...rest] = events
  const featuredPoster = posterFor(featured?.poster)

  return (
    <div id="top" className="min-h-screen">
      <Header />

      <NewsBanner
        message={`Next up: ${nextEvent.act} — ${formatEventDate(nextEvent.date)}`}
        href="#entertainment"
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-club-green bg-cover bg-[position:20%_5%] text-club-cream"
        style={{ backgroundImage: `url(${functionRoomStageWebp})` }}
      >
        <div className="absolute inset-0 bg-club-green-dark/80" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-club-gold/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-club-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:py-14">
          <span className="rounded-full border border-club-gold/40 bg-club-gold/10 px-4 py-1 font-sans-ui text-xs font-bold uppercase tracking-[0.2em] text-club-gold">
            Filton, Bristol
          </span>
          <Logo className="h-16 w-16 drop-shadow-lg" />
          <h1 className="text-2xl font-bold drop-shadow-sm sm:text-4xl">{club.name}</h1>
          <p className="max-w-2xl font-sans-ui text-sm text-club-cream/90 sm:text-base">
            Bristol&rsquo;s friendly members&rsquo; club — live sport, Saturday night entertainment,
            bingo, skittles and a warm welcome for members and their guests.
          </p>
          <div className="flex flex-wrap justify-center gap-3 font-sans-ui text-sm font-semibold">
            <a
              href="#membership"
              className="rounded-full bg-club-gold px-6 py-3 text-club-green-dark shadow-lg shadow-club-gold/20 transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
            >
              Become a Member
            </a>
            <a
              href="#opening-hours"
              className="rounded-full border border-club-cream/50 px-6 py-3 text-club-cream backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
            >
              Opening Hours
            </a>
          </div>
        </div>
      </section>

      {/* Entertainment — the club's headline draw, given the most visual weight on the page */}
      <section id="entertainment" className="relative overflow-hidden border-y-4 border-club-gold bg-club-green text-club-cream">
        <div className="pointer-events-none absolute inset-0 text-club-cream/[0.04] bg-dot-pattern" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-club-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-club-gold to-club-gold/70 text-club-green-dark shadow-lg shadow-club-gold/20">
            <DiscoIcon className="h-9 w-9" />
          </div>
          <div className="mt-4">
            <SectionHeading
              eyebrow="The club's big nights out"
              title="Live Entertainment"
              subtitle={entertainmentCalendar.note}
              light
              large
            />
          </div>

          {featured && (
            <article className="relative mx-auto mt-12 grid max-w-4xl gap-0 overflow-hidden rounded-2xl bg-club-cream shadow-2xl shadow-black/30 ring-2 ring-club-gold sm:grid-cols-2">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-club-gold px-3 py-1 font-sans-ui text-xs font-bold uppercase tracking-wide text-club-green-dark shadow">
                Next up
              </span>
              {featuredPoster ? (
                <Photo
                  jpg={featuredPoster.jpg}
                  webp={featuredPoster.webp}
                  alt={`Poster for ${featured.act} at Filton & District Social Club`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="flex items-center justify-center bg-gradient-to-br from-club-green to-club-green-dark p-10">
                  <MusicNoteIcon className="h-20 w-20 text-club-gold/50" />
                </div>
              )}
              <div className="flex flex-col justify-center p-6 font-sans-ui sm:p-8">
                <time dateTime={featured.date} className="text-sm font-bold uppercase tracking-wide text-club-gold">
                  {formatEventDate(featured.date)}
                </time>
                <h3 className="mt-1 text-2xl font-bold text-club-green sm:text-3xl">{featured.act}</h3>
                {featured.blurb && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{featured.blurb}</p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                  {featured.time && (
                    <span className="flex items-center gap-1.5 rounded-full bg-club-green/[0.06] px-3 py-1.5 font-semibold text-club-green">
                      <ClockIcon className="h-4 w-4 text-club-gold" />
                      {featured.time}
                    </span>
                  )}
                  {featured.price && (
                    <span className="rounded-full bg-club-gold/15 px-3 py-1.5 font-semibold text-club-green-dark">
                      {featured.price}
                    </span>
                  )}
                </div>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((event) => {
                const poster = posterFor(event.poster)
                return (
                  <article
                    key={event.date}
                    className="flex flex-col overflow-hidden rounded-xl bg-club-cream shadow-md ring-1 ring-club-gold/20 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {poster ? (
                      <Photo
                        jpg={poster.jpg}
                        webp={poster.webp}
                        alt={`Poster for ${event.act} at Filton & District Social Club`}
                        className="w-full"
                      />
                    ) : (
                      <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-club-green to-club-green-dark">
                        <MusicNoteIcon className="h-16 w-16 text-club-gold/50" />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col border-t-4 border-club-gold p-5 font-sans-ui">
                      <time dateTime={event.date} className="text-sm font-bold uppercase tracking-wide text-club-gold">
                        {formatEventDate(event.date)}
                      </time>
                      <h3 className="mt-1 text-xl font-bold text-club-green">{event.act}</h3>
                      {event.blurb && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">{event.blurb}</p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                        {event.time && (
                          <span className="flex items-center gap-1.5 rounded-full bg-club-green/[0.06] px-3 py-1 font-semibold text-club-green">
                            <ClockIcon className="h-4 w-4 text-club-gold" />
                            {event.time}
                          </span>
                        )}
                        {event.price && (
                          <span className="rounded-full bg-club-gold/15 px-3 py-1 font-semibold text-club-green-dark">
                            {event.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <SectionDivider />

      {/* What's On */}
      <section id="whats-on" className="relative overflow-hidden mx-auto max-w-6xl px-4 py-16">
        <div className="relative">
        <SectionHeading
          eyebrow="On the calendar"
          title="What's On"
          subtitle="Something happening most nights of the week — all in a members-only, dog-friendly club."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {whatsOn.map((item) => {
            const Icon = whatsOnIcons[item.title]
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-club-green/10 border-l-4 border-l-club-gold bg-white p-6 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-club-green to-club-green-dark text-club-cream shadow-sm transition group-hover:scale-110">
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                <h3 className="mt-4 text-lg font-bold text-club-green">{item.title}</h3>
                <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">{item.blurb}</p>
              </div>
            )
          })}
        </div>
        </div>
      </section>

      <SectionDivider />

      {/* Skittles */}
      <section id="skittles" className="relative overflow-hidden mx-auto max-w-6xl px-4 py-16">
        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-club-green to-club-green-dark text-club-cream shadow-md">
            <SkittlePinIcon className="h-8 w-8" />
          </div>
          <div className="mt-4">
            <SectionHeading
              eyebrow="Two competitions"
              title="Skittles"
              subtitle="A friendly winter league through the club season, plus our own summer league on the alley."
            />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-club-green/10 border-l-4 border-l-club-gold bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-club-green">Winter league</h3>
              <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">
                We&rsquo;re a friendly team in the {skittles.league}, playing {skittles.format.toLowerCase()}{' '}
                format. {skittles.homeNight}. Interested? Contact {skittles.contactName} on{' '}
                <a href={`tel:${skittles.contactPhone.replace(/\s+/g, '')}`} className="font-semibold text-club-green underline">
                  {skittles.contactPhone}
                </a>
                .
              </p>
            </div>
            <div className="rounded-xl border border-club-green/10 border-l-4 border-l-club-gold bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-club-green">{summerSkittles.name}</h3>
              <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">
                {summerSkittles.season} &middot; {summerSkittles.weeks} weeks. {summerSkittles.format}, plus three
                cup competitions: {summerSkittles.cups.join(', ')}.
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl border border-club-green/10 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse font-sans-ui text-sm">
              <thead>
                <tr className="border-b border-club-green/10 bg-club-green/[0.04] text-left text-xs font-bold uppercase tracking-wide text-club-green">
                  <th className="px-4 py-3">Week</th>
                  <th className="px-4 py-3">Tuesday</th>
                  <th className="px-4 py-3">Wednesday</th>
                  <th className="px-4 py-3">Thursday</th>
                  <th className="px-4 py-3">Friday</th>
                </tr>
              </thead>
              <tbody>
                {summerSkittlesFixtures.map((week) => (
                  <tr key={week.week} className="border-b border-club-green/10 last:border-0 align-top">
                    <td className="px-4 py-3 font-semibold text-club-green">
                      {week.week}
                      <div className="font-normal text-gray-500">{formatEventDate(week.starting)}</div>
                    </td>
                    {week.note ? (
                      <td colSpan={4} className="px-4 py-3 italic text-gray-600">
                        {week.note}
                      </td>
                    ) : (
                      <>
                        {(['tuesday', 'wednesday', 'thursday'] as const).map((day) => (
                          <td key={day} className="px-4 py-3 text-gray-700">
                            {week[day].length > 0
                              ? week[day].map((m) => (
                                  <div key={m.pair}>
                                    {m.pair} <span className="text-gray-400">&middot; {m.time}</span>
                                  </div>
                                ))
                              : '—'}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-gray-700">
                          {week.friday?.length ? week.friday.map((m) => <div key={m.pair}>{m.pair}</div>) : '—'}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-sans-ui text-xs text-gray-500">
            Team numbers only — see the noticeboard&rsquo;s separate team sheet for names. All games played on
            Alley 2.
          </p>

          <details className="mt-6 group">
            <summary className="cursor-pointer font-sans-ui text-sm font-semibold text-club-green underline underline-offset-2">
              View the original fixture sheet
            </summary>
            <picture>
              <source srcSet={summerSkittlesSheetWebp} type="image/webp" />
              <img
                src={summerSkittlesSheet}
                alt="Filton and District Summer Skittle League 2026 fixture list"
                width={1400}
                height={2276}
                loading="lazy"
                decoding="async"
                className="mt-4 w-full max-w-md rounded-lg border border-club-green/10"
              />
            </picture>
          </details>
        </div>
      </section>

      <SectionDivider />

      {/* Facilities & Games */}
      <section id="room-hire" className="relative overflow-hidden mx-auto max-w-6xl px-4 py-16">
        <div className="relative grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <p className="font-sans-ui text-xs font-bold uppercase tracking-[0.2em] text-club-gold">
              What we offer
            </p>
            <h2 className="mt-2 text-2xl font-bold text-club-green sm:text-3xl">Facilities &amp; Room Hire</h2>
            <span className="mt-3 block h-1 w-14 rounded-full bg-club-gold" aria-hidden="true" />
            <ul className="mt-6 space-y-3 font-sans-ui text-sm text-gray-700">
              {facilities.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-club-gold" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans-ui text-sm text-gray-700">
              Looking to hire a room for a party, celebration or wake? Get in touch via our{' '}
              <a
                href={club.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-club-green underline"
              >
                Facebook group
              </a>{' '}
              or ask a committee member at the club.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-xl border border-club-green/10 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative overflow-hidden">
                <Photo
                  jpg={barTaps}
                  webp={barTapsWebp}
                  alt="Real ale, stout, cider and lager taps at the bar"
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-club-green-dark/50 to-transparent" aria-hidden="true" />
              </div>
              <div className="p-6">
              <h3 className="text-lg font-bold text-club-green">At the bar</h3>
              <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">{bar.intro}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {bar.onTap.map((drink) => (
                  <li
                    key={drink}
                    className="rounded-full bg-club-green-dark/5 px-3 py-1 font-sans-ui text-xs font-semibold text-club-green"
                  >
                    {drink}
                  </li>
                ))}
              </ul>
              </div>
            </div>
            <div className="rounded-xl border border-club-green/10 border-l-4 border-l-club-gold bg-white p-6 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-bold text-club-green">Skittle players wanted</h3>
              <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">
                We&rsquo;re a friendly team in the {skittles.league}, playing {skittles.format.toLowerCase()}{' '}
                format. {skittles.homeNight}. Interested? Contact {skittles.contactName} on{' '}
                <a href={`tel:${skittles.contactPhone.replace(/\s+/g, '')}`} className="font-semibold text-club-green underline">
                  {skittles.contactPhone}
                </a>
                . See the{' '}
                <a href="#skittles" className="font-semibold text-club-green underline">
                  Skittles
                </a>{' '}
                section for the summer league fixtures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="relative overflow-hidden mx-auto max-w-6xl px-4 py-16">
        <div
          className="pointer-events-none absolute right-0 top-1/2 hidden h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full border-[16px] border-club-gold/10 sm:block"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-club-green to-club-green-dark text-club-cream shadow-md">
          <StarIcon className="h-7 w-7" />
        </div>
        <div className="relative mt-4">
          <SectionHeading eyebrow="Join the club" title="Membership" />
        </div>
        <div className="relative mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="rounded-xl border border-club-green/10 bg-white p-8 shadow-md">
            <p className="font-sans-ui text-sm leading-relaxed text-gray-700">
              Filton &amp; District Social Club is a members-only club. To join, you must be 18 years
              of age or over. Membership applications must be proposed and seconded by existing
              members, and are subject to committee approval. Subscriptions run for the calendar year
              and are due on 1st January each year &mdash; current fees are posted on the club
              noticeboards.
            </p>
            <p className="mt-4 font-sans-ui text-sm leading-relaxed text-gray-700">
              Pop into the club or ask a committee member for an application form, or get in touch via
              our{' '}
              <a
                href={club.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-club-green underline"
              >
                Facebook group
              </a>
              .
            </p>
          </div>
          <Photo
            jpg={membershipCard}
            webp={membershipCardWebp}
            alt="Filton & District Social Club membership card"
            className="mx-auto h-40 w-auto rotate-2 rounded-lg border border-club-green/10 object-cover shadow-md transition duration-300 hover:rotate-0 hover:shadow-lg sm:h-48"
          />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative overflow-hidden bg-club-green-dark/5">
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <SectionHeading eyebrow="Take a look inside" title="Around the Club" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((photo) => (
              <div
                key={photo.src}
                className="group relative h-40 overflow-hidden rounded-xl shadow-md ring-1 ring-club-green/5 transition hover:shadow-xl hover:ring-2 hover:ring-club-gold sm:h-48"
              >
                <Photo
                  jpg={photo.src}
                  webp={photo.webp}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-club-green-dark/80 via-club-green-dark/0 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                  <p className="font-sans-ui text-xs font-medium text-club-cream">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee */}
      <section className="relative overflow-hidden bg-club-green-dark/5">
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <SectionHeading eyebrow="Who runs the club" title="Your Committee" />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 font-sans-ui sm:grid-cols-3">
            {committeeRoles.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-club-green/10 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-club-gold/15 text-club-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-club-gold">{label}</p>
                <p className="mt-1 font-bold text-club-green">{value}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center font-sans-ui text-xs text-gray-600">
            Committee members: {committee.members.join(', ')}.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Opening Hours */}
      <section id="opening-hours" className="relative overflow-hidden mx-auto max-w-6xl px-4 py-16">
        <div className="relative">
        <SectionHeading eyebrow="Plan your visit" title="Opening & Closing Times" />
        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-club-green/10 bg-white shadow-md">
          {openingHours.map((block) => (
            <div key={block.period} className="border-b border-club-green/10 px-6 py-5 last:border-b-0">
              <h3 className="flex items-center gap-2 font-sans-ui text-sm font-bold uppercase tracking-wide text-club-green">
                <ClockIcon className="h-4 w-4 text-club-gold" />
                {block.period}
              </h3>
              <dl className="mt-3 space-y-1">
                {block.rows.map((row) => (
                  <div key={row.days} className="flex justify-between font-sans-ui text-sm text-gray-700">
                    <dt>{row.days}</dt>
                    <dd className="font-semibold text-gray-900">{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center font-sans-ui text-xs text-gray-600">
          Last orders 15 minutes before closing. Hours may be amended subject to attendance.
        </p>
        </div>
      </section>

      {/* Contact / Find us */}
      <section id="contact" className="relative overflow-hidden bg-club-green text-club-cream">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-club-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 sm:items-center">
          <div className="text-center sm:text-left">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-club-gold to-club-gold/70 text-club-green-dark shadow-md sm:mx-0">
              <MapPinIcon className="h-7 w-7" />
            </div>
            <div className="mt-4">
              <SectionHeading title="Find Us" light />
            </div>
            <p className="mt-4 font-sans-ui text-club-cream/90">{club.legalName}</p>
            <p className="font-sans-ui text-club-cream/90">
              {club.address.line1}, {club.address.town}, {club.address.city} {club.address.postcode}
            </p>
            <p className="mt-2 font-sans-ui text-sm text-club-cream/70">
              Please respect our neighbours when leaving the premises.
            </p>
            <a
              href={club.facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-block rounded-full bg-club-gold px-6 py-3 font-sans-ui text-sm font-semibold text-club-green-dark shadow-lg shadow-club-gold/20 transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
            >
              Message us on Facebook
            </a>
          </div>
          <div className="h-72 w-full overflow-hidden rounded-xl border border-club-cream/20 shadow-lg sm:h-80">
            <iframe
              title="Map showing Filton & District Social Club"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${club.legalName}, ${club.address.line1}, ${club.address.town}, ${club.address.city} ${club.address.postcode}`,
              )}&output=embed`}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
      <Analytics />
    </div>
  )
}

export default App
