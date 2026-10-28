import {
  createFileRoute,
  Link,
  notFound,
  redirect,
} from '@tanstack/react-router'
import { SiteLayout } from '@/components/site-layout'
import { formatAmount } from '@/features/experience/configurator'
import { getExperience, listExperiences } from '@/features/experience/data'
import { ExperiencePage } from '@/features/experience/experience-page'
import { getExperienceCards } from '@/features/landing/data'
import {
  absoluteUrl,
  breadcrumbs,
  ids,
  jsonLd,
  pageMeta,
  SITE_NAME,
  snippet,
} from '@/lib/seo'

// Old landing-card slug; the live catalog calls the rental `drift-rent`.
const RENAMED: Readonly<Record<string, string>> = {
  'rent-a-drift-car': 'drift-rent',
}

export const Route = createFileRoute('/experience/$slug')({
  beforeLoad: ({ params }) => {
    const target = RENAMED[params.slug]
    if (target)
      throw redirect({
        to: '/experience/$slug',
        params: { slug: target },
        statusCode: 301,
      })
  },
  loader: async ({ params }) => {
    const [experience, catalog] = await Promise.all([
      getExperience({ data: params.slug }),
      // The "more experiences" strip is optional; a list failure must not fail the page.
      listExperiences().catch(() => null),
    ])
    if (!experience) throw notFound()
    return {
      experience,
      others: getExperienceCards(catalog?.experiences ?? [], params.slug),
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [
          { title: 'Преживяването не е намерено | Dani Rusev 11' },
          { name: 'robots', content: 'noindex, follow' },
        ],
      }
    const { experience } = loaderData
    const path = `/experience/${params.slug}`
    const url = absoluteUrl(path)
    const title = `${experience.title}${experience.subtitle ? ` – ${experience.subtitle}` : ''} | Dani Rusev 11`
    const description = snippet(
      `${experience.intro || experience.subtitle} ${experience.stats.duration}, ${experience.stats.car}.`,
    )
    const first = experience.images[0]
    const { meta, links } = pageMeta({
      path,
      title,
      description,
      type: 'product',
      ...(first ? { image: { url: first.src, alt: first.alt } } : {}),
    })
    const price =
      experience.basePrice === null
        ? null
        : formatAmount(experience.basePrice).replace(',', '.')
    return {
      meta: [
        ...meta,
        ...(price
          ? [
              { property: 'product:price:amount', content: price },
              {
                property: 'product:price:currency',
                content: experience.currency,
              },
            ]
          : []),
      ],
      // React preloads the eager, high-priority first gallery photo itself.
      links,
      scripts: [
        jsonLd({
          '@type': ['Product', 'Service'],
          '@id': `${url}#experience`,
          name: experience.title,
          description: experience.intro || experience.subtitle,
          url,
          image: experience.images.slice(0, 6).map((image) => image.src),
          category: 'Дрифт преживяване',
          serviceType: 'Drift experience',
          brand: { '@type': 'Brand', name: SITE_NAME },
          provider: { '@id': ids.organization },
          areaServed: { '@type': 'Country', name: 'България' },
          ...(experience.locationLabel
            ? {
                location: {
                  '@id': ids.track,
                },
              }
            : {}),
          additionalProperty: [
            ['Продължителност', experience.stats.duration],
            ['Автомобил', experience.stats.car],
            ['Мощност', experience.stats.power],
          ].map(([name, value]) => ({
            '@type': 'PropertyValue',
            name,
            value,
          })),
          ...(price
            ? {
                offers: {
                  '@type': 'Offer',
                  url,
                  price,
                  priceCurrency: experience.currency,
                  availability: 'https://schema.org/InStock',
                  seller: { '@id': ids.organization },
                  areaServed: 'BG',
                },
              }
            : {}),
        }),
        jsonLd(
          breadcrumbs([
            { name: 'Начало', path: '/' },
            { name: 'Дрифт преживявания', path: '/#drift-experiences' },
            { name: experience.title, path },
          ]),
        ),
      ],
    }
  },
  component: ExperienceRoute,
  pendingComponent: ExperiencePending,
  notFoundComponent: ExperienceNotFound,
  errorComponent: ExperienceError,
})

function ExperienceRoute() {
  const { experience, others } = Route.useLoaderData()
  return (
    <SiteLayout floatingContact>
      <ExperiencePage experience={experience} others={others} />
    </SiteLayout>
  )
}

function ExperiencePending() {
  return (
    <SiteLayout>
      <main
        id="main-content"
        className="min-h-screen bg-slate-950 pb-12 pt-4 md:pt-8"
        aria-busy="true"
      >
        <div className="max-w-6xl mx-auto px-4 pt-14">
          <div className="h-20 w-2/3 rounded-2xl bg-slate-900 animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-5 aspect-square rounded-xl bg-slate-900 animate-pulse" />
            <div className="lg:col-span-5 h-64 rounded-2xl bg-slate-900 animate-pulse" />
          </div>
          <p className="sr-only">Зареждане на преживяването…</p>
        </div>
      </main>
    </SiteLayout>
  )
}

function ExperienceNotFound() {
  return (
    <SiteLayout>
      <main id="main-content" className="fallback-page">
        <h1>Тук няма трасе.</h1>
        <p>Това преживяване не е намерено.</p>
        <Link to="/" hash="drift-experiences">
          Назад към преживявания
        </Link>
      </main>
    </SiteLayout>
  )
}

function ExperienceError({ reset }: { reset: () => void }) {
  return (
    <SiteLayout>
      <main id="main-content" className="fallback-page">
        <h1>Нещо прекъсна обиколката.</h1>
        <p>
          Преживяването не можа да се зареди. Опитай отново или ни се обади.
        </p>
        <button type="button" onClick={reset}>
          Опитай отново
        </button>
      </main>
    </SiteLayout>
  )
}
