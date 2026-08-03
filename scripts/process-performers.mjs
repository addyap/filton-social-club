import sharp from 'sharp'
import path from 'node:path'

const outDir = path.resolve(import.meta.dirname, '../src/assets/img/posters')

// Add a { src, name } entry here for each new event poster, then run:
//   node scripts/process-performers.mjs
// This resizes to a sensible max width (keeping the full poster legible)
// and outputs a jpg + webp pair named `<name>.jpg` / `<name>.webp` into
// src/assets/img/posters/. Reference `poster: '<name>'` on the matching
// entry in entertainmentCalendar.dates in src/data/club.ts.
const jobs = [
  { src: '/Users/antonyaddy/Downloads/Guy Young.jpg', name: 'guy-young' },
  { src: '/Users/antonyaddy/Downloads/Rowland.jog.jpg', name: 'rowland' },
]

for (const job of jobs) {
  const base = sharp(job.src).resize({ width: 900, withoutEnlargement: true })
  await base.clone().jpeg({ quality: 88 }).toFile(path.join(outDir, `${job.name}.jpg`))
  await base.clone().webp({ quality: 88 }).toFile(path.join(outDir, `${job.name}.webp`))
  console.log(job.name, 'done')
}
