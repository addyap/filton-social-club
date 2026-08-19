import dimensions from './assets/img/dimensions.json'

/* Posters are picked up automatically from src/assets/img/posters, so adding a
   new act only means running the poster script and adding the event to club.ts. */
const posterJpgs = import.meta.glob('./assets/img/posters/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const posterWebps = import.meta.glob('./assets/img/posters/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

// JSON widens the pairs to number[]; they are always [width, height].
const sizes = dimensions as unknown as Record<string, [number, number]>

export type Poster = { jpg: string; webp: string; width: number; height: number }

/** Looks up an event's poster by its `poster` name, or undefined if it has none yet. */
export function posterFor(name: string | undefined): Poster | undefined {
  if (!name) return undefined
  const jpg = posterJpgs[`./assets/img/posters/${name}.jpg`]
  const webp = posterWebps[`./assets/img/posters/${name}.webp`]
  const size = sizes[`posters/${name}`]
  if (!jpg || !webp || !size) return undefined
  return { jpg, webp, width: size[0], height: size[1] }
}

/** Intrinsic size of a non-poster image, by filename stem (e.g. 'bar-wide'). */
export function sizeOf(name: string): { width: number; height: number } {
  const size = sizes[name]
  if (!size) throw new Error(`No recorded dimensions for image "${name}" — run scripts/image-manifest.mjs`)
  return { width: size[0], height: size[1] }
}
