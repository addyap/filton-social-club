import logoPng from '../assets/img/logo-192.png'
import logoWebp from '../assets/img/logo-192.webp'

type LogoProps = {
  className?: string
}

// 192px covers the largest on-screen use (64px in the hero) at 3x DPR. The
// 512px master stays for the favicon and touch icons, which are cut from it.
export function Logo({ className }: LogoProps) {
  return (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt="Filton & District Social Club crest"
        className={className}
        width={192}
        height={192}
      />
    </picture>
  )
}
