import { useState } from 'react'
import { Logo } from './Logo'
import { club } from '../data/club'
import { MenuIcon, CloseIcon } from './Icons'

const navLinks = [
  { href: '#whats-on', label: "What's On" },
  { href: '#entertainment', label: 'Entertainment' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#skittles', label: 'Skittles' },
  { href: '#room-hire', label: 'Room Hire' },
  { href: '#membership', label: 'Membership' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#opening-hours', label: 'Opening Hours' },
  { href: '#contact', label: 'Find Us' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-club-green text-club-cream shadow-md font-sans-ui">
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        <a href="#top" className="flex flex-1 items-center gap-2 sm:gap-3 lg:flex-none">
          <Logo className="h-9 w-9 shrink-0 sm:h-12 sm:w-12" />
          <span className="text-xs font-semibold leading-tight sm:text-lg lg:text-xl">
            {club.name}
          </span>
        </a>
        <div className="flex items-center gap-6 lg:gap-8">
          <nav className="hidden shrink-0 gap-5 text-sm font-medium lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="whitespace-nowrap hover:text-club-gold transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={club.facebookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="shrink-0 rounded-full bg-club-gold px-3 py-1.5 text-xs font-semibold text-club-green-dark shadow-sm transition hover:-translate-y-0.5 hover:brightness-105 sm:px-4 sm:py-2 sm:text-sm"
            >
              Facebook
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10 lg:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 text-sm font-medium lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 hover:bg-white/10 hover:text-club-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
