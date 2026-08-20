// Post-build prerender: render the page to static HTML so crawlers, link
// scrapers and anything else that doesn't run JavaScript get the real content
// and the structured data, rather than an empty <div id="root">.
//
// Runs in plain Node — no browser — so it works in Vercel's build environment.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const today = new Date().toISOString().slice(0, 10)

const { render } = await import(
  pathToFileURL(join(process.cwd(), 'dist-ssr', 'entry-server.js')).href
)

const template = readFileSync(join(DIST, 'index.html'), 'utf-8')
const appHtml = render(today)

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find the root div to fill in.')
}

// The build date lets the browser's first render match this HTML exactly, so
// hydration doesn't trip over the event list having moved on. It must be set
// before the app script runs.
const html = template
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace('<script type="module"', `<script>window.__BUILD_DATE__=${JSON.stringify(today)}</script>\n    <script type="module"`)

writeFileSync(join(DIST, 'index.html'), html)
console.log(`Prerendered index.html (${(appHtml.length / 1024).toFixed(0)} kB of markup, build date ${today}).`)
