import { MegaphoneIcon } from './Icons'

type NewsBannerProps = {
  message: string
  href: string
}

export function NewsBanner({ message, href }: NewsBannerProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-2 bg-club-gold px-4 py-2.5 text-center font-sans-ui text-sm font-semibold text-club-green-dark transition hover:brightness-105"
    >
      <MegaphoneIcon className="h-4 w-4 shrink-0" />
      <span className="truncate">{message}</span>
      <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
