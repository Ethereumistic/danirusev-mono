import type {
  Configurator,
  PublicBlockedDates,
  PublicCardV2,
  PublicDetailV2,
  PublicImage,
} from '@/lib/echoray/types'
import {
  type IconName,
  type PatternKey,
  presentationFor,
  type ThemeColor,
} from './presentation'

/** Everything the experience page renders; built on the server from an Echoray product. */
export type ExperienceDetail = {
  source: 'live' | 'fixture'
  slug: string
  title: string
  subtitle: string
  /** First description paragraph: the quote and the meta description. */
  intro: string
  theme: ThemeColor
  pattern: PatternKey | null
  icon: IconName
  images: { src: string; alt: string }[]
  stats: { duration: string; car: string; power: string; tires: string }
  /** City shown in the program's location card, e.g. "София". */
  locationLabel: string | null
  programLabel: string | null
  program: {
    time: string
    activity: string
    description: string
    icon?: IconName
  }[]
  included: string[]
  notIncluded: string[]
  /** Base price in minor units; null when the price is on request. */
  basePrice: number | null
  currency: string
  inquiry: string | null
  configurator: Configurator | null
  /** Days the business calendar has taken (Echoray `commerce-calendar`), or null. */
  blockedDates: PublicBlockedDates | null
}

export type ResolveImage = (image: PublicImage) => string

type Section = { heading: string; items: string[] }

/** "Intro\n\nПрограма:\n• a\n• b" → intro + bulleted sections (the Echoray product-file convention). */
function splitDescription(description: string) {
  const blocks = description.split(/\n{2,}/)
  const intro: string[] = []
  const sections: Section[] = []
  for (const block of blocks) {
    const lines = block.split('\n')
    const heading = lines[0]?.match(/^(.+):\s*$/)?.[1]
    const items = lines
      .slice(1)
      .filter((line) => /^\s*[•\-*]\s?/.test(line))
      .map((line) => line.replace(/^\s*[•\-*]\s?/, ''))
    if (heading && items.length) sections.push({ heading, items })
    else intro.push(block.trim())
  }
  return { intro: intro.join('\n\n'), sections }
}

const list = (value: string | undefined) =>
  value
    ? value
        .split(/,\s+/)
        .map((item) => item.trim())
        .filter(Boolean)
    : []

export function toExperienceDetail(
  product: PublicDetailV2,
  source: 'live' | 'fixture',
  resolveImage: ResolveImage,
): ExperienceDetail {
  const presentation = presentationFor(product.slug)
  const spec = (label: string) =>
    product.specifications.find(
      (s) => s.label.trim().toLowerCase() === label.toLowerCase(),
    )?.value
  const { intro, sections } = splitDescription(product.description)
  const programSection = sections[0]
  const steps = presentation.program
  const program = programSection
    ? programSection.items.map((description, index) => {
        // The timeline labels only apply while Echoray keeps the same number of steps.
        const step =
          steps.length === programSection.items.length
            ? steps[index]
            : undefined
        return {
          time: step?.time ?? String(index + 1),
          activity: step?.activity ?? '',
          description,
          ...(step?.icon ? { icon: step.icon } : {}),
        }
      })
    : []
  const inquiry = product.experience?.inquiry?.label ?? null
  return {
    source,
    slug: product.slug,
    title: product.name,
    subtitle: product.page?.headline ?? '',
    intro,
    theme: presentation.theme,
    pattern: presentation.pattern,
    icon: presentation.icon,
    images: product.gallery.map((image, index) => ({
      src: resolveImage(image),
      alt: image.alt || `${product.name} ${index + 1}`,
    })),
    stats: {
      duration: spec('Време') ?? '60 мин',
      car: spec('Автомобил') ?? 'BMW E46',
      power: spec('Мощност') ?? '400 HP',
      tires: spec('Гуми') ?? '4',
    },
    locationLabel: list(spec('Локация'))[0] ?? null,
    programLabel: programSection?.heading ?? null,
    program,
    included: list(spec('Цената включва')),
    notIncluded: list(spec('Цената не включва')),
    basePrice: inquiry || product.minAmount <= 0 ? null : product.minAmount,
    currency: product.currency,
    inquiry,
    configurator: product.experience?.configurator ?? null,
    blockedDates: product.experience?.blockedDates ?? null,
  }
}

export type ExperienceCardPrice = {
  slug: string
  price: number | null
  inquiry: string | null
}

export function toCardPrice(card: PublicCardV2): ExperienceCardPrice {
  const inquiry = card.experience?.inquiry?.label ?? null
  return {
    slug: card.slug,
    price: inquiry || card.minAmount <= 0 ? null : card.minAmount,
    inquiry,
  }
}
