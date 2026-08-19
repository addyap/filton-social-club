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

export type Poster = { jpg: string; webp: string }

/** Looks up an event's poster by its `poster` name, or undefined if it has none yet. */
export function posterFor(name: string | undefined): Poster | undefined {
  if (!name) return undefined
  const jpg = posterJpgs[`./assets/img/posters/${name}.jpg`]
  const webp = posterWebps[`./assets/img/posters/${name}.webp`]
  return jpg && webp ? { jpg, webp } : undefined
}
