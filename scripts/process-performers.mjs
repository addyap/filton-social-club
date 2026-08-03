import sharp from 'sharp'
import path from 'node:path'

const outDir = path.resolve(import.meta.dirname, '../src/assets/img')

const jobs = [
  { src: '/Users/antonyaddy/Downloads/Guy Young.jpg', crop: { left: 260, top: 250, width: 380, height: 380 }, name: 'guy-young' },
  { src: '/Users/antonyaddy/Downloads/Rowland.jog.jpg', crop: { left: 660, top: 60, width: 360, height: 360 }, name: 'rowland' },
]

for (const job of jobs) {
  const base = sharp(job.src).extract(job.crop).resize(400, 400)
  await base.clone().jpeg({ quality: 85 }).toFile(path.join(outDir, `${job.name}.jpg`))
  await base.clone().webp({ quality: 85 }).toFile(path.join(outDir, `${job.name}.webp`))
  console.log(job.name, 'done')
}
