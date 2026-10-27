import '@tanstack/react-start/server-only'
import { voucherConfig } from './config.server'
import type { PublicVoucher, VoucherLookup, VoucherState } from './types'

const STATES: readonly VoucherState[] = [
  'active',
  'redeemed',
  'void',
  'expired',
]
// Signed voucher tokens are URL-safe; anything else cannot be a voucher of this shop.
const TOKEN = /^[A-Za-z0-9._~-]{1,200}$/

function isPublicVoucher(value: unknown): value is PublicVoucher {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.shopName === 'string' &&
    typeof v.typeName === 'string' &&
    typeof v.state === 'string' &&
    STATES.includes(v.state as VoucherState) &&
    typeof v.expiresOn === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(v.expiresOn)
  )
}

/**
 * Calls the Convex query `commerce/vouchers:voucherPage` through Convex's HTTP API
 * (POST <deployment>/api/query). The integration secret never leaves the server,
 * and only the validity fields are returned.
 */
export async function lookupVoucher(token: string): Promise<VoucherLookup> {
  const config = voucherConfig()
  if (!config) return { status: 'unconfigured' }
  if (!TOKEN.test(token)) return { status: 'not_found' }
  try {
    const response = await fetch(`${config.convexUrl}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        path: 'commerce/vouchers:voucherPage',
        args: {
          integrationId: config.integrationId,
          secret: config.secret,
          token,
        },
        format: 'json',
      }),
      signal: AbortSignal.timeout(10_000),
    })
    const body = (await response.json()) as
      | { status: 'success'; value: unknown }
      | { status: 'error'; errorMessage?: string }
    if (body.status !== 'success') {
      console.error('Voucher lookup failed', response.status)
      return { status: 'error' }
    }
    if (body.value === null) return { status: 'not_found' }
    if (!isPublicVoucher(body.value)) return { status: 'error' }
    const { shopName, typeName, state, expiresOn } = body.value
    return {
      status: 'found',
      voucher: { shopName, typeName, state, expiresOn },
    }
  } catch {
    console.error('Voucher lookup unavailable')
    return { status: 'error' }
  }
}
