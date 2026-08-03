type FacebookFeedProps = {
  groupUrl: string
}

/**
 * Renders Facebook's XFBML group plugin (SDK script + #fb-root are loaded once in index.html).
 * Note: if the group isn't public, Facebook only shows a join-request card, not the post feed.
 */
export function FacebookFeed({ groupUrl }: FacebookFeedProps) {
  const groupId = groupUrl.match(/\/groups\/(\d+)/)?.[1]
  const href = groupId ? `https://www.facebook.com/groups/${groupId}/` : groupUrl.split('?')[0]
  return (
    <div
      className="fb-group mx-auto"
      data-href={href}
      data-width="340"
      data-show-social-context="true"
      data-show-metadata="false"
    />
  )
}
