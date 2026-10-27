# Handoff prompt: voucher and ticket pipeline (QR + PDF) for Echoray event merchants

Copy everything below the line into a new agent session started in `/home/echo/Documents/echoray.io`.

---

You are building a **voucher/ticket issuance engine** in **Echoray Commerce** (`/home/echo/Documents/echoray.io`). It must work for every event or experience merchant, not one business. Read the root and package `AGENTS.md` files first and follow their rules. Keep it simple and robust: a small data model, atomic state changes, idempotent issuance, and no speculative abstractions.

## Context

- The first merchant is **Dani Rusev 11** (business `ks7c3n9k8akcx2rd19mph4cms18g47hy`), a drift school.
  - It has five products: `drift-taxi`, `drift-rent`, `drift-mix`, `drift-event` and `drift-day`. Their catalog files are in `/home/echo/Documents/danirusev-mono/.claude/worktrees/danirusev-commerce-backend-eae353/docs/commerce/catalog` (branch `claude/danirusev-commerce-backend-eae353`).
  - Online payments are **paused**, so issuance is **manual, on demand, by staff** first. Automatic issuance on paid orders must be a clean hook that is ready but not required to launch.
- Read these in the danirusev-mono repo (same worktree):
  - `docs/commerce/research/legacy-commerce.md`, sections 3–4. It covers the legacy voucher lifecycle, redemption and the **exact PDF stamping** (pdf-lib + fontkit, coordinates, fonts, colours).
  - `docs/commerce/research/echoray-capabilities.md`. Echoray already has `packages/qr` + `apps/echoray-qr`, digital passes with HMAC tokens, a staff scanner, check-in, void/restore, `pdf-lib` + Cyrillic Noto fonts in `convex/lib/documentPdf.ts`, gift cards and draft orders. Reuse these and don't rebuild them.
- Legacy templates: `/home/echo/Documents/danirusev/public/vouchers/{drift-taxi,drift-rent,drift-mix,drift-event,drift-day}.pdf`.
  - Each is a single page, 1440 × 810 pt, with no form fields.
  - The legacy stamps were:
    - **Recipient name:** uppercase, Geist Black 78 pt, white, at x 510 / y 109.5.
    - **Expiry:** `ВАЖИ ДО: dd.mm.yyyy`, 18 pt, right-aligned to x 1400, at y 55, in the type colour (taxi `#FFC106`, rent `#39B6FF`, mix `#D0F61A`, event `#FB3640`, day `#97579E`).
    - **QR:** 150 × 150 pt at x 1250 / y 630.
  - The templates have a fixed location ("Севлиево / Трявна") printed on them. Show the merchant this when they set up stamping.

## What to build

1. **Voucher types, configured per business.** Each type has a handle and name (for example `drift-rent`, `drift-mix`, `drift-taxi`, `drift-event`, `drift-day`), optionally linked products, and a default validity of 365 days.
   - Each type has a **PDF template** (uploaded and versioned) and a **field layout**: field → page, x, y, font, size, colour, alignment, uppercase, max width with auto-shrink.
   - Fields: recipient name, expiry date, location, voucher code, QR, type name, issue date, and optional order details such as add-ons.
   - Provide a simple staff editor with a live preview to place fields.
   - Templates are private documents. The Library free plan only takes images, and commerce `lib:` references require public images. Pick a sound private storage path, and record the decision.
2. **Voucher records.** Each record holds:
   - business, type, unique human-readable code (unambiguous alphabet) plus a signed token for the QR;
   - recipient name, location (a business venue or custom text), issued at, expires at (default issue + 365 days, editable at issue time);
   - the template version and stamped values as a snapshot;
   - source (manual / order line, with idempotency key), issuer, status (`active` / `redeemed` / `void` / `expired` computed server-side) and an audit history.
   
   Redemption is an **atomic single use** that records who redeemed it and when. Void and restore are allowed. An expired voucher can't be redeemed.
3. **Manual issuance UI (staff).** The form takes the recipient name on the voucher, the expiry (default +365 days, or set by staff), the location (pick from the business's venues or enter custom text) and the voucher type. Optionally it links to an order or draft order.
   - Issue → generate the code, QR and stamped PDF → download, reprint, and optionally email it via the existing notification and mail gates.
   - Add a list view with search, status filter, reprint and void.
4. **QR + verification.**
   - The QR should encode a verification URL that the **existing staff scanner** understands, such as the digital-pass `/passes/<token>` pattern, or extend the scanner. If you use `echoray-qr` dynamic codes, the scanner must be able to resolve `qr.echoray.io` short links.
   - A scan never redeems a voucher by itself: staff confirm the redemption.
   - Use one public verification page that shows only the validity state, never customer data.
5. **Automatic issuance hook (ready, not enabled).** When an order line for a product linked to a voucher type is paid or completed, issue one voucher per unit. It must be idempotent per line and unit, take the recipient and location from the configurator answers (`recipient`, `location`), and attach the vouchers to the order. Put this behind a per-type setting.
6. **Agent/API surface.** Add operations to the agent API and the `~/.codex/skills/echoray-commerce-v2` skill CLI (or a sibling skill) so agents can list types, issue, get, void and reprint vouchers with a business key. Never print secrets. Document them in the skill references.

## Constraints

- Server-side authorization for every staff action. Browser-supplied business IDs, prices or statuses aren't trusted.
- Generate PDFs in the backend with the existing `pdf-lib` setup and embedded Cyrillic-capable fonts. Templates can be ~16 MB: check memory and runtime limits, and stream or cache sensibly.
- No payments work. No changes in the danirusev-mono or legacy danirusev repos.

## Done means

- Tests cover issuance idempotency, code uniqueness, atomic redemption and double-redeem refusal, expiry, void/restore, and layout stamping (golden coordinates for one template).
- Lint, typecheck and tests pass for the touched packages. No deploys.
- The Dani Rusev setup is verified locally: five types with their templates and the legacy layout, and one sample voucher per type rendered to PDF for visual review.
- Finish with a short report: the data model, the endpoints and skill commands, the storage decision, what staff do step by step, and what's left before automatic issuance can be switched on.
