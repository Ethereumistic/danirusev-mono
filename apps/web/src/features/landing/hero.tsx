import { Button } from '@danirusev/ui/components/button'
import { Flame, Pause, Play } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import * as motion from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/image'

export function Hero() {
  const video = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (
      reducedMotion ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      video.current?.pause()
      setReady(false)
      setEnabled(false)
    } else {
      // A cached SSR poster can finish before hydration and its load event is missed.
      setEnabled(true)
    }
  }, [reducedMotion])
  return (
    <section
      className="group/hero relative min-h-screen flex items-center justify-center overflow-hidden mt-[-4rem]"
      aria-label="Дрифт преживявания с Дани Русев"
    >
      <div className="absolute inset-0 z-0 bg-slate-950">
        <Image
          src="/hero-poster.webp"
          alt="Dani Rusev Drift Experience"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() =>
            setEnabled(
              !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            )
          }
        />
        {enabled && (
          <video
            ref={video}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={() => setReady(true)}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-slate-950/20 z-10" />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.h1
          data-motion-reveal
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter italic mb-6 leading-none"
        >
          Усети
          <br />
          <span className="text-main">Истинския</span>
          <br />
          Адреналин
        </motion.h1>
        <motion.p
          data-motion-reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Професионални дрифт сесии с{' '}
          <span className="text-main font-bold">Дани Русев</span> — твоят път
          към майсторството над волана.
        </motion.p>
        <motion.div
          data-motion-reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="bg-main hover:bg-main/90 text-black font-extrabold uppercase tracking-wider h-16 px-10 text-lg rounded-xl group relative overflow-hidden shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]"
            onClick={() =>
              document.getElementById('drift-experiences')?.scrollIntoView({
                behavior: reducedMotion ? 'auto' : 'smooth',
              })
            }
          >
            <span className="relative z-10 flex items-center gap-2">
              Избери Преживяване
              <Flame className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: reducedMotion ? 0 : [0, 10, 0] }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }
        }
      >
        <div className="w-6 h-10 border-2 border-main/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-main rounded-full" />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950 pointer-events-none" />
      {ready && (
        <button
          type="button"
          className="absolute bottom-4 right-4 z-30 rounded-full p-3 text-white bg-slate-950/50 opacity-0 group-hover/hero:opacity-100 focus-visible:opacity-100 transition-opacity"
          aria-label={paused ? 'Пусни фоновото видео' : 'Спри фоновото видео'}
          onClick={() => {
            if (paused) void video.current?.play()
            else video.current?.pause()
            setPaused(!paused)
          }}
        >
          {paused ? (
            <Play size={16} aria-hidden="true" />
          ) : (
            <Pause size={16} aria-hidden="true" />
          )}
        </button>
      )}
    </section>
  )
}
