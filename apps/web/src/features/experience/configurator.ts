import type {
  ConfigInput,
  Configurator,
  PublicBlockedDates,
} from '@/lib/echoray/types'

/**
 * Client-side mirror of Echoray's configurator rules
 * (echoray.io packages/commerce/src/configurator.ts, `evaluateConfiguration`),
 * restricted to a live price preview: it never throws, it reports problems.
 * Checkout (when payments return) re-evaluates on the server; this is display only.
 */

export type Answers = Readonly<Record<string, string>>

/** How the legacy page groups an input: single-choice cards, a duration grid, toggles, fields. */
export type InputRole =
  | 'voucher'
  | 'location'
  | 'duration'
  | 'choice'
  | 'standard'
  | 'text'
  | 'date'
  | 'unsupported'

export function inputRole(input: ConfigInput): InputRole {
  if (input.kind === 'choice' || input.kind === 'colour') {
    if (input.key === 'voucher' || input.choices?.some((c) => c.digital))
      return 'voucher'
    if (input.key === 'location' || input.choices?.some((c) => c.venue))
      return 'location'
    if (input.key === 'duration') return 'duration'
    return 'choice'
  }
  if (input.kind === 'toggle') return 'standard'
  if (input.kind === 'text' || input.kind === 'message') return 'text'
  if (input.kind === 'date') return 'date'
  return 'unsupported'
}

/** Whether an input shows for these answers (conditions only look at earlier inputs). */
export function inputVisible(input: ConfigInput, answers: Answers) {
  return (
    !input.showWhen ||
    input.showWhen.values.includes(answers[input.showWhen.key] ?? '')
  )
}

/**
 * The legacy fresh-client selection: the free voucher (else the first),
 * the first location and the first duration; toggles start off.
 */
export function defaultAnswers(spec: Configurator): Record<string, string> {
  const answers: Record<string, string> = {}
  for (const input of spec.inputs) {
    const choices = input.choices ?? []
    const first = choices[0]
    if (!first) continue
    const role = inputRole(input)
    if (role === 'voucher')
      answers[input.key] = (choices.find((c) => c.amount === 0) ?? first).value
    else if (role === 'location' || role === 'duration' || input.required)
      answers[input.key] = first.value
  }
  return answers
}

const DAY = 86_400_000
const dayNumber = (iso: string) =>
  Date.UTC(
    Number(iso.slice(0, 4)),
    Number(iso.slice(5, 7)) - 1,
    Number(iso.slice(8, 10)),
  ) / DAY

export function isIsoDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false
  const d = new Date(`${iso}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso
}

/** Local calendar day as YYYY-MM-DD (what the date picker shows). */
export function localIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/**
 * Mirrors Echoray's `dateProblem`. The server allows a day of slack each side for
 * time zones; the picker passes `slack = 0` so it only offers days inside the window.
 */
export function dateAllowed(
  input: ConfigInput,
  iso: string,
  today: string,
  slack = 1,
) {
  if (!isIsoDate(iso)) return false
  const offset = dayNumber(iso) - dayNumber(today)
  if (offset < (input.minDays ?? 0) - slack) return false
  if (offset > (input.maxDays ?? 730) + slack) return false
  return !input.disabledWeekdays?.includes(
    new Date(`${iso}T00:00:00Z`).getUTCDay(),
  )
}

/** Mirrors Echoray's `dateOpen` (packages/commerce/src/calendar.ts, release `commerce-calendar`). */
export function dateOpen(
  blocked: PublicBlockedDates | null | undefined,
  date: string,
  venue?: string,
) {
  if (!blocked) return true
  if (blocked.dates.includes(date)) return false
  return (
    !venue ||
    !blocked.venues.some((x) => x.venue === venue && x.dates.includes(date))
  )
}

/** The venue of the chosen option that names one (first visible choice input), as Echoray's `lineDate`. */
export function chosenVenue(spec: Configurator, answers: Answers) {
  for (const input of spec.inputs) {
    if (
      (input.kind !== 'choice' && input.kind !== 'colour') ||
      !inputVisible(input, answers)
    )
      continue
    const venue = input.choices?.find(
      (c) => c.value === answers[input.key],
    )?.venue
    if (venue) return venue
  }
  return undefined
}

/** Whether the picker offers a day: inside the input's window and, for calendar-bound inputs, not blocked. */
export function dayAvailable(
  spec: Configurator,
  input: ConfigInput,
  answers: Answers,
  iso: string,
  today: string,
  blocked: PublicBlockedDates | null | undefined,
  slack = 1,
) {
  if (!dateAllowed(input, iso, today, slack)) return false
  return (
    !input.availability || dateOpen(blocked, iso, chosenVenue(spec, answers))
  )
}

export type Evaluation = {
  /** Sum of the answered inputs' amounts and pricing rules, minor units. */
  surcharge: number
  /** Inputs that count, in configurator order, with what they add. */
  lines: { key: string; label: string; display: string; amount: number }[]
  /** A chosen option ships nothing (e.g. the digital voucher). */
  digital: boolean
  /** Required inputs still unanswered or answers outside the rules. */
  problems: string[]
}

// biome-ignore lint/suspicious/noControlCharactersInRegex: mirrors Echoray's single-line text rule.
const CONTROL = /[\u0000-\u001f]/

export function evaluate(
  spec: Configurator,
  answers: Answers,
  today: string,
  blocked?: PublicBlockedDates | null,
): Evaluation {
  const lines: Evaluation['lines'] = []
  const problems: string[] = []
  let surcharge = 0
  let characters = 0
  let rows = 0
  let digital = false
  for (const input of spec.inputs) {
    const value = (answers[input.key] ?? '').trim()
    if (!inputVisible(input, answers)) continue
    if (!value || (input.kind === 'toggle' && value === 'no')) {
      if (input.required && input.kind !== 'toggle')
        problems.push(`${input.label} is required.`)
      continue
    }
    let display = value
    let amount =
      input.kind === 'choice' || input.kind === 'colour'
        ? 0
        : (input.amount ?? 0)
    switch (input.kind) {
      case 'choice':
      case 'colour': {
        const choice = input.choices?.find((c) => c.value === value)
        if (!choice) {
          problems.push(`${input.label}: choose one of the options.`)
          continue
        }
        display = choice.label
        amount = choice.amount
        if (choice.digital) digital = true
        break
      }
      case 'text':
      case 'message': {
        if (input.maxLength !== undefined && value.length > input.maxLength) {
          problems.push(
            `${input.label}: use at most ${input.maxLength} characters.`,
          )
          continue
        }
        if (input.kind === 'text' && CONTROL.test(value)) {
          problems.push(`${input.label}: use a single line.`)
          continue
        }
        characters += value.replace(/\s/g, '').length
        rows += value.split('\n').length
        break
      }
      case 'toggle':
        if (value !== 'yes') {
          problems.push(`${input.label}: answer yes or no.`)
          continue
        }
        display = 'Yes'
        break
      case 'date':
        if (!dayAvailable(spec, input, answers, value, today, blocked)) {
          problems.push(`${input.label}: choose another date.`)
          continue
        }
        break
      default:
        // Kinds this storefront does not render (uploads, sizes, numbers).
        continue
    }
    surcharge += amount
    lines.push({ key: input.key, label: input.label, display, amount })
  }
  const hasText = spec.inputs.some(
    (i) => i.kind === 'text' || i.kind === 'message',
  )
  const variables = new Map<string, number>(
    hasText
      ? [
          ['characters', characters],
          ['lines', rows],
        ]
      : [],
  )
  for (const rule of spec.pricing)
    if (rule.kind === 'per' && rule.variable)
      surcharge += Math.round(rule.amount * (variables.get(rule.variable) ?? 0))
  for (const rule of spec.pricing)
    if (rule.kind === 'minimum' && lines.length)
      surcharge = Math.max(surcharge, rule.amount)
  return { surcharge, lines, digital, problems }
}

/** Euro amount the way the legacy page prints it: whole euros without decimals. */
export function formatAmount(minor: number) {
  const major = minor / 100
  return Number.isInteger(major)
    ? String(major)
    : major.toFixed(2).replace('.', ',')
}
