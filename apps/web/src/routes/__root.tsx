import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import styles from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#020617' },
      // Fixture preview: opt into indexing only as part of the real public launch.
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    links: [
      { rel: 'stylesheet', href: styles },
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'preload',
        href: '/fonts/Gagalin-Regular.otf',
        as: 'font',
        type: 'font/otf',
        crossOrigin: 'anonymous',
      },
    ],
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
