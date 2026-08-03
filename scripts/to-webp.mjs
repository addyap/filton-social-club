import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const dir = path.resolve(import.meta.dirname, '../src/assets/img')

const files = (await readdir(dir)).filter((f) => f.endsWith('.jpg'))

for (const file of files) {
  const input = path.join(dir, file)
  const output = path.join(dir, file.replace(/\.jpg$/, '.webp'))
  await sharp(input).webp({ quality: 78 }).toFile(output)
  console.log(`${file} -> ${path.basename(output)}`)
}
