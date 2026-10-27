import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@danirusev/ui/components/card'
import { cn } from '@danirusev/ui/lib/utils'
import {
  Car,
  CheckCircle2,
  Clock,
  Disc,
  Gauge,
  MapPin,
  XCircle,
} from 'lucide-react'
import type { ExperienceDetail } from './model'
import { iconFor, type ThemeClasses } from './theme'

export function ExperienceStatsGrid({
  stats,
  theme,
}: {
  stats: ExperienceDetail['stats']
  theme: ThemeClasses
}) {
  const tiles = [
    { label: 'Време', value: stats.duration, Icon: Clock, nowrap: true },
    { label: 'Автомобил', value: stats.car, Icon: Car, nowrap: true },
    { label: 'Мощност', value: stats.power, Icon: Gauge, nowrap: false },
    { label: 'Гуми', value: stats.tires, Icon: Disc, nowrap: false },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {tiles.map(({ label, value, Icon, nowrap }) => (
        <Card
          key={label}
          className="bg-slate-900 border-slate-800 shadow-lg aspect-square items-center justify-center"
        >
          <CardContent className="flex flex-col items-center justify-center text-center ">
            <Icon className={cn('w-8 h-8 mb-2', theme.text)} />
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              {label}
            </span>
            <span
              className={cn(
                'text-base md:text-lg font-bold text-white',
                nowrap && 'text-nowrap',
              )}
            >
              {value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function ExperienceProgram({
  program,
  locationLabel,
  theme,
}: {
  program: ExperienceDetail['program']
  locationLabel: string | null
  theme: ThemeClasses
}) {
  return (
    <div className="space-y-6">
      <ol className="relative border-l border-slate-800 ml-3 space-y-8 py-2">
        {program.map((item) => {
          const Icon = item.icon ? iconFor(item.icon) : Clock
          return (
            <li
              key={`${item.time}-${item.activity}`}
              className="relative pl-8 group"
            >
              <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-600 transition-colors ring-4 ring-slate-950" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full w-fit border border-slate-700">
                  <Icon className={cn('w-3 h-3', theme.text)} />
                  <span className="text-xs font-mono text-white font-bold">
                    {item.time}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  {item.activity}
                </h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                {item.description}
              </p>
            </li>
          )
        })}
      </ol>
      <div
        className={cn(
          'p-4 rounded-xl bg-slate-900 border-2 border-slate-800',
          theme.bgFaded,
        )}
      >
        <div className="flex items-start gap-3">
          <div className="bg-slate-800 p-2 rounded-lg">
            <MapPin className={cn('h-5 w-5', theme.text)} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Локация</h4>
            <p className="text-xs text-slate-400">
              {locationLabel ?? 'Моля, свържете се с нас за информация'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExperienceIncluded({
  included,
  notIncluded,
  theme,
}: {
  included: readonly string[]
  notIncluded: readonly string[]
  theme: ThemeClasses
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {included.length > 0 && (
        <Card className="border-slate-800 bg-slate-900/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className={cn('h-6 w-6', theme.text)} />
              Цената включва
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2
                    className={cn('h-4 w-4 mt-0.5 shrink-0', theme.text)}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {notIncluded.length > 0 && (
        <Card className="border-slate-800 bg-slate-900/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-500" />
              Цената не включва
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {notIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
