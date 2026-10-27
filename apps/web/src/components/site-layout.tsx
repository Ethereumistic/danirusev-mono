import type { ReactNode } from 'react'
import { FloatingContact } from '@/features/landing/floating-contact'
import { MotionProvider } from './motion-provider'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function SiteLayout({
  children,
  floatingContact = false,
}: {
  children: ReactNode
  floatingContact?: boolean
}) {
  return (
    <MotionProvider>
      <a href="#main-content" className="skip-link">
        Към съдържанието
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
      {floatingContact && <FloatingContact />}
    </MotionProvider>
  )
}
