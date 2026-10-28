import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { jsonLd, SITE_NAME, siteGraph } from '@/lib/seo'
import styles from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#020617' },
      { name: 'color-scheme', content: 'dark' },
      { name: 'format-detection', content: 'telephone=no' },
      // Non-production hosts add X-Robots-Tag: noindex in src/start.ts.
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'author', content: 'Дани Русев' },
      { name: 'geo.region', content: 'BG' },
      { name: 'geo.placename', content: 'България' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'bg_BG' },
    ],
    links: [
      // The wordmark font is in the header on every page; start it with the CSS.
      {
        rel: 'preload',
        href: '/fonts/gagalin-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: styles },
      { rel: 'icon', href: '/favicon.ico', sizes: '40x40' },
      {
        rel: 'icon',
        href: '/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'alternate',
        type: 'text/markdown',
        href: '/llms.txt',
        title: 'Dani Rusev 11 – описание за AI асистенти (llms.txt)',
      },
    ],
    scripts: [jsonLd(siteGraph())],
  }),
  component: Outlet,
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <div className="fallback-page">
      <h1>Тук няма трасе.</h1>
      <p>Страницата не е намерена.</p>
      <Link to="/">Обратно към началото</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="fallback-page">
      <h1>Нещо прекъсна обиколката.</h1>
      <p>Опитай да заредиш страницата отново.</p>
      <button type="button" onClick={reset}>
        Опитай отново
      </button>
    </div>
  ),
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="bg" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased min-h-screen bg-slate-950">
        <noscript>
          <style>
            {
              '[data-motion-reveal]{opacity:1!important;transform:none!important}'
            }
          </style>
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
