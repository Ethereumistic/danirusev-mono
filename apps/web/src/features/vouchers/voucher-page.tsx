import { cn } from '@danirusev/ui/lib/utils'
import { Link } from '@tanstack/react-router'
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  type LucideIcon,
  Settings,
  TicketX,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { VoucherLookup, VoucherState } from '@/lib/echoray/types'

const states: Record<
  VoucherState,
  { label: string; Icon: LucideIcon; text: string; border: string }
> = {
  active: {
    label: 'Валиден',
    Icon: CircleCheck,
    text: 'text-main',
    border: 'border-main',
  },
  redeemed: {
    label: 'Използван',
    Icon: CircleX,
    text: 'text-slate-300',
    border: 'border-slate-600',
  },
  void: {
    label: 'Анулиран',
    Icon: CircleX,
    text: 'text-red-500',
    border: 'border-red-500/60',
  },
  expired: {
    label: 'Изтекъл',
    Icon: Clock,
    text: 'text-amber-400',
    border: 'border-amber-400/60',
  },
}

/** "2027-10-27" → "27.10.2027" without time-zone conversion. */
export function formatDay(iso: string) {
  const [year, month, day] = iso.split('-')
  return `${day}.${month}.${year}`
}

function Panel({
  Icon,
  tone,
  border,
  title,
  children,
}: {
  Icon: LucideIcon
  tone: string
  border: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto rounded-2xl border-2 bg-slate-900 p-8 text-center shadow-2xl',
        border,
      )}
    >
      <div className="mx-auto mb-5 w-fit rounded-full bg-slate-800 p-4">
        <Icon className={cn('h-10 w-10', tone)} aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-black uppercase italic tracking-tight text-white">
        {title}
      </h1>
      {children}
    </div>
  )
}

export function VoucherPage({ lookup }: { lookup: VoucherLookup }) {
  let body: ReactNode
  switch (lookup.status) {
    case 'found': {
      const { voucher } = lookup
      const state = states[voucher.state]
      body = (
        <Panel
          Icon={state.Icon}
          tone={state.text}
          border={state.border}
          title={<span className={state.text}>{state.label}</span>}
        >
          <p className="mt-4 text-xl font-bold text-white">
            {voucher.typeName}
          </p>
          <p className="mt-2 text-sm font-bold uppercase tracking-wide text-slate-400">
            Важи до {formatDay(voucher.expiresOn)}
          </p>
          {voucher.shopName && (
            <p className="mt-6 text-xs text-slate-500">{voucher.shopName}</p>
          )}
        </Panel>
      )
      break
    }
    case 'not_found':
      body = (
        <Panel
          Icon={TicketX}
          tone="text-red-500"
          border="border-slate-800"
          title="Ваучерът не е намерен"
        >
          <p className="mt-4 text-slate-400">
            Проверете дали сте сканирали целия QR код или се свържете с нас.
          </p>
        </Panel>
      )
      break
    case 'unconfigured':
      body = (
        <Panel
          Icon={Settings}
          tone="text-slate-400"
          border="border-dashed border-slate-700"
          title="Проверката не е настроена"
        >
          <p className="mt-4 text-slate-400">
            Проверката на ваучери временно не е достъпна.
          </p>
          {import.meta.env.DEV && (
            <p className="mt-4 text-xs text-slate-500">
              Development: set ECHORAY_CONVEX_URL, ECHORAY_INTEGRATION_ID and
              ECHORAY_INTEGRATION_SECRET in apps/web/.dev.vars.
            </p>
          )}
        </Panel>
      )
      break
    default:
      body = (
        <Panel
          Icon={CircleAlert}
          tone="text-amber-400"
          border="border-slate-800"
          title="Проверката не успя"
        >
          <p className="mt-4 text-slate-400">
            Опитайте отново след малко или ни се обадете на{' '}
            <a href="tel:+359882726020" className="text-main underline">
              +359 88 272 6020
            </a>
            .
          </p>
        </Panel>
      )
  }
  return (
    <main
      id="main-content"
      className="min-h-[70vh] bg-slate-950 px-4 py-16 md:py-24"
    >
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
        Проверка на ваучер
      </p>
      {body}
      <div className="mt-8 text-center">
        <Link to="/" className="text-sm text-slate-400 hover:text-white">
          Към началото
        </Link>
      </div>
    </main>
  )
}
