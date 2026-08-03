import { Logo } from './Logo'

/**
 * Logo mark pressed faintly into the section background.
 *
 * Sized by width on narrow screens — matching section height there would
 * make the square logo far wider than the viewport, showing only a
 * meaningless slice of the ring. Switches to full section height at sm+,
 * where sections are wide enough for the whole crest to fit.
 */
export function SectionWatermark() {
  return (
    <Logo
      className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[90%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.16] grayscale sm:inset-y-0 sm:top-0 sm:h-full sm:w-auto sm:translate-y-0"
    />
  )
}
