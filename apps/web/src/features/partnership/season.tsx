import { cn } from '@danirusev/ui/lib/utils'
import { MapPin } from 'lucide-react'
import {
  PARTNERSHIP_ASSETS as A,
  type Accent,
  CALENDAR,
  CALENDAR_NOTE,
  EVENT_VENUES,
  FIRST_MONTH,
  MONTHS,
  SEASON_TRACKS,
  type SeasonTrack,
} from './content'
import {
  ACCENT,
  Photo,
  Slide,
  SlideHead,
  shell,
  TyreMarks,
  useSeen,
} from './ui'

const TRACK_SHORT: Record<SeasonTrack, string> = {
  national: 'Национален шампионат',
  europe: 'Европа',
  events: 'Събития',
}

const accentOf = (track: SeasonTrack): Accent =>
  SEASON_TRACKS.find((item) => item.id === track)?.accent ?? 'main'

function SeasonCalendar() {
  const [ref, seen] = useSeen<HTMLDivElement>()
  const byMonth = [...CALENDAR].sort((a, b) => a.month - b.month)
  return (
    <figure className="mt-20">
      <figcaption className="mb-6 text-xl font-black uppercase italic tracking-tight text-white">
        Сезонът месец по месец
      </figcaption>
      <div
        ref={ref}
        className="hidden rounded-xl bg-slate-950/60 p-6 ring-1 ring-white/10 backdrop-blur-sm md:block"
      >
        <div className="grid grid-cols-[11rem_repeat(7,1fr)] border-b border-white/20 pb-3 text-sm text-white/50">
          <span />
          {MONTHS.map((month) => (
            <span key={month} className="pl-3 font-black italic">
              {month}
            </span>
          ))}
        </div>
        {SEASON_TRACKS.map((track, row) => (
          <div
            key={track.id}
            className="grid min-h-20 grid-cols-[11rem_repeat(7,1fr)] border-b border-white/10 last:border-b-0"
          >
            <span className="flex items-center gap-3 pr-4 text-sm font-semibold text-white/85">
              <track.icon
                aria-hidden="true"
                className={cn('size-4 shrink-0', ACCENT[track.accent].text)}
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
                    style={{ transitionDelay: `${row * 120 + index * 70}ms` }}
                    className={cn(
                      'w-fit rounded px-2 py-1 text-xs font-bold leading-tight text-black transition-all duration-500 lg:text-sm',
                      ACCENT[track.accent].bg,
                      seen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-3 opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-100',
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
                ACCENT[accentOf(item.track)].bg,
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

export function Season() {
  return (
    <Slide id="season" className="bg-slate-950 py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-[min(1100px,140svh)]">
        <Photo
          src={A.seasonBg}
          alt=""
          widths={[960, 1920]}
          className="object-[center_40%]"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/10 to-slate-950" />
      </div>
      <div className={cn(shell, 'relative')}>
        <SlideHead
          id="season"
          title="План за сезон 2027"
          lede="Национален шампионат. Европейска сцена. Директен контакт с публиката."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {SEASON_TRACKS.map((track) => {
            const accent = ACCENT[track.accent]
            return (
              <article
                key={track.id}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-xl border-t-4 bg-slate-950/70 p-6 ring-1 ring-white/10 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 md:p-7',
                  accent.border,
                )}
              >
                <track.icon
                  aria-hidden="true"
                  className={cn(
                    'absolute -top-6 -right-6 size-32 opacity-[0.07] transition-transform duration-700 group-hover:rotate-12',
                    accent.text,
                  )}
                />
                <span
                  className={cn(
                    'mb-6 flex size-12 items-center justify-center rounded-lg text-black',
                    accent.bg,
                    accent.glow,
                  )}
                >
                  <track.icon className="size-6" aria-hidden="true" />
                </span>
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
                        className="flex items-center gap-1.5 rounded-full border border-taxi/30 px-3 py-1 text-sm text-white"
                      >
                        <MapPin
                          className="size-3.5 text-taxi"
                          aria-hidden="true"
                        />
                        {venue.name}{' '}
                        <span className="text-white/45">{venue.note}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>
        <SeasonCalendar />
        <div className="relative mt-20 overflow-hidden rounded-xl bg-main text-black">
          <TyreMarks className="text-black/[0.1]" />
          <div className="relative grid gap-6 p-8 md:grid-cols-[1fr_1.3fr] md:items-center md:p-14">
            <p className="text-5xl font-black uppercase italic leading-[0.88] tracking-tighter md:text-6xl">
              Повече от състезания
            </p>
            <p className="text-lg leading-relaxed text-black/85 md:text-xl">
              Видимост за партньорите на рали етапите и на автомобилните събития
              с публика — чрез брандиране на автомобила, съдържание за
              социалните мрежи и директен контакт с феновете.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  )
}
