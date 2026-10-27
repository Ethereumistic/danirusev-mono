import { Button } from '@danirusev/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@danirusev/ui/components/dialog'
import { Input } from '@danirusev/ui/components/input'
import { Label } from '@danirusev/ui/components/label'
import { ArrowLeft, ArrowRight, PhoneCall, UserX } from 'lucide-react'
import { type ReactNode, useId, useState } from 'react'
import { CopyNumber, PHONE, PHONE_LABEL } from './call-number'
import Logo from './logo'

export type AccountMode = 'signIn' | 'signUp'

/**
 * Sign-in / sign-up dialog laid out like echoray-web's auth dialog (email-first form,
 * mode switch link). Customer accounts are off in Echoray ("Customer sign-in: guests
 * only"), so sign-up shows the paused notice and a sign-in attempt explains that
 * bookings are taken by phone. Nothing is sent anywhere.
 */
export function AccountDialog({
  open,
  onOpenChange,
  initialMode = 'signIn',
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: AccountMode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-black/50 backdrop-blur-sm duration-200"
        className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 px-6 py-9 text-white ring-0 shadow-lg sm:max-w-[420px] sm:px-8 duration-200"
      >
        {/* Remounted per opening so every visit starts at the form. */}
        {open && <AccountForm initialMode={initialMode} />}
      </DialogContent>
    </Dialog>
  )
}

function AccountForm({ initialMode }: { initialMode: AccountMode }) {
  const id = useId()
  const [mode, setMode] = useState<AccountMode>(initialMode)
  const [attempted, setAttempted] = useState(false)

  if (mode === 'signUp')
    return (
      <Paused
        title="Регистрациите са временно спрени"
        description="Ако искате да резервирате преживяване, моля обадете се на телефон:"
        action={
          <Button
            type="button"
            variant="link"
            className="text-slate-300"
            onClick={() => setMode('signIn')}
          >
            Вече имате профил? Вход
          </Button>
        }
      />
    )

  if (attempted)
    return (
      <Paused
        title="Профилите са временно спрени"
        description="В момента резервациите се правят без профил. За да резервирате преживяване, моля обадете се на телефон:"
        action={
          <Button
            type="button"
            variant="ghost"
            className="text-slate-300 hover:bg-white/5 hover:text-white"
            onClick={() => setAttempted(false)}
          >
            <ArrowLeft className="size-4" />
            Назад към входа
          </Button>
        }
      />
    )

  return (
    <div className="grid gap-6">
      <div className="grid justify-items-center gap-3 text-center">
        <Logo size="sm" />
        <DialogTitle className="text-2xl font-black tracking-tight text-white">
          Добре дошли отново
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-400">
          Влезте в профила си с имейл и парола.
        </DialogDescription>
      </div>
      <form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          setAttempted(true)
        }}
      >
        <Label htmlFor={`${id}-email`} className="text-slate-200">
          Имейл адрес
        </Label>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="ime@primer.bg"
          className="h-12 border-slate-700 bg-slate-950/60 text-white"
        />
        <Label htmlFor={`${id}-password`} className="text-slate-200">
          Парола
        </Label>
        <Input
          id={`${id}-password`}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={128}
          className="h-12 border-slate-700 bg-slate-950/60 text-white"
        />
        <Button
          type="submit"
          variant="main"
          className="mt-2 h-12 w-full bg-main font-black uppercase italic tracking-tighter text-alt"
        >
          Вход
          <ArrowRight className="size-4" />
        </Button>
      </form>
      <Button
        type="button"
        variant="link"
        className="text-slate-300"
        onClick={() => setMode('signUp')}
      >
        Нямате профил? Регистрация
      </Button>
    </div>
  )
}

function Paused({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action: ReactNode
}) {
  return (
    <div className="grid gap-6">
      <div className="grid justify-items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800">
          <UserX className="size-6 text-amber-400" />
        </span>
        <DialogTitle className="text-2xl font-black leading-tight tracking-tight text-white">
          {title}
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-400 sm:text-base">
          {description}
        </DialogDescription>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2">
        <a
          href={`tel:${PHONE}`}
          className="flex-1 inline-flex items-center justify-center gap-2 text-nowrap rounded-xl bg-mix px-3 py-4 text-base font-black text-black shadow-lg shadow-amber-400/20 transition-all hover:scale-105 hover:bg-amber-300 sm:gap-3 sm:px-6 sm:text-2xl"
        >
          <PhoneCall className="size-5 shrink-0 sm:size-6" />
          {PHONE_LABEL}
        </a>
        <CopyNumber number={PHONE} />
      </div>
      {action}
    </div>
  )
}
