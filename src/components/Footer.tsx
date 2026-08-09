import { club } from '../data/club'
import { Logo } from './Logo'
import { MapPinIcon } from './Icons'

export function Footer() {
  return (
    <footer className="bg-club-green-dark text-club-cream/80 font-sans-ui">
      <div className="h-1 bg-gradient-to-r from-club-gold/0 via-club-gold to-club-gold/0" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-start gap-3">
            <Logo className="h-10 w-10 shrink-0" />
            <div>
              <p className="font-semibold text-club-cream">{club.legalName}</p>
              <p className="mt-1 flex items-center gap-1.5">
                <MapPinIcon className="h-3.5 w-3.5 text-club-gold" />
                {club.address.line1}, {club.address.town}, {club.address.city} {club.address.postcode}
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-wide text-club-gold text-xs">Follow us</p>
            <a
              href={club.facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 inline-block underline decoration-club-gold/50 underline-offset-2 hover:text-club-gold"
            >
              Facebook group
            </a>
          </div>
        </div>
        <div className="mt-8 space-y-3 border-t border-white/10 pt-4 text-xs text-club-cream/60">
          <p>
            &copy; {new Date().getFullYear()} {club.legalName}. Members only club. All are welcome to enquire about membership.
          </p>
          <p>
            This website is provided for general informational purposes only. Details are correct at the time of
            publishing but may change without notice.
          </p>
        </div>
      </div>
    </footer>
  )
}
