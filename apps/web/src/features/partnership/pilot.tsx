import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@danirusev/ui/components/carousel'
import { cn } from '@danirusev/ui/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { PARTNERSHIP_ASSETS as A, PILOT_FACTS, RALLY_GALLERY } from './content'
import { ACCENT, Photo, Reveal, Slide, SlideHead, shell } from './ui'

function RallyCarousel() {
  const reducedMotion = useReducedMotion()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true }),
  )
  useEffect(() => {
    if (!api) return
    const select = () => setCurrent(api.selectedScrollSnap())
    api.on('select', select)
    return () => {
      api.off('select', select)
    }
  }, [api])
  return (
    <figure className="mt-16" aria-roledescription="галерия">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={reducedMotion ? [] : [autoplay]}
        className="overflow-hidden rounded-xl bg-slate-900"
      >
        <CarouselContent className="ml-0">
          {RALLY_GALLERY.map((photo, index) => (
            <CarouselItem key={photo.src} className="pl-0">
              <div className="aspect-video">
                <Photo
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={cn(
                    'transition-transform duration-[4500ms] ease-linear',
                    index === current && !reducedMotion && 'scale-[1.06]',
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <figcaption className="mt-4 flex items-center justify-between gap-4">
        <span className="text-sm text-white/55">
          Suzuki Swift Sport, с навигатор Иван Данков
        </span>
        <span className="flex items-center gap-3">
          <span className="whitespace-nowrap text-sm font-black italic tabular-nums text-white">
            {String(current + 1).padStart(2, '0')}
            <span className="text-white/35">
              {' '}
              / {String(RALLY_GALLERY.length).padStart(2, '0')}
            </span>
          </span>
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Предишна снимка"
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-main hover:text-main focus-visible:outline-2 focus-visible:outline-main"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Следваща снимка"
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-main hover:text-main focus-visible:outline-2 focus-visible:outline-main"
          >
            <ArrowRight className="size-4" />
          </button>
        </span>
      </figcaption>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {RALLY_GALLERY.map((photo, index) => (
          <span
            key={photo.src}
            className={cn(
              'h-1 flex-1 rounded-full bg-white/15 transition-colors duration-500',
              index === current && 'bg-main',
            )}
          />
        ))}
      </div>
    </figure>
  )
}

export function Pilot() {
  return (
    <Slide id="pilot" className="bg-slate-950 py-24 md:py-36">
      <div className={cn(shell, 'grid gap-12 lg:grid-cols-12 lg:gap-16')}>
        <div className="lg:col-span-5">
          <figure className="lg:sticky lg:top-10">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-900 lg:aspect-auto lg:h-[calc(100svh-7rem)]">
              <Photo
                src={A.portrait}
                alt={A.portraitAlt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-top"
              />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <span className="absolute bottom-5 left-5 font-gagalin text-5xl text-main font-outline">
                DR11
              </span>
            </Reveal>
            <figcaption className="mt-3 text-sm text-white/50">
              Дани Русев, отбор DR11
            </figcaption>
          </figure>
        </div>
        <div className="lg:col-span-7">
          <SlideHead
            id="pilot"
            title={
              <>
                Рали пилот.
                <br />
                Шампион.
                <br />
                <span className="text-main">Създател.</span>
              </>
            }
          />
          <div className="mt-10 grid max-w-2xl gap-5 text-lg leading-relaxed text-slate-300">
            <p>
              Дани Русев е сред популярните млади рали пилоти в България —
              вицешампион по рали и шампион по гимкхана.
            </p>
            <p>
              С амбиция, доказани умения и поглед към международната сцена, през
              2027 г. пред него се открива възможност за следващата голяма
              крачка: участие в професионален отбор с автомобил от последно
              поколение.
            </p>
            <p>
              Като активен YouTube създател и разпознаваемо лице в социалните
              мрежи, Дани свързва автомобилния спорт с дигиталното съдържание и
              директния контакт с аудиторията.
            </p>
          </div>
          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {PILOT_FACTS.map((fact) => {
              const accent = ACCENT[fact.accent]
              const Icon = fact.icon
              return (
                <div
                  key={fact.title}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border-t-4 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.07]',
                    accent.border,
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      'absolute -right-4 -bottom-4 size-24 opacity-10 transition-transform duration-500 group-hover:-rotate-12',
                      accent.text,
                    )}
                  />
                  <span
                    className={cn(
                      'mb-5 flex size-11 items-center justify-center rounded-lg text-black',
                      accent.bg,
                      accent.glow,
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <dt className="text-xl font-black uppercase italic tracking-tight text-white">
                    {fact.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug text-slate-400">
                    {fact.detail}
                  </dd>
                </div>
              )
            })}
          </dl>
          <RallyCarousel />
        </div>
      </div>
    </Slide>
  )
}
