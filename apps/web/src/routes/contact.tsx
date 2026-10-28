import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout } from '@/components/site-layout'
import { ContactContent } from '@/features/contact/contact-page'
import { breadcrumbs, ids, jsonLd, pageMeta, SITE_URL } from '@/lib/seo'

const title = 'Контакти и резервации | Dani Rusev 11'
const description =
  'Резервирай дрифт преживяване с Дани Русев: телефон +359 88 272 6020, имейл и локация на пистата. Отговаряме на въпроси за дати, подаръчни ваучери и събития.'

export const Route = createFileRoute('/contact')({
  head: () => {
    const { meta, links } = pageMeta({ path: '/contact', title, description })
    return {
      meta,
      links,
      scripts: [
        jsonLd({
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/contact#webpage`,
          url: `${SITE_URL}/contact`,
          name: title,
          description,
          inLanguage: 'bg-BG',
          isPartOf: { '@id': ids.website },
          about: { '@id': ids.organization },
        }),
        jsonLd(
          breadcrumbs([
            { name: 'Начало', path: '/' },
            { name: 'Контакти', path: '/contact' },
          ]),
        ),
      ],
    }
  },
  component: () => (
    <SiteLayout>
      <ContactContent />
    </SiteLayout>
  ),
})
