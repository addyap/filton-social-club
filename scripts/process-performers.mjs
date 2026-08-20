import sharp from 'sharp'
import path from 'node:path'

const DL = '/Users/antonyaddy/Downloads'
const imgDir = path.resolve(import.meta.dirname, '../src/assets/img')
const posterDir = path.join(imgDir, 'posters')

// One entry per event poster.
//
// To add a future act:
//   1. Save the poster image (anywhere — set `src` to its path).
//   2. Add an entry below with a kebab-case `name`.
//   3. Run: node scripts/process-performers.mjs
//   4. Set `poster: '<name>'` on the matching event in
//      src/data/club.ts -> entertainmentCalendar.events
//
// Optional fields:
//   rotate — degrees clockwise, to straighten a tilted poster first
//   crop   — { left, top, width, height } applied after any rotation
//   dir    — 'img' to write outside the posters folder (non-event images)
const jobs = [
  { src: `${DL}/Guy Young.jpg`, name: 'guy-young' },
  { src: `${DL}/Rowland.jog.jpg`, name: 'rowland' },
  { src: `${DL}/MG Vocalist.jpg`, name: 'mark-godfrey' },
  { src: `${DL}/Dresdens.jpg`, name: 'dresdens' },
  { src: `${DL}/Ryan Mills.jpg`, name: 'ryan-mills' },
  { src: `${DL}/Deja Two.jpg`, name: 'deja-two' },
  { src: `${DL}/Quiz Bingo.jpg`, name: 'quiz-night' },
  { src: `${DL}/Brendan Kayleigh Jo.jpg`, name: 'brendan-kayleigh-jo' },
  { src: `${DL}/Dean Oliver.jpg`, name: 'dean-oliver' },
  { src: `${DL}/Beth Amis.jpg`, name: 'beth-amis' },
  { src: `${DL}/AGAIN.jpg`, name: 'lucciano-frankie' },
  { src: `${DL}/FILTON MORE MORE MORE.jpg`, name: 'abbaholics' },
  { src: `${DL}/FILTON MORE.jpg`, name: 'top-of-the-pops-xmas' },

  // The New Jersey Boys arrived tilted inside a collage — straighten, then crop.
  {
    src: `${DL}/OCTOBER TO NOVEMBER FILTON SOCIAL CLUB.jpg`,
    name: 'new-jersey-boys',
    rotate: 2.5,
    crop: { left: 92, top: 50, width: 533, height: 743 },
  },

  // Three 2027 posters share one collage image.
  {
    src: `${DL}/MORE MORE FILTON.jpg`,
    name: 'the-remakes',
    crop: { left: 18, top: 18, width: 492, height: 735 },
  },
  {
    src: `${DL}/MORE MORE FILTON.jpg`,
    name: 'boo-ga-loo',
    crop: { left: 535, top: 12, width: 533, height: 733 },
  },
  {
    src: `${DL}/MORE MORE FILTON.jpg`,
    name: 'outatime',
    crop: { left: 212, top: 1128, width: 620, height: 775 },
  },
  { src: `${DL}/New Year FDSC.jpg`, name: 'new-years-eve' },

  // Not an act poster — the summer skittle league fixture sheet, cropped in
  // from the surrounding desk so the laminated sheet fills the frame.
  {
    src: `${DL}/Summer Skittles.jpg`,
    name: 'summer-skittles-fixtures',
    crop: { left: 20, top: 100, width: 1825, height: 3000 },
    dir: 'img',
  },
]

for (const job of jobs) {
  let img = sharp(job.src)

  if (job.rotate) {
    const rotated = await img.rotate(job.rotate, { background: { r: 255, g: 255, b: 255 } }).toBuffer()
    img = sharp(rotated)
  }
  if (job.crop) img = img.extract(job.crop)

  const dest = job.dir === 'img' ? imgDir : posterDir
  const base = img.resize({ width: 900, withoutEnlargement: true })
  // The .jpg stays high quality — it's the archive copy these are re-encoded
  // from. The .webp is what visitors actually download; keep its settings in
  // step with to-webp.mjs.
  await base.clone().jpeg({ quality: 88 }).toFile(path.join(dest, `${job.name}.jpg`))
  await base.clone().webp({ quality: 76, effort: 6 }).toFile(path.join(dest, `${job.name}.webp`))
  console.log(job.name, 'done')
}
