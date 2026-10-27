/**
 * Response shapes of Echoray Commerce's public catalog (version 2, `include=experience`)
 * and the voucher page query. Mirrored by hand from the private
 * `@echoray/commerce` validators (packages/commerce/src/public-catalog.ts,
 * configurator.ts, vouchers.ts in echoray.io); amounts are minor units.
 * Fields this storefront does not render are typed loosely on purpose.
 */

export type Currency = 'EUR' | 'USD' | 'GBP'
export type DisplayPreset = 'thumbnail' | 'card' | 'detail'

export type PublicImage = {
  originalUrl: string
  alt: string
  mediaId?: string
  version?: string
  width?: number
  height?: number
  derivatives: {
    preset: DisplayPreset
    path: string
    width: number
    height: number
  }[]
  credit?: { name: string; url: string }
}

export type PublicCardExperience = {
  type?: string
  inquiry?: { label: string }
}

export type PublicCardV2 = {
  id: string
  slug: string
  name: string
  collection: string
  material: string
  optionLabel: string
  minAmount: number
  maxAmount: number
  currency: Currency
  images: PublicImage[]
  experience?: PublicCardExperience
}

export type InputKind =
  | 'text'
  | 'message'
  | 'choice'
  | 'colour'
  | 'number'
  | 'dimensions'
  | 'size'
  | 'toggle'
  | 'photo'
  | 'file'
  | 'date'

export type InputChoice = {
  value: string
  label: string
  amount: number
  swatch?: string
  digital?: boolean
  venue?: string
}

export type ConfigInput = {
  key: string
  label: string
  kind: InputKind
  required: boolean
  hint?: string
  preset?: string
  maxLength?: number
  lines?: number
  choices?: InputChoice[]
  min?: number
  max?: number
  step?: number
  unit?: 'mm' | 'cm' | 'm'
  axes?: { min: number; max: number; step: number }[]
  amount?: number
  accept?: string[]
  maxBytes?: number
  minWidth?: number
  minHeight?: number
  minDays?: number
  maxDays?: number
  disabledWeekdays?: number[]
  /** Release `commerce-calendar`: the day must be free in the business calendar. */
  availability?: boolean
  showWhen?: { key: string; values: string[] }
}

export type PricingRule = {
  kind: 'per' | 'minimum'
  variable?: string
  amount: number
  label?: string
}

export type Configurator = {
  version: number
  inputs: ConfigInput[]
  pricing: PricingRule[]
  preview?: {
    kind: 'textOverlay'
    input: string
    x: number
    y: number
    size: number
    colour: string
  }
}

export type ProductAttribute = {
  key: string
  label: string
  preset?: string
  unit?: string
  values: string[]
}

/**
 * Release `commerce-calendar` (detail only, when a date input has `availability`):
 * `dates` are blocked at every venue, `venues[].dates` only at that venue key.
 */
export type PublicBlockedDates = {
  from: string
  to: string
  dates: string[]
  venues: { venue: string; dates: string[] }[]
}

export type PublicExperience = {
  type?: string
  attributes?: ProductAttribute[]
  categories?: { handle: string; name: string }[]
  configurator?: Configurator
  inquiry?: { label: string }
  blockedDates?: PublicBlockedDates
}

export type PublicVariant = {
  key: string
  label: string
  amount: number
  selections?: { dimensionId: string; valueId: string }[]
  offers?: { key: string; label: string; amount: number; recurring?: unknown }[]
  mode: 'stock' | 'made_to_order'
  unlimited?: boolean
  recurring?: unknown
  leadMinDays: number
  leadMaxDays: number
  methods: ('delivery' | 'pickup' | 'collection')[]
}

export type ProductPage = {
  headline: string
  labels: string[]
  faqs: { question: string; answer: string }[]
  photos: unknown[]
  banner?: unknown
  bannerImageId?: string
}

export type PublicDetailV2 = Omit<PublicCardV2, 'experience'> & {
  description: string
  specifications: { label: string; value: string }[]
  defaultVariant: string
  variants: PublicVariant[]
  options: unknown[]
  matrix?: unknown
  page?: ProductPage
  gallery: PublicImage[]
  related: PublicCardV2[]
  experience?: PublicExperience
}

export type CatalogErrorCode =
  | 'NOT_FOUND'
  | 'UNAVAILABLE'
  | 'INVALID_REQUEST'
  | 'RESTART_PAGINATION'
  | 'RATE_LIMITED'
  | 'ORIGIN_UNAVAILABLE'

type CatalogOk<Data> = {
  status: 'ok'
  version: 2
  storefrontId: string
  generatedAt: number
  data: Data
}
type CatalogFailure = {
  status: 'error'
  version: 1 | 2
  code: CatalogErrorCode
  message: string
}

export type ProductsResult =
  | CatalogOk<{ kind: 'products'; page: PublicCardV2[]; cursor: string | null }>
  | CatalogFailure
export type DetailResult =
  | CatalogOk<{ kind: 'detail'; product: PublicDetailV2 }>
  | CatalogFailure

/** `commerce/vouchers:voucherPage`: validity only, never customer data. */
export type VoucherState = 'active' | 'redeemed' | 'void' | 'expired'
export type PublicVoucher = {
  shopName: string
  typeName: string
  state: VoucherState
  /** YYYY-MM-DD */
  expiresOn: string
}

/** What the voucher page renders; `unconfigured` when the server has no integration secret. */
export type VoucherLookup =
  | { status: 'unconfigured' }
  | { status: 'not_found' }
  | { status: 'error' }
  | { status: 'found'; voucher: PublicVoucher }
