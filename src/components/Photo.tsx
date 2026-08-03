type PhotoProps = {
  jpg: string
  webp: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

/** JPEG fallback with a WebP source for browsers that support it. */
export function Photo({ jpg, webp, alt, className, loading = 'lazy' }: PhotoProps) {
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={jpg}
        alt={alt}
        width={1600}
        height={900}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
