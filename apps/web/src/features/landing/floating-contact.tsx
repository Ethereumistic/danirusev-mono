import { Phone } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-m'
import { useState } from 'react'
export function FloatingContact() {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      data-motion-reveal
      className="fixed bottom-2 left-2 z-[100]"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.a
        href="tel:+359882726020"
        aria-label="Обади се на +359 88 272 6020"
        className="flex items-center bg-main text-black font-bold h-14 rounded-full border border-white/20 backdrop-blur-md overflow-hidden relative"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        animate={{ width: hovered ? 222 : 56 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 fill-current" aria-hidden="true" />
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-sm tracking-tighter whitespace-nowrap pr-8"
            >
              +359 88 272 6020
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
      <div className="absolute inset-0 bg-main/20 blur-2xl -z-10 rounded-full" />
    </motion.div>
  )
}
