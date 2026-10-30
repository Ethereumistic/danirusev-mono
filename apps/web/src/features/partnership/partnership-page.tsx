import { cn } from '@danirusev/ui/lib/utils'
import { Link } from '@tanstack/react-router'
import { Mail, Pause, Phone, Play } from 'lucide-react'
import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as motion from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import { MotionProvider } from '@/components/motion-provider'
import {
  HERO_POSTER_SRCSET,
  HERO_SOURCES,
  prefersStillHero,
} from '@/features/landing/hero'
import { BUSINESS } from '@/lib/seo'
import { Audience } from './audience'
import { Brand } from './brand'
import { PARTNERSHIP_ASSETS as A, ACADEMY_SERVICES } from './content'
import { Pilot } from './pilot'
import { Proof } from './proof'
import { Season } from './season'
import { StageRail } from './stage-rail'
import { ACCENT, Photo, Reveal, Slide, SlideHead, shell } from './ui'

const MAIL_SUBJECT = encodeURIComponent('Партньорство DR11 — сезон 2027')

function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className={cn(shell, 'flex h-20 items-center justify-between')}>
        <Link
          to="/"
          className="font-gagalin text-3xl text-main font-outline"
          aria-label="Dani Rusev 11 — към сайта"
        >
          DR11
        </Link>
        <a
          href="#finish"
          className="rounded-full border border-white/25 bg-slate-950/40 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-main hover:text-main focus-visible:outline-2 focus-visible:outline-main"
        >
          Свържете се
        </a>
      </div>
    </header>
  )
}

const coverLine = {
  hidden: { y: '105%' },
  visible: (index: number) => ({
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.15 + index * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

/**
 * The site's hero drift video behind the cover. The poster renders on the
 * server; the video starts after hydration unless the visitor prefers reduced
 * motion or saves data, and fades in once its first frame is ready.
 */
function useCoverVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (reducedMotion || prefersStillHero()) {
      video.current?.pause()
      setReady(false)
      setEnabled(false)
    } else setEnabled(true)
  }, [reducedMotion])
  const toggle = () => {
    if (paused) void video.current?.play()
    else video.current?.pause()
    setPaused(!paused)
  }
  return { video, enabled, ready, setReady, paused, toggle }
}

function CoverVideo({
  video,
  enabled,
  ready,
  setReady,
}: ReturnType<typeof useCoverVideo>) {
  return (
    <>
      <img
        src="/hero-poster.webp"
        srcSet={HERO_POSTER_SRCSET}
        sizes="100vw"
        alt={A.heroAlt}
        fetchPriority="high"
        decoding="sync"
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
          ready ? 'opacity-0' : 'opacity-100',
        )}
      />
      {enabled && (
        <video
          ref={video}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setReady(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          {HERO_SOURCES.map((source) => (
            <source key={source.src} {...source} />
          ))}
        </video>
      )}
    </>
  )
}

function Cover() {
  const lines = ['Заедно към', 'европейската', 'сцена']
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // The video drifts slower than the page and the copy lifts away as you leave the cover.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const cover = useCoverVideo()
  return (
    <div ref={ref}>
      <Slide id="start" className="flex min-h-svh bg-slate-950">
        <motion.div
          className="absolute inset-0"
          style={reducedMotion ? undefined : { y: imageY }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <CoverVideo {...cover} />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/75 md:via-slate-950/35 md:to-slate-950/25" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-slate-950/70 via-transparent to-transparent md:block" />
        <motion.div
          style={reducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          className={cn(
            shell,
            'relative z-10 flex flex-col justify-between pt-28 pb-10 md:justify-end md:pb-20',
          )}
        >
          <div>
            <motion.p
              data-motion-reveal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mb-6 text-base text-white/75 md:text-lg"
            >
              Дани Русев / партньорска програма за сезон 2027
            </motion.p>
            <h1
              id="start-title"
              className="text-[clamp(2.6rem,9.6vw,8.75rem)] font-black uppercase italic leading-[0.86] tracking-tighter text-white"
            >
              {lines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    data-motion-reveal
                    className={cn('block', index === 2 && 'text-main')}
                    variants={coverLine}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
          <motion.div
            data-motion-reveal
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md text-lg leading-snug text-slate-200">
              Дани Русев и отборът DR11 търсят партньори за следващата голяма
              крачка — сезон с автомобил от последно поколение.
            </p>
            <a
              href="#pilot"
              className="self-start text-sm font-bold text-white/70 underline decoration-main decoration-2 underline-offset-8 hover:text-white sm:self-auto"
            >
              Разгледайте презентацията
            </a>
          </motion.div>
        </motion.div>
        {cover.ready && (
          <button
            type="button"
            className="absolute right-4 bottom-4 z-20 rounded-full bg-slate-950/50 p-3 text-white opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100"
            aria-label={
              cover.paused ? 'Пусни фоновото видео' : 'Спри фоновото видео'
            }
            onClick={cover.toggle}
          >
            {cover.paused ? (
              <Play className="size-4" aria-hidden="true" />
            ) : (
              <Pause className="size-4" aria-hidden="true" />
            )}
          </button>
        )}
      </Slide>
    </div>
  )
}

type MarqueeItem =
  | { kind: 'word'; text: string; className: string }
  | { kind: 'balkan-drive' }
  | { kind: 'wordmark' }

/** Each discipline in a face that suits it; the two brands use their own marks. */
const MARQUEE: readonly MarqueeItem[] = [
  {
    kind: 'word',
    text: 'РАЛИ',
    className: "font-['Russo_One'] text-white",
  },
  { kind: 'balkan-drive' },
  {
    kind: 'word',
    text: 'ДРИФТ',
    className: "font-['Rubik_Glitch'] text-white",
  },
  { kind: 'wordmark' },
  {
    kind: 'word',
    text: 'ГИМКХАНА',
    className: "font-['Stalinist_One'] text-[0.8em] text-white",
  },
  {
    kind: 'word',
    text: 'СЕЗОН 2027',
    className: 'font-[Tektur] font-black text-taxi',
  },
]

const SEPARATORS = [ACCENT.main.bg, ACCENT.rent.bg, ACCENT.taxi.bg]

function MarqueeEntry({ item }: { item: MarqueeItem }) {
  if (item.kind === 'balkan-drive')
    return (
      <img
        src={A.balkanDriveLogo}
        alt=""
        width={1505}
        height={119}
        className="h-[0.5em] w-auto"
      />
    )
  if (item.kind === 'wordmark')
    return (
      <span className="font-gagalin whitespace-nowrap text-main font-outline">
        Dani Rusev 11
      </span>
    )
  return (
    <span className={cn('whitespace-nowrap leading-none', item.className)}>
      {item.text}
    </span>
  )
}

/** A start-line banner of the project's disciplines and brands, between cover and pilot. */
function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/10 bg-slate-950 py-6 md:py-8"
    >
      <div className="flex w-max animate-[partnership-marquee_42s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0">
            {[...MARQUEE, ...MARQUEE].map((item, index) => (
              <span
                key={`${copy}-${index.toString()}`}
                className="flex items-center gap-8 pr-8 text-5xl md:gap-12 md:pr-12 md:text-7xl"
              >
                <MarqueeEntry item={item} />
                <span
                  className={cn(
                    'size-3 shrink-0 rotate-45 md:size-4',
                    SEPARATORS[index % SEPARATORS.length],
                  )}
                />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

function Academy() {
  return (
    <Slide
      id="academy"
      className="border-t border-white/10 bg-slate-950 py-24 md:py-36"
    >
      <div className={cn(shell, 'grid gap-14 lg:grid-cols-12')}>
        <div className="lg:col-span-6">
          <SlideHead
            id="academy"
            compact
            title={
              <>
                Не само моторспорт.{' '}
                <span className="text-main">Преживяване за вашия екип.</span>
              </>
            }
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300">
            Дани Русев е собственик на една от водещите дрифт академии в
            България. За служителите и бизнес партньорите на вашата компания
            създаваме специални автомобилни преживявания.
          </p>
          <ul className="mt-12 grid gap-4">
            {ACADEMY_SERVICES.map((service) => {
              const accent = ACCENT[service.accent]
              return (
                <li
                  key={service.title}
                  className="group flex gap-5 rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]"
                >
                  <span
                    className={cn(
                      'flex size-12 shrink-0 items-center justify-center rounded-lg text-black transition-transform duration-300 group-hover:-rotate-6',
                      accent.bg,
                      accent.glow,
                    )}
                  >
                    <service.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className={cn('block text-xs', accent.text)}>
                      {service.en}
                    </span>
                    <h3 className="mt-1 text-xl font-black uppercase italic leading-tight tracking-tight text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-400">
                      {service.body}
                    </p>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="grid h-full grid-rows-[1fr_auto] gap-4 lg:sticky lg:top-8 lg:max-h-[calc(100svh-4rem)]">
            <Reveal className="min-h-[380px] overflow-hidden rounded-xl bg-slate-900">
              <Photo
                src={A.academy}
                alt={A.academyAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
            <p className="rounded-xl bg-white/5 p-5 text-sm leading-relaxed text-slate-300">
              Самостоятелна услуга, достъпна за всяка компания — и като
              допълнение към партньорството в рали проекта.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  )
}

function Finish() {
  return (
    <Slide id="finish" className="flex min-h-svh items-center bg-slate-950">
      <div className="absolute inset-0">
        <Photo src={A.finish} alt="" className="opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90" />
      </div>
      <div className={cn(shell, 'relative z-10 py-24')}>
        <p className="mb-5 flex items-baseline gap-3 text-sm">
          <span className="font-black italic text-main">Финиш</span>
          <span className="h-px w-10 translate-y-[-4px] bg-white/25" />
          <span className="text-white/60">Контакт</span>
        </p>
        <h2
          id="finish-title"
          className="max-w-5xl text-[clamp(2.75rem,9vw,8rem)] font-black uppercase italic leading-[0.88] tracking-tighter text-white"
        >
          Следващият етап е <span className="text-main">с вас.</span>
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
          Нека обсъдим как вашият бранд да стане част от сезон 2027 — на
          пистата, в съдържанието и сред публиката.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="group inline-flex h-16 items-center justify-center gap-3 rounded-xl bg-main px-8 text-lg font-extrabold uppercase tracking-wider text-black shadow-[0_0_40px_-10px_var(--main)] transition-all hover:bg-main/90 hover:shadow-[0_0_60px_-6px_var(--main)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
          >
            <Phone className="size-5 transition-transform group-hover:rotate-12" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={`mailto:${BUSINESS.email}?subject=${MAIL_SUBJECT}`}
            className="inline-flex h-16 items-center justify-center gap-3 rounded-xl border border-white/25 px-8 text-lg font-bold text-white transition-colors hover:border-main hover:text-main focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
          >
            <Mail className="size-5" />
            {BUSINESS.email}
          </a>
        </div>
        <p className="mt-16 text-sm text-white/45">
          Дани Русев, {BUSINESS.legalName},{' '}
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-white"
          >
            danirusev.com
          </Link>
        </p>
      </div>
    </Slide>
  )
}

export function PartnershipPage() {
  return (
    <MotionProvider>
      <a href="#pilot" className="skip-link">
        Към съдържанието
      </a>
      <StageRail />
      <TopBar />
      <main id="main-content">
        <Cover />
        <Marquee />
        <Pilot />
        <Season />
        <Audience />
        <Proof />
        <Brand />
        <Academy />
        <Finish />
      </main>
    </MotionProvider>
  )
}
