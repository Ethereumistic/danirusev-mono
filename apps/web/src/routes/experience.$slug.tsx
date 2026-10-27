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

const SITE = 'https://danirusev.com'
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
        meta: [{ title: 'Преживяването не е намерено | Dani Rusev 11' }],
      }
    const { experience } = loaderData
    const url = `${SITE}/experience/${params.slug}`
    const title = `${experience.title} | Dani Rusev 11`
    const description = experience.intro || experience.subtitle
    const image = experience.images[0]?.src
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:site_name', content: 'Dani Rusev 11' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'bg_BG' },
        { property: 'og:image', content: image ?? `${SITE}/og-image.jpg` },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: experience.title,
            description,
            image: image ? [image] : [],
            category: 'Automotive Experience',
            brand: { '@type': 'Brand', name: 'Dani Rusev 11' },
            offers: {
              '@type': 'Offer',
              url,
              priceCurrency: experience.currency,
              ...(experience.basePrice !== null
                ? {
                    price: formatAmount(experience.basePrice).replace(',', '.'),
                  }
                : {}),
            },
            duration: experience.stats.duration,
            provider: { '@type': 'Organization', name: 'Dani Rusev 11' },
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Начало', item: SITE },
              {
                '@type': 'ListItem',
                position: 2,
                name: experience.title,
                item: url,
              },
            ],
          }),
        },
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
