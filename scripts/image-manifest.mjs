import sharp from 'sharp'
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Records the real pixel size of every image we ship, so <Photo> can reserve the
// right box before the file arrives. Without this the browser reserves a guessed
// ratio and the page jumps as each image loads.
//
// Run after adding or reprocessing images:
//   node scripts/image-manifest.mjs

const imgDir = path.resolve(import.meta.dirname, '../src/assets/img')

async function measure(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const out = {}

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      Object.assign(out, await measure(full, `${prefix}${entry.name}/`))
      continue
    }
    // The .webp is generated from the same source at the same size, so one
    // measurement covers both formats.
    if (!/\.(jpg|png)$/.test(entry.name)) continue
    const { width, height } = await sharp(full).metadata()
    out[`${prefix}${entry.name.replace(/\.(jpg|png)$/, '')}`] = [width, height]
  }
  return out
}

const manifest = await measure(imgDir)
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))

await writeFile(path.join(imgDir, 'dimensions.json'), `${JSON.stringify(sorted, null, 2)}\n`)
console.log(`wrote dimensions.json (${Object.keys(sorted).length} images)`)
