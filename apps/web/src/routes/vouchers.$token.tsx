import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout } from '@/components/site-layout'
import { getVoucher } from '@/features/vouchers/data'
import { VoucherPage } from '@/features/vouchers/voucher-page'

/** Public QR target of Echoray vouchers: validity only, never indexed or cached. */
export const Route = createFileRoute('/vouchers/$token')({
  loader: ({ params }) => getVoucher({ data: params.token }),
  // Validity changes on redemption, and failures must not be cached publicly.
  headers: () => ({ 'Cache-Control': 'private, no-store' }),
  head: () => ({
    meta: [
      { title: 'Проверка на ваучер | Dani Rusev 11' },
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'referrer', content: 'no-referrer' },
    ],
  }),
  // Always ask the server again; never reuse a cached answer on client navigation.
  staleTime: 0,
  gcTime: 0,
  component: VoucherRoute,
  pendingComponent: () => (
    <SiteLayout>
      <main id="main-content" className="fallback-page" aria-busy="true">
        <p>Проверка на ваучера…</p>
      </main>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <main id="main-content" className="fallback-page">
        <h1>Проверката не успя.</h1>
        <p>Опитай да заредиш страницата отново.</p>
        <button type="button" onClick={reset}>
          Опитай отново
        </button>
      </main>
    </SiteLayout>
  ),
})

function VoucherRoute() {
  return (
    <SiteLayout>
      <VoucherPage lookup={Route.useLoaderData()} />
    </SiteLayout>
  )
}
