import { createFileRoute } from '@tanstack/react-router'
import { listExperiences } from '@/features/experience/data'
import { getLandingContent } from '@/features/landing/data'
import { LandingPage } from '@/features/landing/landing-page'
import { absoluteUrl, ids, jsonLd, pageMeta, SITE_URL } from '@/lib/seo'

const title = 'Дрифт такси и дрифт обучение в България | Dani Rusev 11'
const description =
  'Дрифт такси, карай дрифт кола или цял ден дрифт обучение с Дани Русев – шампион на България по гимкхана. Цени в евро и подаръчни ваучери. Запази дата!'

export const Route = createFileRoute('/')({
  loader: async () => {
    // A catalog failure keeps the bundled cards instead of failing the home page.
    const catalog = await listExperiences().catch(() => null)
    return getLandingContent(catalog?.experiences)
  },
  head: ({ loaderData }) => {
    const { meta, links } = pageMeta({ path: '/', title, description })
    return {
      meta: [
        ...meta,
        {
          name: 'keywords',
          content:
            'дрифт, дрифт такси, дрифт обучение, курс по дрифт, карай дрифт кола, дрифт подарък, ваучер за дрифт, екстремни преживявания, Дани Русев, drift Bulgaria',
        },
      ],
      links,
      scripts: [
        jsonLd({
          '@type': 'WebPage',
          '@id': `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: title,
          description,
          inLanguage: 'bg-BG',
          isPartOf: { '@id': ids.website },
          about: { '@id': ids.organization },
          primaryImageOfPage: absoluteUrl('/hero-poster.webp'),
          mainEntity: {
            '@type': 'ItemList',
            name: 'Дрифт преживявания',
            itemListElement: (loaderData?.experiences ?? []).map(
              (experience, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: experience.title,
                url: absoluteUrl(`/experience/${experience.slug}`),
              }),
            ),
          },
        }),
      ],
    }
  },
  component: HomePage,
})

function HomePage() {
  return <LandingPage content={Route.useLoaderData()} />
}
