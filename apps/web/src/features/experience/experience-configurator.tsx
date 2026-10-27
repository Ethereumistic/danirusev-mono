import { Calendar } from '@danirusev/ui/components/calendar'
import { Card, CardContent } from '@danirusev/ui/components/card'
import { Input } from '@danirusev/ui/components/input'
import { cn } from '@danirusev/ui/lib/utils'
import { CalendarDays, Check, Info, PenLine } from 'lucide-react'
import type { ReactNode } from 'react'
import type {
  ConfigInput,
  Configurator,
  InputChoice,
  PublicBlockedDates,
} from '@/lib/echoray/types'
import {
  type Answers,
  dayAvailable,
  formatAmount,
  type InputRole,
  inputRole,
  inputVisible,
  localIso,
} from './configurator'
import { addonIcon, type ThemeClasses } from './theme'

type Props = {
  slug: string
  configurator: Configurator
  answers: Answers
  onAnswer: (key: string, value: string) => void
  theme: ThemeClasses
  today: string
  blockedDates: PublicBlockedDates | null
}

/** Card base of the shared Card primitive, as a button so selection is keyboard reachable. */
const cardBase =
  'bg-card text-card-foreground flex w-full flex-col gap-6 rounded-xl border py-6 shadow-sm text-left'

function SelectedMark({ theme }: { theme: ThemeClasses }) {
  return (
    <div
      className={cn(
        'absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center',
        theme.bg,
      )}
    >
      <Check className="h-3 w-3 text-black font-bold" />
    </div>
  )
}

function ItemCard({
  label,
  description,
  amount,
  inputKind,
  selected,
  compact,
  theme,
  onClick,
}: {
  label: string
  description?: string
  amount: number
  inputKind: InputRole
  selected: boolean
  compact: boolean
  theme: ThemeClasses
  onClick: () => void
}) {
  const Icon = addonIcon(label, inputKind)
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        cardBase,
        'relative cursor-pointer transition-all duration-300 bg-slate-900 border-2 hover:scale-[1.02] hover:shadow-lg',
        selected
          ? `${theme.border} ${theme.bgFaded}`
          : 'border-slate-800 hover:border-slate-700',
      )}
    >
      {selected && <SelectedMark theme={theme} />}
      <span className="p-4 flex items-center gap-4 w-full">
        {Icon && (
          <span
            className={cn(
              'p-3 rounded-xl flex-shrink-0',
              selected ? theme.bgFaded : 'bg-slate-800',
            )}
          >
            <Icon
              className={cn(
                'h-6 w-6',
                selected ? theme.text : 'text-slate-400',
              )}
            />
          </span>
        )}
        <span className="flex-1">
          <span
            className={cn(
              'block font-bold text-base',
              !compact && 'mb-1',
              selected ? 'text-white' : 'text-slate-300',
            )}
          >
            {label}
          </span>
          {description && !compact && (
            <span className="block text-xs text-slate-500">{description}</span>
          )}
        </span>
        {amount > 0 && (
          <span
            className={cn(
              'text-lg sm:text-xl font-black',
              selected ? theme.text : 'text-slate-400',
            )}
          >
            +{formatAmount(amount)} €
          </span>
        )}
      </span>
    </button>
  )
}

function DurationGrid({
  input,
  answers,
  onAnswer,
  theme,
  compact,
}: {
  input: ConfigInput
  answers: Answers
  onAnswer: Props['onAnswer']
  theme: ThemeClasses
  compact: boolean
}) {
  return (
    <div className={cn('grid grid-cols-3 gap-2', !compact && 'sm:col-span-2')}>
      {(input.choices ?? []).map((choice) => {
        const selected = answers[input.key] === choice.value
        return (
          <button
            type="button"
            key={choice.value}
            aria-pressed={selected}
            onClick={() => onAnswer(input.key, choice.value)}
            className={cn(
              cardBase,
              'relative cursor-pointer transition-all duration-300 bg-slate-900 border-2 py-4 px-2 h-full flex flex-col hover:scale-[1.02] hover:shadow-lg text-center',
              selected
                ? `${theme.border} ${theme.bgFaded}`
                : 'border-slate-800 hover:border-slate-700',
            )}
          >
            {selected && <SelectedMark theme={theme} />}
            <span className="flex flex-1 items-center justify-center">
              <span
                className={cn(
                  'font-bold text-sm uppercase tracking-tight',
                  selected ? 'text-white' : 'text-slate-400',
                )}
              >
                {choice.label}
              </span>
            </span>
            <span
              className={cn(
                'text-[10px] sm:text-xs font-black mt-auto',
                selected ? theme.text : 'text-slate-500',
              )}
            >
              +{formatAmount(choice.amount)} €
            </span>
          </button>
        )
      })}
    </div>
  )
}

function FieldCard({
  active,
  theme,
  icon,
  title,
  children,
  id,
}: {
  active: boolean
  theme: ThemeClasses
  icon: ReactNode
  title: ReactNode
  children: ReactNode
  id?: string
}) {
  return (
    <Card
      id={id}
      className={cn(
        'bg-slate-900 border-2',
        active ? `${theme.border} ${theme.bgFaded}` : 'border-slate-800',
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              'p-3 rounded-xl',
              active ? theme.bgFaded : 'bg-slate-800',
            )}
          >
            {icon}
          </div>
          <div>{title}</div>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

/**
 * The legacy add-on block (experience-additional-items.tsx) driven by an Echoray
 * configurator: toggles as independent cards, voucher/location as single-choice
 * compact cards, the duration grid, then the recipient name and preferred date.
 */
export function ExperienceConfigurator({
  slug,
  configurator,
  answers,
  onAnswer,
  theme,
  today,
  blockedDates,
}: Props) {
  const inputs = configurator.inputs.filter((input) =>
    inputVisible(input, answers),
  )
  const byRole = (role: InputRole) =>
    inputs.filter((input) => inputRole(input) === role)
  const standard = byRole('standard')
  const singleChoice: { input: ConfigInput; choice: InputChoice }[] = [
    ...byRole('voucher'),
    ...byRole('location'),
    ...byRole('choice'),
  ].flatMap((input) =>
    (input.choices ?? []).map((choice) => ({ input, choice })),
  )
  const durations = byRole('duration')
  const texts = byRole('text')
  const dates = byRole('date')
  const odd = singleChoice.length % 2 !== 0

  const durationGrids = (compact: boolean) =>
    durations.map((input) => (
      <DurationGrid
        key={input.key}
        input={input}
        answers={answers}
        onAnswer={onAnswer}
        theme={theme}
        compact={compact}
      />
    ))

  return (
    <div className="space-y-4">
      {standard.map((input) => {
        const selected = answers[input.key] === 'yes'
        return (
          <ItemCard
            key={input.key}
            label={input.label}
            description={input.hint}
            amount={input.amount ?? 0}
            inputKind="standard"
            selected={selected}
            compact={false}
            theme={theme}
            onClick={() => onAnswer(input.key, selected ? '' : 'yes')}
          />
        )
      })}

      {singleChoice.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {singleChoice.map(({ input, choice }) => (
            <ItemCard
              key={`${input.key}-${choice.value}`}
              label={choice.label}
              amount={choice.amount}
              inputKind={inputRole(input)}
              selected={answers[input.key] === choice.value}
              compact
              theme={theme}
              onClick={() => onAnswer(input.key, choice.value)}
            />
          ))}
          {odd ? durationGrids(true) : durationGrids(false)}
        </div>
      ) : (
        durationGrids(false)
      )}

      {texts.map((input) => {
        const value = answers[input.key] ?? ''
        const id = `${input.key}-${slug}`
        const max = input.maxLength ?? 100
        return (
          <FieldCard
            key={input.key}
            active={value.trim().length > 0}
            theme={theme}
            icon={
              <PenLine
                className={cn(
                  'h-6 w-6',
                  value.trim() ? theme.text : 'text-slate-400',
                )}
              />
            }
            title={
              <label
                htmlFor={id}
                className={cn(
                  'font-bold text-base',
                  value.trim() ? 'text-white' : 'text-slate-300',
                )}
              >
                {input.label}
              </label>
            }
          >
            <div className="flex justify-end mb-2">
              <span className="text-[10px] text-slate-500 font-bold">
                {value.length}/{max}
              </span>
            </div>
            <Input
              id={id}
              type="text"
              maxLength={max}
              autoComplete="off"
              placeholder="Име на получателя (по избор)"
              value={value}
              onChange={(event) =>
                onAnswer(input.key, event.target.value.slice(0, max))
              }
              className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 focus:border-main h-10"
            />
          </FieldCard>
        )
      })}

      {dates.map((input) => {
        const value = answers[input.key] ?? ''
        return (
          <FieldCard
            key={input.key}
            id={`date-selector-${slug}`}
            active={Boolean(value)}
            theme={theme}
            icon={
              <CalendarDays
                className={cn('h-6 w-6', value ? theme.text : 'text-slate-400')}
              />
            }
            title={
              <>
                <h4
                  className={cn(
                    'font-bold text-base',
                    value ? 'text-white' : 'text-slate-300',
                  )}
                >
                  {input.label}
                </h4>
                {value && (
                  <p className={cn('text-sm font-semibold', theme.text)}>
                    {new Date(value).toLocaleDateString('bg-BG', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </>
            }
          >
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={value ? new Date(`${value}T00:00:00`) : undefined}
                onSelect={(date) =>
                  onAnswer(input.key, date ? localIso(date) : '')
                }
                disabled={(date) =>
                  !dayAvailable(
                    configurator,
                    input,
                    answers,
                    localIso(date),
                    today,
                    blockedDates,
                    0,
                  )
                }
                className="rounded-md border border-slate-700 p-3 [--cell-size:--spacing(8)]"
              />
            </div>
            {input.hint && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-slate-800 border border-slate-700">
                <Info className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">{input.hint}</p>
              </div>
            )}
          </FieldCard>
        )
      })}
    </div>
  )
}
