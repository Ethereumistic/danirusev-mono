import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout } from '@/components/site-layout'
import { LegalPage } from '@/features/legal/legal-page'
import { PrivacyContent } from '@/features/legal/privacy-content'
import { breadcrumbs, jsonLd, pageMeta } from '@/lib/seo'

const title = 'Политика за поверителност'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    ...pageMeta({
      path: '/privacy',
      title: `${title} | Dani Rusev 11`,
      description:
        'Политика за защита на личните данни на ДаниРусев11 ЕООД съгласно ОРЗД (GDPR).',
    }),
    scripts: [
      jsonLd(
        breadcrumbs([
          { name: 'Начало', path: '/' },
          { name: title, path: '/privacy' },
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
        next={{ to: '/cookies', label: 'Бисквитки' }}
      >
        <PrivacyContent />
      </LegalPage>
    </SiteLayout>
  ),
})
