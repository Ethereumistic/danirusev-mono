import { cn } from '@danirusev/ui/lib/utils'
import { Link } from '@tanstack/react-router'
import { Check, Mail, Minus, Phone } from 'lucide-react'
import * as motion from 'motion/react-m'
import type { ReactNode } from 'react'
import { MotionProvider } from '@/components/motion-provider'
import { BUSINESS } from '@/lib/seo'
import {
  PARTNERSHIP_ASSETS as A,
  ACADEMY_SERVICES,
  BALKAN_DRIVE_GUESTS,
  CALENDAR,
  CALENDAR_NOTE,
  D2_VIDEO,
  EVENT_VENUES,
  FIRST_MONTH,
  formatCount,
  LIVERY_ZONES,
  MONTHLY_VIEWS,
  MONTHS,
  PILOT_FACTS,
  REACH_DATE,
  SEASON_TRACKS,
  type SeasonTrack,
  SOCIAL_REACH,
  type StageId,
  stageOf,
  TIER_RIGHTS,
  TIERS,
  TOTAL_FOLLOWERS,
  TOUCHPOINTS,
} from './content'
import { StageRail } from './stage-rail'
import { YoutubeEmbed } from './youtube-embed'

const MAIL_SUBJECT = encodeURIComponent('Партньорство DR11 — сезон 2027')

const TRACK_COLOR: Record<SeasonTrack, string> = {
  national: 'bg-main',
  europe: 'bg-rent',
  events: 'bg-white',
}

/** Image with art-directed sizes; every presentation photo has 800w and 1600w files. */
function Photo({
  src,
  alt,
  className,
  priority,
  sizes = '100vw',
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <img
      src={`${src}-1600.webp`}
      srcSet={`${src}-800.webp 800w, ${src}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}

function Slide({
  id,
  className,
  children,
}: {
  id: StageId
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('relative scroll-mt-0 overflow-hidden', className)}
    >
      {children}
    </section>
  )
}

/** Stage marker and headline that open each slide. */
function SlideHead({
  id,
  title,
  lede,
  compact,
  className,
}: {
  id: StageId
  title: ReactNode
  lede?: ReactNode
  /** Smaller headline for slides that set it in a half-width column. */
  compact?: boolean
  className?: string
}) {
  const stage = stageOf(id)
  return (
    <header className={cn('max-w-4xl', className)}>
      <p className="mb-5 flex items-baseline gap-3 text-sm">
        <span className="font-black italic text-main">{stage.marker}</span>
        <span className="h-px w-10 translate-y-[-4px] bg-white/25" />
        <span className="text-white/60">{stage.label}</span>
      </p>
      <h2
        id={`${id}-title`}
        className={cn(
          'font-black uppercase italic leading-[0.9] tracking-tighter text-white text-balance',
          compact
            ? 'text-[clamp(2.25rem,4.6vw,4.5rem)]'
            : 'text-[clamp(2.5rem,7vw,6.25rem)]',
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
          {lede}
        </p>
      )}
    </header>
  )
}

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12'

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

function Cover() {
  const lines = ['Заедно към', 'европейската', 'сцена']
  return (
    <Slide id="start" className="flex min-h-svh bg-slate-950">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <picture>
          <source
            media="(max-width: 767px) and (orientation: portrait)"
            srcSet={`${A.heroMobile}-600.webp 600w, ${A.heroMobile}-900.webp 900w`}
            sizes="100vw"
          />
          <Photo src={A.hero} alt={A.heroAlt} priority />
        </picture>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50 md:via-slate-950/35 md:to-slate-950/10" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-slate-950/70 via-transparent to-transparent md:block" />
      <div
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
      </div>
      <p className="absolute right-3 bottom-3 z-10 text-[11px] text-white/40">
        Концептуална визуализация
      </p>
    </Slide>
  )
}

function Pilot() {
  return (
    <Slide id="pilot" className="bg-slate-950 py-24 md:py-36">
      <div className={cn(shell, 'grid gap-12 lg:grid-cols-12 lg:gap-16')}>
        <div className="lg:col-span-5">
          <figure className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-slate-900">
              <Photo
                src={A.portrait}
                alt={A.portraitAlt}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white/50">
              Дани Русев, отбор DR11
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-col justify-center lg:col-span-7">
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
          <dl className="mt-12 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3">
            {PILOT_FACTS.map((fact) => (
              <div key={fact.title} className="bg-slate-950 p-5">
                <dt className="text-xl font-black uppercase italic tracking-tight text-white lg:text-[1.35rem]">
                  {fact.title}
                </dt>
                <dd className="mt-1 text-sm text-slate-400">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <figure className={cn(shell, 'mt-16 md:mt-24')}>
        <div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-900">
          <Photo src={A.rally} alt={A.rallyAlt} />
        </div>
        <figcaption className="mt-3 text-sm text-white/50">
          Suzuki Swift Sport, с навигатор Иван Данков
        </figcaption>
      </figure>
    </Slide>
  )
}

const TRACK_SHORT: Record<SeasonTrack, string> = {
  national: 'Национален шампионат',
  europe: 'Европа',
  events: 'Събития',
}

function SeasonCalendar() {
  const byMonth = [...CALENDAR].sort((a, b) => a.month - b.month)
  return (
    <figure className="mt-16">
      <figcaption className="mb-6 text-xl font-black uppercase italic tracking-tight text-white">
        Сезонът месец по месец
      </figcaption>
      <div className="hidden md:block">
        <div className="grid grid-cols-[11rem_repeat(7,1fr)] border-b border-white/20 pb-3 text-sm text-white/50">
          <span />
          {MONTHS.map((month) => (
            <span key={month} className="pl-3 font-black italic">
              {month}
            </span>
          ))}
        </div>
        {SEASON_TRACKS.map((track) => (
          <div
            key={track.id}
            className="grid min-h-20 grid-cols-[11rem_repeat(7,1fr)] border-b border-white/10"
          >
            <span className="flex items-center gap-3 pr-4 text-sm font-semibold text-white/80">
              <span
                className={cn(
                  'size-2.5 shrink-0 rotate-45',
                  TRACK_COLOR[track.id],
                )}
              />
              {TRACK_SHORT[track.id]}
            </span>
            {MONTHS.map((month, index) => (
              <span
                key={month}
                className="flex flex-col justify-center gap-1.5 border-l border-white/10 px-3 py-3"
              >
                {CALENDAR.filter(
                  (item) =>
                    item.track === track.id &&
                    item.month === FIRST_MONTH + index,
                ).map((item) => (
                  <span
                    key={item.name}
                    title={item.place}
                    className={cn(
                      'w-fit rounded px-2 py-1 text-xs font-bold leading-tight lg:text-sm',
                      track.id === 'national' && 'bg-main text-black',
                      track.id === 'europe' && 'bg-rent text-black',
                      track.id === 'events' && 'bg-white text-black',
                    )}
                  >
                    {item.name}
                  </span>
                ))}
              </span>
            ))}
          </div>
        ))}
      </div>
      <ol className="grid md:hidden">
        {byMonth.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-4 border-b border-white/10 py-3"
          >
            <span className="w-10 text-sm font-black italic text-white/50">
              {MONTHS[item.month - FIRST_MONTH]}
            </span>
            <span
              className={cn(
                'size-2.5 shrink-0 rotate-45',
                TRACK_COLOR[item.track],
              )}
            />
            <span className="text-base text-white">{item.place}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/45">
        {CALENDAR_NOTE}
      </p>
    </figure>
  )
}

function Season() {
  return (
    <Slide
      id="season"
      className="border-t border-white/10 bg-slate-950 py-24 md:py-36"
    >
      <div className={shell}>
        <SlideHead
          id="season"
          title="План за сезон 2027"
          lede="Национален шампионат. Европейска сцена. Директен контакт с публиката."
        />
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {SEASON_TRACKS.map((track) => (
            <article key={track.id} className="border-t-2 border-white/15 pt-6">
              <span
                className={cn(
                  'mb-5 block size-3 rotate-45',
                  TRACK_COLOR[track.id],
                )}
              />
              <h3 className="text-2xl font-black uppercase italic leading-none tracking-tight text-white">
                {track.title}
              </h3>
              <p className="mt-4 leading-relaxed text-slate-300">
                {track.body}
              </p>
              {track.id === 'events' && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {EVENT_VENUES.map((venue) => (
                    <li
                      key={venue.name}
                      className="rounded-full border border-white/15 px-3 py-1 text-sm text-white"
                    >
                      {venue.name}{' '}
                      <span className="text-white/45">{venue.note}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        <SeasonCalendar />
        <div className="mt-20 grid gap-6 rounded-xl bg-main p-8 text-black md:grid-cols-[1fr_1.4fr] md:items-center md:p-12">
          <p className="text-4xl font-black uppercase italic leading-[0.9] tracking-tighter md:text-5xl">
            Повече от състезания
          </p>
          <p className="text-lg leading-relaxed text-black/80">
            Видимост за партньорите на рали етапите и на автомобилните събития с
            публика — чрез брандиране на автомобила, съдържание за социалните
            мрежи и директен контакт с феновете.
          </p>
        </div>
      </div>
    </Slide>
  )
}

function Audience() {
  return (
    <Slide id="audience" className="bg-slate-950 pb-24 md:pb-36">
      <div className="relative h-[70svh] min-h-[420px] md:h-[85svh]">
        <Photo src={A.balkanDrive} alt={A.balkanDriveAlt} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />
        <div className={cn(shell, 'absolute inset-x-0 bottom-0 pb-10')}>
          <SlideHead
            id="audience"
            title="Аудитория и дигитално достигане"
            lede="Автомобилен спорт, известни личности и съдържание, което привлича внимание."
          />
        </div>
      </div>
      <div className={cn(shell, 'mt-16 grid gap-16 lg:grid-cols-12')}>
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <img
              src={A.balkanDriveAvatar}
              alt=""
              loading="lazy"
              className="size-14 rounded-full"
            />
            <h3 className="font-gagalin text-4xl text-white md:text-5xl">
              Balkan Drive
            </h3>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Видео предаването на Дани: популярни личности сядат зад волана на
            писта, а разговорът се случва в движение — на високи обороти и с
            много адреналин.
          </p>
          <p className="mt-8 text-sm text-white/50">Гости в предаването</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {BALKAN_DRIVE_GUESTS.map((guest) => (
              <li
                key={guest}
                className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/85"
              >
                {guest}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <p className="text-[clamp(4.5rem,15vw,11rem)] font-black italic leading-[0.8] tracking-tighter text-main tabular-nums">
            {formatCount(Math.floor(TOTAL_FOLLOWERS / 100) * 100)}+
          </p>
          <p className="mt-4 text-lg text-white">
            последователи в трите основни профила
          </p>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {SOCIAL_REACH.map((item) => (
              <li
                key={`${item.platform}-${item.account}`}
                className="flex items-baseline justify-between gap-4 py-4"
              >
                <span className="text-white">
                  {item.platform}{' '}
                  <span className="text-white/50">— {item.account}</span>
                </span>
                <span className="text-2xl font-black italic tabular-nums text-white">
                  {formatCount(item.followers)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-white/40">
            Публични данни към {REACH_DATE}. Сбор без корекция за припокриване
            на аудиториите.
          </p>
          <div className="mt-12 flex flex-wrap items-end gap-x-6 gap-y-2">
            <span className="text-6xl font-black italic tracking-tighter text-rent tabular-nums md:text-7xl">
              {formatCount(MONTHLY_VIEWS)}+
            </span>
            <span className="max-w-xs pb-2 text-white/80">
              гледания месечно — често достигани от личния профил на Дани
            </span>
          </div>
        </div>
      </div>
      <div className={cn(shell, 'mt-20')}>
        <div className="border-l-4 border-main pl-6 md:pl-10">
          <h3 className="text-xl font-bold text-white">
            Какво получава партньорът
          </h3>
          <p className="mt-3 max-w-3xl text-2xl leading-snug text-slate-200 md:text-3xl">
            Присъствие в автомобилно съдържание, интеграции във видеа,
            брандиране, публикации около състезанията и разпознаваемост пред
            активна аудитория.
          </p>
        </div>
      </div>
    </Slide>
  )
}

function Proof() {
  return (
    <Slide
      id="proof"
      className="border-t border-white/10 bg-slate-950 py-24 md:py-36"
    >
      <div className={shell}>
        <SlideHead
          id="proof"
          title="Доверие, което се превръща в действие"
          lede="Реализирани партньорства през 2026 г."
        />

        <article className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-900">
              <Photo
                src={A.campaign}
                alt={A.campaignAlt}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <h3 className="sr-only">Vivacom × SkyShowtime</h3>
            <div className="flex items-center gap-5">
              <img
                src={A.vivacomLogo}
                alt="Vivacom"
                className="h-5 w-auto invert md:h-7"
              />
              <span className="text-2xl font-light text-white/40">×</span>
              <img
                src={A.skyshowtimeLogo}
                alt="SkyShowtime"
                className="h-6 w-auto md:h-8"
              />
            </div>
            <p className="mt-10 flex items-end gap-4">
              <span className="text-[9rem] font-black italic leading-[0.75] tracking-tighter text-main md:text-[12rem]">
                10
              </span>
              <span className="max-w-[12rem] pb-2 text-lg leading-snug text-white">
                клиенти на Vivacom зад волана на автомобила на Дани
              </span>
            </p>
            <p className="mt-8 text-lg leading-relaxed text-slate-300">
              Съвместна кампания, която превърна автомобилния спорт в лично
              преживяване за клиентите — и в съдържание, което хората искат да
              гледат.
            </p>
          </div>
        </article>

        <p className="my-20 text-center text-[clamp(1.6rem,4vw,3.25rem)] font-black uppercase italic leading-[0.95] tracking-tighter text-white text-balance md:my-28">
          Реално преживяване. Автентично съдържание.{' '}
          <span className="text-main">Запомняща се марка.</span>
        </p>

        <article className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5">
            <img
              src={A.d2Logo}
              alt=""
              loading="lazy"
              className="mb-6 size-16 md:size-20"
            />
            <h3 className="text-4xl font-black uppercase italic leading-none tracking-tight text-white md:text-5xl">
              D2 — музикален клип
            </h3>
            <p className="mt-2 text-white/50">{D2_VIDEO.subtitle}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Дани е каскадьор в клипа към новата песен на D2, а състезателният
              му автомобил е част от действието — с дрифт сцени около групата.
              Автомобилен спорт и музика в една динамична продукция.
            </p>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <YoutubeEmbed id={D2_VIDEO.id} title={D2_VIDEO.title} />
          </div>
        </article>

        <div className="mt-20 grid gap-4 border-t border-white/15 pt-8 md:grid-cols-[14rem_1fr]">
          <h3 className="font-bold text-white">Какво показват тези проекти</h3>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            Опит в реализацията на бранд кампании, създаване на запомнящи се
            преживявания и интегриране на автомобилния спорт в съдържание с
            потенциал за широка аудитория.
          </p>
        </div>
      </div>
    </Slide>
  )
}

function Brand() {
  return (
    <Slide id="brand" className="bg-slate-950 py-24 md:py-36">
      <div className={shell}>
        <SlideHead
          id="brand"
          title={
            <>
              Повече от лого.{' '}
              <span className="text-main">Цялостно присъствие.</span>
            </>
          }
          lede="Вашият бранд е част от отбора — на пистата, в съдържанието и сред публиката."
        />
      </div>
      <div className="mx-auto mt-14 max-w-7xl px-0 sm:px-8 lg:px-12">
        <figure className="relative aspect-video overflow-hidden bg-slate-900 sm:rounded-xl">
          <Photo src={A.livery} alt={A.liveryAlt} />
          <ul aria-label="Рекламни зони на автомобила">
            {LIVERY_ZONES.map((zone) => (
              <li
                key={zone.name}
                className={cn(
                  'absolute flex -translate-y-1/2 items-center gap-2 whitespace-nowrap',
                  'labelStart' in zone
                    ? 'flex-row-reverse translate-x-2'
                    : '-translate-x-2',
                )}
                style={
                  'labelStart' in zone
                    ? { right: `${100 - zone.x}%`, top: `${zone.y}%` }
                    : { left: `${zone.x}%`, top: `${zone.y}%` }
                }
              >
                <span className="relative flex size-4 md:size-5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-main/60 motion-reduce:animate-none" />
                  <span className="relative size-full rounded-full border-2 border-black bg-main" />
                </span>
                <span className="rounded bg-slate-950/80 px-2 py-0.5 text-xs font-bold text-white backdrop-blur md:text-sm">
                  {zone.name}
                </span>
              </li>
            ))}
          </ul>
          <figcaption className="absolute right-3 bottom-3 rounded bg-slate-950/70 px-2 py-1 text-[11px] text-white/60">
            Концептуална визуализация
          </figcaption>
        </figure>
      </div>
      <div className={shell}>
        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {TOUCHPOINTS.map((point) => (
            <li key={point.title} className="border-t-2 border-main pt-4">
              <h3 className="text-lg font-bold leading-tight text-white">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {point.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-24">
          <h3 className="text-3xl font-black uppercase italic tracking-tight text-white md:text-4xl">
            Нива на партньорство
          </h3>
          <p className="mt-3 max-w-2xl text-slate-400">
            Примерна рамка. Размерът и позицията на логото, броят публикации и
            ексклузивността се договарят индивидуално.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Права по нива на партньорство
              </caption>
              <thead>
                <tr className="border-b border-white/20">
                  <th
                    scope="col"
                    className="py-4 pr-4 text-sm font-normal text-white/50"
                  >
                    Права
                  </th>
                  {TIERS.map((tier, index) => (
                    <th
                      key={tier}
                      scope="col"
                      className={cn(
                        'w-32 px-3 py-4 text-center text-lg font-black uppercase italic tracking-tight md:w-44',
                        index === TIERS.length - 1 ? 'text-main' : 'text-white',
                      )}
                    >
                      {tier}
                      <span className="block text-xs font-normal normal-case not-italic tracking-normal text-white/45">
                        партньор
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIER_RIGHTS.map((row) => (
                  <tr key={row.right} className="border-b border-white/10">
                    <th
                      scope="row"
                      className="py-4 pr-4 font-normal text-slate-200"
                    >
                      {row.right}
                    </th>
                    {row.tiers.map((included, index) => (
                      <td key={TIERS[index]} className="px-3 py-4 text-center">
                        {included ? (
                          <Check
                            className="mx-auto size-5 text-main"
                            aria-label="Включено"
                          />
                        ) : (
                          <Minus
                            className="mx-auto size-5 text-white/20"
                            aria-label="Не е включено"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-20 max-w-4xl text-[clamp(1.75rem,4.5vw,3.5rem)] font-black uppercase italic leading-[0.95] tracking-tighter text-white">
          Един партньор.{' '}
          <span className="text-main">Много точки на контакт.</span>
        </p>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          Видимост на живо, дигитално присъствие и директно взаимодействие с
          автомобилната общност.
        </p>
      </div>
    </Slide>
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
          <ul className="mt-12 grid gap-8">
            {ACADEMY_SERVICES.map((service) => (
              <li key={service.title} className="border-t border-white/15 pt-5">
                <p className="text-xs text-rent">{service.en}</p>
                <h3 className="mt-1 text-xl font-black uppercase italic tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-400">
                  {service.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="grid h-full grid-rows-[1fr_auto] gap-4 lg:sticky lg:top-8 lg:max-h-[calc(100svh-4rem)]">
            <div className="min-h-[380px] overflow-hidden rounded-xl bg-slate-900">
              <Photo
                src={A.academy}
                alt={A.academyAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
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
            className="inline-flex h-16 items-center justify-center gap-3 rounded-xl bg-main px-8 text-lg font-extrabold uppercase tracking-wider text-black shadow-[0_0_40px_-10px_var(--main)] transition-colors hover:bg-main/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
          >
            <Phone className="size-5" />
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
