import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import { Root } from './Root.tsx'

// The page is prerendered, so hydrate the existing markup rather than throwing
// it away and rendering from scratch.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <Root />
  </StrictMode>,
)
