# Handoff prompt: Echoray Commerce extensions for experience merchants

Copy everything below the line into a new agent session started in `/home/echo/Documents/echoray.io`.

---

You are extending **Echoray Commerce** (monorepo at `/home/echo/Documents/echoray.io`). Read its `AGENTS.md` files (root and `packages/commerce`) before you change anything, and follow their contract-change rules. Keep the code simple and robust. Use existing modules and patterns before adding new concepts, and keep each change small and reviewable.

## Why

The first experience merchant is the drift school **Dani Rusev 11** (business `ks7c3n9k8akcx2rd19mph4cms18g47hy`). It sells five experiences: Drift Taxi, Drift Rent, Drift Mix, Drift Event and Drift Day. Each one is sold as an open-date experience with priced add-ons. Its catalog lives as product files in `/home/echo/Documents/danirusev-mono/.claude/worktrees/danirusev-commerce-backend-eae353/docs/commerce/catalog/*/product.json` (branch `claude/danirusev-commerce-backend-eae353` of the danirusev-mono repo). Those files show how the products use `configurator` today. Read these first:

- `docs/commerce/echoray-port.md` in that repo, for the mapping and its compromises.
- `docs/commerce/research/echoray-capabilities.md`, for a source review of Echoray with file:line references. It covers products, configurator, booking, events, digital passes, gift cards, draft orders and the public catalog.
- `docs/commerce/research/legacy-commerce.md` and `research/web-notes.md`, for what the legacy site did.

Online payments are paused for this merchant. A separate agent builds the voucher/ticket PDF + QR pipeline (`handoff-voucher-pipeline.md`), so **do not build vouchers here**. Build what that pipeline and the storefront need from the catalog and orders.

## Gaps to close (in priority order)

Verify each one against the source before you build it. If something already exists, wire it up instead of duplicating it.

1. **Staff manual orders for configurable products.** Draft orders currently reject configurator inputs and required questions (`modules/draftOrders/index.ts`, `drafts.ts`). Staff must be able to choose an experience, fill in its configurator answers (voucher medium, location, duration, add-ons, recipient name) and get a correctly priced, snapshotted order line. Reuse the configurator evaluator and the existing order snapshot.
   - Allow a **contact-only** draft with no postal address when nothing ships.
   - Add an explicit **complimentary / offline / imported** issuance mode, so staff don't have to fake a cash or bank payment.
2. **Fulfilment that depends on the answer.** A digital voucher needs no shipping, but a physical voucher (+4 €) is delivered by courier or collected. Today fulfilment is fixed per product or variant. Choose the simplest sound model: per-choice fulfilment on a configurator choice, or a voucher-medium variant option with per-variant fulfilment exposed in the product file. Checkout should then ask for an address only when a shipped item is in the cart.
3. **Price on request.** Drift Event is priced "по договаряне". Today it can only be stored as a 0 € purchasable product. Add a product-level "price on request / inquiry only" state. It should show no price, block checkout, and offer an inquiry or contact action instead. Start it as an inquiry flag that a future `quotes` module can take over. Expose it in the product file, the CLI skill (`~/.codex/skills/echoray-commerce-v2`) and the public catalog.
4. **A `date` configurator input kind.** The preferred experience date is a free-text input for now. Add `date`, with optional `min`/`max` offsets and disabled weekdays, stored as an ISO date in the order snapshot. It is a preference, not a reservation. Update the configurator validator, storefront renderer, schema, docs and skill references.
5. **Public catalog contract.** The cached REST catalog (`commerce/src/public-catalog.ts`, `api-client/src/public-catalog.ts`, gateway) omits the configurator, type, attributes and categories. That prevents an external TanStack Start storefront (danirusev-mono, on Cloudflare Workers) from rendering experiences with their add-ons. Add these as a versioned, backward-compatible extension, and coordinate the client and gateway release order.
6. **Merchant locations (venues).** Today a location is a configurator choice with a Google Maps link in its hint. Add a small reusable venue list per business: name, city, address, optional maps URL. A product or configurator choice can reference it, and the voucher pipeline will reuse it for its location chooser. Keep custom free text possible.
7. **Module onboarding.** Experience merchants need Personalisation (configurator) enabled. Consider an "Experiences" template preset that enables Personalisation, Draft orders, Categories/Collections and Digital passes together. The UI only, no hidden auto-enabling.

## Out of scope

Payments, the voucher/ticket PDF and QR pipeline, booking slots/resources, and any changes in the danirusev-mono repo.

## Done means

- Each gap has a tested implementation, or a written note on why it was deferred.
- The product file schema, `echoray-commerce-v2` skill references and examples are updated for every new field.
- The repository's lint, typecheck and tests pass for the touched packages. Don't run deploys.
- Finish with a short report: what changed, the contract or version changes and their release order, and what the danirusev catalog files should change to use the new fields (for example, the event's inquiry flag, the `date` input and medium-based fulfilment).
