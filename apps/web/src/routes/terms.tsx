import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout } from '@/components/site-layout'
import { LegalPage } from '@/features/legal/legal-page'
import { TermsContent } from '@/features/legal/terms-content'
import { breadcrumbs, jsonLd, pageMeta } from '@/lib/seo'

const title = 'Общи условия'

export const Route = createFileRoute('/terms')({
  head: () => ({
    ...pageMeta({
      path: '/terms',
      title: `${title} | Dani Rusev 11`,
      description:
        'Общи условия за уреждане на взаимоотношенията между Dani Rusev 11 и неговите потребители.',
    }),
    scripts: [
      jsonLd(
        breadcrumbs([
          { name: 'Начало', path: '/' },
          { name: title, path: '/terms' },
        ]),
      ),
    ],
  }),
  component: () => (
    <SiteLayout>
      <LegalPage
        title={title}
        updated="23 януари 2026 г."
        previous={{ to: '/privacy', label: 'Политика за поверителност' }}
        next={{ to: '/cookies', label: 'Бисквитки' }}
      >
        <TermsContent />
      </LegalPage>
    </SiteLayout>
  ),
})
