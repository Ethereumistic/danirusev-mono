# Handoff prompt: Echoray Commerce for experience merchants + voucher/ticket pipeline

Copy everything below the line into a new agent session started in `/home/echo/Documents/echoray.io`.

---

You are extending **Echoray Commerce** in the monorepo at `/home/echo/Documents/echoray.io`. There are two workstreams:

- **A.** Catalog, checkout and order capabilities that experience/event merchants need.
- **B.** A voucher/ticket issuance engine: PDF templates with stamped fields, plus QR codes, manual issuance by staff, redemption, and a ready-but-off automatic issuance hook.

Both must work for **every** event/experience merchant, not one business. Keep the code simple and robust:

- small data models;
- atomic state changes;
- idempotent issuance;
- reuse of existing modules before new concepts;
- no speculative abstractions;
- small, reviewable commits.

Do A1 (manual orders with configurator answers) before B, because B links vouchers to orders. You may do the rest in any order that keeps each step shippable.

## Hard rules

- Read `/home/echo/Documents/echoray.io/AGENTS.md` and `/home/echo/Documents/echoray.io/packages/commerce/AGENTS.md` first and follow them, including the contract-change and release-order rules.
- **Do not change** `/home/echo/Documents/danirusev` (the legacy app) or `/home/echo/Documents/danirusev-mono` (the new storefront). Read them only.
- No payments work. The first merchant's online payments are paused.
- Don't deploy. Don't touch live business data except through a local or dev setup. Never print, store or commit keys or secrets.
- Enforce authorization on the server for every staff action. Browser-supplied business IDs, prices, statuses or user IDs are not authoritative.

## The first merchant

**Dani Rusev 11**, a drift school in Bulgaria. Business/shop ID `ks7c3n9k8akcx2rd19mph4cms18g47hy`, currency EUR.

- The admin is at `https://admin.echoray.io/ks7c3n9k8akcx2rd19mph4cms18g47hy`.
- Agents use the CLI profile `dani-rusev-11` (Commerce and Library keys are in the owner's OS keyring).
- Five products exist as **drafts**: `drift-taxi`, `drift-rent`, `drift-mix`, `drift-event` and `drift-day`.
  - Each uses `configurator` inputs `voucher` (digital / physical +4 €), `location` (one venue), `duration` (Day only), toggles `gopro` and `extra_tires`, and text inputs `recipient` (max 16) and `preferred_date`.
  - Drift Event is priced "по договаряне" and is stored as 0 € with a label.
- Enabled modules: Personalisation, Variant options, Collections, Stock, Promotions, Returns and Delivery. Draft orders, Digital passes, Made to order, Events and Booking are **off**.

## Files to read

### This merchant's port (danirusev-mono)

These files are on branch `claude/danirusev-commerce-backend-eae353`, in the worktree `/home/echo/Documents/danirusev-mono/.claude/worktrees/danirusev-commerce-backend-eae353`. Once that branch is merged, the same relative paths exist under `/home/echo/Documents/danirusev-mono`. Below, `$MONO` means whichever of the two exists.

| File                                                                                               | What it gives you                                                                                                            |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `$MONO/docs/commerce/echoray-port.md`                                                              | Mapping of legacy experiences → Echoray products, and the compromises made                                                   |
| `$MONO/docs/commerce/catalog/{drift-taxi,drift-rent,drift-mix,drift-event,drift-day}/product.json` | The live product files, with the configurator in use                                                                         |
| `$MONO/docs/commerce/catalog/collections.json`                                                     | The collection                                                                                                               |
| `$MONO/docs/commerce/research/echoray-capabilities.md`                                             | Source review of Echoray (this repo) with file:line references and a ranked gap list. **Start here.**                        |
| `$MONO/docs/commerce/research/legacy-commerce.md`                                                  | The legacy model, checkout, voucher lifecycle and redemption, and the **exact PDF stamping** (sections 3–5)                  |
| `$MONO/docs/commerce/research/web-notes.md`                                                        | Live-site behaviour: add-on selection rules, checkout fields, voucher terms (1-year validity, email link without attachment) |
| `$MONO/docs/commerce/research/experiences.json`                                                    | Full public data snapshot of the five experiences                                                                            |
| `$MONO/AGENTS.md`                                                                                  | The storefront's architecture: TanStack Start on Cloudflare Workers, Convex planned. Use it as the consumer's constraints.   |

### Legacy app, read only (`/home/echo/Documents/danirusev`)

| File                                                                                                             | Why                                                                                  |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `public/vouchers/drift-taxi.pdf`, `drift-rent.pdf`, `drift-mix.pdf`, `drift-event.pdf`, `drift-day.pdf`          | The five voucher templates: single page, 1440 × 810 pt, no form fields, 7–16 MB each |
| `public/fonts/Geist-Black.ttf`                                                                                   | The font used for stamping (Cyrillic)                                                |
| `public/fonts/Gagalin-Regular.otf`                                                                               | The brand wordmark font (not used in the PDFs)                                       |
| `app/api/vouchers/download/[id]/route.ts`                                                                        | The stamping code: pdf-lib + fontkit + qrcode, with coordinates                      |
| `lib/utils.ts`                                                                                                   | Theme colours per type and site URL resolution                                       |
| `app/api/vouchers/generate/route.ts`, `app/api/vouchers/redeem/route.ts`, `app/api/orders/confirm-date/route.ts` | Issuance and redemption API                                                          |
| `app/(dash)/dash/actions.ts`, `app/(dash)/dash/columns.tsx`                                                      | Staff order and voucher workflow: date confirmation, recipient edits, statuses       |
| `app/(dash)/dash/verify/page.tsx`, `app/(dash)/dash/verify/[id]/verify-voucher-client.tsx`                       | Staff scanner and verify/redeem screen                                               |
| `components/vouchers/voucher-card.tsx`, `app/(frontend)/vouchers/page.tsx`                                       | The customer voucher view                                                            |
| `lib/resend.ts`                                                                                                  | The voucher confirmation email                                                       |
| `collections/Products.ts`, `components/experience/experience-additional-items.tsx`                               | The experience and add-on model, and the selection rules                             |
| `app/(frontend)/checkout/checkout-form.tsx`, `app/(frontend)/terms/page.tsx`                                     | Checkout fields; voucher terms (sections 6–9)                                        |

The legacy stamps, identical on all five templates (PDF points, origin at bottom-left):

- **Recipient name:** uppercase, Geist Black 78 pt, white, x 510, y 109.5. No wrapping or shrinking.
- **Expiry:** `ВАЖИ ДО: dd.mm.yyyy` (bg-BG), uppercase, Geist Black 18 pt, right-aligned to x 1400, y 55, in the type colour: taxi `#FFC106`, rent `#39B6FF`, mix `#D0F61A`, event `#FB3640`, day `#97579E`.
- **QR:** 150 × 150 pt at x 1250, y 630, black on white, linking to the verify URL.

The templates have the location "Севлиево / Трявна" and durations printed on them, which can contradict the purchased options. Show this to the merchant in the layout editor.

### Echoray source (this repo); the review cites exact lines

- **Domain:**
  - `packages/commerce/src/` — `index.ts`, `catalog.ts`, `configurator.ts`, `product-file.ts`, `lines.ts`, `modules.ts`, `templates.ts`, `documents.ts`, `after-sale.ts`, `events.ts`, `booking.ts`, `public-catalog.ts`.
  - `packages/api-client/src/public-catalog.ts`.
- **Backend (`packages/core-backend/convex/`):**
  - `commerce/` — `catalog.ts`, `draftOrders.ts`, `events.ts`, `booking.ts`, `credit.ts`, `notifications.ts`, `invoicePdf.ts`, `library.ts`, `publicCatalog.ts`, `shop.ts`, `access.ts`, `api.ts`.
  - `lib/documentPdf.ts` (pdf-lib + Noto fonts).
  - `pay/commerce.ts`, `http.ts`.
  - `qr/` — `codes.ts`, `schema.ts`, `analytics.ts`.
- **Commerce component modules (`packages/core-backend/convex/components/commerce/modules/`):**
  - `catalog/{schema,products}.ts`
  - `draftOrders/{index,drafts}.ts`
  - `digitalPasses/{index,passes}.ts`
  - `events/events.ts`
  - `booking/index.ts`
  - `credit/{index,schema}.ts`
  - `orders/{schema,checkout,lib}.ts`
- **QR:** `packages/qr/src/{types,render,browser}.ts`, `apps/echoray-qr/src/worker.ts`.
- **UI:** `packages/ui/src/blocks/ticket-pass.tsx`, `packages/ui/src/blocks/commerce/` (draft orders, events, booking blocks).
- **Files:** `apps/echoray-files/src/contracts.ts` (Library private files and plan limits).
- **Storefront reference adapter:** `apps/echoray-storefront/src/lib/gateway.server.ts`, `apps/echoray-storefront/src/routes/api.shop.ts`.

### Agent skills to update alongside the code

- `/home/echo/.codex/skills/echoray-commerce-v2/` — `SKILL.md`, `scripts/commerce.mjs`, `references/{cli,product-file,configurator,api,catalog-structure,images,maintenance}.md`, `schema/product.schema.json`, `examples/`.
- `/home/echo/.codex/skills/echoray-library/` — `SKILL.md`, `scripts/library.mjs`, `references/uploads.md`.

## Workstream A: experience-merchant capabilities (priority order)

Verify each item against the source first. If something already exists, wire it up instead of duplicating it.

1. **Staff manual orders for configurable products.** Draft orders currently reject configurator inputs and required questions.
   - Staff must be able to choose a product, fill in its configurator answers and get a correctly priced, snapshotted line. Reuse the configurator evaluator and the order snapshot.
   - Allow contact-only drafts (no postal address) when nothing ships.
   - Add explicit `complimentary` / `offline` / `imported` issuance modes, so staff don't have to fake a cash or bank payment.
2. **Fulfilment that depends on the answer.** A digital voucher doesn't ship, but a physical one is delivered or collected. Pick the simplest sound model: per-choice fulfilment on a configurator choice, or a medium variant option with per-variant fulfilment exposed in the product file. Checkout asks for an address only when something ships.
3. **Price on request.** Add an inquiry-only product state: no price shown, checkout blocked, contact/inquiry action instead. It should be ready for the planned `quotes` module to take over. Expose it in the product file, the skill and the public catalog.
4. **A `date` configurator input kind.** Optional `min`/`max` offsets and disabled weekdays, stored as an ISO date in the snapshot. It is a preference, not a reservation. Update the validator, storefront renderer, schema, docs and skill.
5. **Public catalog contract.** The cached REST catalog omits the configurator, type, attributes and categories. Add them as a versioned, backward-compatible extension, so an external TanStack Start storefront on Cloudflare Workers can render experiences. Document the client/gateway release order.
6. **Business venues.** Add a small list per business (name, city, address, optional maps URL). Configurator choices and vouchers can reference it, and free-text custom locations stay allowed.
7. **Experiences preset.** A template preset that enables Personalisation, Draft orders, Collections and Digital passes together, set up through the UI only.

## Workstream B: voucher/ticket pipeline

1. **Voucher types, configured per business.** Each type has a handle and name (for example `drift-rent`, `drift-mix`, `drift-taxi`, `drift-event`, `drift-day`), optionally linked products, and a default validity of 365 days.
   - Each type has a versioned **PDF template** and a **field layout**: field → page, x, y, font, size, colour, align, uppercase, max width with auto-shrink.
   - Fields: recipient, expiry, location, code, QR, type name, issue date, optional add-ons.
   - Provide a staff layout editor with a live preview.
   - Templates are **private** and can be ~16 MB. The Library free plan only takes images, and commerce `lib:` references require public images, so choose and record a private storage path.
2. **Voucher records.** Each record holds:
   - business, type, a unique human-readable code (unambiguous alphabet) and a signed QR token;
   - recipient, location (a venue or custom text), `issuedAt`, `expiresAt` (default issue + 365 days, editable at issue time);
   - a snapshot of the template version and stamped values;
   - source (manual or order line, with idempotency key), issuer, status (`active` / `redeemed` / `void`, with `expired` computed server-side) and an audit trail.

   Redemption is atomic and single use, and records who redeemed it and when. Void and restore are allowed. An expired voucher can't be redeemed.
3. **Manual issuance UI (staff).** Fields: name on voucher, expiry (default +365 days or a chosen date), location (venue picker or custom input), voucher type, and an optional order or draft link.
   - Issue → code + QR + stamped PDF → download, reprint, and optionally email it through the existing notification and mail gates.
   - Add a list view with search, status filter, reprint and void.
4. **QR + verification.**
   - The QR encodes a URL that the **existing staff scanner** understands (the digital-pass `/passes/<token>` pattern), or extend the scanner. If you use `echoray-qr` dynamic short links, the scanner must resolve `qr.echoray.io`.
   - Scanning never redeems by itself: staff confirm.
   - The public verify page shows only the validity state, never customer data.
5. **Automatic issuance hook (built, off by default per type).** When a paid or completed order line belongs to a product linked to a voucher type, issue one voucher per unit. It must be idempotent per line and unit, take `recipient` and `location` from the configurator answers, and attach the vouchers to the order.
6. **Agent/API surface.** Add agent-API operations and `echoray-commerce-v2` CLI commands: list types, issue, get, void, reprint. Document them in the skill references.

Generate PDFs in the backend with the existing `pdf-lib` + Cyrillic font setup. Check memory and runtime limits for large templates.

## Done means

- **Tests:**
  - A: configured draft orders and pricing, contact-only drafts, inquiry-only checkout refusal, the date input, and catalog contract compatibility.
  - B: issuance idempotency, code uniqueness, atomic redeem and double-redeem refusal, expiry, void/restore, and golden-coordinate stamping on one template.
- Lint, typecheck and tests pass for the touched packages. No deploys.
- Verify the Dani Rusev setup locally: five voucher types with their templates and the legacy layout, and one sample PDF per type rendered for visual review (save the PDFs and list their paths).
- The product file schema, skills, references and examples are updated for every new field and command.
- **Final report:**
  - what changed;
  - data models, endpoints and skill commands;
  - contract or version changes and the release order;
  - the storage decision;
  - staff steps for issuing a voucher;
  - what is left before automatic issuance can be switched on;
  - the exact edits the danirusev catalog files should get (inquiry flag on `drift-event`, `date` input for `preferred_date`, medium-based fulfilment).
