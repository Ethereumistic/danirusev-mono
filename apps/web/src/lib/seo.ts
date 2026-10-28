/**
 * Public identity, canonical URLs and structured data shared by route heads and
 * the machine-readable files (robots.txt, sitemap.xml, llms.txt). Facts here are
 * the ones the site itself publishes; keep them in sync with the contact page.
 */

export const SITE_URL = 'https://danirusev.com'
export const SITE_NAME = 'Dani Rusev 11'
/** Hosts allowed in search indexes; every other host (previews, workers.dev, Echoray) is noindex. */
export const PRODUCTION_HOSTS: readonly string[] = ['danirusev.com']
export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Dani Rusev 11 – дрифт преживявания в България',
}

export const BUSINESS = {
  legalName: 'ДаниРусев11 ЕООД',
  /** ЕИК in the Bulgarian Commercial Register. */
  eik: '208649310',
  email: 'ruseffracing@gmail.com',
  phone: '+359882726020',
  phoneDisplay: '+359 88 272 6020',
  address: {
    streetAddress: 'ул. Ю. И. Венелин 30',
    addressLocality: 'Габрово',
    addressCountry: 'BG',
  },
  track: {
    name: 'Писта Крайници',
    map: 'https://maps.app.goo.gl/GNnmQDHcs9ZD2ShM9',
    addressLocality: 'Сапарева баня',
    addressRegion: 'Кюстендил',
  },
  /** Cities named on the experience cards. */
  cities: ['Сапарева баня', 'Пловдив', 'Севлиево'],
  sameAs: [
    'https://www.instagram.com/danirusev11/',
    'https://www.youtube.com/@danirusev11',
    'https://www.tiktok.com/@danirusev11',
    'https://www.facebook.com/dani.rusev.5',
  ],
} as const

export const PERSON = {
  name: 'Дани Русев',
  alternateName: ['Dani Rusev', 'Dani Rusev 11', 'DR11'],
  description:
    'Шампион на България по гимкхана, вицешампион по рали, каскадьор в кино продукции и създател на Dani Rusev 11.',
  image: `${SITE_URL}/media/9727aec160461d-960w.webp`,
} as const

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href

export const ids = {
  organization: `${SITE_URL}/#organization`,
  person: `${SITE_URL}/#dani-rusev`,
  website: `${SITE_URL}/#website`,
  track: `${SITE_URL}/#track`,
}

type MetaTag = Record<string, string>
type LinkTag = Record<string, string>

/** Title, description, canonical, Open Graph and Twitter tags for one page. */
export function pageMeta({
  path,
  title,
  description,
  image,
  type = 'website',
}: {
  path: string
  title: string
  description: string
  image?: { url: string; alt: string; width?: number; height?: number }
  type?: 'website' | 'product' | 'profile'
}): { meta: MetaTag[]; links: LinkTag[] } {
  const url = absoluteUrl(path)
  const og = image ?? OG_IMAGE
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: og.url },
      { property: 'og:image:alt', content: og.alt },
      ...(og.width && og.height
        ? [
            { property: 'og:image:width', content: String(og.width) },
            { property: 'og:image:height', content: String(og.height) },
          ]
        : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: og.url },
    ],
    links: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hrefLang: 'bg-BG', href: url },
      { rel: 'alternate', hrefLang: 'x-default', href: url },
    ],
  }
}

export const jsonLd = (data: object) => ({
  type: 'application/ld+json',
  children: JSON.stringify({ '@context': 'https://schema.org', ...data }),
})

/** Trims to a search-snippet length on a word boundary. */
export function snippet(text: string, max = 158) {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  return `${flat.slice(0, flat.lastIndexOf(' ', max - 1))}…`
}

/** The business graph: organisation, its founder, the track and the website. */
export function siteGraph() {
  return {
    '@graph': [
      {
        '@type': ['Organization', 'SportsActivityLocation', 'LocalBusiness'],
        '@id': ids.organization,
        name: SITE_NAME,
        alternateName: ['Дани Русев 11', 'DR11', 'Dani Rusev Drift'],
        legalName: BUSINESS.legalName,
        taxID: BUSINESS.eik,
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
        image: OG_IMAGE.url,
        description:
          'Дрифт такси, каране на дрифт автомобил, дрифт обучение за начинаещи и дрифт събития с Дани Русев на писта в България.',
        slogan: 'Усети истинския адреналин',
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        address: { '@type': 'PostalAddress', ...BUSINESS.address },
        location: { '@id': ids.track },
        hasMap: BUSINESS.track.map,
        areaServed: [
          { '@type': 'Country', name: 'България' },
          ...BUSINESS.cities.map((name) => ({ '@type': 'City', name })),
        ],
        knowsLanguage: 'bg',
        founder: { '@id': ids.person },
        sameAs: BUSINESS.sameAs,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'reservations',
          telephone: BUSINESS.phone,
          email: BUSINESS.email,
          areaServed: 'BG',
          availableLanguage: 'Bulgarian',
        },
        knowsAbout: [
          'Дрифт',
          'Дрифт такси',
          'Дрифт обучение',
          'Гимкхана',
          'Рали',
          'Моторни спортове',
          'Drifting',
        ],
      },
      {
        '@type': 'Person',
        '@id': ids.person,
        name: PERSON.name,
        alternateName: PERSON.alternateName,
        description: PERSON.description,
        image: PERSON.image,
        jobTitle: 'Дрифт пилот и инструктор',
        nationality: { '@type': 'Country', name: 'България' },
        award: ['Шампион на България по гимкхана', 'Вицешампион по рали'],
        worksFor: { '@id': ids.organization },
        sameAs: BUSINESS.sameAs,
      },
      {
        '@type': 'Place',
        '@id': ids.track,
        name: BUSINESS.track.name,
        hasMap: BUSINESS.track.map,
        address: {
          '@type': 'PostalAddress',
          addressLocality: BUSINESS.track.addressLocality,
          addressRegion: BUSINESS.track.addressRegion,
          addressCountry: 'BG',
        },
      },
      {
        '@type': 'WebSite',
        '@id': ids.website,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        alternateName: 'Дани Русев – дрифт преживявания',
        inLanguage: 'bg-BG',
        publisher: { '@id': ids.organization },
      },
    ],
  }
}

export function breadcrumbs(items: readonly { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
