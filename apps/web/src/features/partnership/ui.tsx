import { cn } from '@danirusev/ui/lib/utils'
import { animate, useInView, useReducedMotion } from 'motion/react'
import * as motion from 'motion/react-m'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { type Accent, formatCount, type StageId, stageOf } from './content'

export const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12'

/** Complete class names per accent so Tailwind sees every one of them. */
export const ACCENT: Record<
  Accent,
  { bg: string; text: string; border: string; soft: string; glow: string }
> = {
  main: {
    bg: 'bg-main',
    text: 'text-main',
    border: 'border-main',
    soft: 'bg-main/10',
    glow: 'shadow-[0_0_40px_-12px_var(--main)]',
  },
  rent: {
    bg: 'bg-rent',
    text: 'text-rent',
    border: 'border-rent',
    soft: 'bg-rent/10',
    glow: 'shadow-[0_0_40px_-12px_var(--rent)]',
  },
  taxi: {
    bg: 'bg-taxi',
    text: 'text-taxi',
    border: 'border-taxi',
    soft: 'bg-taxi/10',
    glow: 'shadow-[0_0_40px_-12px_var(--taxi)]',
  },
}

/** Responsive photo; each file in public/partnership exists at the listed widths. */
export function Photo({
  src,
  alt,
  className,
  priority,
  widths = [800, 1600],
  sizes = '100vw',
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  widths?: readonly [number, number]
  sizes?: string
}) {
  return (
    <img
      src={`${src}-${widths[1]}.webp`}
      srcSet={widths
        .map((width) => `${src}-${width}.webp ${width}w`)
        .join(', ')}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}

export function Slide({
  id,
  className,
  children,
}: {
  id: StageId
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('relative overflow-clip', className)}
    >
      {children}
    </section>
  )
}

/** Stage marker and headline that open each slide. */
export function SlideHead({
  id,
  title,
  lede,
  compact,
  className,
}: {
  id: StageId
  title: ReactNode
  lede?: ReactNode
  /** Smaller headline for slides that set it in a half-width column. */
  compact?: boolean
  className?: string
}) {
  const stage = stageOf(id)
  return (
    <header className={cn('max-w-4xl', className)}>
      <p className="mb-5 flex items-baseline gap-3 text-sm">
        <span className="font-black italic text-main">{stage.marker}</span>
        <span className="h-px w-10 translate-y-[-4px] bg-white/25" />
        <span className="text-white/60">{stage.label}</span>
      </p>
      <h2
        id={`${id}-title`}
        className={cn(
          'font-black uppercase italic tracking-tighter text-white text-balance',
          compact
            ? 'text-[clamp(2.25rem,4.6vw,4.5rem)]'
            : 'text-[clamp(2.5rem,7vw,6.25rem)]',
          'leading-[0.9]',
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
          {lede}
        </p>
      )}
    </header>
  )
}

/** Wipes a large photo into view once, from the bottom edge. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      data-motion-reveal
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Counts up to `value` the first time it scrolls into view. The server renders
 * the final number, so it reads correctly without JavaScript.
 */
export function CountUp({
  value,
  step = 1,
  className,
}: {
  value: number
  /** Round the displayed value down to this step (e.g. 100 for "48 900"). */
  step?: number
  className?: string
}) {
  const target = Math.floor(value / step) * step
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reducedMotion = useReducedMotion()
  const [shown, setShown] = useState(target)
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (reducedMotion) return
    // Below the fold on load: reset so the count is visible when it arrives.
    const rect = ref.current?.getBoundingClientRect()
    if (rect && rect.top > window.innerHeight) {
      setShown(0)
      setArmed(true)
    }
  }, [reducedMotion])
  useEffect(() => {
    if (!armed || !inView) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setShown(Math.round(latest / step) * step),
    })
    return () => controls.stop()
  }, [armed, inView, target, step])
  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {formatCount(shown)}
    </span>
  )
}

/** True once the element has scrolled into view; for CSS-driven entrances. */
export function useSeen<T extends Element>() {
  const ref = useRef<T>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  return [ref, seen] as const
}

/**
 * Tyre marks: two drift donuts and a pair of S-curve skids. Thick dashed strokes
 * follow each curve, so the tread blocks stay perpendicular to the path.
 */
export function TyreMarks({ className }: { className?: string }) {
  const tread = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 16,
    strokeDasharray: '5 4',
  } as const
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className,
      )}
    >
      <g {...tread}>
        <circle cx="1010" cy="120" r="150" />
        <circle cx="1010" cy="120" r="110" />
        <circle cx="1040" cy="150" r="200" opacity="0.6" />
        <path d="M-40 360 C 200 380, 300 200, 520 230 S 800 420, 980 330" />
        <path d="M-40 316 C 210 336, 300 156, 520 186 S 790 376, 960 290" />
        <path d="M120 -20 C 160 80, 90 160, 210 250" opacity="0.5" />
        <path d="M160 -20 C 200 80, 130 160, 250 250" opacity="0.5" />
      </g>
    </svg>
  )
}
