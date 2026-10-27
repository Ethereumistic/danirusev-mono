import { Button } from '@danirusev/ui/components/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@danirusev/ui/components/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@danirusev/ui/components/dialog'
import { cn } from '@danirusev/ui/lib/utils'
import {
  ArrowUpRight,
  Car,
  CarTaxiFront,
  Clock,
  Flag,
  Gauge,
  MapPin,
  PartyPopper,
} from 'lucide-react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as motion from 'motion/react-m'
import { useEffect, useState } from 'react'
import { Image } from '@/components/image'
import type { Experience, ThemeColor } from './data'

const themes = {
  taxi: {
    text: 'text-taxi',
    bg: 'bg-taxi',
    hover: 'hover:bg-taxi/90',
    faded: 'bg-taxi/10',
    border: 'border-taxi',
    shadow: 'shadow-[0_0_40px_-10px] shadow-taxi/40',
    icon: CarTaxiFront,
  },
  rent: {
    text: 'text-rent',
    bg: 'bg-rent',
    hover: 'hover:bg-rent/90',
    faded: 'bg-rent/10',
    border: 'border-rent',
    shadow: 'shadow-[0_0_40px_-10px] shadow-rent/40',
    icon: Car,
  },
  mix: {
    text: 'text-mix',
    bg: 'bg-mix',
    hover: 'hover:bg-mix/90',
    faded: 'bg-mix/10',
    border: 'border-mix',
    shadow: 'shadow-[0_0_40px_-10px] shadow-mix/40',
    icon: Gauge,
  },
  event: {
    text: 'text-event',
    bg: 'bg-event',
    hover: 'hover:bg-event/90',
    faded: 'bg-event/10',
    border: 'border-event',
    shadow: 'shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]',
    icon: PartyPopper,
  },
  day: {
    text: 'text-day',
    bg: 'bg-day',
    hover: 'hover:bg-day/90',
    faded: 'bg-day/10',
    border: 'border-day',
    shadow: 'shadow-[0_0_40px_-10px] shadow-day/40',
    icon: Flag,
  },
} satisfies Record<
  ThemeColor,
  {
    text: string
    bg: string
    hover: string
    faded: string
    border: string
    shadow: string
    icon: typeof Car
  }
>

export function ExperienceCatalog({
  experiences,
}: {
  experiences: readonly Experience[]
}) {
  const [selected, setSelected] = useState<Experience | null>(null)
  return (
    <section
      id="drift-experiences"
      className="py-24 px-4 scroll-mt-6 bg-slate-950 relative overflow-hidden"
      aria-labelledby="experiences-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-main/5 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            id="experiences-title"
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-4"
          >
            Избери Своя <span className="text-main">Адреналин</span>
          </h2>
          <p className="text-xl text-slate-400">
            От возене през специални събития до пълен контрол - имаме нещо за
            всеки
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.slug}
              experience={experience}
              onPreview={() => setSelected(experience)}
            />
          ))}
        </div>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="hidden lg:block w-full"
          aria-label="Дрифт преживявания"
        >
          <CarouselContent className="-ml-4 lg:-ml-3 p-2">
            {experiences.map((experience) => (
              <CarouselItem
                key={experience.slug}
                className="pl-4 md:pl-6 md:basis-1/2 lg:basis-[31%]"
              >
                <ExperienceCard
                  experience={experience}
                  onPreview={() => setSelected(experience)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12 bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-main/50 text-white" />
          <CarouselNext className="-right-12 bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-main/50 text-white" />
        </Carousel>
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="bg-slate-950 border border-slate-800 sm:max-w-lg p-8">
          {selected && (
            <>
              <DialogTitle className="text-3xl font-black uppercase italic">
                {selected.title}
              </DialogTitle>
              <DialogDescription className="text-slate-300 leading-relaxed">
                {selected.description}
              </DialogDescription>
              <Image
                src={selected.image}
                alt={selected.title}
                width={640}
                height={400}
                className="w-full h-48 object-cover rounded-xl"
              />
              <p className="text-sm text-slate-400">
                Онлайн резервациите предстоят. Свържи се с нас за актуална цена,
                дата и условия.
              </p>
              <a
                href="tel:+359882726020"
                className="bg-main text-black rounded-xl h-14 flex items-center justify-center font-black uppercase"
              >
                +359 88 272 6020
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
function ExperienceCard({
  experience,
  onPreview,
}: {
  experience: Experience
  onPreview: () => void
}) {
  const theme = themes[experience.theme]
  const Icon = theme.icon
  const [location, setLocation] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || experience.locations.length < 2) return
    const timer = setInterval(() => {
      if (!document.hidden)
        setLocation((index) => (index + 1) % experience.locations.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [experience.locations, reduced])
  const border =
    experience.theme === 'taxi'
      ? 'hover:border-dashed'
      : experience.theme === 'rent'
        ? 'hover:border-double'
        : 'hover:border-dotted'
  return (
    <article
      className={cn(
        'experience-reference-card group relative w-full max-w-[450px] mx-auto h-[550px] rounded-2xl overflow-hidden border hover:border-3 bg-slate-900 transition-all duration-300 hover:scale-[1.01] hover:z-30 transform-gpu',
        theme.border,
        border,
      )}
    >
      <div
        className={cn(
          'absolute top-4 right-4 z-30 bg-slate-950/90 backdrop-blur-md border border-slate-700/50 font-black text-xl px-4 py-2 rounded-lg',
          theme.text,
          theme.shadow,
        )}
      >
        {experience.price > 0 ? (
          <>
            {experience.price}
            <span className="text-xl ml-1 font-bold">€</span>
          </>
        ) : (
          <span className="text-lg uppercase">ПО ДОГОВАРЯНЕ</span>
        )}
      </div>
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/90 to-transparent opacity-90 z-10" />
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay',
            theme.faded,
          )}
        />
      </div>
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        <div className="mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
          <div
            className={cn(
              'inline-flex p-3 bg-slate-900 rounded-xl border-2',
              theme.border,
            )}
          >
            <Icon className={cn('w-8 h-8', theme.text)} aria-hidden="true" />
          </div>
        </div>
        <div className="space-y-2 mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
          <p
            className={cn(
              'font-bold tracking-widest uppercase text-sm',
              theme.text,
            )}
          >
            {experience.subtitle}
          </p>
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tight">
            {experience.title}
          </h3>
          <p className="text-slate-300 text-sm line-clamp-2">
            {experience.description}
          </p>
        </div>
        <div className="flex items-center gap-4 mb-6 text-slate-300 text-sm transform transition-transform duration-500 group-hover:-translate-y-2">
          <span className="flex items-center gap-1.5">
            <Clock className={cn('w-4 h-4', theme.text)} />
            <span className="text-nowrap">{experience.duration}</span>
          </span>
          <div className="w-1 h-1 bg-slate-700 rounded-full" />
          <span className="flex items-center gap-1.5 min-w-[80px]">
            <MapPin className={cn('w-4 h-4', theme.text)} />
            <AnimatePresence mode="wait">
              <motion.span
                key={location}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {experience.locations[location]}
              </motion.span>
            </AnimatePresence>
          </span>
          <div className="w-1 h-1 bg-slate-700 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Gauge className={cn('w-4 h-4', theme.text)} />
            <span className="text-nowrap">{experience.horsepower} HP</span>
          </span>
        </div>
        <Button
          className={cn(
            'w-full cursor-pointer font-extrabold uppercase tracking-wider h-14 text-lg rounded-xl group overflow-visible transition-all text-black after:absolute after:inset-0 after:z-20',
            theme.bg,
            theme.hover,
          )}
          aria-label={`Виж повече за ${experience.title}`}
          onClick={onPreview}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Виж Повече <ArrowUpRight className="w-5 h-5" />
          </span>
        </Button>
      </div>
    </article>
  )
}
