import { buttonVariants } from '@danirusev/ui/components/button'
import { cn } from '@danirusev/ui/lib/utils'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Quote } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Experience } from '@/features/landing/data'
import { ExperienceCatalog } from '@/features/landing/experience-catalog'
import { defaultAnswers, evaluate, localIso } from './configurator'
import { ExperienceBooking } from './experience-booking'
import { ExperienceConfigurator } from './experience-configurator'
import { ExperienceGallery } from './experience-gallery'
import {
  ExperienceIncluded,
  ExperienceProgram,
  ExperienceStatsGrid,
} from './experience-sections'
import { ExperienceTabs } from './experience-tabs'
import type { ExperienceDetail } from './model'
import { iconFor, themeClasses } from './theme'

export function ExperiencePage({
  experience,
  others,
}: {
  experience: ExperienceDetail
  others: readonly Experience[]
}) {
  const theme = themeClasses(experience.theme)
  const HeaderIcon = iconFor(experience.icon)
  const configurator = experience.configurator
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    configurator ? defaultAnswers(configurator) : {},
  )
  const [today] = useState(() => localIso(new Date()))
  const evaluation = useMemo(
    () =>
      configurator
        ? evaluate(configurator, answers, today, experience.blockedDates)
        : null,
    [configurator, answers, today, experience.blockedDates],
  )
  const onAnswer = (key: string, value: string) =>
    setAnswers((current) => ({ ...current, [key]: value }))

  const programLabel = experience.programLabel || 'Програма'
  const sections = [
    {
      id: 'program',
      label: programLabel,
      heading: programLabel,
      content: (
        <ExperienceProgram
          program={experience.program}
          locationLabel={experience.locationLabel}
          theme={theme}
        />
      ),
    },
    {
      id: 'included',
      label: 'Условия',
      heading: 'Какво е включено',
      content: (
        <ExperienceIncluded
          included={experience.included}
          notIncluded={experience.notIncluded}
          theme={theme}
        />
      ),
    },
    {
      id: 'additional',
      label: 'Допълнения',
      heading: 'Допълнителни опции',
      content:
        configurator && configurator.inputs.length > 0 ? (
          <ExperienceConfigurator
            slug={experience.slug}
            configurator={configurator}
            answers={answers}
            onAnswer={onAnswer}
            theme={theme}
            today={today}
            blockedDates={experience.blockedDates}
          />
        ) : (
          <p className="text-slate-400 text-center py-8 bg-slate-900/30 rounded-lg border border-slate-800 border-dashed">
            Няма налични допълнения за този пакет.
          </p>
        ),
    },
  ]

  return (
    <main id="main-content" className="flex-grow">
      <div className="min-h-screen bg-slate-950 pb-12 pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <Link
            to="/"
            hash="drift-experiences"
            onClick={(event) => {
              // The live site's BackButton returns to the previous page; a direct
              // visit (or no JavaScript) follows the link to the experience list.
              if (
                document.referrer.startsWith(window.location.origin) &&
                window.history.length > 1
              ) {
                event.preventDefault()
                window.history.back()
              }
            }}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-slate-400 hover:text-white group transition-opacity',
            )}
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Назад към преживявания
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={cn(
                'p-4 bg-slate-900 rounded-2xl border-2',
                theme.border,
              )}
            >
              <HeaderIcon className={cn('w-12 h-12', theme.text)} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tight text-white">
                {experience.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-5 space-y-2 lg:sticky lg:top-17.5 lg:self-start">
              <ExperienceGallery
                images={experience.images}
                title={experience.title}
                subtitle={experience.subtitle}
              />
              <ExperienceStatsGrid stats={experience.stats} theme={theme} />
            </div>

            <div className="lg:col-span-5 space-y-4">
              {experience.intro && (
                <div
                  className={cn(
                    'relative bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border-2 overflow-hidden group',
                    theme.borderFaded,
                  )}
                >
                  <Quote
                    className={cn(
                      'absolute -top-4 -right-4 w-32 h-32 opacity-5',
                      theme.text,
                    )}
                  />
                  <div className="relative z-10">
                    <p className="text-xl md:text-2xl font-medium text-white leading-relaxed italic">
                      "{experience.intro}"
                    </p>
                    <div
                      className={cn('mt-4 h-1 w-20 rounded-full', theme.bg)}
                    />
                  </div>
                </div>
              )}

              <ExperienceTabs sections={sections} theme={theme} />

              <ExperienceBooking
                experience={experience}
                answers={answers}
                evaluation={evaluation}
                theme={theme}
              />
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <ExperienceCatalog
            experiences={others}
            title="Още Преживявания"
            subtitle="Разгледайте и другите ни предложения"
          />
        )}
      </div>
    </main>
  )
}
