import { cn } from '@danirusev/ui/lib/utils'
import { Check, Minus } from 'lucide-react'
import {
  PARTNERSHIP_ASSETS as A,
  type Accent,
  LIVERY_ZONES,
  TIER_RIGHTS,
  TIERS,
  TOUCHPOINTS,
} from './content'
import { ACCENT, Photo, Reveal, Slide, SlideHead, shell } from './ui'

/** Entry, middle and top tier, in the order of TIERS. */
const TIER_ACCENT: readonly Accent[] = ['rent', 'taxi', 'main']

function Livery() {
  return (
    <div className="mx-auto mt-14 max-w-7xl px-0 sm:px-8 lg:px-12">
      <Reveal className="relative aspect-video overflow-hidden bg-slate-900 sm:rounded-xl">
        <figure className="h-full">
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
      </Reveal>
    </div>
  )
}

function Touchpoints() {
  return (
    <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
      {TOUCHPOINTS.map((point) => (
        <li
          key={point.title}
          className="group w-[72%] shrink-0 snap-start sm:w-auto"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-900">
            <Photo
              src={point.image}
              alt={point.alt}
              widths={[480, 960]}
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 72vw"
              className="transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-main transition-transform duration-500 group-hover:scale-x-100" />
            <h3 className="absolute inset-x-4 bottom-4 text-lg font-black uppercase italic leading-tight tracking-tight text-white">
              {point.title}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {point.body}
          </p>
        </li>
      ))}
    </ul>
  )
}

function Tiers() {
  return (
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
          <caption className="sr-only">Права по нива на партньорство</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="py-4 pr-4 align-bottom text-sm font-normal text-white/50"
              >
                Права
              </th>
              {TIERS.map((tier, index) => {
                const accent = ACCENT[TIER_ACCENT[index] ?? 'main']
                return (
                  <th
                    key={tier}
                    scope="col"
                    className="w-32 px-2 pb-4 text-center align-bottom md:w-44"
                  >
                    <span
                      className={cn(
                        'block rounded-t-xl border-t-4 px-3 pt-4 pb-3 text-lg font-black uppercase italic tracking-tight text-white',
                        accent.border,
                        accent.soft,
                      )}
                    >
                      {tier}
                      <span className="block text-xs font-normal normal-case not-italic tracking-normal text-white/50">
                        партньор
                      </span>
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {TIER_RIGHTS.map((row) => (
              <tr key={row.right} className="border-t border-white/10">
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
                        className={cn(
                          'mx-auto size-5',
                          ACCENT[TIER_ACCENT[index] ?? 'main'].text,
                        )}
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
  )
}

export function Brand() {
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
      <Livery />
      <div className={shell}>
        <Touchpoints />
        <Tiers />
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
