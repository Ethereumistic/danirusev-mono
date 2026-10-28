import { createFileRoute } from '@tanstack/react-router'
import { cachedText, llmsTxt } from '@/lib/discovery.server'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: ({ request }) => cachedText(request, 'text/markdown', llmsTxt),
    },
  },
})
