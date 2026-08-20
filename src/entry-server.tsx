import { renderToString } from 'react-dom/server'
import { Root } from './Root'

/**
 * Render the page to static HTML at build time.
 *
 * `buildDate` is an ISO day (YYYY-MM-DD). It's also stamped into the page so
 * the browser's first render can match this one exactly — see ./today.tsx.
 */
export function render(buildDate: string): string {
  return renderToString(<Root today={new Date(`${buildDate}T00:00:00Z`)} />)
}
