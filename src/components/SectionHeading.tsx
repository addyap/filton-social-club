type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
}

/** Consistent heading treatment — small gold kicker, underline accent, optional subtitle. */
export function SectionHeading({ eyebrow, title, subtitle, light }: SectionHeadingProps) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className="mb-2 font-sans-ui text-xs font-bold uppercase tracking-[0.2em] text-club-gold">
          {eyebrow}
        </p>
      )}
      <h2 className={`text-2xl font-bold sm:text-3xl ${light ? 'text-club-cream' : 'text-club-green'}`}>
        {title}
      </h2>
      <span className="mx-auto mt-3 block h-1 w-14 rounded-full bg-club-gold" aria-hidden="true" />
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-xl font-sans-ui text-sm ${
            light ? 'text-club-cream/80' : 'text-club-green/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
