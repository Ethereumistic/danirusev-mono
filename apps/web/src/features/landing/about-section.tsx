import { Badge } from '@danirusev/ui/components/badge'
import { buttonVariants } from '@danirusev/ui/components/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@danirusev/ui/components/carousel'
import { cn } from '@danirusev/ui/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import {
  Clapperboard,
  MoreVertical,
  PersonStanding,
  Play,
  Star,
  Trophy,
} from 'lucide-react'
import { AnimatePresence, useReducedMotion, type Variants } from 'motion/react'
import * as motion from 'motion/react-m'
import * as React from 'react'
import { Image } from '@/components/image'
import { Youtube } from '@/components/social-icons'
import type { VideoFixture } from './data'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Carousel images removed

const BIO_IMAGES = [
  {
    url: 'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/about/driver1.webp',
    alt: 'Дани Русев рали пилот',
    badge: {
      icon: Trophy,
      color: 'bg-taxi',
      title: 'Шампионски Дух',
      subtitle: 'Победа след победа',
    },
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/about/dr-team.webp',
    alt: 'Екипа на Дани Русев',
    badge: {
      icon: PersonStanding,
      color: 'bg-main',
      title: 'Екипът на Дани Русев',
      subtitle: 'Съвместно усилие',
    },
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/about/DR11_Shirts.webp',
    alt: 'Заклети Фенове',
    badge: {
      icon: Star,
      color: 'bg-rent',
      title: 'Заклети Фенове',
      subtitle: 'Вечна подкрепа',
    },
  },
] as const

type BioBadge = (typeof BIO_IMAGES)[number]['badge']
function BadgeContent({ badge }: { badge: BioBadge }) {
  const Icon = badge.icon
  return (
    <>
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center text-slate-950 shrink-0',
          badge.color,
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="pr-2 text-left">
        <div className="text-white font-black uppercase tracking-tight text-xs leading-none mb-1">
          {badge.title}
        </div>
        <div className="text-slate-400 text-[10px] uppercase tracking-widest leading-none">
          {badge.subtitle}
        </div>
      </div>
    </>
  )
}
export function AboutSection({
  initialVideos: youtubeVideos,
}: {
  initialVideos: readonly VideoFixture[]
}) {
  const reducedMotion = useReducedMotion()
  const [bioApi, setBioApi] = React.useState<CarouselApi>()
  const [bioCurrent, setBioCurrent] = React.useState(0)
  const [ytApi, setYtApi] = React.useState<CarouselApi>()
  const [ytCurrent, setYtCurrent] = React.useState(0)
  const [bioPlugin] = React.useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  )
  const [ytPlugin] = React.useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  )
  React.useEffect(() => {
    if (!bioApi) return
    const select = () => setBioCurrent(bioApi.selectedScrollSnap())
    bioApi.on('select', select)
    return () => {
      bioApi.off('select', select)
    }
  }, [bioApi])
  React.useEffect(() => {
    if (!ytApi) return
    const select = () => setYtCurrent(ytApi.selectedScrollSnap())
    ytApi.on('select', select)
    return () => {
      ytApi.off('select', select)
    }
  }, [ytApi])
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden bg-slate-950 scroll-mt-12"
    >
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-main/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-main/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Part 1: Hero Bio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              data-motion-reveal
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className=""
            >
              <motion.div
                data-motion-reveal
                variants={fadeInUp}
                className="mb-6 px-4"
              >
                <Badge
                  variant="outline"
                  className="border-main/50 text-main px-4 py-1.5 uppercase tracking-widest text-xs font-bold mb-4"
                >
                  Историята на Дани Русев
                </Badge>
                <motion.h2
                  data-motion-reveal
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6"
                >
                  Превръщаме Скоростта <br />
                  <span className="text-main">В Изкуство</span>
                </motion.h2>
              </motion.div>
              <motion.p
                data-motion-reveal
                variants={fadeInUp}
                className="text-lg text-slate-400 mb-6 leading-relaxed px-4"
              >
                Дани Русев не е просто пилот. Той е визионер в света на
                моторните спортове, чиято кариера обхваща шампионски титли,
                каскадьорски роли в холивудски продукции и създаването на едно
                от най-влиятелните автомобилни общества в България.
              </motion.p>
              <motion.p
                data-motion-reveal
                variants={fadeInUp}
                className="text-lg text-slate-400 mb-8 leading-relaxed px-4"
              >
                Като шампион на България по гимкхана и вицешампион по рали, Дани
                съчетава прецизността на състезателя с атрактивността на
                шоумена, предлагайки преживяване, което остава в паметта
                завинаги.
              </motion.p>

              <motion.div
                data-motion-reveal
                variants={fadeInUp}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm group hover:border-main/30 transition-colors">
                  <Trophy className="w-8 h-8 text-taxi mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-white text-sm uppercase">
                    Шампион
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase">
                    Гимкхана България
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm group hover:border-main/30 transition-colors">
                  <Clapperboard className="w-8 h-8 text-main mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-white text-sm uppercase">
                    Каскадьор
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase">
                    Кино Продукции
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm group hover:border-main/30 transition-colors">
                  <Youtube className="w-8 h-8 text-event mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-white text-sm uppercase">
                    Инфлуенсър
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase">
                    Ютубер
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              data-motion-reveal
              initial={{ opacity: 0, x: 40, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-main/20 group/bio">
                <Carousel
                  setApi={setBioApi}
                  plugins={reducedMotion ? [] : [bioPlugin]}
                  className="w-full"
                  onMouseEnter={() => bioPlugin.stop()}
                  onMouseLeave={() => bioPlugin.reset()}
                >
                  <CarouselContent className="ml-0">
                    {BIO_IMAGES.map((image) => (
                      <CarouselItem
                        key={image.url}
                        className="pl-0 basis-full relative"
                      >
                        <div className="relative aspect-[4/5] w-full">
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 opacity-0 group-hover/bio:opacity-100 transition-opacity bg-slate-900/50 border-white/10 text-white z-20" />
                  <CarouselNext className="right-4 opacity-0 group-hover/bio:opacity-100 transition-opacity bg-slate-900/50 border-white/10 text-white z-20" />
                </Carousel>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none z-10" />

                <div className="absolute bottom-6 left-6 right-6 z-20 min-h-[64px] flex items-end">
                  <AnimatePresence mode="wait">
                    <motion.div
                      data-motion-reveal
                      key={bioCurrent}
                      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 group/badge select-none relative">
                        <BadgeContent
                          badge={
                            BIO_IMAGES[bioCurrent]?.badge ??
                            BIO_IMAGES[0]?.badge
                          }
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress dots for bio carousel */}
                <div className="absolute bottom-5 right-5  flex gap-1.5 p-2 rounded-sm border border-white/10 bg-gradient-to-t from-slate-950/5 via-transparent to-transparent backdrop-blur-md z-20">
                  {BIO_IMAGES.map((image, index) => (
                    <div
                      key={image.url}
                      className={`size-1.5 rounded-full transition-all duration-300 ${
                        bioCurrent === index ? 'bg-main w-6' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-main rounded-full mix-blend-overlay blur-3xl opacity-50" />
            </motion.div>
          </div>

          {/* Part 2: YouTube Section (Mirrored) */}
          {youtubeVideos.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                data-motion-reveal
                initial={{ opacity: 0, x: -40, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20 group/yt-main">
                  <Carousel
                    setApi={setYtApi}
                    plugins={reducedMotion ? [] : [ytPlugin]}
                    className="w-full"
                    onMouseEnter={() => ytPlugin.stop()}
                    onMouseLeave={() => ytPlugin.reset()}
                  >
                    <CarouselContent className="ml-0">
                      {youtubeVideos.map((video, index) => (
                        <CarouselItem
                          key={video.url}
                          className="pl-0 basis-full relative p-4"
                        >
                          <div className="flex flex-col gap-3 group/yt">
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noreferrer"
                              className="relative aspect-video w-full block overflow-hidden rounded-2xl bg-slate-900"
                            >
                              <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover/yt:scale-105"
                              />

                              {/* Label Overlay - Keeping it subtle */}
                              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-white text-[10px] font-bold uppercase tracking-widest">
                                {index === 0 ? 'НОВО' : 'ВИДЕО'}
                              </div>
                            </a>

                            {/* YouTube-style Info Section */}
                            <div className="flex gap-3 px-1">
                              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/5 mt-0.5">
                                <Image
                                  src="https://yt3.googleusercontent.com/XXqhdPRjXWaUqRV2swty1VbbToiDEAxrxXWmRZ9glLCJxqLUGIrOr3kquqMcBfZHsmj3Lb-1wg=s160-c-k-c0x00ffffff-no-rj"
                                  alt="Dani Rusev"
                                  width={36}
                                  height={36}
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 pr-4">
                                <a
                                  href={video.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-white font-bold text-sm leading-tight line-clamp-2 mb-1 "
                                >
                                  {video.title}
                                </a>
                                <div className="text-slate-400 text-xs flex flex-col gap-0.5">
                                  <div className="hover:text-white transition-colors cursor-pointer">
                                    Dani Rusev
                                  </div>
                                </div>
                              </div>
                              <div className="opacity-0 group-hover/yt:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 top-[35%] opacity-0 group-hover/yt-main:opacity-100 transition-opacity bg-slate-900/80 border-white/10 text-white z-20" />
                    <CarouselNext className="right-4 top-[35%] opacity-0 group-hover/yt-main:opacity-100 transition-opacity bg-slate-900/80 border-white/10 text-white z-20" />
                  </Carousel>

                  <div className="absolute inset-0 bg-gradient-to-t  pointer-events-none z-10" />
                </div>

                {/* Progress dots for yt carousel */}
                <div className="absolute -bottom-8 right-1/2 translate-x-1/2 flex gap-1.5 p-2 rounded-sm border border-white/5 bg-slate-950/40 backdrop-blur-md z-20">
                  {youtubeVideos.map((video, index) => (
                    <div
                      key={video.url}
                      className={`size-1.5 rounded-full transition-all duration-300 ${
                        ytCurrent === index ? 'bg-red-600 w-6' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Background glow for YouTube */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-event rounded-full mix-blend-overlay blur-3xl opacity-30" />
              </motion.div>

              <motion.div
                data-motion-reveal
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="order-1 lg:order-2"
              >
                <motion.div
                  data-motion-reveal
                  variants={fadeInUp}
                  className="mb-6 px-4"
                >
                  <Badge
                    variant="outline"
                    className="border-event/50 text-event px-4 py-1.5 uppercase tracking-widest text-xs font-bold mb-4"
                  >
                    Последвайте ме в YouTube
                  </Badge>
                  <motion.h2
                    data-motion-reveal
                    variants={fadeInUp}
                    className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6"
                  >
                    Експлозивни YouTube
                    <span className="text-event pl-4">ВИДЕА</span>
                  </motion.h2>
                </motion.div>
                <motion.p
                  data-motion-reveal
                  variants={fadeInUp}
                  className="text-lg text-slate-400 mb-8 leading-relaxed px-4"
                >
                  Гмурнете се в света на автомобилните предизвикателства,
                  високите скорости и неподправения хумор. Всяки месец ново
                  съдържание, заснето за ВАС. Последвайте канала ни, за да не
                  изпускате нищо!
                </motion.p>

                <motion.div
                  data-motion-reveal
                  variants={fadeInUp}
                  className="px-4"
                >
                  <a
                    href="https://www.youtube.com/@danirusev11?sub_confirmation=1"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants(),
                      'bg-white text-black px-6 py-3 hover:bg-slate-200 rounded-full h-auto font-bold text-base transition-all duration-300 active:scale-95 shadow-xl shadow-white/5 group ring-offset-slate-950 focus-visible:ring-white',
                      'flex items-center gap-3',
                    )}
                  >
                    <div className="relative flex items-center justify-center">
                      <Play className="w-6 h-6 text-event" />
                      <div className="absolute inset-0 bg-white mix-blend-multiply rounded-full scale-50 group-hover:scale-100 transition-transform opacity-0 group-hover:opacity-10" />
                    </div>
                    Абонирай се
                  </a>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
