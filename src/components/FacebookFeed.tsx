import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    FB?: { XFBML: { parse: (node?: Element) => void } }
  }
}

type FacebookFeedProps = {
  groupUrl: string
}

/**
 * Renders Facebook's XFBML group plugin (SDK script + #fb-root are loaded once in index.html).
 * The SDK's own #xfbml=1 auto-parse only scans the page once on load, which is often before
 * React has mounted this div — so we poll for window.FB and parse this subtree ourselves once
 * it's ready, instead of relying on that race.
 * Note: if the group isn't public, Facebook only shows a join-request card, not the post feed.
 */
export function FacebookFeed({ groupUrl }: FacebookFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const groupId = groupUrl.match(/\/groups\/(\d+)/)?.[1]
  const href = groupId ? `https://www.facebook.com/groups/${groupId}/` : groupUrl.split('?')[0]

  useEffect(() => {
    let cancelled = false
    let timer: number

    const tryParse = () => {
      if (cancelled) return
      if (window.FB?.XFBML && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current)
      } else {
        timer = window.setTimeout(tryParse, 200)
      }
    }
    tryParse()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [href])

  return (
    <div ref={containerRef}>
      <div
        className="fb-group mx-auto"
        data-href={href}
        data-width="340"
        data-show-social-context="true"
        data-show-metadata="false"
      />
    </div>
  )
}
