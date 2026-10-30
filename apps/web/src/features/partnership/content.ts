import {
  Briefcase,
  CalendarDays,
  Clapperboard,
  Flag,
  Globe2,
  type LucideIcon,
  Medal,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react'

/**
 * Copy and figures for the private sponsorship presentation at /partnership.
 * Audience numbers are the ones Dani supplied for the 2027 pitch; update them
 * here (with the date) before sending the link to a new partner.
 */

export const STAGES = [
  { id: 'start', marker: 'Старт', label: 'Заедно към Европа' },
  { id: 'pilot', marker: 'СЕ1', label: 'Пилотът' },
  { id: 'season', marker: 'СЕ2', label: 'Сезон 2027' },
  { id: 'audience', marker: 'СЕ3', label: 'Аудитория' },
  { id: 'proof', marker: 'СЕ4', label: 'Реализирани проекти' },
  { id: 'brand', marker: 'СЕ5', label: 'Бранд присъствие' },
  { id: 'academy', marker: 'СЕ6', label: 'За вашия екип' },
  { id: 'finish', marker: 'Финиш', label: 'Контакт' },
] as const

export type StageId = (typeof STAGES)[number]['id']

export const stageOf = (id: StageId) => {
  const stage = STAGES.find((item) => item.id === id)
  if (!stage) throw new Error(`Unknown stage ${id}`)
  return stage
}

/** The three brand accents of the site, used to colour-code parallel items. */
export type Accent = 'taxi' | 'rent' | 'main'

export const PILOT_FACTS: readonly {
  title: string
  detail: string
  icon: LucideIcon
  accent: Accent
}[] = [
  {
    title: 'Вицешампион',
    detail: 'по рали спринт, сезон 2023',
    icon: Medal,
    accent: 'taxi',
  },
  {
    title: 'Шампион',
    detail: 'на България по гимкхана',
    icon: Trophy,
    accent: 'main',
  },
  {
    title: 'Каскадьор',
    detail: 'в кино и музикални продукции',
    icon: Clapperboard,
    accent: 'rent',
  },
]

/** Suzuki Swift Sport rally photos (-800/-1600 webp, 16:9). */
export const RALLY_GALLERY = [
  {
    src: '/partnership/rally-swift-ntracing',
    alt: 'Suzuki Swift Sport атакува завой на асфалтов етап',
  },
  {
    src: '/partnership/rally-suzuki-action',
    alt: 'Suzuki Swift Sport с номер 17 минава през село по време на рали',
  },
  {
    src: '/partnership/rally-swift-mural',
    alt: 'Автомобилът минава покрай стенопис с Васил Левски',
  },
  {
    src: '/partnership/rally-swift-crowd',
    alt: 'Suzuki Swift с номер 20 пред публиката на етапа',
  },
  {
    src: '/partnership/rally-swift-forest',
    alt: 'Suzuki Swift излиза от горски завой',
  },
  {
    src: '/partnership/rally-swift-side',
    alt: 'Страничен кадър на Suzuki Swift в движение',
  },
  {
    src: '/partnership/rally-swift-hill',
    alt: 'Suzuki Swift на етап с гуми и публика край трасето',
  },
  {
    src: '/partnership/rally-swift-pan',
    alt: 'Панорамен кадър на Suzuki Swift в градски етап',
  },
] as const

/** Files in public/partnership; photos have -800 and -1600 webp variants. */
export const PARTNERSHIP_ASSETS = {
  // Generated mood images (see output/partnership/research.md), captioned on the page.
  hero: '/partnership/gen-hero-dusk',
  heroMobile: '/partnership/gen-hero-dusk-mobile',
  heroAlt: 'Рали автомобил вдига прах на планински макадамов етап по залез',
  portrait: '/partnership/dani-portrait',
  portraitAlt: 'Дани Русев в състезателен гащеризон с каска в ръка',
  seasonBg: '/partnership/bg-redbull-drift',
  balkanDrive: '/partnership/balkan-drive-milena',
  balkanDriveAlt:
    'Милена Джоргова и Дани Русев в автомобила по време на Balkan Drive',
  // Portrait photos: -600/-1200 webp, 4:5.
  campaign: '/partnership/campaign-vivacom-flags',
  campaignAlt:
    'Дрифт автомобилът на Дани между флаговете на Vivacom и SkyShowtime на пистата',
  campaignWide: '/partnership/campaign-vivacom-wide',
  campaignWideAlt: 'Автомобилът и флаговете на кампанията на фона на планината',
  d2Set: '/partnership/d2-set',
  d2SetAlt: 'Снимачната площадка на клипа на D2 в A1 Motor Park',
  d2Cars: '/partnership/d2-a1-cars',
  d2CarsAlt: 'Автомобилите от клипа пред сградата на A1 Motor Park',
  livery: '/partnership/gen-livery-mockup',
  liveryAlt:
    'Илюстрация на съвременен рали автомобил с празни зони за лога на капака, вратата, покрива и задния калник',
  academy: '/partnership/academy-participants',
  academyAlt: 'Група участници позират с дрифт автомобила BMW на пистата',
  finish: '/partnership/drift-bmw-wide',
  vivacomLogo: '/partnership/vivacom-logo.svg',
  skyshowtimeLogo: '/partnership/skyshowtime-logo-white.svg',
  d2Logo: '/partnership/d2-logo-white.png',
  balkanDriveAvatar: '/partnership/balkan-drive-avatar.webp',
} as const

export const D2_VIDEO = {
  id: 'slJ5PQ-egv4',
  title: 'D2 x Deo — „Свобода“ (Official Video)',
  subtitle: 'D2 x Deo — „Свобода“, август 2026',
} as const

/** Published Balkan Drive episodes (YouTube IDs from the official channel). */
export const BALKAN_DRIVE_EPISODES = [
  { guest: 'Милена Джоргова', id: '0VWtZZFbaQ4' },
  { guest: 'DJ Mascota', id: '0lml4jTENX4' },
  { guest: 'Жанета Осипова', id: 'XsvNFaznVwg' },
  { guest: 'Радо Шишарката', id: 'SB9ZcKcpndU' },
  { guest: 'Рада Копрева', id: '8Hew4LZXWVc' },
  { guest: 'Костадин Щерев', id: '7Dex_h5Xp9A' },
] as const

export const BALKAN_DRIVE_CHANNEL = 'https://www.youtube.com/@BalkanDrive'

export type SeasonTrack = 'national' | 'europe' | 'events'

export const SEASON_TRACKS: readonly {
  id: SeasonTrack
  title: string
  body: string
  icon: LucideIcon
  accent: Accent
}[] = [
  {
    id: 'national',
    icon: Flag,
    accent: 'main',
    title: 'Национален рали шампионат',
    body: 'Основната цел е участие във всички кръгове на Българския рали шампионат — най-престижното ниво на рали състезанията у нас.',
  },
  {
    id: 'europe',
    icon: Globe2,
    accent: 'rent',
    title: 'Европейски състезания',
    body: 'При осигурен допълнителен бюджет — подбрани европейски кръгове и присъствие на проекта извън България.',
  },
  {
    id: 'events',
    icon: CalendarDays,
    accent: 'taxi',
    title: 'Автомобилът извън трасето',
    body: 'Състезателният автомобил и партньорските брандове на големите автомобилни събития в България.',
  },
]

export const EVENT_VENUES = [
  { name: 'A1 Motor Park', note: 'Самоков' },
  { name: 'Писта „Дракон“', note: 'Калояново' },
  { name: 'Jap Fest', note: 'септември' },
] as const

/** The racing season runs April–October; the strip shows only those months. */
export const MONTHS = ['Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт'] as const
export const FIRST_MONTH = 4

/**
 * The 2027 national calendar is not published yet (checked 30.10.2026). Rounds
 * follow the 2026 calendar; European rounds are 2026 FIA ERC/ERT dates.
 */
export const CALENDAR: readonly {
  name: string
  place: string
  month: number
  track: SeasonTrack
}[] = [
  { name: 'Дряново', place: 'Рали „Дряново“', month: 5, track: 'national' },
  { name: 'Пампорово', place: 'Рали „Пампорово“', month: 7, track: 'national' },
  { name: 'България', place: 'Рали „България“', month: 9, track: 'national' },
  { name: 'ДЕТ', place: 'Рали „ДЕТ“, Гърция', month: 9, track: 'national' },
  {
    name: 'Загреб',
    place: 'Zagreb Delta Rally, Хърватия',
    month: 6,
    track: 'europe',
  },
  {
    name: 'Рим',
    place: 'Rally di Roma Capitale, Италия',
    month: 7,
    track: 'europe',
  },
  {
    name: 'Нова Горица',
    place: 'Rally Nova Gorica, Словения',
    month: 9,
    track: 'europe',
  },
  {
    name: 'Jap Fest',
    place: 'Jap Fest, писта „Дракон“',
    month: 9,
    track: 'events',
  },
]

export const CALENDAR_NOTE =
  'Ориентир по календарите за 2026 г. Официалният календар за 2027 г. и участията предстои да бъдат потвърдени. Jap Fest 2027 е обявен за 11–12 септември.'

/** Public follower counts read on 30.10.2026. */
export const SOCIAL_REACH: readonly {
  platform: 'TikTok' | 'Facebook'
  account: string
  followers: number
  accent: Accent
}[] = [
  {
    platform: 'TikTok',
    account: 'Balkan Drive',
    followers: 16_604,
    accent: 'main',
  },
  {
    platform: 'Facebook',
    account: 'Balkan Drive',
    followers: 17_462,
    accent: 'rent',
  },
  {
    platform: 'Facebook',
    account: 'Дани Русев',
    followers: 14_845,
    accent: 'taxi',
  },
]
export const REACH_DATE = '30.10.2026'

export const TOTAL_FOLLOWERS = SOCIAL_REACH.reduce(
  (sum, item) => sum + item.followers,
  0,
)

export const MONTHLY_VIEWS = 300_000

export const formatCount = (value: number) =>
  new Intl.NumberFormat('bg-BG').format(value)

/** Where a partner appears across the season. */
export const TOUCHPOINTS = [
  {
    image: '/partnership/tp-car',
    alt: 'Логата на партньорите върху вратата на рали автомобила',
    title: 'Състезателният автомобил',
    body: 'Логото на партньора върху автомобила, позиционирано според партньорското ниво.',
  },
  {
    image: '/partnership/tp-team',
    alt: 'Екипът на DR11 с фен тениски около рали автомобила',
    title: 'Екипът',
    body: 'Гащеризоните на пилота и навигатора и фен тениските на отбора.',
  },
  {
    image: '/partnership/tp-digital',
    alt: 'Кадър от Balkan Drive с гост в автомобила',
    title: 'Дигитално съдържание',
    body: 'Интеграции във видеа, публикации и съдържание около състезанията и специалните проекти.',
  },
  {
    image: '/partnership/tp-paddock',
    alt: 'Брандирана шатра и флагове на партньор в сервизния парк',
    title: 'Сервизният парк',
    body: 'Рекламни материали в сервизния парк и бокса, според правилата на събитието.',
  },
  {
    image: '/partnership/tp-event',
    alt: 'Дрифт автомобилът пред брандирана арка на автомобилно събитие',
    title: 'Семплинг и активации',
    body: 'Продукти, семплинг и интерактивни активации на автомобилни събития и събори.',
  },
] as const

/** Advertising zones on the livery illustration, in percent of the image; labelStart puts the label before the pin. */
export const LIVERY_ZONES = [
  { name: 'Капак', x: 31, y: 47 },
  { name: 'Покрив', x: 61, y: 13 },
  { name: 'Врата', x: 66, y: 56 },
  { name: 'Заден калник', x: 87, y: 31, labelStart: true },
] as const

export const TIERS = ['Основен', 'Официален', 'Генерален'] as const

/** Which rights each example tier includes; final rights are negotiated per partner. */
export const TIER_RIGHTS: readonly {
  right: string
  tiers: readonly [boolean, boolean, boolean]
}[] = [
  { right: 'Лого на състезателния автомобил', tiers: [true, true, true] },
  { right: 'Присъствие в дигиталното съдържание', tiers: [true, true, true] },
  { right: 'Брандиране на екипировката', tiers: [false, true, true] },
  { right: 'Присъствие на събития и активации', tiers: [false, true, true] },
  {
    right: 'Приоритетно позициониране на автомобила, екипа и в съдържанието',
    tiers: [false, false, true],
  },
]

export const ACADEMY_SERVICES: readonly {
  title: string
  en: string
  body: string
  icon: LucideIcon
  accent: Accent
}[] = [
  {
    icon: Users,
    accent: 'main',
    title: 'Дрифт тиймбилдинг',
    en: 'Team building',
    body: 'Нестандартно корпоративно преживяване — адреналин, емоции и споделени моменти извън офиса.',
  },
  {
    icon: ShieldCheck,
    accent: 'rent',
    title: 'Практическо обучение по безопасно шофиране',
    en: 'Safe driving',
    body: 'Концентрация, контрол над автомобила и реакции в различни ситуации, съобразено с нивото на участниците.',
  },
  {
    icon: Briefcase,
    accent: 'taxi',
    title: 'Корпоративни преживявания',
    en: 'Corporate experiences',
    body: 'Индивидуални събития за служители, клиенти и партньори, с брандиране и посланията на компанията.',
  },
]

export const MARQUEE_WORDS = [
  'Рали',
  'Гимкхана',
  'Дрифт',
  'Balkan Drive',
  'Сезон 2027',
  'Европа',
] as const
