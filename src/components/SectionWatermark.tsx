import { Logo } from './Logo'

/** Full section-height logo mark, edge to edge top-to-bottom, pressed into the background. */
export function SectionWatermark() {
  return (
    <Logo
      className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-auto -translate-x-1/2 opacity-[0.16] grayscale"
    />
  )
}
