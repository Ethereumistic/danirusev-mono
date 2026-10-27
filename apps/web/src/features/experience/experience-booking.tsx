import { Button } from '@danirusev/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@danirusev/ui/components/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@danirusev/ui/components/dialog'
import { cn } from '@danirusev/ui/lib/utils'
import {
  Check,
  Copy,
  CreditCard,
  ExternalLink,
  MapPin,
  Phone,
  PhoneCall,
  ShoppingCart,
  Trophy,
  XIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  type Answers,
  type Evaluation,
  formatAmount,
  inputRole,
} from './configurator'
import type { ExperienceDetail } from './model'
import { ExperiencePattern } from './patterns'
import { addonIcon, type ThemeClasses } from './theme'

const PHONE = '+359882726020'

function Separator() {
  return <div role="none" className="bg-slate-800 shrink-0 h-px w-full" />
}

function CopyNumber({ number }: { number: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(number)
    } catch {
      // Clipboard API unavailable (insecure context): the legacy textarea fallback.
      const area = document.createElement('textarea')
      area.value = number
      area.setAttribute('readonly', '')
      area.style.position = 'absolute'
      area.style.left = '-9999px'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Копирай номера"
      className="flex items-center justify-center w-14 h-full min-h-[60px] rounded-xl bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all shrink-0"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-400" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
    </button>
  )
}

/**
 * The live site's temporary booking notice: online reservations are paused, so the
 * cart button only opens this call prompt. No cart, checkout or payment is called.
 */
function CallDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/50 supports-backdrop-filter:backdrop-blur-none duration-200"
        className="bg-slate-900 border border-slate-700 text-white max-w-sm sm:max-w-md w-[calc(100%-2rem)] rounded-2xl p-8 ring-0 shadow-lg gap-4 text-base duration-200"
      >
        <DialogHeader className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 bg-slate-800 rounded-full">
            <PhoneCall className="w-10 h-10 text-amber-400" />
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-black leading-tight text-white">
            Моля обадете се на телефон:
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-slate-400 font-medium">
            Временно онлайн резервациите не работят.
          </DialogDescription>
          <div className="flex items-center gap-2 w-full">
            <a
              href={`tel:${PHONE}`}
              className="flex-1 inline-flex items-center text-nowrap justify-center gap-3 px-6 py-4 rounded-xl bg-mix text-black font-black text-xl sm:text-2xl hover:bg-amber-300 transition-all hover:scale-105 shadow-lg shadow-amber-400/20"
            >
              <PhoneCall className="w-6 h-6 shrink-0" />
              +359 882726020
            </a>
            <CopyNumber number={PHONE} />
          </div>
        </DialogHeader>
        <DialogClose className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Затвори</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

/** Google Maps link from the location input's hint ("Google Maps: https://…"). */
function mapsUrl(hint: string | undefined) {
  const url = hint?.match(/https:\/\/\S+/)?.[0]
  return url &&
    /^https:\/\/(maps\.app\.goo\.gl|(www\.)?google\.[a-z.]+\/maps)\//.test(url)
    ? url
    : undefined
}

export function ExperienceBooking({
  experience,
  answers,
  evaluation,
  theme,
}: {
  experience: ExperienceDetail
  answers: Answers
  evaluation: Evaluation | null
  theme: ThemeClasses
}) {
  const [callOpen, setCallOpen] = useState(false)
  const inputs = experience.configurator?.inputs ?? []
  const locationInput = inputs.find((i) => inputRole(i) === 'location')
  const location = locationInput?.choices?.find(
    (c) => c.value === answers[locationInput.key],
  )
  const locationUrl = mapsUrl(locationInput?.hint)
  const durationInput = inputs.find((i) => inputRole(i) === 'duration')
  const duration = durationInput?.choices?.find(
    (c) => c.value === answers[durationInput.key],
  )

  // Legacy order: standard add-ons, the voucher (and other choices), then the duration.
  const roleOrder = ['standard', 'voucher', 'choice', 'duration']
  const selected = (evaluation?.lines ?? [])
    .map((line) => {
      const input = inputs.find((i) => i.key === line.key)
      return input ? { ...line, role: inputRole(input) } : null
    })
    .filter(
      (line): line is NonNullable<typeof line> =>
        line !== null && roleOrder.includes(line.role),
    )
    .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role))

  const hasPrice = experience.basePrice !== null
  const showTotal = hasPrice || (!experience.inquiry && duration !== undefined)
  const total = (experience.basePrice ?? 0) + (evaluation?.surcharge ?? 0)

  return (
    <div className="mt-4">
      <Card className="border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-2xl overflow-hidden relative">
        {experience.pattern && (
          <div className="absolute top-0 left-0 right-0 h-15 overflow-hidden">
            <ExperiencePattern pattern={experience.pattern} />
          </div>
        )}
        <CardHeader className="pb-4 mt-4 border-b border-slate-800 bg-slate-950/50 relative">
          <div className="pt-2">
            <div className="flex justify-between items-start mb-2">
              <span
                className={cn(
                  'text-xs font-bold uppercase tracking-widest',
                  theme.text,
                )}
              >
                Резервация
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-bold">Pro Equipment</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-black text-white italic uppercase tracking-tight">
              {experience.title}
            </CardTitle>
            <p className="text-slate-400 text-sm mt-1">{experience.subtitle}</p>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500">Базова цена</span>
              {experience.basePrice !== null ? (
                <span className="text-2xl font-black text-white tracking-tighter">
                  {formatAmount(experience.basePrice)}
                  <span className={cn('text-sm font-bold ml-1', theme.text)}>
                    €
                  </span>
                </span>
              ) : (
                <span
                  className={cn(
                    'text-xl font-black uppercase tracking-tight',
                    theme.text,
                  )}
                >
                  {experience.inquiry ?? 'по договаряне'}
                </span>
              )}
            </div>
            <div className="bg-slate-800 px-3 py-1 rounded text-xs font-medium text-slate-300">
              {duration ? duration.label : experience.stats.duration}
            </div>
          </div>

          {location && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                  Локация
                </h4>
                {locationUrl ? (
                  <a
                    href={locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border-2 hover:scale-[1.02] transition-all cursor-pointer',
                      theme.border,
                      theme.bgFaded,
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className={cn('w-5 h-5', theme.text)} />
                      <span className="text-white font-medium">
                        {location.label}
                      </span>
                    </div>
                    <ExternalLink className={cn('w-4 h-4', theme.text)} />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-700 bg-slate-800/50">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-300">{location.label}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {selected.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                  Допълнения
                </h4>
                {selected.map((line) => {
                  const label =
                    line.role === 'standard' ? line.label : line.display
                  const Icon = addonIcon(label, line.role)
                  return (
                    <div
                      key={line.key}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border-2 transition-all',
                        theme.border,
                        theme.bgFaded,
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {Icon ? (
                          <Icon className={cn('w-5 h-5', theme.text)} />
                        ) : (
                          <div
                            className={cn('w-5 h-5 rounded-full', theme.bg)}
                          />
                        )}
                        <span className="text-white font-medium text-sm">
                          {label}
                        </span>
                      </div>
                      {line.amount > 0 ? (
                        <span className={cn('font-bold text-sm', theme.text)}>
                          +{formatAmount(line.amount)} €
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-bold uppercase">
                          Вкл.
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {showTotal && (
            <>
              <Separator />
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">
                    Обща цена
                  </span>
                  <span
                    className="text-3xl font-black text-white tracking-tighter"
                    aria-live="polite"
                  >
                    {formatAmount(total)}
                    <span className={cn('text-lg font-bold ml-1', theme.text)}>
                      €
                    </span>
                  </span>
                </div>
              </div>
            </>
          )}

          <CallDialog open={callOpen} onOpenChange={setCallOpen} />
          <Button
            variant="default"
            onClick={() => setCallOpen(true)}
            className="w-full h-14 text-lg font-black uppercase tracking-wider transition-all hover:scale-[1.02]"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Добави в Количката
            </span>
          </Button>

          <div
            className={cn(
              'p-5 rounded-xl border-2 space-y-4 shadow-xl',
              theme.border,
              theme.bgFaded,
            )}
          >
            <div className="flex items-center gap-2 justify-center">
              <CreditCard className={cn('w-5 h-5', theme.text)} />
              <span className="text-white font-black text-xs uppercase tracking-widest">
                Начин на плащане
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-center text-white font-black uppercase italic tracking-tight">
                * Плащането се извършва{' '}
                <span className={theme.text}>ОНЛАЙН</span> *
              </p>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[11px] text-center text-slate-400 font-bold uppercase tracking-wide">
                  За наложен платеж се обадете:
                </p>
                <a
                  href={`tel:${PHONE}`}
                  className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 border-2 text-white font-black text-sm hover:scale-105 transition-all shadow-lg',
                    theme.border,
                  )}
                >
                  <Phone className={cn('w-4 h-4', theme.text)} />
                  +359 88 272 6020
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
