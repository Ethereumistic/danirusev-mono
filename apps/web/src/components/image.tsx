import type { ComponentProps } from 'react'
import manifest from '@/features/landing/media-manifest.json'

const assets: Readonly<Record<string, string>> = manifest

export function mediaUrl(src: string) {
  return assets[src] ?? src
}

type ImageProps = Omit<ComponentProps<'img'>, 'src' | 'alt'> & {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
}

/** Native local images; fill containers retain the source layout and aspect ratio. */
export function Image({
  src,
  alt,
  fill,
  priority,
  style,
  loading,
  ...props
}: ImageProps) {
  return (
    <img
      {...props}
      src={mediaUrl(src)}
      alt={alt}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      decoding="async"
      style={
        fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              ...style,
            }
          : style
      }
    />
  )
}
