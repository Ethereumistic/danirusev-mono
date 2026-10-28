import { createFileRoute } from '@tanstack/react-router'
import { cachedText, sitemapXml } from '@/lib/discovery.server'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: ({ request }) => cachedText(request, 'application/xml', sitemapXml),
    },
  },
})
