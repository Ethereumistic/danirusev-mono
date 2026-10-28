import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@danirusev/ui/components/carousel'
import { useEffect, useState } from 'react'
import { Image } from '@/components/image'

export function FeatureGallery({
  images,
  title,
}: {
  images: readonly string[]
  title: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!api) return
    const select = () => setCurrent(api.selectedScrollSnap())
    api.on('select', select)
    api.on('reInit', select)
    return () => {
      api.off('select', select)
      api.off('reInit', select)
    }
  }, [api])
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
        <Carousel
          setApi={setApi}
          opts={{ align: 'center', loop: true }}
          className="w-full"
          aria-label={title}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image}>
                <div className="relative aspect-[4/3]">
                  {Math.abs(index - current) <= 2 || index === 0 ? (
                    <Image
                      src={image}
                      alt={`${title} - ${index + 1}`}
                      fill
                      sizes="(max-width:768px) 100vw,50vw"
                      className="object-cover"
                      // Eager images are preloaded in <head> by React; only a slide the visitor moved to is.
                      loading={
                        index > 0 && index === current ? 'eager' : 'lazy'
                      }
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-slate-900/80 hover:bg-slate-800 border-slate-700 hover:border-main/50 text-white z-10" />
          <CarouselNext className="right-4 bg-slate-900/80 hover:bg-slate-800 border-slate-700 hover:border-main/50 text-white z-10" />
        </Carousel>
      </div>
      <div className="flex justify-center gap-2 mt-4 px-4">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`gallery-dot ${index === current ? 'bg-main w-8' : 'bg-slate-500 hover:bg-slate-400 w-2.5'}`}
            aria-label={`Към снимка ${index + 1}`}
            aria-current={index === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
