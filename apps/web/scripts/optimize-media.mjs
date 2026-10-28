// Generates responsive WebP widths for public/media and records them in
// src/features/landing/media-variants.json, which <Image> turns into srcSet.
// Requires ffmpeg/ffprobe with libwebp. Run: pnpm --filter @danirusev/web optimize:media
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const mediaDir = `${root}public/media`
const output = `${root}src/features/landing/media-variants.json`
const WIDTHS = [480, 960, 1600]
const VARIANT = /-\d+w\.webp$/

const probe = (file) =>
  execFileSync('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'stream=width,height',
    '-of',
    'csv=p=0',
    file,
  ])
    .toString()
    .trim()
    .split(',')
    .map(Number)

const variants = {}
for (const name of readdirSync(mediaDir).sort()) {
  if (!/\.(webp|jpe?g|png)$/.test(name) || VARIANT.test(name)) continue
  const [width, height] = probe(`${mediaDir}/${name}`)
  const stem = name.replace(/\.[^.]+$/, '')
  const widths = WIDTHS.filter((w) => w < width)
  // Always cap the largest variant so oversized masters are never served as-is.
  if (width > WIDTHS.at(-1)) widths.push(WIDTHS.at(-1))
  const unique = [...new Set(widths)].sort((a, b) => a - b)
  if (!unique.length) continue
  for (const w of unique) {
    const target = `${mediaDir}/${stem}-${w}w.webp`
    if (existsSync(target)) continue
    execFileSync('ffmpeg', [
      ...['-y', '-v', 'error', '-i', `${mediaDir}/${name}`],
      ...['-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libwebp'],
      ...['-quality', '74', '-compression_level', '6', target],
    ])
  }
  variants[`/media/${name}`] = { width, height, widths: unique }
}
writeFileSync(output, `${JSON.stringify(variants, null, 2)}\n`)
console.log(`${Object.keys(variants).length} images → ${output}`)
