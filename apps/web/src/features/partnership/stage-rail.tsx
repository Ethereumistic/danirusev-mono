import { cn } from '@danirusev/ui/lib/utils'
import { useScroll } from 'motion/react'
import * as motion from 'motion/react-m'
import { useEffect, useState } from 'react'
import { STAGES, type StageId } from './content'

/** Rally-style stage counter: a scroll progress bar and a jump list of the slides. */
export function StageRail() {
  const { scrollYProgress } = useScroll()
  const [active, setActive] = useState<StageId>('start')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id as StageId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const stage of STAGES) {
      const element = document.getElementById(stage.id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-main"
        style={{ scaleX: scrollYProgress }}
      />
      <nav
        aria-label="Слайдове"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block"
      >
        <ol className="flex flex-col items-end gap-1">
          {STAGES.map((stage) => {
            const current = stage.id === active
            return (
              <li key={stage.id}>
                <a
                  href={`#${stage.id}`}
                  aria-current={current ? 'step' : undefined}
                  className="group flex items-center gap-3 py-1.5 text-right outline-none focus-visible:text-white"
                >
                  <span className="text-xs font-semibold text-transparent transition-colors group-hover:text-white/80 group-focus-visible:text-white">
                    {stage.label}
                  </span>
                  <span
                    className={cn(
                      'min-w-9 text-right text-[11px] font-black italic tabular-nums text-white/35 transition-colors',
                      current && 'text-main',
                    )}
                  >
                    {stage.marker}
                  </span>
                  <span
                    className={cn(
                      'h-[2px] w-4 bg-white/25 transition-all',
                      current && 'w-8 bg-main',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
