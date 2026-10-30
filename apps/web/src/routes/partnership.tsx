import { createFileRoute } from '@tanstack/react-router'
import { PartnershipPage } from '@/features/partnership/partnership-page'
import { absoluteUrl } from '@/lib/seo'

// A private pitch sent as a direct link: not linked from the site, not in the
// sitemap, and kept out of search indexes. Link previews still get OG tags.
const title = 'Партньорство 2027 | Дани Русев — заедно към европейската сцена'
const description =
  'Рали, гимкхана и дигитално съдържание: възможности за партньорство с Дани Русев и отбора DR11 за сезон 2027.'
const image = absoluteUrl('/partnership/og.jpg')

export const Route = createFileRoute('/partnership')({
  headers: () => ({ 'X-Robots-Tag': 'noindex, nofollow' }),
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: 'noindex, nofollow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: absoluteUrl('/partnership') },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  }),
  component: PartnershipPage,
})
