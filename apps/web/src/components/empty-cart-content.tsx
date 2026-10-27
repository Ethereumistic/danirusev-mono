import { Button } from '@danirusev/ui/components/button'
import {
  Car,
  CarTaxiFront,
  Flag,
  Gauge,
  PartyPopper,
  ShoppingBag,
} from 'lucide-react'
export function EmptyCartContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 text-center">
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-main/20 blur-[100px] rounded-full scale-150" />

        <div className="relative flex flex-col items-center gap-6">
          {/* Main Decorative Icon Container */}
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-2 border-white/5 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
            <ShoppingBag className="w-20 h-20 text-slate-500 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="w-12 h-12 rounded-full bg-main/30 blur-xl" />
            </div>
            {/* Floating Experience Icons - Larger and Better Distributed */}
            <div className="absolute -top-8  p-3 rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-2xl rotate-12 z-20">
              <CarTaxiFront className="w-6 h-6 text-taxi" />
            </div>
            <div className="absolute top-1/3 -right-8 -translate-y-1/2 p-3 rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-2xl rotate-6 z-20">
              <Car className="w-6 h-6 text-rent" />
            </div>
            <div className="absolute -bottom-4 p-3 right-1 rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-2xl -rotate-12 z-20">
              <Gauge className="w-6 h-6 text-mix" />
            </div>
            <div className="absolute -bottom-4 left-1 p-3 rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-2xl rotate-12 z-20">
              <PartyPopper className="w-6 h-6 text-event" />
            </div>
            <div className="absolute top-1/3 -left-8 -translate-y-1/2 p-3 rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-2xl -rotate-6 z-20">
              <Flag className="w-6 h-6 text-day" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
          Твоята количка е празна
        </h2>
        <p className="text-slate-400 text-sm max-w-[280px] leading-relaxed mx-auto font-medium">
          Изглежда още нямаш добавени преживявания. Вземи я напълни ;)
        </p>
      </div>

      <Button
        variant="main"
        onClick={() => {
          onClose()
          document.getElementById('drift-experiences')?.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'auto'
              : 'smooth',
          })
        }}
        className="w-full max-w-[240px] h-12 bg-main text-black font-black uppercase tracking-widest hover:bg-main/90 transition-all hover:scale-[1.05] shadow-[0_0_30px_-5px_rgba(208,246,26,0.3)]"
      >
        Преживявания →
      </Button>
    </div>
  )
}
