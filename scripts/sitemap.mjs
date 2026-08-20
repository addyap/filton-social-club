// Stamps the sitemap's <lastmod> with the build date.
//
// The club's listings change most weeks, so a date committed by hand goes stale
// as soon as it's written. The site is a single page, so that's all the sitemap
// needs to say.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const path = join('dist', 'sitemap.xml')
const today = new Date().toISOString().slice(0, 10)
const xml = readFileSync(path, 'utf-8')
const stamped = xml.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`)

writeFileSync(path, stamped)
console.log(`sitemap.xml lastmod set to ${today}`)
