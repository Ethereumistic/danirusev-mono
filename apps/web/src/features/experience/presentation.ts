/**
 * Site-owned presentation for each experience: theme, header icon, top pattern
 * and the program timeline (times, activity names, icons). Echoray's product
 * file keeps only the program descriptions, so these come from the published
 * danirusev.com snapshot (docs/commerce/research/experiences.json, 2026-10-27).
 * An Echoray product without an entry here renders with the neutral theme.
 */

export type ThemeColor = 'taxi' | 'rent' | 'mix' | 'event' | 'day' | 'main'
export type PatternKey =
  | 'taxi-checker'
  | 'tyre-pattern'
  | 'mix'
  | 'event'
  | 'day'
export type IconName =
  | 'CarTaxiFront'
  | 'Car'
  | 'Gauge'
  | 'PartyPopper'
  | 'Flag'
  | 'Clock'
  | 'MapPin'
  | 'Cake'
  | 'Baby'
  | 'Gem'
  | 'Building2'
  | 'Sparkle'
  | 'RectangleCircle'
  | 'CircleParking'
  | 'CircleGauge'
  | 'CircleDotDashed'
  | 'CircleDot'
  | 'ArrowLeftRight'
  | 'Infinity'
  | 'ChartArea'

export type ProgramStep = {
  readonly time: string
  readonly activity: string
  /** Absent: the legacy default clock icon. */
  readonly icon?: IconName
}

export type ExperiencePresentation = {
  readonly theme: ThemeColor
  readonly pattern: PatternKey | null
  readonly icon: IconName
  readonly program: readonly ProgramStep[]
}

const presentations: Readonly<Record<string, ExperiencePresentation>> = {
  'drift-taxi': {
    theme: 'taxi',
    pattern: 'taxi-checker',
    icon: 'CarTaxiFront',
    program: [
      { time: '10 min', activity: 'Брифинг' },
      { time: '5 min', activity: 'Екипиране' },
      { time: '45 min', activity: 'Дрифт Сесия' },
    ],
  },
  'drift-rent': {
    theme: 'rent',
    pattern: 'tyre-pattern',
    icon: 'Car',
    program: [
      { time: '15 min', activity: 'Теория' },
      { time: '10 min', activity: 'Практика' },
      { time: '35 min', activity: 'Свободно каране' },
      { time: '60 min', activity: 'Финал' },
    ],
  },
  'drift-mix': {
    theme: 'mix',
    pattern: 'mix',
    icon: 'Gauge',
    program: [
      { time: '10 min', activity: 'Теория' },
      { time: '20 min', activity: 'Возене' },
      { time: '30 min', activity: 'Свободно каране' },
      { time: '60 min', activity: 'Финал' },
    ],
  },
  'drift-event': {
    theme: 'event',
    pattern: 'event',
    icon: 'PartyPopper',
    program: [
      { time: '1', activity: 'Рожден ден', icon: 'Cake' },
      // The legacy CMS names "BottleWine", which its lucide build lacks; the live site falls back to MapPin.
      { time: '2', activity: 'Ергенско или моминско парти', icon: 'MapPin' },
      { time: '3', activity: 'Gender Reveal', icon: 'Baby' },
      { time: '4', activity: 'Годеж и сватба', icon: 'Gem' },
      { time: '5', activity: 'TEAM BUILDING', icon: 'Building2' },
      { time: '6', activity: 'Личен повод с класа', icon: 'Sparkle' },
    ],
  },
  'drift-day': {
    theme: 'day',
    pattern: 'day',
    icon: 'Flag',
    program: [
      {
        time: '1',
        activity: 'Правилно позициониране в автомобила',
        icon: 'RectangleCircle',
      },
      {
        time: '2',
        activity: 'Спиране и работа с ръчната спирачка',
        icon: 'CircleParking',
      },
      { time: '3', activity: 'Работа с педала за газта', icon: 'CircleGauge' },
      {
        time: '4',
        activity: 'Тясна окръжност (донът)',
        icon: 'CircleDotDashed',
      },
      { time: '5', activity: 'Широка окръжност (донът)', icon: 'CircleDot' },
      { time: '6', activity: 'Транзишън', icon: 'ArrowLeftRight' },
      { time: '7', activity: 'Фигура 8 (осморка)', icon: 'Infinity' },
      { time: '8', activity: 'Разбор и анализ', icon: 'ChartArea' },
    ],
  },
}

const neutral: ExperiencePresentation = {
  theme: 'main',
  pattern: null,
  icon: 'Car',
  program: [],
}

export function presentationFor(slug: string): ExperiencePresentation {
  return presentations[slug] ?? neutral
}
