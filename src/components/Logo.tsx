type LogoProps = {
  className?: string
}

/** Simple typographic emblem — the club has no logo of its own yet. */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-label="Filton & District Social Club emblem"
    >
      <circle cx="48" cy="48" r="46" fill="#1c3358" stroke="#c9a227" strokeWidth="3" />
      <circle cx="48" cy="48" r="38" fill="none" stroke="#c9a227" strokeWidth="1" />
      <text
        x="48"
        y="44"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        fill="#faf7ee"
      >
        FDSC
      </text>
      <text
        x="48"
        y="62"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="9"
        letterSpacing="1.5"
        fill="#c9a227"
      >
        FILTON
      </text>
    </svg>
  )
}
