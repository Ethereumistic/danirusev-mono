import { createFileRoute } from '@tanstack/react-router'
import { listExperiences } from '@/features/experience/data'
import { getLandingContent } from '@/features/landing/data'
import { LandingPage } from '@/features/landing/landing-page'

export const Route = createFileRoute('/')({
  loader: async () => {
    // A catalog failure keeps the bundled cards instead of failing the home page.
    const catalog = await listExperiences().catch(() => null)
    return getLandingContent(catalog?.experiences)
  },
  head: () => ({
    meta: [
      { title: 'Dani Rusev 11 | Екстремни дрифт преживявания в България' },
      {
        name: 'description',
        content:
          'Усети истинския адреналин с Дани Русев. Дрифт такси, сесии зад волана и подаръчни преживявания на писта.',
      },
      {
        property: 'og:title',
        content: 'Dani Rusev 11 | Усети истинския адреналин',
      },
      {
        property: 'og:description',
        content: 'Дрифт преживявания с Дани Русев. Твоето място е на пистата.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'bg_BG' },
      { property: 'og:image', content: 'https://danirusev.com/og-image.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://danirusev.com/' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Дани Русев',
          alternateName: 'Dani Rusev 11',
          url: 'https://danirusev.com/',
          sameAs: [
            'https://instagram.com/danirusev11/',
            'https://youtube.com/@danirusev11',
          ],
        }),
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  return <LandingPage content={Route.useLoaderData()} />
}
