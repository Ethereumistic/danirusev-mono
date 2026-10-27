import { createServerFn } from '@tanstack/react-start'
import {
  fetchExperience,
  fetchExperiences,
  imageUrl,
} from '@/lib/echoray/catalog.server'
import { toCardPrice, toExperienceDetail } from './model'

/**
 * The experience data boundary. Runs on the server: Echoray's public catalog
 * when ECHORAY_STOREFRONT_ID is set, the bundled product-file fixtures otherwise.
 */
export const getExperience = createServerFn({ method: 'GET' })
  .validator((slug: unknown) => {
    if (typeof slug !== 'string') throw new Error('Expected a slug.')
    return slug
  })
  .handler(async ({ data: slug }) => {
    const found = await fetchExperience(slug)
    return found
      ? toExperienceDetail(found.product, found.source, (image) =>
          imageUrl(image, 'detail'),
        )
      : null
  })

/** Published experiences with their live price (or price on request). */
export const listExperiences = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { source, products } = await fetchExperiences()
    return {
      source,
      experiences: products.map((card) => toCardPrice(card, imageUrl)),
    }
  },
)
