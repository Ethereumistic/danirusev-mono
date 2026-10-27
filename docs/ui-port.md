# Landing page parity port

The required direction is a 1:1 visual port of the legacy landing page. The first scaffold's simplified composition has been replaced. Do not redesign the landing page or remove its original effects to reduce code.

## Reference and typography

The reference is the sibling `../danirusev` source and the public page at [danirusev.com](https://danirusev.com), captured on 2026-10-27.

The actual deployed reference uses the system sans-serif stack (including bold/italic navbar text and headings), not the separate Geist Black file introduced by the first scaffold. The wordmark uses the full original Gagalin OTF, including its outline and responsive DR11 abbreviation. The original OKLCH color tokens, Tailwind classes, breakpoints, spacing, and button variants are retained.

## Sections and behavior

1. Original sticky navbar: about/experience links, disabled shop/subscription items, cart, login button, and mobile sheet.
2. Image-first video hero with the original Bulgarian text, 64px CTA, staggered entrance, and animated scroll indicator.
3. Original introduction and three alternating feature galleries: machines, safety, and memories.
4. Five hardcoded experience cards with original overlay layout, themed buttons linking to the detail pages, hover states, rotating location labels, and desktop carousel/mobile grid.
5. Original three booking steps and reveal timing.
6. Testimonials copied from the published reference as fixtures, with their original carousel and presentation.
7. Original biography, portrait carousel, badge transitions, and YouTube carousel. Video metadata is a fixture snapshot; no feed service is called.
8. Original footer and expanding floating phone control.

The simplified gift block, FAQ, and experience filters are removed. Active CMS banners were not visible in the reference snapshot, so none are invented.

## Animation implementation

Use [Motion's lightweight React pattern](https://motion.dev/docs/react-reduce-bundle-size):

- `motion/react-m` components, with `LazyMotion` and a separate dynamic `domAnimation` feature chunk.
- Original entrance delays, viewport reveals, transitions, and hover interactions.
- `MotionConfig reducedMotion="user"`, reduced-motion-aware video, rotating text, and carousel autoplay.
- A no-JavaScript fallback restores visibility of server-rendered animated content.
- Hero video has an accessible pause/resume control visible on hover/focus. It also starts correctly when the SSR poster finishes loading before hydration.
- Carousels use Embla with cleanup of event listeners. No layout/drag Motion feature bundle is loaded.

## Fixture boundary

`data.ts` owns the experience fixtures. `public-content.json` contains the published testimonial/video snapshot. `media-manifest.json` maps original public URLs to locally stored assets.

No database, CMS client, authentication provider, payment integration, feed request, or Convex backend is installed. Prices and available dates are not live. Experience cards link to `/experience/<slug>` like the legacy site; the detail pages are described in [storefront-echoray.md](storefront-echoray.md). The [contact page](contact-port.md) is now ported at `/contact`. Auth/legal links retain original route paths; their destination pages are outside this port.

## Comparison and verification

At 1440×1000, measured header, wordmark, hero heading, subtitle, and main CTA rectangles, fonts, and colors match the reference. Experience, booking, testimonial, biography, and YouTube headings match their reference vertical positions and type styles after transitions settle. At 390×844, the hero heading matches the reference's 343×144 box and 48px italic 900 typography.

For reproducible comparisons, pause both hero videos at the same time, use the same viewport, reset each carousel to its first slide, scroll through reveals, and let transitions finish. Animated content cannot be compared reliably using arbitrary screenshot timing.

Comparison captures and transient audit files live under ignored `output/playwright/`. The source project is unchanged.

Interaction checks passed for the mobile sheet, gallery arrows, experience preview dismissal and focus return, reduced-motion video behavior, and overflow at 320/390/768/1440 pixels. Lint, strict type checks, the production build, and Wrangler deployment packaging passed with no backend bindings.

The exact reference styling retains its small gallery-dot spacing and low-contrast footer labels. Axe reports target-size/contrast findings for these legacy visuals; this port does not claim full WCAG conformance. Preserve that distinction when reporting verification.

The toolchain still emits the existing upstream `vite:css-post` sourcemap warning; it does not fail the production build or Worker packaging.
