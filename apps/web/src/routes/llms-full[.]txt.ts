import { createFileRoute } from '@tanstack/react-router'
import { cachedText, llmsFullTxt } from '@/lib/discovery.server'

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: ({ request }) => cachedText(request, 'text/markdown', llmsFullTxt),
    },
  },
})
