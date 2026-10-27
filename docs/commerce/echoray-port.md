# Echoray Commerce port

Commerce moves to [echoray.io](https://echoray.io): business **Dani Rusev 11** (`ks7c3n9k8akcx2rd19mph4cms18g47hy`), shop currency EUR, product file v1 / API v3. Payments stay paused; no payment provider is configured as part of this phase.

## Catalog as files

`catalog/` holds one folder per experience plus `collections.json`. Each `product.json` follows the `echoray-commerce-v2` product file format. Folders keep the CLI receipts (`.echoray-shop.json`, `.echoray-library.json`), so do not delete them.

```bash
cd docs/commerce/catalog
node ~/.codex/skills/echoray-commerce-v2/scripts/commerce.mjs push . --dry-run --profile=dani-rusev-11
node ~/.codex/skills/echoray-commerce-v2/scripts/commerce.mjs push . --profile=dani-rusev-11
```

Keys are in the owner's OS keyring (Commerce and Library keys, profile `dani-rusev-11`). Never copy them into the repository.

## Source and mapping

The content comes from the live danirusev.com public snapshot taken 2026-10-27 ([research/experiences.json](research/experiences.json), notes in [research/web-notes.md](research/web-notes.md)). The copy is verbatim Bulgarian.

| Handle | Name | Base price | Configurator |
| --- | --- | --- | --- |
| `drift-taxi` | Дрифт Такси | 155 € | voucher medium, location, GoPro +20 €, extra tires +80 €, recipient, preferred date |
| `drift-rent` | Карай Дрифтачка | 270 € | same as taxi |
| `drift-mix` | Дрифт Микс | 215 € | same as taxi |
| `drift-event` | Дрифт Събитие | price on request (`inquiry: по договаряне`, price 0; sold via draft orders) | voucher medium (both free), location, recipient, preferred date |
| `drift-day` | Дрифт Ден | 358 € | voucher medium, location, duration 2 h / 4 h +141 € / 6 h +348 €, GoPro, recipient, preferred date |

- The physical voucher costs +4 €, except on Event where it's included. Recipient is limited to 16 characters, as on the legacy checkout.
- Location is a single-choice input pointing at the shop venue `pista-kraynitsi`. Its only live venue is `Писта Крайници` (Sofia). The legacy fixture cities (София / Пловдив / Севлиево) are not offered on the live site.
- The live rent slug is `drift-rent`. The landing-page fixture still links to `rent-a-drift-car`, which 404s on the live site. Align it when the web app reads the catalog from Echoray.
- Description = live description + program. Specifications = the four stat tiles + location + included / not included.
- Products are **drafts**, inventory `made_to_order` (unlimited). The digital voucher choice is `digital: true` (ships nothing, contact-only checkout); fulfilment stays `delivery` until the owner sets up a collection point.
- `preferred_date` is a `date` input (1–365 days ahead), a preference confirmed by phone, not a booking.
- Images: at most 5 per experience, in live display order. The danirusev-assets PNG masters are only 500×500 px; the Event uploads from Payload media are 1920×2560.

## Vouchers and staff orders

Echoray's answer to the handoff is [echoray-vouchers-setup.md](echoray-vouchers-setup.md). Voucher types live in `vouchers/<handle>.json` (legacy stamp layout, 365 days, auto-issue off). Their templates are uploaded with `shop vouchers save-type vouchers/<handle>.json --template=/home/echo/Documents/danirusev/public/vouchers/<handle>.pdf --profile=dani-rusev-11`. Staff steps, in Bulgarian, are in [staff-vouchers.md](staff-vouchers.md).

State on 2026-10-27:
- Draft orders is on, and the venue `pista-kraynitsi` exists.
- Experience vouchers can't be switched on yet, because of an Echoray Features-page bug. The fix is in [handoff-echoray-vouchers-toggle.md](handoff-echoray-vouchers-toggle.md). The voucher types are written but not uploaded.

## Open gaps

The original Echoray brief is [handoff-echoray.md](handoff-echoray.md), and Echoray has implemented it. Still open:
- the bug above;
- wiring the storefront (catalog, configurator, inquiry, checkout answers and the public `/vouchers/$token` page), which is step 7 of the setup doc;
- the owner's decisions on the collection point, unavailable weekdays, location on the voucher artwork, and checkout behaviour while payments are paused.

Research behind it: [research/legacy-commerce.md](research/legacy-commerce.md) (legacy model, vouchers, exact PDF stamping) and [research/echoray-capabilities.md](research/echoray-capabilities.md) (Echoray source review with file references).
