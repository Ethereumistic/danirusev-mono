import {
  ArrowLeftRight,
  Baby,
  Building2,
  Cake,
  Car,
  CarTaxiFront,
  ChartArea,
  CircleDot,
  CircleDotDashed,
  CircleGauge,
  CircleParking,
  Clock,
  Disc,
  Flag,
  Gauge,
  Gem,
  Gift,
  Infinity as InfinityIcon,
  type LucideIcon,
  MapPin,
  PartyPopper,
  RectangleCircle,
  Smartphone,
  Sparkle,
  Video,
} from 'lucide-react'
import type { IconName, ThemeColor } from './presentation'

// Literal class names so Tailwind detects every theme variant.
const themes = {
  taxi: {
    text: 'text-taxi',
    bg: 'bg-taxi',
    bgFaded: 'bg-taxi/10',
    border: 'border-taxi',
    borderFaded: 'border-taxi/30',
    hover: 'hover:bg-taxi/90',
  },
  rent: {
    text: 'text-rent',
    bg: 'bg-rent',
    bgFaded: 'bg-rent/10',
    border: 'border-rent',
    borderFaded: 'border-rent/30',
    hover: 'hover:bg-rent/90',
  },
  mix: {
    text: 'text-mix',
    bg: 'bg-mix',
    bgFaded: 'bg-mix/10',
    border: 'border-mix',
    borderFaded: 'border-mix/30',
    hover: 'hover:bg-mix/90',
  },
  event: {
    text: 'text-event',
    bg: 'bg-event',
    bgFaded: 'bg-event/10',
    border: 'border-event',
    borderFaded: 'border-event/30',
    hover: 'hover:bg-event/90',
  },
  day: {
    text: 'text-day',
    bg: 'bg-day',
    bgFaded: 'bg-day/10',
    border: 'border-day',
    borderFaded: 'border-day/30',
    hover: 'hover:bg-day/90',
  },
  main: {
    text: 'text-main',
    bg: 'bg-main',
    bgFaded: 'bg-main/10',
    border: 'border-main',
    borderFaded: 'border-main/30',
    hover: 'hover:bg-main/90',
  },
} as const satisfies Record<ThemeColor, Record<string, string>>

export type ThemeClasses = (typeof themes)[ThemeColor]

export function themeClasses(theme: ThemeColor): ThemeClasses {
  return themes[theme]
}

const icons: Record<IconName, LucideIcon> = {
  CarTaxiFront,
  Car,
  Gauge,
  PartyPopper,
  Flag,
  Clock,
  MapPin,
  Cake,
  Baby,
  Gem,
  Building2,
  Sparkle,
  RectangleCircle,
  CircleParking,
  CircleGauge,
  CircleDotDashed,
  CircleDot,
  ArrowLeftRight,
  Infinity: InfinityIcon,
  ChartArea,
}

export function iconFor(name: IconName): LucideIcon {
  return icons[name]
}

/** The legacy `getAddonIcon` keyword rules, by label and input role. */
export function addonIcon(label: string, role: string): LucideIcon | null {
  const name = label.toLowerCase()
  if (name.includes('дигитален')) return Smartphone
  if (
    name.includes('gopro') ||
    name.includes('заснемане') ||
    name.includes('видео')
  )
    return Video
  if (name.includes('гуми')) return Disc
  if (role === 'voucher') return Gift
  if (role === 'duration') return Clock
  if (role === 'location') return MapPin
  if (name.includes('ваучер') || name.includes('voucher')) return Gift
  if (name.includes('време') || name.includes('минути') || name.includes('час'))
    return Clock
  if (name.includes('локация') || name.includes('писта')) return MapPin
  return null
}
