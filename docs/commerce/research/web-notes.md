# Live experience snapshot — danirusev.com

Captured on **2026-10-27**, approximately 16:47–16:56 UTC (Europe/Sofia: UTC+2). The precise output-generation timestamp is in each JSON object's `captured_at_utc`. This is a snapshot of publicly exposed content and client behavior, not a record of a completed purchase.

## Coverage and discovery

`experiences.json` contains **all five published experience products**, in the live home listing's display order. The full public catalog reports six products: these five experiences and one physical `Test 1` / `test-t-shirt` product, which is outside scope. Both API queries report one page of results; no pagination was omitted.

| Title, verbatim | Current slug | Displayed base price | Displayed duration | Gallery images |
| --- | --- | --- | --- | --- |
| Дрифт Такси | `drift-taxi` | 155 € | 60 мин | 4 |
| Карай Дрифтачка | `drift-rent` | 270 € | 60 мин | 4 |
| Дрифт Микс | `drift-mix` | 215 € | 60 мин | 5 |
| Дрифт Събитие | `drift-event` | ПО ДОГОВАРЯНЕ | ~4 часа | 12 |
| Дрифт Ден | `drift-day` | 358 € | ЦЯЛ ДЕН | 4 |

Discovery sources:

- [Home / experience listing](https://danirusev.com/#drift-experiences). The complete product objects are embedded in streamed Next.js React Server Component (RSC) payloads, even when the listing is streamed after the initial shell.
- [Shop](https://danirusev.com/shop) redirects to the home page. Shop and subscription navigation are marked with a lock.
- [Sitemap](https://danirusev.com/sitemap.xml) lists only the root, contact, terms, privacy, and cookies pages. It does **not** enumerate experience URLs. Its entries carry a 2026-06-08 last-modified value; this is not the snapshot date.
- [Robots file](https://danirusev.com/robots.txt) identifies the sitemap.
- [Public experience API](https://danirusev.com/api/products?where%5BproductType%5D%5Bequals%5D=experience&limit=100&depth=2): `totalDocs: 5`, `totalPages: 1`.
- [Public complete catalog API](https://danirusev.com/api/products?limit=100&depth=2): `totalDocs: 6`, `totalPages: 1`.

The supplied old [rent-a-drift-car URL](https://danirusev.com/experience/rent-a-drift-car) does not resolve to an experience. Its streamed response has HTTP 200 but an explicit `NEXT_HTTP_ERROR_FALLBACK;404` digest and `noindex`; it does not redirect to `drift-rent`. The current rental page initially returned a transient HTTP 502 and succeeded on retry.

## Product sources and fidelity

- [Дрифт Такси](https://danirusev.com/experience/drift-taxi)
- [Карай Дрифтачка](https://danirusev.com/experience/drift-rent)
- [Дрифт Микс](https://danirusev.com/experience/drift-mix)
- [Дрифт Събитие](https://danirusev.com/experience/drift-event)
- [Дрифт Ден](https://danirusev.com/experience/drift-day)

Each page's complete product was extracted from its RSC data, including React property-path references such as `$5:props:children:...`. Resolving those references produced product objects **identical to the public API objects for all five experiences**, including every gallery, program, inclusion, exclusion, location, and add-on entry. Saved resolved objects are in `evidence/product-<slug>.json`.

Bulgarian copy is preserved without translation, spelling correction, model-name correction, or rewritten descriptions. This includes `BMW E46 V6`, source capitalization, English strings already on the site, and the leading space in the Mix program's ` Интензивно возене на трасе.` description. `raw_public_product` retains the entire product record as exposed publicly, including IDs, timestamps, visual settings, nulls, and empty strings. The more accessible fields duplicate the relevant content with English keys.

`headline` records the visible H1. There is no separate headline field or additional long-form description in the live data or legacy schema. `description_paragraphs`, the full program, and `page_paragraphs` capture the available descriptive copy. The UI wraps the main description in quotation marks; the raw description does not contain those wrapper quotes.

The actual HTML `<title>` has a repeated brand suffix, for example `Дрифт Такси | Dani Rusev 11 | Dani Rusev 11 - Екстремни Преживявания`. This is preserved in `seo.title`. The shorter Open Graph title, meta description, canonical URL, all meta fields, and JSON-LD are captured separately. The JSON-LD says `InStock`; that does not establish calendar availability or a working purchase flow.

## Prices, selections, and availability

All numeric prices rendered at capture are in **EUR (€)**. No BGN value is currently displayed. The live price utility and legacy source stop rendering the converted BGN amount after `2026-08-09`; therefore no BGN conversion has been invented for this snapshot. JSON-LD still identifies EUR for the event's null-priced offer.

There are **25 option/add-on entries** across the five products. Each entry preserves its name, description, original nullable price, display behavior, group, selection default, and ability to combine selections:

- `standard` options are independent toggles. Multiple different standard add-ons can be selected together, but there is no per-add-on quantity selector. GoPro is 20 €; the extra two tires are 80 € where offered. They start unselected.
- `voucher`, `location`, and `duration` each permit one selection within their respective group. With fresh client state, the first location and first duration are selected, and the first voucher with a null/zero price is selected. Here that voucher is `Ваучер Дигитален`.
- Defaults were verified in the **live JavaScript**, not assumed from database order alone. Previously saved client state can preserve different choices. Server HTML precedes these client initialization effects and therefore does not initially render the selected-location summary.
- Positive add-on prices display as `+N €`. Null prices generally display no numeric price. Duration choices explicitly display `+0 €` when their stored price is null. The sidebar's calculator treats null surcharges as zero; JSON preserves the original null alongside that calculator increment.
- The physical voucher costs 4 € on Taxi, Rent, Mix, and Day. Its price is **null** on Event, with no price shown. This is not a separate promise that an Event physical voucher will be delivered free of charge: the whole package is priced by agreement.
- No extra-lap, extra-passenger, or selectable-car options are present. The extra-tire add-on must not be renamed or represented as a fixed number of extra laps.

Every product's location summary says `София`; its only selectable venue is `Писта Крайници`, with [this Maps URL](https://maps.app.goo.gl/WRbAdxrXFM2ZaM8Z7). These are retained as the site's two labels, without geographically reconciling them. No alternate venue, nonzero location surcharge, location-dependent price, or location-specific availability schedule is published. Rent's location has the raw description `Начинаещи`, but the compact location card hides descriptions; that distinction is marked in JSON.

The calendar is a single preferred-date selector, not a published inventory of available sessions. The site says: `Избраната дата е предпочитана и ще бъде потвърдена по телефон след покупката.` No time-slot selection or per-location schedule was found.

**Day duration discrepancy:** the headline specification says `ЦЯЛ ДЕН`, while its selectable durations are `2 Часа` (+0 €), `4 Часа` (+141 €), and `6 Часа` (+348 €). The default is two hours. With no other paid options, the arithmetic totals are 358 €, 499 €, and 706 € respectively; these calculated values are explicitly separated from displayed base prices in JSON. They were calculated from public values, not obtained by submitting an order.

**Event is priced by agreement**, not 0 €. Its program tab is `Подходящо за`, and its program entries are occasion categories rather than a timetable. `Депозит за щети` is explicitly not included, but no amount or further deposit conditions are published.

## Current booking limitation and checkout

The current public experience JavaScript connects `Добави в Количката` to a contact dialog, rather than to cart insertion. Its exact copy is:

> Моля обадете се на телефон:
>
> Временно онлайн резервациите не работят.
>
> +359 882726020

The same bundle is used for all five experiences. The page still displays `* Плащането се извършва ОНЛАЙН *` and `За наложен платеж се обадете:` followed by `+359 88 272 6020`. Both the page's normal payment copy and the temporary-reservations notice are recorded; neither was silently treated as superseding the other.

[Checkout](https://danirusev.com/checkout), requested without a cart, exposes only the empty-cart screen. **A populated checkout was not rendered or submitted.** The form fields below are extracted from the publicly served checkout JavaScript and corroborated against the legacy component. They are distinguished in JSON from directly observed empty-cart copy. A browser inspection attempt was unavailable in this environment; the extraction and behavior checks use curl, HTML, RSC, and public bundles.

| Field ID | Verbatim label / placeholder | Requirement or condition |
| --- | --- | --- |
| `fullName` | Име и Фамилия | Required |
| `email` | Email | Required; email input |
| `phoneNumber` | Тел. Номер | Required |
| `voucher-name-{cartItemId}` | Име на ваучера / Име на получателя (по избор) | Optional, per experience cart item; maximum 16 characters; also exists in the cart UI |
| `address` | Адрес | Required when a physical product or physical voucher is present |
| `city` | Град | Required under the same condition |
| `postalCode` | Пощенски код | Required under the same condition |
| `country` | Държава | Shown under the same condition, disabled, fixed display `България` |
| `terms` | Прочетох и се съгласявам с Общите условия и Политиката за поверителност на Dani Rusev 11. | Required checkbox, initially false, inside the legal dialog |

There is no separately exposed recipient-email, gift-message, courier-office selector, coupon field, age field, or driving-licence field in the inspected pre-payment checkout component. Existing profile information can prefill personal details. No authentication was performed; the public terms explicitly allow registered and unregistered purchasers.

The live checkout says `Сигурно плащане чрез myPOS`; the legacy checkout uses Stripe. The live bundle controls are `Продължи към плащане →`, then a legal dialog with `Потвърди и Продължи →`. It contains a separate `Потвърди Заявка →` path for a zero subtotal. These were inspected as source code only. No create-session endpoint was called and no payment iframe or card-entry fields were opened. The page's shipping cost label is only `При плащане`, so no shipping amount is known.

## Gift vouchers and participation conditions

Sources: [public terms](https://danirusev.com/terms), the product options, the cart and checkout bundles, and the public shell of [Моите Ваучери](https://danirusev.com/vouchers). Full relevant terms paragraphs are copied verbatim into each product's `gift_voucher_flow` and `requirements_and_restrictions`.

- Terms clause 6.6 gives validity as **one year from the order date**. Clauses 6.7–6.8 say expired vouchers cannot be booked and validity cannot be extended.
- Clause 6.5 gives **3–5 working days** for physical delivery or electronic sending.
- Physical vouchers can be couriered to an address or courier office, or collected from a merchant representative (6.1). The fee depends on courier/service tariffs (6.2), rather than a published fixed delivery fee.
- Clause 8.1 says the merchant confirms the event date, then generates the voucher in the customer's account. The separate paragraph following 8.1 explicitly promises an **email notification with a link to the particular voucher, without a file attachment**. Do not describe this as an emailed PDF.
- No public sample voucher or unauthenticated PDF-download link was found. The public `/vouchers` shell provides the headings but no voucher details. A post-purchase voucher's actual layout, PDF/print capability, exact expiry implementation, and email execution were not observed.
- Clauses 7.1–7.5 cover withdrawal/cancellation and are preserved. This report records the published terms without independently interpreting them as legal advice.
- Section 9 requires every participant to sign an `Информирано съгласие` document on arrival, and says refusal means no participation and no refund. The actual on-site document is not public.
- No numeric age, minimum height, weight limit, or general licence requirement is published on these product pages. Unknown values are `null`, not claims of unrestricted participation. Day explicitly says it suits people `без опит и без шофьорска книжка`; that statement is preserved for Day only.
- No FAQ entries or separate HTML specification tables were found on the five product pages, in their product payloads, or in the relevant legacy schema. The visible four-item specification grid is captured as `displayed_specifications`.

## Gallery URLs and image limitations

There are **29 gallery entries**, all captured in display order and matched against the first N main-slide image URLs in each page's HTML. `main_image_url` is the first entry. `gallery_image_urls` provides the URL-only sequence; `gallery` additionally retains order, hero flag, rendered alt text, CMS alt text, media metadata, and HTTP-check results.

URLs are the **original image targets used by the live site**, with Next.js `/_next/image?...&w=...&q=...` resizing wrappers removed. Many targets are already WebP assets under `/opt/`. The site does not expose a guaranteed higher-resolution camera original for those images, and none has been guessed by changing paths or extensions.

Important ordering/source details:

- Mix starts with `mix/2.webp`, then `mix/1.webp`, followed by 3, 4, 5.
- Taxi starts with `taxi/0.webp`, followed by 2, 3, 4; do not insert an assumed `1.webp`.
- Event has twelve images. Positions **2, 5, 7, and 11** are `type: upload` and display the media URLs `/api/media/file/2.webp`, `/api/media/file/7.webp`, `/api/media/file/6.webp`, and `/api/media/file/5.webp` respectively. Their stale CDN `url` fields are retained as `cms_url_field`, but are not substituted for the image actually displayed. These upload records report 1920 × 2560 pixels.

HEAD checks succeeded for 27 targets. The following two targets returned HTTP 403 on both HEAD and a follow-up ranged GET, with `Package size exceeded the configured limit of 50 MB.` from jsDelivr:

- [Day, position 2](https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/experiences/day/2.webp)
- [Event, position 10](https://cdn.jsdelivr.net/gh/Ethereumistic/danirusev-assets/opt/experiences/event/10.webp)

The captured URLs have been preserved despite those failures. This does not prove the site's Next.js image cache cannot still serve a cached version. The gallery check log and the two short error responses are saved under `evidence/`. One Event upload HEAD check returned a transient 502 and then 200 on retry.

## Legacy source cross-check (read only)

The source tree at `/home/echo/Documents/danirusev` was only read. Relevant files:

- `collections/Products.ts`: product type, title, slug, price, comparison price, description, hybrid gallery; experience subtitle, duration, locations, car/horsepower/tires, program, included/notIncluded, add-ons with standard/location/voucher/duration types, map links, custom tab names. There is no dedicated FAQ, age/licence, separate headline, or product-specific SEO field.
- `app/(frontend)/experience/[slug]/page.tsx`: product page structure and `generateMetadata`; description becomes meta description, title is derived from the product title.
- `app/(frontend)/shop/[slug]/page.tsx` and `product-client.tsx`: shop product route is restricted to physical products; this is not the experience rendering path.
- `lib/api/products.ts`: collection queries and relationship depth.
- `lib/utils/resolve-image.ts`: `type: upload` resolves `media.url`; `type: url` resolves `url`.
- `components/experience/experience-gallery.tsx`, `experience-stats-grid.tsx`, `experience-scrollable-tabs.tsx`, `experience-program.tsx`, and `experience-included.tsx`: visible gallery, specifications, tabs, program, inclusion/exclusion presentation.
- `components/experience/experience-additional-items.tsx`: grouping, defaults, single versus multiple selection, hidden compact-card descriptions, preferred-date selector.
- `components/experience/experience-booking-sidebar.tsx`: price addition and legacy cart handling. **Live code differs:** its button currently opens the temporary-unavailable phone notice.
- `app/(frontend)/checkout/checkout-form.tsx`: fields, recipient-name limit, conditional address, terms step. **Live code differs:** myPOS replaces legacy Stripe.
- `lib/utils.ts`, `formatBGN`: date cutoff for BGN display; verified against the live utility bundle.

Legacy behavior is not treated as proof of current deployed behavior. Defaults, image resolution, currency logic, temporary booking restriction, and checkout provider were checked against the deployed HTML/JavaScript.

## Public JavaScript evidence

- [Experience/gallery/options/booking bundle](https://danirusev.com/_next/static/chunks/4960-eeca712243c05c5b.js)
- [Checkout page bundle](https://danirusev.com/_next/static/chunks/app/(frontend)/checkout/page-14f95085b4285160.js)
- [Cart/layout bundle](https://danirusev.com/_next/static/chunks/2171-050e2ce5f76f2b93.js)
- [Price utility bundle](https://danirusev.com/_next/static/chunks/7098-bc179bc9e823b270.js)

These hashed URLs identify the deployment inspected and can change with future releases. Local copies are in `evidence/js-*.js`.

## Reproducibility and unknown values

`evidence/` holds fetched HTML and response headers, sitemap/robots, both catalog responses, decoded RSC text/JSON, resolved product objects, bundles, extracted text, and gallery checks. `extract.py` and `build_snapshot.py` are local extraction helpers. `experiences.json` is the requested standalone array and includes all shared voucher/checkout information in each object.

`null` means absent/unpublished/unknown unless it is explicitly a raw CMS null; it is not a claim of zero price, no restriction, or no requirement. Empty option/FAQ arrays mean no such content was found in the inspected live sources. `raw_public_product.stock: 0` is a shared physical-stock field exposed for these experience records, not evidence that the experience is sold out. Fresh-client selection flags describe code initialization, not an observed completed booking.

All external requests were read-only GET/HEAD requests. No forms, orders, registrations, booking requests, messages, or payments were submitted; no cart item was added. All written files are inside the current directory.
