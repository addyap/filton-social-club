type LogoProps = {
  className?: string
}

/** Circular crest — curved banner text, star centrepiece, double ring border. */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Filton & District Social Club emblem"
    >
      <circle cx="50" cy="50" r="48" fill="#1c3358" stroke="#c9a227" strokeWidth="3" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.7" />

      <defs>
        <path id="logoTopArc" fill="none" d="M 20.6,33 A 34,34 0 0,1 79.4,33" />
        <path id="logoBottomArc" fill="none" d="M 20.6,67 A 34,34 0 0,0 79.4,67" />
      </defs>

      <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="7.2" fontWeight="700" letterSpacing="1.2" fill="#c9a227">
        <textPath href="#logoTopArc" startOffset="50%" textAnchor="middle">
          FILTON &amp; DISTRICT
        </textPath>
      </text>
      <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="7.2" fontWeight="700" letterSpacing="1.8" fill="#c9a227">
        <textPath href="#logoBottomArc" startOffset="50%" textAnchor="middle">
          SOCIAL CLUB
        </textPath>
      </text>

      <circle cx="20.6" cy="50" r="1.6" fill="#c9a227" />
      <circle cx="79.4" cy="50" r="1.6" fill="#c9a227" />

      <path
        d="M50,37 L53.2,45.5 L62.4,46.0 L55.2,51.7 L57.6,60.5 L50,55.5 L42.4,60.5 L44.8,51.7 L37.6,46.0 L46.8,45.5 Z"
        fill="#faf7ee"
        stroke="#c9a227"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
