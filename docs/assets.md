# Asset provenance

The current landing page uses the original project's public media and full wordmark font. No private customer records, database exports, or credentials were copied.

- `public/hero-poster.webp`: original legacy poster.
- `public/media/hero.mp4`: the original optimized video at `danirusev-assets@main/opt/hero/hero.mp4` (12.85 MB).
- `public/fonts/Gagalin-Regular.otf`: full original Gagalin font. The subset WOFF2 from the first scaffold is not used by the parity page.
- `public/media/*`: local copies of feature, experience, portrait, testimonial, and YouTube images. `src/features/landing/media-manifest.json` records every original URL and its local filename.
- `public/favicon.ico`, `public/og-image.jpg`: legacy public assets.
- Icons use the legacy lucide-react 0.517.0 set. The small local brand-icon definitions retain its ISC attribution.
- `public/fonts/geist-mono-latin.woff2`: the latin subset of Geist Mono served by danirusev.com (`/_next/static/media/f5271587012faf78-s.p.woff2`, captured 2026-10-27). It renders the experience page's program-time pills (`font-mono`), as on the reference. Geist is licensed under the SIL Open Font License 1.1 (Vercel).
- Experience detail galleries are not copied locally: they load the image URLs the catalog returns (Echoray media in live mode, the `danirusev-assets` PNG masters named in the fixture product files otherwise).
- Body/nav/headings use the deployed reference's system sans-serif stack. Inter and the separate Geist Black font introduced by the first scaffold are not used.

The source media repository is [Ethereumistic/danirusev-assets](https://github.com/Ethereumistic/danirusev-assets). YouTube thumbnail and channel-avatar URLs come from the published landing-page snapshot on 2026-10-27. Media is served locally; no YouTube feed or CMS is called at runtime.

Keep ownership/licensing terms of the original assets. Preserve image crops, fill-container aspect ratios, and hero video timing when checking parity. The hero is high priority; below-the-fold galleries load nearby slides rather than eagerly preloading all photos.
