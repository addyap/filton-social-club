import { Logo } from './Logo'

/** Large centred logo mark, pressed into the section background. */
export function SectionWatermark() {
  return (
    <Logo
      className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] grayscale"
    />
  )
}
