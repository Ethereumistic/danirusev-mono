import { SiteLayout } from '@/components/site-layout'
import { AboutSection } from './about-section'
import type { getLandingContent } from './data'
import { ExperienceCatalog } from './experience-catalog'
import { Hero } from './hero'
import { HowItWorks } from './how-it-works'
import { Testimonials } from './testimonials'
import { WhyChooseUsV2 } from './why-choose-us'
export function LandingPage({
  content,
}: {
  content: ReturnType<typeof getLandingContent>
}) {
  return (
    <SiteLayout floatingContact>
      <main id="main-content" className="min-h-screen">
        <Hero />
        <WhyChooseUsV2 />
        <ExperienceCatalog experiences={content.experiences} />
        <HowItWorks />
        <Testimonials testimonials={content.testimonials} />
        <AboutSection initialVideos={content.videos} />
      </main>
    </SiteLayout>
  )
}
