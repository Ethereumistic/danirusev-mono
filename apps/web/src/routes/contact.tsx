import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout } from '@/components/site-layout'
import { ContactContent } from '@/features/contact/contact-page'

const description =
  'Свържете се с нас за резервации, въпроси или специални оферти. Автомобилни преживявания в България - дрифт, рали, писта.'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Контакти | Dani Rusev 11' },
      { name: 'description', content: description },
      {
        name: 'keywords',
        content:
          'контакти dani rusev, резервация преживяване, дрифт резервация, рали резервация',
      },
      { property: 'og:title', content: 'Свържете се с Dani Rusev 11' },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://danirusev.com/contact' },
      { property: 'og:site_name', content: 'Dani Rusev 11' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'bg_BG' },
      { property: 'og:image', content: 'https://danirusev.com/og-image.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://danirusev.com/contact' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Начало',
              item: 'https://danirusev.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Контакти',
              item: 'https://danirusev.com/contact',
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ContactContent />
    </SiteLayout>
  ),
})
