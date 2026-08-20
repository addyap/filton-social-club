import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

// Regenerates a .webp alongside every .jpg we ship, including the posters
// folder. Every current browser takes the WebP, so this is what visitors
// actually download — the .jpg is only a fallback.
//
//   node scripts/to-webp.mjs
//
// Quality 76 at effort 6: the extra effort costs encoder time at build only,
// and buys roughly a third off the file for no visible difference. Posters are
// full of text, which smears before photos do, so this isn't pushed lower.
// Keep in step with the same settings in process-performers.mjs.
const WEBP = { quality: 76, effort: 6 }

const root = path.resolve(import.meta.dirname, '../src/assets/img')

async function convert(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await convert(full)
      continue
    }
    if (!entry.name.endsWith('.jpg')) continue

    await sharp(full).webp(WEBP).toFile(full.replace(/\.jpg$/, '.webp'))
    console.log(path.relative(root, full))
  }
}

await convert(root)
