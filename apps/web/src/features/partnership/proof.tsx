import { cn } from '@danirusev/ui/lib/utils'
import { PARTNERSHIP_ASSETS as A, D2_VIDEO } from './content'
import { CountUp, Photo, Reveal, Slide, SlideHead, shell } from './ui'
import { YoutubeEmbed } from './youtube-embed'

const PORTRAIT = [600, 1200] as const

export function Proof() {
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

        <article className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-[1.25fr_1fr] gap-4">
              <Reveal className="aspect-[4/5] overflow-hidden rounded-xl bg-slate-900">
                <Photo
                  src={A.campaign}
                  alt={A.campaignAlt}
                  widths={PORTRAIT}
                  sizes="(min-width: 1024px) 32vw, 55vw"
                />
              </Reveal>
              <Reveal
                delay={0.15}
                className="mt-16 aspect-[4/5] self-start overflow-hidden rounded-xl bg-slate-900"
              >
                <Photo
                  src={A.campaignWide}
                  alt={A.campaignWideAlt}
                  widths={PORTRAIT}
                  sizes="(min-width: 1024px) 26vw, 45vw"
                />
              </Reveal>
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
              <CountUp
                value={10}
                className="text-[9rem] font-black italic leading-[0.75] tracking-tighter text-main md:text-[12rem]"
              />
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
          <span className="text-taxi">Реално преживяване.</span>{' '}
          <span className="text-rent">Автентично съдържание.</span>{' '}
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
            <figure className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: A.d2Set, alt: A.d2SetAlt },
                  { src: A.d2Cars, alt: A.d2CarsAlt },
                ].map((photo, index) => (
                  <div
                    key={photo.src}
                    className={cn(
                      'group aspect-[4/3] overflow-hidden rounded-xl bg-slate-900',
                    )}
                  >
                    <Photo
                      src={photo.src}
                      alt={photo.alt}
                      widths={PORTRAIT}
                      sizes="(min-width: 1024px) 28vw, 50vw"
                      className={cn(
                        'transition-transform duration-700 group-hover:scale-105',
                        index === 0 ? 'object-[center_60%]' : 'object-center',
                      )}
                    />
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 text-sm text-white/50">
                Зад кадър: снимачният ден в A1 Motor Park
              </figcaption>
            </figure>
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
