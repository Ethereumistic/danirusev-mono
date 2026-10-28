import content from './public-content.json'
export type ThemeColor = 'taxi' | 'rent' | 'mix' | 'event' | 'day'
export type Experience = {
  readonly slug: string
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly image: string
  /** Responsive sources for catalog images; empty for the bundled fixture image. */
  readonly imageSrcSet?: string
  readonly imageAlt?: string
  readonly price: number
  readonly duration: string
  readonly horsepower: number
  readonly locations: readonly string[]
  readonly theme: ThemeColor
}
export type VideoFixture = (typeof content.videos)[number]
export type TestimonialFixture = (typeof content.testimonials)[number]
const base =
  'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/experiences/'
const experiences = [
  {
    slug: 'drift-taxi',
    title: 'Дрифт Такси',
    subtitle: 'Пасажерско Изживяване',
    description:
      'Седнете на пасажерската седалка до Дани Русев и усетете истинската G-сила. Без теория, само чист адреналин.',
    image: `${base}taxi/0.webp`,
    price: 155,
    duration: '60 мин',
    horsepower: 240,
    locations: ['Сапарева баня', 'Пловдив', 'Севлиево'],
    theme: 'taxi',
  },
  {
    slug: 'drift-rent',
    title: 'Карай Дрифтачка',
    subtitle: 'Карай Сам',
    description:
      'Поемете контрола. Под напътствията на Дани, вие ще се научите да контролирате хаоса.',
    image: `${base}rent/1.webp`,
    price: 270,
    duration: '60 мин',
    horsepower: 240,
    locations: ['Сапарева баня', 'Пловдив', 'Севлиево'],
    theme: 'rent',
  },
  {
    slug: 'drift-mix',
    title: 'Дрифт Микс',
    subtitle: 'Возене + Каране',
    description:
      'Усетете дрифта от двете страни - от пасажерското място и от шофьорската седалка!',
    image: `${base}mix/2.webp`,
    price: 215,
    duration: '60 мин',
    horsepower: 240,
    locations: ['Сапарева баня', 'Пловдив', 'Севлиево'],
    theme: 'mix',
  },
  {
    slug: 'drift-event',
    title: 'Дрифт Събитие',
    subtitle: 'Специален Повод',
    description:
      'Поверете ни организацията на Вашите най-ценни моменти. Ние създаваме стилни, добре обмислени изненади и преживявания, които оставят вечен спомен!',
    image: `${base}event/1.webp`,
    price: 0,
    duration: '~4 часа',
    horsepower: 240,
    locations: ['Сапарева баня', 'Пловдив', 'Севлиево'],
    theme: 'event',
  },
  {
    slug: 'drift-day',
    title: 'Дрифт Ден',
    subtitle: 'Курс',
    description:
      'Дрифт обучение за начинаещи, подходящо за хора без опит и без шофьорска книжка. Индивидуален подход към всеки желаещ, на трасе съобразено с уменията му.',
    image: `${base}day/1.webp`,
    price: 358,
    duration: 'ЦЯЛ ДЕН',
    horsepower: 240,
    locations: ['Сапарева баня', 'Пловдив', 'Севлиево'],
    theme: 'day',
  },
] as const satisfies readonly Experience[]
export function getLandingContent(catalog?: readonly CatalogCard[] | null) {
  return {
    // Without the catalog (fixture fallback or a failed list) the bundled cards stay.
    experiences: catalog ? getExperienceCards(catalog) : experiences,
    testimonials: content.testimonials,
    videos: content.videos,
  }
}
type CatalogCard = {
  slug: string
  price: number | null
  image: { src: string; srcSet: string; alt: string } | null
}

/**
 * Landing cards for the published experiences: price (minor units) and photo come
 * from the catalog list, the product's first gallery image being the card photo.
 */
export function getExperienceCards(
  catalog: readonly CatalogCard[],
  excludeSlug?: string,
): Experience[] {
  return experiences.flatMap((experience) => {
    const listed = catalog.find((item) => item.slug === experience.slug)
    if (!listed || experience.slug === excludeSlug) return []
    return [
      {
        ...experience,
        price: listed.price === null ? 0 : listed.price / 100,
        ...(listed.image && {
          image: listed.image.src,
          imageSrcSet: listed.image.srcSet,
          imageAlt: listed.image.alt,
        }),
      },
    ]
  })
}
