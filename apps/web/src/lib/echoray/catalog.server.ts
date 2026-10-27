import '@tanstack/react-start/server-only'
import { type CatalogConfig, catalogConfig } from './config.server'
import { fixtureProducts } from './fixtures'
import type {
  DetailResult,
  ProductsResult,
  PublicCardV2,
  PublicDetailV2,
  PublicImage,
} from './types'

/**
 * Plain-HTTP client for Echoray's public catalog v2 (`include=experience`).
 * Mirrors `createPublicCatalogClient` from the private @echoray/api-client:
 * GET /v1/storefronts/<storefrontId>/<route>, 10 s deadline, 512 KiB cap,
 * scope/kind checks and the snapshot freshness rule. Without a storefront ID
 * it answers from the bundled fixtures instead.
 */

export type CatalogSource = 'live' | 'fixture'

export class CatalogError extends Error {
  constructor(
    public code: string,
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'CatalogError'
  }
}

const SLUG = /^[a-z0-9][a-z0-9-]{1,78}[a-z0-9]$/
const MAX_BYTES = 512 * 1024

async function read<T extends ProductsResult | DetailResult>(
  config: CatalogConfig,
  route: string,
  params: Record<string, string>,
  kind: 'products' | 'detail',
): Promise<Extract<T, { status: 'ok' }>> {
  const url = new URL(
    `/v1/storefronts/${config.storefrontId}/${route}`,
    config.gatewayUrl,
  )
  url.search = new URLSearchParams({
    ...params,
    include: 'experience',
  }).toString()
  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  })
  if (Number(response.headers.get('Content-Length') ?? 0) > MAX_BYTES)
    throw new CatalogError(
      'INVALID_RESPONSE',
      502,
      'Catalog response exceeds its limit.',
    )
  const text = await response.text()
  if (text.length > MAX_BYTES)
    throw new CatalogError(
      'INVALID_RESPONSE',
      502,
      'Catalog response exceeds its limit.',
    )
  let value: T
  try {
    value = JSON.parse(text) as T
  } catch {
    throw new CatalogError('INVALID_RESPONSE', 502, 'Invalid catalog response.')
  }
  if (value.status === 'error')
    throw new CatalogError(value.code, response.status, value.message)
  if (
    !response.ok ||
    value.status !== 'ok' ||
    value.version !== 2 ||
    value.storefrontId !== config.storefrontId ||
    value.data.kind !== kind
  )
    throw new CatalogError(
      'INVALID_RESPONSE',
      502,
      'Catalog scope or version mismatch.',
    )
  const age = Date.now() - value.generatedAt
  if (age < -5000 || age > 35_000)
    throw new CatalogError('EXPIRED_RESPONSE', 503, 'Catalog snapshot expired.')
  return value as Extract<T, { status: 'ok' }>
}

/** Display URL for an image preset; mirrors the api-client's `imageUrl`. */
export function imageUrl(
  image: PublicImage,
  preset: 'thumbnail' | 'card' | 'detail',
): string {
  const config = catalogConfig()
  const derivative = image.derivatives.find((d) => d.preset === preset)
  if (
    !config ||
    !derivative ||
    !image.mediaId ||
    !image.version ||
    derivative.path !== `media/${image.mediaId}/${image.version}/${preset}`
  )
    return image.originalUrl
  return new URL(
    `/v1/storefronts/${config.storefrontId}/${derivative.path}`,
    config.gatewayUrl,
  ).href
}

const toCard = ({
  id,
  slug,
  name,
  collection,
  material,
  optionLabel,
  minAmount,
  maxAmount,
  currency,
  images,
  experience,
}: PublicDetailV2): PublicCardV2 => ({
  id,
  slug,
  name,
  collection,
  material,
  optionLabel,
  minAmount,
  maxAmount,
  currency,
  images: images.slice(0, 2),
  experience: experience && {
    type: experience.type,
    inquiry: experience.inquiry,
  },
})

/** One experience by slug, or null when the shop does not publish it. */
export async function fetchExperience(
  slug: string,
): Promise<{ source: CatalogSource; product: PublicDetailV2 } | null> {
  if (!SLUG.test(slug)) return null
  const config = catalogConfig()
  if (!config) {
    const product = fixtureProducts.find((p) => p.slug === slug)
    return product ? { source: 'fixture', product } : null
  }
  try {
    const result = await read<DetailResult>(
      config,
      `products/${encodeURIComponent(slug)}`,
      {},
      'detail',
    )
    return { source: 'live', product: result.data.product }
  } catch (error) {
    if (error instanceof CatalogError && error.code === 'NOT_FOUND') return null
    throw error
  }
}

/** The shop's published experiences (first page, up to 50). */
export async function fetchExperiences(): Promise<{
  source: CatalogSource
  products: PublicCardV2[]
}> {
  const config = catalogConfig()
  if (!config)
    return { source: 'fixture', products: fixtureProducts.map(toCard) }
  const result = await read<ProductsResult>(
    config,
    'products',
    { limit: '50', sort: 'name-asc' },
    'products',
  )
  return { source: 'live', products: result.data.page }
}
