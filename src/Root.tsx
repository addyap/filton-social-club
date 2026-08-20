import App from './App'
import { TodayProvider } from './today'

/**
 * Shared entry point for the browser and the prerenderer, so both render the
 * app against the same reference date.
 */
export function Root({ today }: { today?: Date }) {
  return (
    <TodayProvider value={today}>
      <App />
    </TodayProvider>
  )
}
