import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Logo } from './components/Logo'
import { FacebookFeed } from './components/FacebookFeed'
import { NewsBanner } from './components/NewsBanner'
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
  skittles,
  bar,
} from './data/club'
import functionRoomStage from './assets/img/function-room-stage.jpg'
import poolTableStage from './assets/img/pool-table-stage.jpg'
import barTaps from './assets/img/bar-taps.jpg'
import barWide from './assets/img/bar-wide.jpg'
import spiritsShelf from './assets/img/spirits-shelf.jpg'
import fruitMachines from './assets/img/fruit-machines.jpg'
import smallBarCorner from './assets/img/small-bar-corner.jpg'
import membershipCard from './assets/img/membership-card.jpg'

const gallery = [
  { src: functionRoomStage, alt: 'Function room with stage, dance floor and disco lighting' },
  { src: poolTableStage, alt: 'Pool table with the stage and dance floor behind' },
  { src: barWide, alt: 'The club bar' },
  { src: spiritsShelf, alt: 'Spirits shelf behind the bar' },
  { src: fruitMachines, alt: 'Fruit machines' },
  { src: smallBarCorner, alt: 'The small bar, with boxing memorabilia on the wall' },
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
  return (
    <div id="top" className="min-h-screen">
      <Header />

      <NewsBanner
        message={`This Saturday: ${entertainmentCalendar.dates[0].act} — ${entertainmentCalendar.dates[0].price} for members`}
        href="#entertainment"
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-club-green bg-cover bg-center text-club-cream"
        style={{ backgroundImage: `url(${functionRoomStage})` }}
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
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 text-left sm:py-14">
          <Logo className="h-16 w-16 drop-shadow-lg" />
          <h1 className="text-2xl font-bold sm:text-4xl">{club.name}</h1>
          <p className="max-w-2xl font-sans-ui text-sm text-club-cream/90 sm:text-base">
            Bristol&rsquo;s friendly members&rsquo; club — live sport, Saturday night entertainment,
            bingo, skittles and a warm welcome for members and their guests.
          </p>
          <div className="flex flex-wrap justify-start gap-3 font-sans-ui text-sm font-semibold">
            <a
              href="#membership"
              className="rounded-full bg-club-gold px-6 py-3 text-club-green-dark transition hover:brightness-105"
            >
              Become a Member
            </a>
            <a
              href="#opening-hours"
              className="rounded-full border border-club-cream/50 px-6 py-3 text-club-cream transition hover:bg-white/10"
            >
              Opening Hours
            </a>
          </div>
        </div>
      </section>

      {/* What's On */}
      <section id="whats-on" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">What&rsquo;s On</h2>
        <p className="mx-auto mt-2 max-w-xl text-center font-sans-ui text-sm text-club-green/70">
          Something happening most nights of the week — all in a members-only, dog-friendly club.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {whatsOn.map((item) => {
            const Icon = whatsOnIcons[item.title]
            return (
              <div
                key={item.title}
                className="group rounded-xl border border-club-green/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-club-green/10 text-club-green transition group-hover:bg-club-gold/20">
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                <h3 className="mt-4 text-lg font-bold text-club-green">{item.title}</h3>
                <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">{item.blurb}</p>
              </div>
            )
          })}
        </div>
      </section>

      <SectionDivider />

      {/* This month's entertainment */}
      <section id="entertainment" className="relative overflow-hidden bg-club-green-dark/5">
        <div className="pointer-events-none absolute inset-0 text-club-green/[0.04] bg-dot-pattern" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-club-gold/15 text-club-gold">
            <DiscoIcon className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-center text-2xl font-bold text-club-green sm:text-3xl">
            Saturday Entertainment — {entertainmentCalendar.month}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center font-sans-ui text-sm text-club-green/70">
            {entertainmentCalendar.note}
          </p>
          <div className="mx-auto mt-8 max-w-lg overflow-hidden rounded-xl border border-club-green/10 bg-white shadow-sm">
            {entertainmentCalendar.dates.map((row, i) => (
              <div
                key={row.date}
                className={`flex items-center justify-between border-b border-club-green/10 border-l-4 px-6 py-4 font-sans-ui text-sm transition last:border-b-0 hover:bg-club-green/5 ${
                  i === 0 ? 'border-l-club-gold' : 'border-l-transparent'
                }`}
              >
                <span className="flex items-center gap-2 font-semibold text-club-green">
                  <MusicNoteIcon className="h-4 w-4 text-club-gold" />
                  {row.date}
                </span>
                <span className="text-gray-800">{row.act}</span>
                <span className="font-semibold text-gray-900">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Facilities & Games */}
      <section id="room-hire" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <h2 className="text-2xl font-bold text-club-green sm:text-3xl">Facilities &amp; Room Hire</h2>
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
            <div className="group overflow-hidden rounded-xl border border-club-green/10 bg-white shadow-sm transition hover:shadow-lg">
              <div className="overflow-hidden">
                <img
                  src={barTaps}
                  alt="Real ale, stout, cider and lager taps at the bar"
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
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
            <div className="rounded-xl border border-club-green/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-club-green">Skittle players wanted</h3>
              <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">
                We&rsquo;re a friendly team in the {skittles.league}, playing {skittles.format.toLowerCase()}{' '}
                format. {skittles.homeNight}. Interested? Contact {skittles.contactName} on{' '}
                <a href={`tel:${skittles.contactPhone.replace(/\s+/g, '')}`} className="font-semibold text-club-green underline">
                  {skittles.contactPhone}
                </a>
                .
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
        <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-club-green/10 text-club-green">
          <StarIcon className="h-6 w-6" />
        </div>
        <h2 className="relative mt-4 text-center text-2xl font-bold text-club-green sm:text-3xl">Membership</h2>
        <div className="relative mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="rounded-xl border border-club-green/10 bg-white p-8 shadow-sm">
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
          <img
            src={membershipCard}
            alt="Filton & District Social Club membership card"
            className="mx-auto h-40 w-auto rotate-2 rounded-lg border border-club-green/10 object-cover shadow-md transition duration-300 hover:rotate-0 hover:shadow-lg sm:h-48"
          />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-club-green-dark/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">Around the Club</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((photo) => (
              <div
                key={photo.src}
                className="group relative h-40 overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg sm:h-48"
              >
                <img
                  src={photo.src}
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
      <section className="bg-club-green-dark/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">
            Your Committee
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-8 text-center font-sans-ui sm:grid-cols-3">
            {committeeRoles.map(({ label, value, Icon }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-club-gold/15 text-club-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-club-gold">{label}</p>
                <p className="mt-1 text-gray-800">{value}</p>
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
      <section id="opening-hours" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">
          Opening &amp; Closing Times
        </h2>
        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-club-green/10 bg-white shadow-sm">
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
      </section>

      <SectionDivider />

      {/* Facebook feed */}
      <section id="facebook" className="bg-club-green-dark/5">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-club-green sm:text-3xl">Latest from Facebook</h2>
          <p className="mx-auto mt-2 max-w-xl font-sans-ui text-sm text-club-green/70">
            Catch up with what&rsquo;s happening at the club between visits.
          </p>
          <div className="mx-auto mt-8 w-fit max-w-full overflow-hidden rounded-xl border border-club-green/10 bg-white p-2 shadow-sm">
            <FacebookFeed groupUrl={club.facebookUrl} />
          </div>
        </div>
      </section>

      {/* Contact / Find us */}
      <section id="contact" className="relative overflow-hidden bg-club-green text-club-cream">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-club-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-club-gold/15 text-club-gold">
            <MapPinIcon className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Find Us</h2>
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
            className="mt-6 inline-block rounded-full bg-club-gold px-6 py-3 font-sans-ui text-sm font-semibold text-club-green-dark transition hover:brightness-105"
          >
            Message us on Facebook
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
