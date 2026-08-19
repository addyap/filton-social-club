import sharp from 'sharp'
import path from 'node:path'

const src = '/Users/antonyaddy/Downloads/Filton and District Social Club Logo.jpg'
const outDir = path.resolve(import.meta.dirname, '../src/assets/img')
const publicDir = path.resolve(import.meta.dirname, '../public')

const centerX = 506
const centerY = 512
const radius = 465 // a few px past the detected ring edge (~460) to avoid clipping it
const feather = 3

const image = sharp(src)
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

const rgba = Buffer.alloc(width * height * 4)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels
    const o = (y * width + x) * 4
    const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
    let alpha
    if (dist <= radius - feather) alpha = 255
    else if (dist >= radius + feather) alpha = 0
    else alpha = Math.round((1 - (dist - (radius - feather)) / (feather * 2)) * 255)
    rgba[o] = data[i]
    rgba[o + 1] = data[i + 1]
    rgba[o + 2] = data[i + 2]
    rgba[o + 3] = alpha
  }
}

const masked = sharp(rgba, { raw: { width, height, channels: 4 } })
const trimmed = await masked.png().trim({ threshold: 10 }).toBuffer()

await sharp(trimmed).resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(path.join(outDir, 'logo.png'))
await sharp(trimmed).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(path.join(outDir, 'logo-512.png'))
await sharp(trimmed).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 90 }).toFile(path.join(outDir, 'logo-512.webp'))
// What the site actually renders — 192px covers a 64px logo at 3x DPR.
await sharp(trimmed).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9, palette: true }).toFile(path.join(outDir, 'logo-192.png'))
await sharp(trimmed).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 90 }).toFile(path.join(outDir, 'logo-192.webp'))
await sharp(trimmed).resize(512, 512).toFile(path.join(publicDir, 'icon-512.png'))
await sharp(trimmed).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'))
await sharp(trimmed).resize(64, 64).toFile(path.join(publicDir, 'favicon-64.png'))

console.log('done')
