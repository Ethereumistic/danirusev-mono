import { createFileRoute } from '@tanstack/react-router'
import { cachedText, robotsTxt } from '@/lib/discovery.server'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: ({ request }) =>
        cachedText(request, 'text/plain', () => robotsTxt(request)),
    },
  },
})
