import { Button } from '@danirusev/ui/components/button'
import { Award, ChevronRight, Shield, Video, Zap } from 'lucide-react'
import * as motion from 'motion/react-m'
import type { ElementType } from 'react'
import { FeatureGallery as OptimizedCarousel } from './feature-gallery'

interface FeatureBlock {
  id: string
  tagline: string
  title: string
  titleAccent: string
  description: string
  stats: { value: string; label: string }[]
  images: string[]
  icon: ElementType
  reversed?: boolean
}
const FEATURES: FeatureBlock[] = [
  {
    id: 'power',
    tagline: 'Сила и Контрол',
    title: 'Машини Създадени',
    titleAccent: 'За Дрифт',
    description:
      'Нашият автомобил е участвал в множество състезания и мероприятия. Всеки детайл е настроен за перфектния дрифт — подготвен от професионални механици',
    stats: [
      { value: '400+', label: 'к.с. мощност' },
      { value: '100%', label: 'дрифт готови' },
    ],
    images: [
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/new_photos/front-img.jpg',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/4.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/bmw.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/2.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/suzuki3.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/SUZUKI_BACK.webp',
      // "https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/3.webp",
      // "https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/12.webp",
      // "https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/power/8.webp",
    ],
    icon: Zap,
  },
  {
    id: 'safety',
    tagline: 'Безкомпромисна Сигурност',
    title: 'Безопасност',
    titleAccent: 'На Първо Място',
    description:
      'Всички изисквания за безопастност за подобен тип дейност са покрити - 4 точкови колани, седалки тип корито, пожарогасители на достъпни места в колата. Трасета, специално подбрани както за новобранци, така и за опитни рейсъри. Карай до лимита си знаейки, че всичко е под контрол.',
    stats: [
      { value: '0', label: 'инцидента' },
      { value: '1:1', label: 'инструктор' },
    ],
    images: [
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/new_photos/interior.jpg',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/safety/3.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/safety/2.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/safety/1.webp',
      // "https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/safety/4.webp",
    ],
    icon: Shield,
    reversed: true,
  },
  {
    id: 'memories',
    tagline: 'Твоят Момент, Завинаги',
    title: 'Незабравими',
    titleAccent: 'Спомени',
    description:
      'Създаваме спомени, които се помнят цял живот. Можете да добавите към преживяването си GoPro кадри от автомобила, както и професионално монтирано видео перфектно за соц. мрежи или просто за да го гледаш отново и отново!',
    stats: [
      { value: '4K', label: 'видео качество' },
      { value: '∞', label: 'спомени' },
    ],
    images: [
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/1.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/DR11_Shirts.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/reni.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/milena.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/janeta.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/elena.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/ivka.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/rado.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/mascota.webp',
      'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/whyus/memories/dizel.webp',
    ],
    icon: Video,
  },
]

function FeatureSection({
  feature,
  index,
}: {
  feature: FeatureBlock
  index: number
}) {
  const Icon = feature.icon

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div
        className={`relative flex flex-col ${
          feature.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } gap-8 lg:gap-16 py-8 items-center`}
      >
        {/* Carousel Side */}
        <motion.div
          data-motion-reveal
          initial={{ opacity: 0, x: feature.reversed ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full lg:w-1/2"
        >
          <OptimizedCarousel images={feature.images} title={feature.title} />
        </motion.div>

        {/* Content Side */}
        <motion.div
          data-motion-reveal
          initial={{ opacity: 0, x: feature.reversed ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full lg:w-1/2 mt-8 lg:mt-0"
        >
          {/* Large background number */}
          <div
            className={`absolute ${
              feature.reversed ? '-right-4' : '-right-4'
            } -top-16 text-[16rem] font-black text-white/[0.03] pointer-events-none hidden lg:block leading-none select-none italic transition-all duration-700`}
          >
            0{index + 1}
          </div>

          <div className="relative z-10">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-main/10 border border-main/30 px-4 py-1.5 rounded-full mb-6">
              <Icon className="w-4 h-4 text-main" />
              <span className="text-main text-sm font-bold uppercase tracking-wider">
                {feature.tagline}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter italic leading-none mb-6">
              {feature.title}
              <br />
              <span className="text-main">{feature.titleAccent}</span>
            </h3>

            {/* Description */}
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              {feature.description}
            </p>

            {/* CTA */}
            <Button
              variant="default"
              size="lg"
              className="bg-main font-black uppercase tracking-wide group"
              onClick={() => {
                document.getElementById('drift-experiences')?.scrollIntoView({
                  behavior: window.matchMedia(
                    '(prefers-reduced-motion: reduce)',
                  ).matches
                    ? 'auto'
                    : 'smooth',
                })
              }}
            >
              Виж Преживяванията
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Divider between sections (except last) */}
      {index < FEATURES.length - 1 && (
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      )}
    </div>
  )
}

export function WhyChooseUsV2() {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Section Header */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            data-motion-reveal
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-main/10 border border-main/30 px-6 py-2 rounded-full mb-6"
          >
            <Award className="w-4 h-4 text-main" />
            <span className="text-main font-bold uppercase tracking-wider text-sm">
              Защо Точно Ние
            </span>
          </motion.div>

          <motion.h2
            data-motion-reveal
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter italic mb-6"
          >
            Не Просто <span className="text-main">Преживяване</span>
            <br />
            Цяло Дрифт Събитие
          </motion.h2>

          <motion.p
            data-motion-reveal
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            Четири неща, които ни правят различни от всички останали
          </motion.p>
        </div>
      </div>

      {/* Feature Blocks */}
      <div className="relative -mt-8">
        {FEATURES.map((feature, index) => (
          <FeatureSection key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}
