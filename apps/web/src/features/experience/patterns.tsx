import type { ReactNode } from 'react'
import type { PatternKey } from './presentation'

/** The legacy booking-card strips (components/experience/patterns), unchanged. */
function PatternFrame({
  id,
  size,
  children,
}: {
  id: string
  size: number
  children: ReactNode
}) {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none opacity-100">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${id}-fade`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <pattern
            id={id}
            x="0"
            y="0"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            {children}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id})`}
          mask={`url(#${id}-fade-mask)`}
        />
        <mask id={`${id}-fade-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
        </mask>
      </svg>
    </div>
  )
}

const patterns: Record<PatternKey, () => ReactNode> = {
  'taxi-checker': () => (
    <PatternFrame id="taxi-checker" size={40}>
      <rect x="0" y="0" width="20" height="20" fill="#000000" />
      <rect x="20" y="0" width="20" height="20" fill="#FFC107" />
      <rect x="0" y="20" width="20" height="20" fill="#FFC107" />
      <rect x="20" y="20" width="20" height="20" fill="#000000" />
    </PatternFrame>
  ),
  'tyre-pattern': () => (
    <PatternFrame id="tyre-pattern" size={60}>
      <g stroke="#38b6ff" strokeWidth="2" fill="none">
        <line x1="0" y1="15" x2="15" y2="0" />
        <line x1="0" y1="30" x2="30" y2="0" />
        <line x1="0" y1="45" x2="45" y2="0" />
        <line x1="0" y1="60" x2="60" y2="0" />
        <line x1="15" y1="60" x2="60" y2="15" />
        <line x1="30" y1="60" x2="60" y2="30" />
        <line x1="45" y1="60" x2="60" y2="45" />
        <circle cx="10" cy="10" r="1" fill="#38b6ff" />
        <circle cx="30" cy="30" r="1" fill="#38b6ff" />
        <circle cx="50" cy="50" r="1" fill="#38b6ff" />
        <circle cx="20" cy="40" r="1" fill="#38b6ff" />
        <circle cx="40" cy="20" r="1" fill="#38b6ff" />
      </g>
    </PatternFrame>
  ),
  mix: () => (
    <PatternFrame id="mix-pattern" size={80}>
      <g stroke="currentColor" strokeWidth="2" className="text-mix" fill="none">
        <line x1="0" y1="0" x2="80" y2="80" strokeWidth="4" opacity="0.8" />
        <line x1="0" y1="20" x2="60" y2="80" strokeWidth="1" opacity="0.4" />
        <line x1="20" y1="0" x2="80" y2="60" strokeWidth="1" opacity="0.4" />
        <line
          x1="80"
          y1="0"
          x2="0"
          y2="80"
          strokeDasharray="4 4"
          opacity="0.3"
        />
      </g>
      <circle
        cx="20"
        cy="60"
        r="3"
        fill="currentColor"
        className="text-mix"
        opacity="0.5"
      />
      <rect
        x="55"
        y="15"
        width="6"
        height="6"
        transform="rotate(45 58 18)"
        fill="currentColor"
        className="text-mix"
        opacity="0.5"
      />
      <circle cx="10" cy="10" r="1" fill="currentColor" className="text-mix" />
      <circle cx="70" cy="70" r="1" fill="currentColor" className="text-mix" />
      <circle cx="70" cy="10" r="1" fill="currentColor" className="text-mix" />
      <circle cx="10" cy="70" r="1" fill="currentColor" className="text-mix" />
    </PatternFrame>
  ),
  event: () => (
    <PatternFrame id="event-pattern" size={60}>
      <circle
        cx="10"
        cy="10"
        r="3"
        fill="currentColor"
        className="text-event"
      />
      <rect
        x="30"
        y="5"
        width="6"
        height="6"
        transform="rotate(45 33 8)"
        fill="currentColor"
        className="text-event"
      />
      <circle
        cx="50"
        cy="25"
        r="4"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        fillOpacity="0"
        className="text-event"
      />
      <rect
        x="15"
        y="40"
        width="8"
        height="2"
        transform="rotate(-30 19 41)"
        fill="currentColor"
        className="text-event"
      />
      <circle
        cx="40"
        cy="50"
        r="2"
        fill="currentColor"
        className="text-event"
      />
    </PatternFrame>
  ),
  day: () => (
    <PatternFrame id="day-pattern" size={80}>
      <circle cx="40" cy="40" r="4" fill="currentColor" className="text-day" />
      <g stroke="currentColor" strokeWidth="1.5" className="text-day">
        <line x1="40" y1="32" x2="40" y2="26" />
        <line x1="40" y1="48" x2="40" y2="54" />
        <line x1="32" y1="40" x2="26" y2="40" />
        <line x1="48" y1="40" x2="54" y2="40" />
        <line x1="34" y1="34" x2="30" y2="30" />
        <line x1="46" y1="34" x2="50" y2="30" />
        <line x1="34" y1="46" x2="30" y2="50" />
        <line x1="46" y1="46" x2="50" y2="50" />
      </g>
      <circle
        cx="15"
        cy="15"
        r="2"
        fill="currentColor"
        className="text-day"
        opacity="0.6"
      />
      <circle
        cx="65"
        cy="65"
        r="1.5"
        fill="currentColor"
        className="text-day"
        opacity="0.4"
      />
      <rect
        x="10"
        y="60"
        width="4"
        height="4"
        transform="rotate(20 12 62)"
        fill="currentColor"
        className="text-day"
        opacity="0.5"
      />
      <rect
        x="65"
        y="10"
        width="3"
        height="3"
        transform="rotate(-15 66.5 11.5)"
        fill="currentColor"
        className="text-day"
        opacity="0.3"
      />
    </PatternFrame>
  ),
}

export function ExperiencePattern({ pattern }: { pattern: PatternKey }) {
  const Pattern = patterns[pattern]
  return <Pattern />
}
