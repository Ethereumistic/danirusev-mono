import { LazyMotion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

// Shared by each ported page; load the animation features after the initial render.
const loadFeatures = () =>
  import('./motion-features').then((module) => module.default)

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  )
}
