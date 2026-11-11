export type SocialMetadata = {
  title: string
  description: string
  url: string
  image: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
}

// Runs in Vite for both development and production. Sharing crawlers get
// complete metadata in the HTML response without needing to execute React.
export function renderMetadata(metadata: SocialMetadata, siteName: string) {
  const canonical = metadata.url.trim() ? new URL(metadata.url.trim()) : undefined
  if (canonical && !['https:', 'http:'].includes(canonical.protocol)) {
    throw new Error('site.seo.url must be an absolute HTTP or HTTPS URL.')
  }
  const image = canonical ? new URL(metadata.image, canonical).href : metadata.image
  const meta = (attribute: 'name' | 'property', key: string, value: string | number) => `<meta ${attribute}="${key}" content="${escapeHtml(String(value))}" />`

  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    meta('name', 'description', metadata.description),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', siteName),
    meta('property', 'og:title', metadata.title),
    meta('property', 'og:description', metadata.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:width', metadata.imageWidth),
    meta('property', 'og:image:height', metadata.imageHeight),
    meta('property', 'og:image:alt', metadata.imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', metadata.title),
    meta('name', 'twitter:description', metadata.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', metadata.imageAlt),
    ...(canonical ? [meta('property', 'og:url', canonical.href), `<link rel="canonical" href="${escapeHtml(canonical.href)}" />`] : []),
  ].join('\n    ')
}
