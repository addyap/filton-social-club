import logoPng from '../assets/img/logo-512.png'
import logoWebp from '../assets/img/logo-512.webp'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt="Filton & District Social Club crest"
        className={className}
        width={512}
        height={512}
      />
    </picture>
  )
}
