import '@tanstack/react-start/server-only'
import { env } from 'cloudflare:workers'

const DEFAULT_GATEWAY = 'https://commerce.echoray.io'
const ID = /^[a-z0-9]{16,64}$/

const value = (raw: string | undefined) => {
  const trimmed = raw?.trim()
  return trimmed ? trimmed : undefined
}

export type CatalogConfig = { gatewayUrl: string; storefrontId: string }
export type VoucherConfig = {
  convexUrl: string
  integrationId: string
  secret: string
}

/** The public catalog, or null to use the bundled fixtures. */
export function catalogConfig(): CatalogConfig | null {
  const storefrontId = value(env.ECHORAY_STOREFRONT_ID)
  if (!storefrontId) return null
  if (!ID.test(storefrontId))
    throw new Error('ECHORAY_STOREFRONT_ID is not a storefront integration ID.')
  const gateway = new URL(value(env.ECHORAY_GATEWAY_URL) ?? DEFAULT_GATEWAY)
  if (
    !['https:', 'http:'].includes(gateway.protocol) ||
    gateway.pathname !== '/' ||
    gateway.search ||
    gateway.username
  )
    throw new Error('ECHORAY_GATEWAY_URL must be a bare origin.')
  return { gatewayUrl: gateway.origin, storefrontId }
}

/** The voucher page's Convex query, or null when the server secret is not configured. */
export function voucherConfig(): VoucherConfig | null {
  const convexUrl = value(env.ECHORAY_CONVEX_URL)
  const secret = value(env.ECHORAY_INTEGRATION_SECRET)
  const integrationId =
    value(env.ECHORAY_INTEGRATION_ID) ?? value(env.ECHORAY_STOREFRONT_ID)
  if (!convexUrl || !secret || !integrationId) return null
  const url = new URL(convexUrl)
  if (url.protocol !== 'https:' && url.hostname !== '127.0.0.1')
    throw new Error('ECHORAY_CONVEX_URL must use HTTPS.')
  return { convexUrl: url.origin, integrationId, secret }
}
