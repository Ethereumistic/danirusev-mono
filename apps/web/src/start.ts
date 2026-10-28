import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from '@tanstack/react-start'
import { PRODUCTION_HOSTS, SITE_URL } from '@/lib/seo'

// Declaring a start instance replaces Start's default server-function CSRF guard; keep it.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

/**
 * One public origin: www and plain HTTP redirect to https://danirusev.com, and every
 * other host (local, workers.dev, previews, dr11.echoray.cloud) stays out of search indexes.
 */
const siteHeaders = createMiddleware().server(async ({ request, next }) => {
  const url = new URL(request.url)
  if (
    url.hostname === 'www.danirusev.com' ||
    (url.protocol === 'http:' && PRODUCTION_HOSTS.includes(url.hostname))
  )
    return Response.redirect(`${SITE_URL}${url.pathname}${url.search}`, 301)
  const result = await next()
  // Framework responses (redirects included) may carry immutable headers.
  const response = new Response(result.response.body, result.response)
  const headers = response.headers
  if (PRODUCTION_HOSTS.includes(url.hostname))
    headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    )
  else headers.set('X-Robots-Tag', 'noindex, nofollow')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'SAMEORIGIN')
  if (!headers.has('Referrer-Policy'))
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (headers.get('Content-Type')?.startsWith('text/html'))
    headers.set('Content-Language', 'bg')
  return { ...result, response }
})

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, siteHeaders],
}))
