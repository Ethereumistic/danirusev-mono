# Storefront and Echoray Commerce

The web app reads experiences from [Echoray Commerce](commerce/echoray-port.md) through a small server-only HTTP client. The private `@echoray/*` packages are not dependencies; their contracts are mirrored in `apps/web/src/lib/echoray/types.ts`. Online payments are paused: there is no cart, checkout or payment call.

## Routes

| Route                          | Data                                       | Notes                                                                                                                          |
| ------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `/experience/$slug`            | `getExperience(slug)`, `listExperiences()` | Legacy detail page port. Slugs: `drift-taxi`, `drift-rent`, `drift-mix`, `drift-event`, `drift-day`. Unknown slugs return 404. |
| `/experience/rent-a-drift-car` | none                                       | 301 to `/experience/drift-rent` (the old landing-card slug).                                                                   |
| `/vouchers/$token`             | `getVoucher(token)`                        | QR target of Echoray voucher PDFs. Validity only. `noindex`, `Cache-Control: private, no-store`.                               |

Landing cards link to `/experience/<slug>`, as on the legacy site. Their text and images stay in the landing fixture (`features/landing/data.ts`). On the detail page, the "Още Преживявания" strip shows the landing cards for the other experiences in the catalog list, priced from it.

## Environment

| Variable                     | Kind         | Purpose                                                                 |
| ---------------------------- | ------------ | ----------------------------------------------------------------------- |
| `ECHORAY_GATEWAY_URL`        | var          | Catalog gateway origin. Default `https://commerce.echoray.io`.          |
| `ECHORAY_STOREFRONT_ID`      | var (public) | Storefront integration ID. **Unset → fixtures.**                        |
| `ECHORAY_CONVEX_URL`         | var          | Echoray's Convex deployment URL, used for the voucher query.            |
| `ECHORAY_INTEGRATION_ID`     | var          | Integration that may call `voucherPage`. Defaults to the storefront ID. |
| `ECHORAY_INTEGRATION_SECRET` | **secret**   | That integration's secret. Server only.                                 |

Local development: copy `apps/web/.env.example` to `apps/web/.dev.vars` (ignored by Git) and fill in what you need. Both `pnpm dev` and `pnpm build` read it; a production build made with a `.dev.vars` present copies it into ignored `dist/server` for `preview`. Deployed Workers: set the vars per environment in the Cloudflare dashboard or `wrangler.jsonc` (`vars`), and the secret with:

```bash
pnpm --filter @danirusev/web exec wrangler secret put ECHORAY_INTEGRATION_SECRET
```

Ask the owner for the storefront integration (Echoray admin → Settings → Website and domain). Never commit the secret or log it. Values are read with `import { env } from 'cloudflare:workers'` in `lib/echoray/config.server.ts`; the declared variables live in `src/cloudflare-workers.d.ts`.

## Fixture/live boundary

`features/experience/data.ts` holds the TanStack Start server functions, the only data entry points:

- `getExperience(slug)` → `ExperienceDetail | null`
- `listExperiences()` → `{ source, experiences: { slug, price, inquiry }[] }`
- `getVoucher(token)` → `VoucherLookup` (`unconfigured` / `not_found` / `error` / `found`)

Server-only modules (`*.server.ts`, marked `@tanstack/react-start/server-only`):

- `lib/echoray/catalog.server.ts`: `GET <gateway>/v1/storefronts/<id>/products/<slug>?include=experience` and `…/products?include=experience&limit=50&sort=name-asc`. Mirrors the api-client checks: 10 s timeout, 512 KiB cap, version 2, storefront and kind match, snapshot age ≤ 35 s, gateway errors as `CatalogError` (`NOT_FOUND` → 404 page). Image derivatives resolve to `/v1/storefronts/<id>/media/…`.
- `lib/echoray/vouchers.server.ts`: `POST <convex>/api/query` with `{ path: "commerce/vouchers:voucherPage", args: { integrationId, secret, token }, format: "json" }` ([Convex HTTP API](https://docs.convex.dev/http-api/)). Returns only `{ shopName, typeName, state, expiresOn }`; tokens outside `[A-Za-z0-9._~-]{1,200}` are not sent.

When `ECHORAY_STOREFRONT_ID` is empty, the catalog functions answer from `lib/echoray/fixtures.ts`: `PublicDetailV2` objects generated on 2026-10-27 from `docs/commerce/catalog/*/product.json` (prices ×100 into minor units, product IDs from the `.echoray-shop.json` receipts). The app never imports `docs/` at runtime; regenerate the fixture by hand when the product files change. Without the voucher variables the voucher page shows "Проверката не е настроена" (plus a setup hint in development).

The products are still Echoray **drafts**, so the public catalog does not list them: with a storefront ID configured, the detail pages 404 and the "more experiences" strip is empty until the owner publishes them.

## Page mapping

`features/experience/model.ts` turns a catalog product into the page model:

- Title, base price (`minAmount`, minor units), gallery, `page.headline` (gallery badge and booking subtitle).
- `description`: the first paragraph is the quote and meta description; the first `Heading:` + `• item` block is the program (its heading becomes the tab name, e.g. Event's "Подходящо за").
- `specifications`: `Време`, `Автомобил`, `Мощност`, `Гуми` → stat tiles; `Локация` → its first comma part ("София"); `Цената включва` / `Цената не включва` → comma-separated lists.
- `experience.inquiry` → the label instead of a price, no total (Event: "по договаряне").

Site presentation that Echoray does not store (theme colour, header icon, booking-card pattern, program times/titles/icons) is in `features/experience/presentation.ts`, from the published snapshot. Program steps keep those labels only while Echoray has the same number of steps; otherwise they render numbered.

## Configurator

`features/experience/configurator.ts` mirrors Echoray's `evaluateConfiguration` for the live price (choice/colour amounts, flat amounts on other kinds, toggles, text length, date window, `per`/`minimum` rules over characters/lines). Unsupported kinds (uploads, sizes, numbers) are not rendered or priced. Display rules follow the legacy page:

- Toggles (`gopro`, `extra_tires`) are independent cards with `+N €`.
- `voucher` (or a choice with `digital`) is single choice, default the free one (digital). `location` (or a choice with `venue`) is single choice, default the first. `duration` is the three-column grid, default the first. Required choices cannot be deselected (the legacy page allowed clearing location/duration).
- `recipient`: text card, `maxLength` (16) enforced. The legacy detail page had no recipient field (it was in the cart), so this card is new.
- `preferred_date`: the legacy calendar card (react-day-picker via `@danirusev/ui/components/calendar`), offering only days inside `minDays`…`maxDays` and outside `disabledWeekdays`.
- Calendar (Echoray release `commerce-calendar`, not live on 2026-10-27): date inputs may carry `availability: true`, and detail then returns `experience.blockedDates` (`dates` blocked everywhere, `venues[].dates` at one venue key). For such inputs the picker also disables a day when Echoray's `dateOpen(blockedDates, day, venue)` is false, using the venue of the chosen location option (mirrored as `dateOpen`/`chosenVenue`/`dayAvailable`). The client does not reject unknown or new optional fields. The fixtures have no calendar-bound input, so no `blockedDates`.
- The booking card's total is base + surcharge; it is hidden for price-on-request products. The BGN line is omitted: the legacy utility stops showing BGN after 2026-08-09.

"Добави в Количката" opens the live site's call dialog ("Моля обадете се на телефон:" / "Временно онлайн резервациите не работят." / `tel:+359882726020`, with copy button). Answers are not stored or sent anywhere.

## Still open

- Storefront integration ID/secret and the Convex URL are not configured; publishing the drafts is the owner's call.
- Checkout answers (`configuratorAnswers`, digital-only contact checkout) are not wired while payments are paused.
- Experience gallery images load from the catalog's URLs (raw GitHub PNG masters in fixture mode); they are not mirrored locally.
- Old printed vouchers point at the legacy `/dash/verify/<id>` and only work in the legacy app.
