import { useEffect, useState } from 'react'
import { MegaphoneIcon } from './Icons'

export type NewsItem = {
  tag: string
  title: string
  detail: string
  href: string
  poster?: { jpg: string; webp: string }
}

const ROTATE_MS = 6000

export function NewsBanner({ items }: { items: NewsItem[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [items.length])

  const item = items[index]

  return (
    <div className="relative flex items-stretch justify-center bg-club-gold">
      <a
        key={index}
        href={item.href}
        aria-live="polite"
        className="animate-news-in flex w-full max-w-6xl items-center justify-center gap-3 px-4 py-3.5 text-club-green-dark transition hover:brightness-105 sm:gap-4 sm:py-4"
      >
        {item.poster ? (
          <picture>
            <source srcSet={item.poster.webp} type="image/webp" />
            <img
              src={item.poster.jpg}
              alt=""
              aria-hidden="true"
              className="hidden h-12 w-12 shrink-0 rounded-full border-2 border-club-green-dark/20 object-cover shadow-sm sm:block"
            />
          </picture>
        ) : (
          <MegaphoneIcon className="hidden h-6 w-6 shrink-0 sm:block" />
        )}
        <span className="flex min-w-0 flex-col items-center text-center leading-tight sm:flex-row sm:gap-2 sm:text-left">
          <span className="rounded-full bg-club-green-dark/10 px-2 py-0.5 font-sans-ui text-[11px] font-bold uppercase tracking-wider text-club-green-dark/80">
            {item.tag}
          </span>
          <span className="w-full truncate font-serif text-lg font-bold sm:w-auto sm:text-xl">{item.title}</span>
          <span className="font-sans-ui text-sm font-semibold text-club-green-dark/80">{item.detail}</span>
        </span>
        <span className="hidden shrink-0 font-sans-ui text-sm font-bold underline underline-offset-2 sm:inline">
          Find out more &rarr;
        </span>
      </a>
      {items.length > 1 && (
        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
          {items.map((news, i) => (
            <span
              key={news.tag}
              className={`h-1.5 w-1.5 rounded-full transition ${i === index ? 'bg-club-green-dark/70' : 'bg-club-green-dark/25'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
