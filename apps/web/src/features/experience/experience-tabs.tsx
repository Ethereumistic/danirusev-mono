import { cn } from '@danirusev/ui/lib/utils'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import type { ThemeClasses } from './theme'

type Section = {
  id: string
  label: string
  heading: string
  content: ReactNode
}

/** Sticky in-page navigation with scroll spy (legacy experience-scrollable-tabs.tsx). */
export function ExperienceTabs({
  sections,
  theme,
}: {
  sections: readonly Section[]
  theme: ThemeClasses
}) {
  const [active, setActive] = useState(sections[0]?.id)
  const refs = useRef(new Map<string, HTMLElement>())

  const ids = sections.map((section) => section.id).join(' ')
  useEffect(() => {
    const onScroll = () => {
      // Offset for the sticky header and tab bar, as on the legacy page.
      const offset = 250
      for (const id of ids.split(' ')) {
        const rect = refs.current.get(id)?.getBoundingClientRect()
        if (rect && rect.top <= offset && rect.bottom >= offset) setActive(id)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  const scrollTo = (id: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    refs.current
      .get(id)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <div className="relative">
      <div className="sticky top-16 z-30 backdrop-blur-md rounded-lg border-b border-transparent mb-6 transition-all duration-300">
        <nav
          aria-label="Секции"
          className="inline-flex items-center justify-start bg-slate-900/30 p-1 rounded-lg border border-slate-800 w-full overflow-x-auto"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault()
                scrollTo(section.id)
              }}
              className={cn(
                'flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                active === section.id
                  ? `${theme.bg} text-black shadow-sm`
                  : 'text-slate-400 hover:text-slate-200',
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="space-y-12 pb-8">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            ref={(node) => {
              if (node) refs.current.set(section.id, node)
              else refs.current.delete(section.id)
            }}
            className={cn(
              'scroll-mt-40',
              index > 0 && 'border-t border-slate-800 pt-8',
            )}
          >
            <h3
              id={`${section.id}-heading`}
              className="text-xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <span className={cn('w-2 h-8 rounded-full', theme.bg)} />
              {section.heading}
            </h3>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  )
}
