import { MegaphoneIcon } from './Icons'

type NewsBannerProps = {
  act: string
  dateLabel: string
  time?: string
  price?: string
  href: string
  poster?: { jpg: string; webp: string }
}

export function NewsBanner({ act, dateLabel, time, price, href, poster }: NewsBannerProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-3 bg-club-gold px-4 py-3.5 text-club-green-dark transition hover:brightness-105 sm:gap-4 sm:py-4"
    >
      {poster ? (
        <picture>
          <source srcSet={poster.webp} type="image/webp" />
          <img
            src={poster.jpg}
            alt=""
            aria-hidden="true"
            className="hidden h-12 w-12 shrink-0 rounded-full border-2 border-club-green-dark/20 object-cover shadow-sm sm:block"
          />
        </picture>
      ) : (
        <MegaphoneIcon className="hidden h-6 w-6 shrink-0 sm:block" />
      )}
      <span className="flex min-w-0 flex-col items-center text-center leading-tight sm:flex-row sm:gap-2 sm:text-left">
        <span className="font-sans-ui text-[11px] font-bold uppercase tracking-wider text-club-green-dark/70">
          Next up
        </span>
        <span className="truncate font-serif text-lg font-bold sm:text-xl">{act}</span>
        <span className="font-sans-ui text-sm font-semibold text-club-green-dark/80">
          {dateLabel}
          {time ? ` · ${time}` : ''}
          {price ? ` · ${price}` : ''}
        </span>
      </span>
      <span className="hidden shrink-0 font-sans-ui text-sm font-bold underline underline-offset-2 sm:inline">
        See full lineup &rarr;
      </span>
    </a>
  )
}
