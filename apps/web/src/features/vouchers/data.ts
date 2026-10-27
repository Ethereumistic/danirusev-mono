import { createServerFn } from '@tanstack/react-start'
import { lookupVoucher } from '@/lib/echoray/vouchers.server'

/** Validity of a voucher QR token; the integration secret stays on the server. */
export const getVoucher = createServerFn({ method: 'GET' })
  .validator((token: unknown) => {
    if (typeof token !== 'string') throw new Error('Expected a token.')
    return token
  })
  .handler(({ data: token }) => lookupVoucher(token))
