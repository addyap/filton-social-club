import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Logo } from './components/Logo'
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

function App() {
  return (
    <div id="top" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-club-green text-club-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
          <Logo className="h-24 w-24" />
          <h1 className="text-3xl font-bold sm:text-5xl">{club.name}</h1>
          <p className="max-w-2xl font-sans-ui text-base text-club-cream/90 sm:text-lg">
            Bristol&rsquo;s friendly members&rsquo; club — live sport, Saturday night entertainment,
            bingo, skittles and a warm welcome for members and their guests.
          </p>
          <div className="flex flex-wrap justify-center gap-3 font-sans-ui text-sm font-semibold">
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
          {whatsOn.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-club-green/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-club-green">{item.title}</h3>
              <p className="mt-2 font-sans-ui text-sm leading-relaxed text-gray-700">{item.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* This month's entertainment */}
      <section id="entertainment" className="bg-club-green-dark/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">
            Saturday Entertainment — {entertainmentCalendar.month}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center font-sans-ui text-sm text-club-green/70">
            {entertainmentCalendar.note}
          </p>
          <div className="mx-auto mt-8 max-w-lg overflow-hidden rounded-xl border border-club-green/10 bg-white shadow-sm">
            {entertainmentCalendar.dates.map((row) => (
              <div
                key={row.date}
                className="flex items-center justify-between border-b border-club-green/10 px-6 py-4 font-sans-ui text-sm last:border-b-0"
              >
                <span className="font-semibold text-club-green">{row.date}</span>
                <span className="text-gray-800">{row.act}</span>
                <span className="font-semibold text-gray-900">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Games */}
      <section id="room-hire" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <h2 className="text-2xl font-bold text-club-green sm:text-3xl">Facilities &amp; Room Hire</h2>
            <ul className="mt-6 space-y-3 font-sans-ui text-sm text-gray-700">
              {facilities.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-club-gold" aria-hidden="true" />
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
            <div className="rounded-xl border border-club-green/10 bg-white p-6 shadow-sm">
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
      <section id="membership" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">Membership</h2>
        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-club-green/10 bg-white p-8 shadow-sm">
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
      </section>

      {/* Committee */}
      <section className="bg-club-green-dark/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">
            Your Committee
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 text-center font-sans-ui sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-club-gold">Chairman</p>
              <p className="mt-1 text-gray-800">{committee.chairman}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-club-gold">
                Vice Chairman
              </p>
              <p className="mt-1 text-gray-800">{committee.viceChairman}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-club-gold">Secretary</p>
              <p className="mt-1 text-gray-800">{committee.secretary}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-club-gold">Treasurer</p>
              <p className="mt-1 text-gray-800">{committee.treasurer}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-club-gold">
                Health &amp; Safety
              </p>
              <p className="mt-1 text-gray-800">{committee.healthAndSafety}</p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center font-sans-ui text-xs text-gray-600">
            Committee members: {committee.members.join(', ')}.
          </p>
        </div>
      </section>

      {/* Opening Hours */}
      <section id="opening-hours" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-club-green sm:text-3xl">
          Opening &amp; Closing Times
        </h2>
        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-club-green/10 bg-white shadow-sm">
          {openingHours.map((block) => (
            <div key={block.period} className="border-b border-club-green/10 px-6 py-5 last:border-b-0">
              <h3 className="font-sans-ui text-sm font-bold uppercase tracking-wide text-club-green">
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

      {/* Contact / Find us */}
      <section id="contact" className="bg-club-green text-club-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Find Us</h2>
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
