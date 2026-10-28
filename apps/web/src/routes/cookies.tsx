import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout } from '@/components/site-layout'
import { CookiesContent } from '@/features/legal/cookies-content'
import { LegalPage } from '@/features/legal/legal-page'
import { breadcrumbs, jsonLd, pageMeta } from '@/lib/seo'

const title = 'Политика за бисквитки'

export const Route = createFileRoute('/cookies')({
  head: () => ({
    ...pageMeta({
      path: '/cookies',
      title: `${title} | Dani Rusev 11`,
      description:
        'Политика за използване на „бисквитки“ от ДаниРусев11 ЕООД за уебсайта danirusev.com.',
    }),
    scripts: [
      jsonLd(
        breadcrumbs([
          { name: 'Начало', path: '/' },
          { name: title, path: '/cookies' },
        ]),
      ),
    ],
  }),
  component: () => (
    <SiteLayout>
      <LegalPage
        title={title}
        updated="23 януари 2026 г."
        previous={{ to: '/terms', label: 'Общи условия' }}
        next={{ to: '/privacy', label: 'Политика за поверителност' }}
      >
        <CookiesContent />
      </LegalPage>
    </SiteLayout>
  ),
})
