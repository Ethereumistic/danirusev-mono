import { Badge } from '@danirusev/ui/components/badge'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@danirusev/ui/components/carousel'
import { cn } from '@danirusev/ui/lib/utils'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { mediaUrl } from '@/components/image'

function ImageWithLoader({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
}) {
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLImageElement>(null)
  // A server-rendered image can finish before hydration attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete) setLoading(false)
  }, [])
  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      <img
        ref={ref}
        src={mediaUrl(src)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={cn('absolute inset-0 h-full w-full', className)}
      />
    </>
  )
}

export function ExperienceGallery({
  images,
  title,
  subtitle,
}: {
  images: readonly { src: string; alt: string }[]
  title: string
  subtitle: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (!images.length) return null

  return (
    <div className="space-y-3">
      <div className="relative w-full ">
        <Carousel
          setApi={setApi}
          className="w-full -mb-1"
          aria-label={`${title} снимки`}
        >
          <CarouselContent>
            {images.map((image, idx) => (
              <CarouselItem key={image.src}>
                <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-slate-100">
                  <ImageWithLoader
                    src={image.src}
                    alt={`${title} ${idx + 1}`}
                    priority={idx === 0}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="ghost"
            className="left-4 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-sm"
          />
          <CarouselNext
            variant="ghost"
            className="right-4 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-sm"
          />
          {subtitle && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="backdrop-blur-2xl border-border/30 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] bg-black/15 text-white">
                {subtitle}
              </Badge>
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
              <Badge
                variant="secondary"
                className="bg-black/50 text-white hover:bg-black/60 backdrop-blur-md border-0"
              >
                {index + 1} / {images.length}
              </Badge>
            </div>
          )}
        </Carousel>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, idx) => (
          <button
            key={image.src}
            type="button"
            onClick={() => api?.scrollTo(idx)}
            aria-label={`Покажи снимка ${idx + 1}`}
            className="relative w-full aspect-square overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-shadow bg-slate-100 rounded-lg"
          >
            <ImageWithLoader
              src={image.src}
              alt={`${title} thumbnail ${idx + 1}`}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  )
}
