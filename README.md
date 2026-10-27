# Dani Rusev

A UI-first rebuild of the Dani Rusev website. TanStack Start and React run on Cloudflare Workers, with Tailwind CSS and shared shadcn components built on Base UI.

The landing and contact pages run entirely on local content and deterministic fixtures. No database, backend service, authentication, payment integration, environment variables, or external account is required. Prices and packages are illustrative; contact links open the user's phone/email application. Experience previews do not create reservations. The contact form validates locally and explicitly reports that messages are not sent yet.

## Getting started

Use Node.js **22.19.0** (see `.node-version`) and **pnpm 10.12.1**.

```powershell
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Development uses Cloudflare's Vite plugin and local Workers runtime. If the port is occupied, Vite selects another port and prints its URL.

## Workspace

```text
apps/web       @danirusev/web   TanStack Start routes and application UI
packages/ui    @danirusev/ui    Shared shadcn/Base UI components and theme
docs/                         Design notes and migration context
```

The root owns the package manager, lockfile, strict TypeScript defaults, and Biome configuration. Workspace packages use `workspace:*` dependencies and public package exports. The UI package ships source consumed by Vite; it does not require a separate build. Add apps and packages when there is a real consumer. The future Convex backend has deliberately not been scaffolded.

## Commands

| Command                                       | Purpose                                                        |
| --------------------------------------------- | -------------------------------------------------------------- |
| `pnpm dev` / `pnpm dev:web`                   | Start frontend development                                     |
| `pnpm lint`                                   | Biome lint, import, and formatting checks                      |
| `pnpm format`                                 | Apply safe Biome fixes and formatting                          |
| `pnpm typecheck`                              | Check both workspace packages                                  |
| `pnpm build`                                  | Build the browser assets and Workers SSR bundle                |
| `pnpm preview`                                | Serve the production build in local Workers; run `build` first |
| `pnpm check`                                  | Run lint, type checks, and production build                    |
| `pnpm --filter @danirusev/web cf-typegen`     | Regenerate ignored Workers binding/runtime types               |
| `pnpm --filter @danirusev/web deploy:dry-run` | Build and validate deployment packaging without publishing     |

The generated `apps/web/src/routeTree.gen.ts` is checked in so fresh-checkout type checking works. TanStack regenerates it during development/build; never edit it manually. There is no placeholder test command. Browser interaction and accessibility verification are described in [the UI port notes](docs/ui-port.md).

## Frontend structure

- `apps/web/src/routes/`: typed file routes, metadata, route errors, document shell.
- `apps/web/src/features/landing/data.ts`: typed fixture data and the `getLandingContent` data boundary.
- `apps/web/src/features/landing/`: faithful legacy sections, video hero, galleries, experience previews, and public-content fixtures.
- `apps/web/src/features/contact/`: original contact page and frontend-only form validation; see [contact port notes](docs/contact-port.md).
- `apps/web/src/components/`: shared site layout, navigation/footer, and lazy Motion provider/features.
- `apps/web/src/styles.css`: application layout, local fonts, responsive design, reduced motion.
- `packages/ui/src/`: reusable Base UI-backed primitives, class utility, and theme tokens.

To add shadcn components, run from the repository root:

```powershell
pnpm dlx shadcn@4.22.2 add <component> --cwd apps/web
```

Both `components.json` files select the `base-nova` style with `rsc: false` and aliases pointing at `@danirusev/ui`. Review generated imports, dependencies, and the component's Base UI implementation. This scaffold uses the shared `@danirusev/ui/lib/utils` helper; keep generated imports consistent with it.

## Cloudflare

`apps/web/wrangler.jsonc` is the source configuration. The Vite integration produces deployment configuration under `apps/web/dist/server`; do not edit generated output. The Worker name is `danirusev-web`, with no account, domain, database, or remote storage bindings configured. Logs and sampled traces are enabled.

The compatibility date is **2026-10-26**: the newest date supported by the pinned local runtime when scaffolded on 2026-10-27. A date of 2026-10-27 was rejected by that runtime. Advance it with a compatible Wrangler/plugin release and runtime verification.

When publishing is requested, select the intended Cloudflare account and environment, configure credentials outside source control, then use:

```powershell
pnpm --filter @danirusev/web deploy
```

No deployment has been made by this scaffold. The fixture site ships `noindex` metadata and a blocking `robots.txt`; remove those deliberately for a real public launch, confirm the canonical domain, and verify actual commercial content first.

## Assets and scope

Photos, the original hero video, and the full Gagalin wordmark font are local copies of the existing project's public assets. Body, navbar, and heading typography match the deployed system-font reference. Motion uses `motion/react-m` with a separately loaded `domAnimation` feature bundle and respects reduced motion. See [asset provenance](docs/assets.md) and the [parity notes](docs/ui-port.md).

The legacy project stays independent. Commerce/CMS selection, backend schemas, Convex responsibilities, authentication, checkout, order/voucher processing, contact-message delivery, and production migration are separate tasks. This scaffold ports the landing and contact experiences; it does not implement the legacy shop/account/staff routes.
