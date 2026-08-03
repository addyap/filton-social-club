import { club } from '../data/club'

export function Footer() {
  return (
    <footer className="bg-club-green-dark text-club-cream/80 font-sans-ui">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-semibold text-club-cream">{club.legalName}</p>
            <p>{club.address.line1}</p>
            <p>
              {club.address.town}, {club.address.city} {club.address.postcode}
            </p>
          </div>
          <div>
            <p className="font-semibold text-club-cream">Follow us</p>
            <a
              href={club.facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline hover:text-club-gold"
            >
              Facebook group
            </a>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-4 text-xs text-club-cream/60">
          &copy; {new Date().getFullYear()} {club.legalName}. Members only club. All are welcome to enquire about membership.
        </p>
      </div>
    </footer>
  )
}
