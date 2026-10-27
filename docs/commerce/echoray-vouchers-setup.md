# Handoff: set up Dani Rusev 11 on Echoray Commerce (experiences, vouchers, staff orders)

Written 27 October 2026 by the agent that built these features in `/home/echo/Documents/echoray.io` (main `6dd4b378`, live in production as release `commerce-experience`). You are the danirusev-mono agent. This document is your whole brief: set up the shop through the CLI and skills where possible, through the admin in the browser where not, then wire the storefront in this repo.

## Ground rules

- **Shop:** Dani Rusev 11, business/shop ID `ks7c3n9k8akcx2rd19mph4cms18g47hy`, currency EUR. Admin: <https://admin.echoray.io/ks7c3n9k8akcx2rd19mph4cms18g47hy>.
- **CLI:** `node ~/.codex/skills/echoray-commerce-v2/scripts/commerce.mjs <command> --profile=dani-rusev-11 …` (below: `shop …`). Read `~/.codex/skills/echoray-commerce-v2/SKILL.md` and `references/{vouchers,configurator,product-file,cli}.md` first. The keys are in the owner's OS keyring; never ask for, print or store a key.
- **This is the live shop.** Products stay **drafts** unless the owner says to publish. Don't switch on automatic voucher issuing. Don't redeem vouchers. Void every test voucher you issue. Online payments are paused: no payment work.
- **Read only:** `/home/echo/Documents/danirusev` (legacy app, the templates and fonts live there) and `/home/echo/Documents/echoray.io`. Never edit echoray.io.
- **The catalog files** are on branch `claude/danirusev-commerce-backend-eae353` (worktree `.claude/worktrees/danirusev-commerce-backend-eae353`, `docs/commerce/catalog/<handle>/product.json`). Work on that branch (or on main once it's merged), following this repo's AGENTS.md.

## What Echoray now offers (all live)

| Feature | Where |
| --- | --- |
| Staff orders with personalisation answers; contact-only when nothing ships; completion as cash, bank transfer, paid another way, complimentary, or imported | Admin → Draft orders (module **Draft orders**) |
| Configurator choice `"digital": true` (ships nothing) and `"venue": "<key>"` | product.json `configurator` |
| `date` input (preferred day, not a booking): `minDays`, `maxDays`, `disabledWeekdays` | product.json `configurator` |
| Price on request: `"inquiry": { "label": "по договаряне" }` (no price shown, checkout refuses it, sell via a draft order) | product.json |
| Venues | `shop venues`, `shop venue …`; Admin → Settings → Venues |
| Vouchers: types with a private PDF template and a stamp layout, issue, list, void/restore, PDF reprint, redeem at the venue (scan or code, staff confirm) | `shop vouchers …`; Admin → Vouchers (module **Experience vouchers**) |
| Public catalog v2 (`include=experience`: type, attributes, categories, configurator, price on request) | `@echoray/api-client` `createPublicCatalogClient({ …, extensions: ['experience'] })` |
| Voucher verify page data (validity only) | Convex query `commerce/vouchers:voucherPage` |

## Step 1. Check the connection

```bash
shop shop --profile=dani-rusev-11      # must say "API version 4"
shop list --profile=dani-rusev-11      # drift-taxi, drift-rent, drift-mix, drift-event, drift-day (drafts)
```

If the API version is below 4 or the profile is missing, stop and tell the owner.

## Step 2. Switch on modules (browser; the CLI can't)

Admin → **Settings → Features**. Keep what is on (Personalisation, Variant options, Collections, Stock, Promotions, Returns, Delivery) and also switch on:

- **Experience vouchers** (vouchers, voucher types, Redeem)
- **Draft orders** (phone and in-person sales, complimentary and imported orders)

Leave Digital passes, Events, Booking and Made to order off (the Experiences template would turn Digital passes on; it isn't needed for open-date vouchers). Save, then reload: the sidebar shows **Draft orders** and **Vouchers**, and Settings shows **Venues**. Ask the owner to sign in if the browser isn't signed in; never enter a password yourself.

## Step 3. The venue

```bash
shop venue pista-kraynitsi --profile=dani-rusev-11 --name="Писта Крайници" --city="София" --maps=https://maps.app.goo.gl/WRbAdxrXFM2ZaM8Z7
shop venues --profile=dani-rusev-11
```

## Step 4. Product files (edit, dry run, push)

In each of the five `docs/commerce/catalog/<handle>/product.json`:

1. `voucher` input: add `"digital": true` to the `digital` choice:
   `{ "value": "digital", "label": "Ваучер Дигитален", "amount": 0, "digital": true }`
2. `location` input: add the venue to its choice:
   `{ "value": "pista-kraynitsi", "label": "Писта Крайници", "amount": 0, "venue": "pista-kraynitsi" }`
3. `preferred_date`: replace the text input with
   `{ "key": "preferred_date", "label": "Предпочитана дата", "kind": "date", "required": false, "minDays": 1, "maxDays": 365, "hint": "Избраната дата е предпочитана и ще бъде потвърдена по телефон след покупката." }`
   (drop `maxLength`). Ask the owner whether any weekday is never available; if so add `"disabledWeekdays": [1]` (0 = Sunday … 6 = Saturday).
4. `"fulfillment": ["delivery", "collection"]` (a printed voucher is delivered or collected; a digital one ships nothing).
5. `drift-event` only: add `"inquiry": { "label": "по договаряне" }` and keep `"price": 0`.

Keep the keys `recipient` and `location`: vouchers read the name and the place from them. Keep `"status": "draft"`.

```bash
shop push docs/commerce/catalog --profile=dani-rusev-11 --dry-run   # report the before → after list
shop push docs/commerce/catalog --profile=dani-rusev-11
shop get drift-mix --profile=dani-rusev-11                           # check the configurator came back as pushed
```

Update `docs/commerce/echoray-port.md` (the compromises it lists for date, fulfilment and the event price are now solved) in the same commit.

**Collection needs a rule:** with `collection` in `fulfillment`, a printed voucher can only be collected once the shop has a collection rule (Admin → Settings → Delivery: a collection point, e.g. "Писта Крайници", price 0). Ask the owner for the address and whether collection is wanted; otherwise keep `["delivery"]`.

## Step 5. Voucher types with the legacy templates and layout

Create these five files in `docs/commerce/vouchers/<handle>.json` (the legacy stamps: name in Geist Black 78 pt white at x 510 / y 109.5; expiry 18 pt in the type colour, right edge at x 1400, y 55; QR 150 pt at x 1250, y 630; PDF points from the bottom-left of the 1440 × 810 pt page):

```json
{
  "handle": "drift-taxi",
  "name": "Дрифт Такси",
  "products": ["drift-taxi"],
  "validityDays": 365,
  "autoIssue": false,
  "templateNote": "The artwork prints “Севлиево / Трявна” and a duration; the purchased location and duration may differ.",
  "layout": [
    { "field": "recipient", "page": 0, "x": 510, "y": 109.5, "size": 78, "font": "geist-black", "colour": "#ffffff", "align": "left", "uppercase": true },
    { "field": "expiry", "page": 0, "x": 1400, "y": 55, "size": 18, "font": "geist-black", "colour": "#ffc106", "align": "right", "uppercase": true, "text": "ВАЖИ ДО: {value}" },
    { "field": "qr", "page": 0, "x": 1250, "y": 630, "size": 150 }
  ]
}
```

The other four differ only in `handle`, `name`, `products` and the expiry `colour`:

| handle | name | products | expiry colour |
| --- | --- | --- | --- |
| `drift-taxi` | Дрифт Такси | `["drift-taxi"]` | `#ffc106` |
| `drift-rent` | Наем на Дрифт Автомобил | `["drift-rent"]` | `#39b6ff` |
| `drift-mix` | Дрифт Микс | `["drift-mix"]` | `#d0f61a` |
| `drift-event` | Дрифт Събитие | `["drift-event"]` | `#fb3640` |
| `drift-day` | Дрифт Ден | `["drift-day"]` | `#97579e` |

Use the product names as they are in the catalog files if they differ from this table. Then upload each with its template (7–16 MB each; they stay private, never in Library):

```bash
for t in drift-taxi drift-rent drift-mix drift-event drift-day; do
  node ~/.codex/skills/echoray-commerce-v2/scripts/commerce.mjs vouchers save-type docs/commerce/vouchers/$t.json --template=/home/echo/Documents/danirusev/public/vouchers/$t.pdf --profile=dani-rusev-11
done
shop vouchers types --profile=dani-rusev-11   # five types, each "template v1", auto off
```

The templates print "Севлиево / Трявна" and a duration; the `templateNote` makes the admin show that as a warning. Tell the owner: the location the customer bought (Писта Крайници) is not on the artwork unless a `location` field is added to the layout or the artwork is changed. Offer to add `{ "field": "location", … }` once they say where it should go.

## Step 6. Check the vouchers (then void the test ones)

```bash
shop vouchers issue drift-taxi "Тест Тестов" --venue=pista-kraynitsi --profile=dani-rusev-11
shop vouchers pdf <CODE> --out=/tmp/test-drift-taxi.pdf --profile=dani-rusev-11
shop vouchers get <CODE> --profile=dani-rusev-11      # prints the verify URL the QR opens
shop vouchers void <CODE> --reason="Setup test" --profile=dani-rusev-11
```

Open the PDF (or render it to PNG with `pdftoppm -png -r 40`) and check the name sits on the "ВАУЧЕР ЗА:" line, the expiry is bottom right in the type colour and the QR is top right. Do this for all five types, voiding each test voucher. Alternatively, in the browser: Admin → Vouchers → Voucher types → a type shows a live preview of the real PDF while you move fields.

## Step 7. Wire the storefront (this repo, `apps/web`)

The storefront is TanStack Start on Cloudflare Workers. Use the reference adapter `../echoray.io/apps/echoray-storefront/src/lib/gateway.server.ts` (integration ID + secret on the server only, HttpOnly cookies, `/api/shop`). Ask the owner for the storefront integration (Admin → Settings → Website and domain) and keep its secret in Worker secrets, never in the browser or the repo.

1. **Catalog:** `createPublicCatalogClient({ gatewayUrl: "https://commerce.echoray.io", storefrontId, extensions: ["experience"] })` from `@echoray/api-client`. Product detail then carries `experience.configurator`, `experience.inquiry`, `experience.type`, attributes and categories; cards carry `experience.inquiry`.
2. **Product page:** render the configurator with the shared block `@echoray/ui/blocks/product-configurator` (`ProductConfigurator`, `evaluate`, `configuratorAnswers`). It handles `date` inputs and computes the live price with the same engine as checkout. Keep the legacy add-on rules from `docs/commerce/research/web-notes.md`.
3. **Price on request** (`experience.inquiry`): show the label instead of the price, no add-to-cart, a contact action instead (the legacy site's contact/phone).
4. **Checkout:** send the answers as cart line `answers` (`{ key, value }`, from `configuratorAnswers`). When every line chose a digital option, send `method: "collection"` and an address with name, email and phone and empty street, city and postcode: the shop accepts contact details only. A printed voucher needs a full address and a delivery (or collection) rate. Payments are paused, so the checkout ends in "the shop will contact you" or stays hidden; ask the owner.
5. **Voucher page:** add a route `/vouchers/$token`. On the server call the Convex query `commerce/vouchers:voucherPage` with `{ integrationId, secret, token }` (`api.commerce.vouchers.voucherPage` in `@echoray/api-client`). It returns `null` (not a voucher of this shop) or `{ shopName, typeName, state: "active" | "redeemed" | "void" | "expired", expiresOn: "YYYY-MM-DD" }`. Show the state in Bulgarian (Валиден / Използван / Анулиран / Изтекъл) with the type and "Важи до dd.mm.yyyy". Never show more: the page is public. The QR codes on the PDFs open this route on the shop's site, so it must exist before vouchers go to customers.
6. **Legacy links:** the legacy QR pointed at `/dash/verify/<id>`. Old printed vouchers keep working only through the legacy app; tell the owner.

## Step 8. Hand the staff workflow to the owner

Write these in Bulgarian in `docs/commerce/staff-vouchers.md` (and show the owner):

- **Phone or in-person sale:** Admin → Draft orders → New draft → add the experience → fill in the personalisation (voucher type digital/printed, location, extras, name on voucher, preferred date) → customer name and email (an address only for a printed voucher) → Record payment → cash / bank transfer / paid another way. Then on the order: **Issue vouchers** → download the PDF or email it from Vouchers.
- **Gift or promotion:** same, completed as **Complimentary (free)**.
- **Vouchers sold in the old system:** Vouchers → Issue voucher (type, name, location, the original expiry date, a note with the old code), or a draft completed as **Imported**.
- **Event (по договаряне):** a draft order with the agreed price typed in.
- **At the track:** Vouchers → Redeem → scan with the phone camera or type the code → check name, type, expiry → **Redeem**. A second scan says when it was already used. Mistakes: open the voucher → Restore with a reason.
- **Reprint or correct a name:** open the voucher → Edit → Download PDF.

## What stays off

- **Automatic issuing** (`autoIssue`) stays off until online payments are back, the storefront voucher page is live and the owner asks. Then: `"autoIssue": true` in the type files and `shop vouchers save-type` again.
- **Emailing vouchers** works only when Echoray's shop mail is switched on for production; until then, download the PDF and send it yourself.

## Report back to the owner

List: modules switched on, the venue, the pushed product changes (dry-run list), the five types with template versions, the test vouchers (issued and voided) and how the PDFs looked, the storefront routes added, and every question still open (collection point, weekdays, location on the artwork, payments/checkout behaviour, old vouchers).
