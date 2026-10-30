import { Play } from 'lucide-react'
import { useState } from 'react'

/** Poster first; the YouTube player (and its cookies) loads only after a click. */
export function YoutubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 ring-1 ring-white/10">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-3 focus-visible:outline-main focus-visible:-outline-offset-3"
          aria-label={`Пусни видеото: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-[1.08] object-cover transition-transform duration-700 group-hover:scale-[1.12]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
          <span className="absolute left-5 bottom-5 flex items-center gap-3 text-left text-white md:left-7 md:bottom-7">
            <span className="flex size-14 items-center justify-center rounded-full bg-main text-black shadow-[0_0_40px_-6px_var(--main)] transition-transform group-hover:scale-110 md:size-16">
              <Play className="size-6 translate-x-0.5 fill-current" />
            </span>
            <span className="text-sm font-bold md:text-base">
              Гледайте клипа
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
