import { Logo } from './Logo'
import { club } from '../data/club'

const navLinks = [
  { href: '#whats-on', label: "What's On" },
  { href: '#entertainment', label: 'Entertainment' },
  { href: '#room-hire', label: 'Room Hire' },
  { href: '#membership', label: 'Membership' },
  { href: '#opening-hours', label: 'Opening Hours' },
  { href: '#contact', label: 'Find Us' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-club-green text-club-cream shadow-md font-sans-ui">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="flex items-center gap-3">
          <Logo className="h-12 w-12 shrink-0" />
          <span className="text-lg font-semibold leading-tight sm:text-xl">
            {club.name}
          </span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-club-gold transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={club.facebookUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full bg-club-gold px-4 py-2 text-sm font-semibold text-club-green-dark transition hover:brightness-105"
        >
          Facebook
        </a>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-white/10 px-4 py-2 text-xs font-medium md:hidden">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="whitespace-nowrap hover:text-club-gold">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
