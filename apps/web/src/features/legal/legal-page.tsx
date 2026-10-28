import { buttonVariants } from '@danirusev/ui/components/button'
import { cn } from '@danirusev/ui/lib/utils'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export type LegalPath = '/privacy' | '/cookies' | '/terms'
type LegalLink = { to: LegalPath; label: string }

/** Legacy LEGAL_PROSE_CLASSES: typography for the article without a prose plugin. */
const LEGAL_PROSE_CLASSES = cn(
  'relative z-10',
  '[&_h2]:text-2xl [&_h2]:sm:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:tracking-tighter',
  '[&_h2]:text-alt dark:[&_h2]:text-main [&_h2]:mt-20 [&_h2]:mb-10 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-4',
  "[&_h2]:before:content-[''] [&_h2]:before:w-2 [&_h2]:before:h-10 [&_h2]:before:bg-main [&_h2]:before:rounded-full [&_h2]:before:shadow-[0_0_20px_rgba(208,246,26,0.6)]",
  '[&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-black [&_h3]:uppercase [&_h3]:italic [&_h3]:tracking-tighter',
  '[&_h3]:text-white [&_h3]:mt-12 [&_h3]:mb-6',
  '[&_p]:text-slate-600 dark:[&_p]:text-slate-400 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base sm:[&_p]:text-lg [&_p]:font-medium',
  '[&_strong]:text-foreground dark:[&_strong]:text-white [&_strong]:font-black [&_strong]:italic',
  '[&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-4 [&_ul]:mb-10',
  '[&_li]:relative [&_li]:pl-10 [&_li]:text-slate-600 dark:[&_li]:text-slate-400 [&_li]:text-base sm:[&_li]:text-lg',
  "[&_li]:before:content-['→'] [&_li]:before:absolute [&_li]:before:left-2 [&_li]:before:text-main [&_li]:before:font-black [&_li]:before:text-xl",
  '[&_a]:text-main [&_a]:font-black [&_a]:italic [&_a]:uppercase [&_a]:tracking-tighter [&_a]:transition-all',
  '[&_a]:border-b-2 [&_a]:border-main/20 hover:[&_a]:border-main hover:[&_a]:shadow-[0_5px_15px_-5px_rgba(208,246,26,0.4)]',
)

const navButton = cn(
  buttonVariants({ variant: 'outline', size: 'lg' }),
  'w-full sm:w-auto rounded-2xl group border-white/5 transition-all flex items-center gap-2',
)

/** Shared shell of the privacy, cookies and terms pages (legacy app/(frontend)/{privacy,cookies,terms}). */
export function LegalPage({
  title,
  updated,
  previous,
  next,
  children,
}: {
  title: string
  updated: string
  previous: LegalLink
  next: LegalLink
  children: ReactNode
}) {
  return (
    <main
      id="main-content"
      className="bg-slate-950 text-foreground min-h-screen relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-main/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-main/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-24 relative z-10">
        <div className="mb-16 border-b border-white/5 pb-8">
          <h1 className="text-5xl sm:text-7xl font-black uppercase italic tracking-tighter text-alt dark:text-main mb-6 break-words">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-8 h-[2px] bg-main/50" />
            <p className="text-sm font-bold uppercase tracking-widest italic">
              Последна актуализация: {updated}
            </p>
          </div>
        </div>
        <article className={LEGAL_PROSE_CLASSES}>{children}</article>
        <nav
          aria-label="Правни документи"
          className="mt-20 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5 pt-10"
        >
          <Link to={previous.to} className={navButton}>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-black uppercase italic tracking-tighter">
              {previous.label}
            </span>
          </Link>
          <Link to={next.to} className={navButton}>
            <span className="font-black uppercase italic tracking-tighter">
              {next.label}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>
    </main>
  )
}
