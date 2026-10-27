import { Card, CardContent } from '@danirusev/ui/components/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@danirusev/ui/components/carousel'
import { Star } from 'lucide-react'
import { Image } from '@/components/image'
import type { TestimonialFixture } from './data'
export function Testimonials({
  testimonials,
}: {
  testimonials: readonly TestimonialFixture[]
}) {
  return (
    <section
      className="py-24 px-4 bg-slate-950 relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-main/5 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            id="testimonials-title"
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-4"
          >
            Какво Казват <span className="text-main">Клиентите?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Реални истории от реални дрифт ентусиасти
          </p>
        </div>
        <Carousel
          opts={{ align: 'start', loop: testimonials.length > 1 }}
          className="w-full"
          aria-label="Мнения на клиенти"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-[30%]"
              >
                <Card className="bg-slate-900/50 backdrop-blur-md border-slate-800 hover:border-main/30 transition-all h-full">
                  <CardContent className="px-6 py-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="size-20 border-2 border-main/30 rounded-full object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg truncate">
                          {testimonial.name}
                        </h3>
                        <p className="text-slate-400 text-sm truncate">
                          {testimonial.paragraphs[0]}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex gap-1 mb-4"
                      role="img"
                      aria-label={`${testimonial.rating} от 5 звезди`}
                    >
                      {[1, 2, 3, 4, 5]
                        .slice(0, testimonial.rating)
                        .map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 fill-main text-main"
                            aria-hidden="true"
                          />
                        ))}
                    </div>
                    <blockquote className="text-slate-300 text-sm leading-relaxed flex-1 mb-4 whitespace-pre-line">
                      {testimonial.quote}
                    </blockquote>
                    <p className="text-xs text-slate-500">
                      {testimonial.paragraphs[1]}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-main/50 text-white" />
          <CarouselNext className="hidden md:flex -right-12 bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-main/50 text-white" />
        </Carousel>
      </div>
    </section>
  )
}
