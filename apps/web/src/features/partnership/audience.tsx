import { cn } from '@danirusev/ui/lib/utils'
import { Eye, Play } from 'lucide-react'
import { Facebook } from '@/components/social-icons'
import TikTokIcon from '@/components/tiktok'
import {
  PARTNERSHIP_ASSETS as A,
  BALKAN_DRIVE_CHANNEL,
  BALKAN_DRIVE_EPISODES,
  MONTHLY_VIEWS,
  REACH_DATE,
  SOCIAL_REACH,
  TOTAL_FOLLOWERS,
} from './content'
import { ACCENT, CountUp, Photo, Slide, SlideHead, shell, useSeen } from './ui'

const MAX_FOLLOWERS = Math.max(...SOCIAL_REACH.map((item) => item.followers))

function ReachBars() {
  const [ref, seen] = useSeen<HTMLUListElement>()
  return (
    <ul ref={ref} className="mt-10 grid gap-6">
      {SOCIAL_REACH.map((item, index) => {
        const accent = ACCENT[item.accent]
        return (
          <li key={`${item.platform}-${item.account}`}>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-3 text-white">
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg text-black',
                    accent.bg,
                  )}
                >
                  {item.platform === 'TikTok' ? (
                    <TikTokIcon className="size-4" />
                  ) : (
                    <Facebook className="size-4" aria-hidden="true" />
                  )}
                </span>
                <span>
                  {item.platform}{' '}
                  <span className="text-white/50">· {item.account}</span>
                </span>
              </span>
              <CountUp
                value={item.followers}
                className="text-2xl font-black italic text-white md:text-3xl"
              />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className={cn(
                  'h-full origin-left rounded-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                  accent.bg,
                )}
                style={{
                  width: `${(item.followers / MAX_FOLLOWERS) * 100}%`,
                  transform: `scaleX(${seen ? 1 : 0})`,
                  transitionDelay: `${index * 150}ms`,
                }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function EpisodeReel() {
  return (
    <div className="mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="text-3xl font-black uppercase italic tracking-tight text-white md:text-4xl">
          Гости зад волана
        </h3>
        <a
          href={BALKAN_DRIVE_CHANNEL}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-bold text-white/70 underline decoration-main decoration-2 underline-offset-8 hover:text-white"
        >
          Всички епизоди в YouTube
        </a>
      </div>
      <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {BALKAN_DRIVE_EPISODES.map((episode) => (
          <li
            key={episode.id}
            className="w-[78%] shrink-0 snap-start sm:w-auto"
          >
            <a
              href={`https://www.youtube.com/watch?v=${episode.id}`}
              target="_blank"
              rel="noreferrer"
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
            >
              <span className="relative block aspect-video overflow-hidden rounded-xl bg-slate-900 ring-1 ring-white/10">
                <img
                  src={`https://i.ytimg.com/vi/${episode.id}/mqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute right-3 bottom-3 flex size-10 scale-90 items-center justify-center rounded-full bg-main text-black opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Play className="size-4 translate-x-px fill-current" />
                </span>
              </span>
              <span className="mt-3 block text-sm font-bold text-white/80 transition-colors group-hover:text-main">
                {episode.guest}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Audience() {
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
          <h3>
            <img
              src={A.balkanDriveLogo}
              alt="Balkan Drive"
              width={1505}
              height={119}
              loading="lazy"
              className="h-auto w-full max-w-md"
            />
          </h3>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Видео предаването на Дани: популярни личности сядат зад волана на
            писта, а разговорът се случва в движение — на високи обороти и с
            много адреналин.
          </p>
          <div className="mt-10 rounded-xl bg-white/[0.04] p-6 ring-1 ring-white/10">
            <Eye className="size-6 text-main" aria-hidden="true" />
            <p className="mt-4 text-5xl font-black italic tracking-tighter text-white md:text-6xl">
              <CountUp value={MONTHLY_VIEWS} step={1000} />
              <span className="text-main">+</span>
            </p>
            <p className="mt-2 text-white/75">
              гледания месечно, които личният профил на Дани често достига
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="text-[clamp(4.5rem,13vw,10rem)] font-black italic leading-[0.8] tracking-tighter text-main">
            <CountUp value={TOTAL_FOLLOWERS} step={100} />+
          </p>
          <p className="mt-5 text-lg text-white">
            последователи в трите основни профила
          </p>
          <ReachBars />
          <p className="mt-6 text-xs text-white/40">
            Публични данни към {REACH_DATE}. Сбор без корекция за припокриване
            на аудиториите.
          </p>
        </div>
      </div>
      <div className={shell}>
        <EpisodeReel />
        <div className="mt-20 border-l-4 border-main pl-6 md:pl-10">
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
