import { Button, buttonVariants } from '@danirusev/ui/components/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@danirusev/ui/components/sheet'
import { cn } from '@danirusev/ui/lib/utils'
import { useLocation } from '@tanstack/react-router'
import {
  ChevronRight,
  Info,
  Menu,
  PhoneCall,
  ShoppingBag,
  ShoppingCart,
  Trophy,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { EmptyCartContent } from './empty-cart-content'
import Logo from './logo'

const navigation = [
  { label: 'За Нас', href: '/#about', icon: Info, disabled: false },
  {
    label: 'Преживявания',
    href: '/#drift-experiences',
    icon: Trophy,
    disabled: false,
  },
  { label: 'Магазин 🔒', href: '/shop', icon: ShoppingBag, disabled: true },
  { label: 'Абонамент 🔒', href: '/subscription', icon: Zap, disabled: true },
  { label: 'Контакти', href: '/contact', icon: PhoneCall, disabled: false },
] as const

export function SiteHeader() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <a
          href="/"
          aria-label="Dani Rusev 11 — начало"
          className="flex items-center space-x-2"
          onClick={(event) => {
            if (location.pathname === '/') {
              event.preventDefault()
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'auto'
                  : 'smooth',
              })
            }
          }}
        >
          <Logo />
        </a>
        <nav
          className="hidden lg:flex flex-1 items-center justify-center"
          aria-label="Основна навигация"
        >
          <div className="flex items-center gap-x-6">
            {navigation.map((item) =>
              item.disabled ? (
                <Button
                  key={item.href}
                  variant="main"
                  size="sm"
                  className="text-md mx-1 font-black uppercase tracking-tighter italic transition-colors text-alt/90 dark:text-main/90"
                  disabled
                >
                  {item.label}
                </Button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={cn(
                    buttonVariants({ variant: 'main', size: 'sm' }),
                    'text-md mx-1 font-black uppercase tracking-tighter italic transition-colors text-alt dark:text-main dark:hover:text-alt',
                  )}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </nav>
        <div className="flex items-center gap-x-2 lg:gap-x-4">
          <EmptyCart />
          <a
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: 'main' }),
              'hidden lg:inline-flex text-alt font-black uppercase tracking-tighter italic bg-main',
            )}
          >
            Вход
          </a>
          <Button
            variant="ghost"
            className="px-2 text-foreground hover:bg-white/5 lg:hidden"
            aria-label="Отвори менюто"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="data-[side=right]:w-full sm:data-[side=right]:max-w-sm bg-slate-950 border-l-slate-800 p-0 h-[100dvh] shadow-2xl [&>button]:top-3 [&>button]:right-8 [&>button]:size-10 [&>button>svg]:size-6">
          <SheetHeader className="h-16 p-0 px-4 justify-center border-b border-white/5 shrink-0">
            <SheetTitle className="font-normal">
              <Logo />
            </SheetTitle>
            <SheetDescription className="sr-only">
              Основна навигация
            </SheetDescription>
          </SheetHeader>
          <nav
            className="flex-1 overflow-y-auto px-4 space-y-1"
            aria-label="Мобилна навигация"
          >
            {navigation.map(({ href, label, disabled, icon: Icon }) =>
              disabled ? (
                <div
                  key={href}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-slate-900/30 opacity-30 select-none text-slate-500"
                >
                  <Icon className="size-4.5" />
                  <span className="text-base font-black uppercase tracking-tighter italic">
                    {label}
                  </span>
                </div>
              ) : (
                <a
                  key={href}
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group border border-transparent',
                    pathname === href
                      ? 'bg-main/10 text-main'
                      : 'hover:bg-white/5',
                  )}
                >
                  <span className="flex items-center gap-3.5">
                    <Icon
                      className={cn(
                        'size-5 transition-colors',
                        pathname === href
                          ? 'text-main'
                          : 'text-slate-400 group-hover:text-white',
                      )}
                    />
                    <span
                      className={cn(
                        'text-base font-black uppercase tracking-tighter italic transition-colors',
                        pathname === href
                          ? 'text-white'
                          : 'text-slate-300 group-hover:text-white',
                      )}
                    >
                      {label}
                    </span>
                  </span>
                  <ChevronRight
                    className={cn(
                      'size-4 group-hover:translate-x-1 transition-transform',
                      pathname === href ? 'text-main' : 'text-slate-700',
                    )}
                  />
                </a>
              ),
            )}
          </nav>
          <div className="p-4 border-t border-white/5 bg-slate-950/50 backdrop-blur-xl shrink-0 pb-[calc(env(safe-area-inset-bottom)+1rem)] space-y-2">
            <a
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: 'main' }),
                'w-full h-14 text-alt font-black uppercase tracking-tighter italic bg-main rounded-2xl shadow-[0_0_20px_rgba(208,246,26,0.2)]',
              )}
            >
              Влез в профила →
            </a>
            <a
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full h-12 hover:text-slate-400 text-white font-black uppercase tracking-tighter italic rounded-2xl border border-white/5 bg-white/5',
              )}
            >
              Регистрация
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function EmptyCart() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="main" size="icon" aria-label="Отвори количката" />
        }
      >
        <ShoppingCart className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent className="flex flex-col px-6 data-[side=right]:w-full sm:data-[side=right]:max-w-lg z-[50000] bg-slate-950 [&>button]:top-3 [&>button]:right-8 [&>button]:size-10 [&>button>svg]:size-6">
        <SheetHeader className="space-y-2.5 pr-6 pb-4">
          <SheetTitle className="text-2xl font-black text-white">
            Количка (0)
          </SheetTitle>
          <SheetDescription className="text-slate-400">
            Прегледайте вашите избрани преживявания
          </SheetDescription>
        </SheetHeader>
        <EmptyCartContent onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
