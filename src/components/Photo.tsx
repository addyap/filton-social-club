type PhotoProps = {
  jpg: string
  webp: string
  alt: string
  /** Intrinsic pixel size, so the browser reserves the right box before load. */
  width: number
  height: number
  className?: string
  loading?: 'lazy' | 'eager'
}

/** JPEG fallback with a WebP source for browsers that support it. */
export function Photo({ jpg, webp, alt, width, height, className, loading = 'lazy' }: PhotoProps) {
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={jpg}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
