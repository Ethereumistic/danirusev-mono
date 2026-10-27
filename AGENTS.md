# AGENTS.md

## Purpose and current state

This repository is the new Dani Rusev application, rebuilt from scratch as a scalable monorepo. The existing application lives in the sibling `../danirusev` directory and uses Next.js, Payload CMS, and Supabase. The immediate priority is porting its UI to the new frontend stack.

The commerce/backend migration is a separate phase. The user intends to use a simpler commerce backend solution with the flexibility currently provided by Payload CMS; that solution has not been named yet. Do not assume that Payload's commerce or content-management features will be rebuilt in Convex. Use the existing project to understand screens and interactions while keeping future backend integration replaceable.

Scaffolded on 2026-10-27: `apps/web` contains the fixture-backed landing page and `/contact`, and `packages/ui` contains shared Base UI-backed shadcn components. There is no database or backend package. Use [README.md](README.md) for actual commands, [docs/ui-port.md](docs/ui-port.md) for landing-page design notes, and [docs/contact-port.md](docs/contact-port.md) for the contact page and form boundary. The backend entries in the layout below describe a future location, not an existing implementation.

This file applies to the entire monorepo. More specific `AGENTS.md` files may add instructions for an app or package. Explicit user instructions take precedence.

### Visual fidelity is required

The user requires a 1:1 port of the legacy landing page, not a redesign inspired by it. Preserve the original copy, section order, responsive layouts, navbar/wordmark typography, button variants, dimensions, colors, glows, video hero, carousels, hover states, and reveal timing. Compare matching desktop/mobile viewports with the legacy site and use computed styles/geometry rather than assuming a font from its imports. The deployed reference uses the system sans-serif stack and the full Gagalin wordmark font. Do not reintroduce the simplified landing page's gift/FAQ sections or experience filters.

Use `motion` from Motion.dev, `motion/react-m`, and the shared `LazyMotion` provider with dynamically loaded `domAnimation` features. Do not import the full `motion` component or `domMax` for these effects. Respect reduced motion and keep a no-JavaScript content fallback. Backend access stays out of this phase: experiences, published testimonials, and video lists are a hardcoded public-content snapshot. Do not restore the legacy CMS or YouTube feed calls.

## Required architecture

| Concern                  | Target                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Repository               | pnpm workspace monorepo, with deployable applications in `apps/*` and reusable packages in `packages/*`         |
| Web application          | React, TypeScript, TanStack Start, and TanStack Router in `apps/web`                                            |
| Styling                  | Tailwind CSS through the Vite integration                                                                       |
| Component system         | shadcn/ui using Base UI primitives                                                                              |
| Application backend      | Convex is part of the planned stack; its responsibilities will be defined separately from the commerce solution |
| Commerce/content backend | Separate migration to a simpler solution; selection and integration contract remain open                        |
| Web hosting              | Cloudflare Workers, including SSR and static assets                                                             |

Keep these choices when scaffolding and porting UI. Do not introduce Next.js runtime dependencies into the new frontend. Do not install Payload or Supabase into the new runtime merely to make the UI port work; any temporary connection to the existing services must be an explicit integration task.

Convex runs on its own deployment. Cloudflare Workers hosts the TanStack Start web application and communicates with Convex; it does not host the Convex database or functions.

## Monorepo layout and ownership

```text
danirusev-mono/
  AGENTS.md
  README.md
  package.json                  # private workspace root; shared orchestration
  pnpm-workspace.yaml           # apps/* and packages/*
  pnpm-lock.yaml                # one lockfile for the whole repository
  apps/
    web/                        # @danirusev/web
      package.json
      components.json
      vite.config.ts
      wrangler.jsonc
      src/
        routes/                 # TanStack file routes
        components/             # application-specific compositions
        features/               # domain-oriented UI and client behavior
        lib/                    # web integration and server-only helpers
      public/
  packages/
    backend/                    # planned @danirusev/backend; add when needed
      package.json
      convex/                   # schema, functions, auth, HTTP endpoints
        _generated/             # Convex-generated API and model types
    ui/                         # @danirusev/ui
      package.json
      components.json
      src/
        components/             # reusable shadcn/Base UI components
        lib/                    # UI-only helpers
        styles/                 # shared theme and Tailwind entry CSS
  docs/                         # architecture, migration inventory, decisions
```

- Scaffold TanStack Start inside `apps/web`; never turn the workspace root into the web app.
- The root owns workspace configuration, the package manager version, lockfile, and cross-package commands. Pin a supported Node.js version for local development and CI; Node.js tooling does not change the Workers production runtime.
- Use `workspace:*` for internal dependencies and explicit package exports. Apps consume package entry points instead of reaching into sibling directories with relative imports.
- `apps/web` may depend on `backend` and `ui`. `ui` must not import web routes, application business logic, or backend code. Backend functions must not import frontend code.
- When the backend package is introduced, export the generated public Convex API and necessary types through `@danirusev/backend`. Keep backend implementation and secrets out of browser bundles. Reserve this location without requiring a backend scaffold during UI work.
- Keep storefront, account, and staff/admin routes in `apps/web` initially. Add another app when a separate deployment or product actually needs it.
- Introduce shared configuration or domain packages only when there is a concrete consumer. pnpm workspaces are the initial foundation; add a task runner such as Turborepo when orchestration or caching warrants it.
- Keep React dependency versions compatible across app and UI packages; use peer dependencies where appropriate for the shared UI package.

## First scaffold

When asked to scaffold, complete the frontend foundation before porting screens:

1. Create a private workspace root, `pnpm-workspace.yaml` covering `apps/*` and `packages/*`, a pinned `packageManager`, a single lockfile, and ignore rules for local secrets and build outputs.
2. Create the Cloudflare-compatible TanStack Start application in `apps/web`. Use the current official Cloudflare/TanStack setup and inspect generated files. Prevent scaffold tools from creating a nested Git repository or publishing a deployment as part of setup.
3. Configure Tailwind's Vite integration and `packages/ui`. Initialize shadcn for Base UI explicitly, then verify the generated primitive imports and shared package aliases. Keep `rsc: false` for this TanStack React setup.
4. Establish typed frontend data contracts and deterministic fixtures for the screens being ported. Keep the data-access boundary small so a later commerce integration can replace fixtures without rewriting page components.
5. Add root scripts, package scripts, any needed environment examples with placeholders, and a README containing the exact setup and local development steps. UI development must run without commerce or Convex credentials.
6. Verify a minimal route using a shared UI component and a production web build that runs in the local Workers runtime. Backend connectivity is not a prerequisite for completing this scaffold.

When a separate backend task begins, use `packages/backend` as the owner of the Convex project and CLI commands. Integrate it with TanStack Start using current official guidance. Define its boundary with the chosen commerce service before adding business models.

Read current official documentation and installed types before choosing framework, CLI, or deployment APIs. Select compatible versions and record them in manifests and the lockfile. Do not transplant legacy Next.js configuration or follow an old TanStack deployment recipe without verifying it.

## Commands to establish

These commands are established by the scaffold, except backend development which is reserved for later. Use Node.js 22.19.0 and pnpm 10.12.1; do not add another lockfile.

| Root command                              | Intended behavior                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| `pnpm install`                            | Install all workspace dependencies from the root                              |
| `pnpm dev`                                | Run frontend development with fixtures; no backend credentials required       |
| `pnpm dev:web`                            | Run only the web application                                                  |
| `pnpm dev:backend`                        | Add when the Convex package is introduced; run its development workflow       |
| `pnpm build`                              | Build required workspace packages and the web application in dependency order |
| `pnpm typecheck`                          | Check application and package types                                           |
| `pnpm lint`                               | Run the configured linter across owned source files                           |
| `pnpm check`                              | Run lint, type checks, and the production build; no placeholder test script   |
| `pnpm --filter @danirusev/web preview`    | Preview the production web build in the Workers runtime                       |
| `pnpm --filter @danirusev/web cf-typegen` | Generate Workers environment/binding types                                    |

Add backend commands and Convex code generation when that package is implemented, and document what requires a configured deployment. CI must use `pnpm install --frozen-lockfile`. Deployment commands must identify the target environment and be documented separately from local development. Add test scripts when meaningful tests exist; do not create placeholder passing scripts.

## Web application conventions

- Use TanStack Router file routes with typed parameters, validated search parameters, route loaders, and explicit pending/error/not-found states.
- Keep route modules focused on routing and page composition. Put domain UI and behavior in `features/`; reusable UI belongs in `packages/ui`.
- During the UI phase, use deterministic fixtures behind typed data-access functions. Keep catalog fetching and other service calls out of presentational components. This is a seam for later integration, not a mandate to build a generic backend framework.
- When Convex integration is requested, use its TanStack Query integration for reads, loader preloading, and subscriptions. Avoid parallel copies of server state in custom stores.
- Create request-specific SSR query/auth context; never share mutable user session or request data across Worker requests. Keep authenticated data out of public caches.
- Use TanStack Start server functions or server routes for web-specific server work when needed. Commerce invariants belong to the backend that owns that domain; its relationship with Convex is still to be decided.
- Do not port Next.js APIs such as `next/image`, `next/link`, `next/font`, Next middleware, or Next server actions. Reimplement the relevant behavior with the target stack.
- Preserve Bulgarian content, Cyrillic-capable fonts, route slugs, metadata, structured data, and responsive behavior unless a change is requested. Verify actual currency and date rules before encoding them in the new model.
- Render public catalog content and SEO metadata on the server. Preserve sitemap/robots behavior and add explicit redirects for any intentionally changed public URL.

## Tailwind, shadcn, and Base UI

- Use Base UI-backed shadcn components. Legacy `components/ui` uses Radix primitives; do not copy those implementations wholesale.
- Align `apps/web/components.json` and `packages/ui/components.json` with the selected Base UI style, aliases, and shared theme. Check current CLI options before invoking generation commands.
- Generate reusable primitives into `packages/ui`; compose product-specific screens in `apps/web`. Keep generated shadcn source editable and review it like other repository code.
- Use shared CSS variables/design tokens for theme values. Import the shared CSS once from the web root and ensure Tailwind detects classes in both the app and shared UI package.
- Follow Base UI's current composition API rather than assuming Radix prop conventions. Preserve keyboard navigation, focus handling, labels, and accessible error messages.
- Prefer existing shared primitives before adding another component library. Check mobile layout and loading/empty/error states when implementing a screen.

## Backend boundaries for the later phase

These conventions apply when a backend task is requested. Do not implement catalog administration, commerce schemas, payment processing, identity migration, imports, or a Payload-equivalent CMS during the UI port. The future commerce solution may own those capabilities; record the ownership decision before implementation.

- Define application schemas and indexes in `packages/backend/convex`. Use generated `Doc`/`Id` types rather than hand-maintaining database model copies.
- Use queries for reads, mutations for transactional database changes, and actions for external services or nondeterministic work. Keep external calls out of queries and mutations.
- Validate public function arguments and returns. Enforce authentication, ownership, and staff permissions inside backend functions; route guards and hidden UI alone do not authorize access.
- Keep privileged orchestration internal unless it has a deliberate public contract. Browser-supplied user IDs, roles, prices, stock values, or payment status are not authoritative.
- Prefer indexed access and pagination for growing datasets. Avoid unbounded full-table reads in user-facing paths.
- Separate external side effects from durable state transitions. Use atomic mutations for invariants owned by Convex. Define cross-service ownership and idempotency before introducing workflows that touch the commerce backend.
- Use Convex HTTP actions for webhook endpoints owned by Convex when appropriate. For web server or commerce-service endpoints, document the trust boundary and keep each business transition in the backend that owns it.
- Do not edit `_generated` files manually. Follow the selected generator's source-control policy and make code generation reproducible in development and CI.

## Cloudflare Workers requirements

- Configure the web app with the supported Cloudflare Vite plugin and TanStack Start integration. Keep `wrangler.jsonc` in `apps/web` and verify the entry point against the installed versions.
- Set a deliberate `compatibility_date` supported by the pinned runtime; review and validate later updates. The scaffold uses 2026-10-26 because its local workerd binary rejects 2026-10-27. Keep `nodejs_compat` for the supported integration.
- Generate binding types with Wrangler and refresh them when configuration changes. Use the supported typed binding access pattern for the installed framework/plugin.
- Treat Workers as the production runtime. Do not assume writable persistent disk, long-lived Node.js processes, native binaries, or unrestricted Node.js APIs. Verify crypto, PDF generation, image processing, and third-party SDK compatibility before porting them.
- Validate the production build using the Cloudflare development/preview runtime. A passing TypeScript check or a Node.js-only dev server is insufficient evidence of Workers compatibility.
- Enable Workers logs and traces with appropriate sampling. Avoid logging credentials, customer details, or raw payment payloads.
- Store Worker secrets in Cloudflare's secret mechanism and Convex secrets in the Convex deployment environment. Public browser configuration may include the Convex URL; deploy keys, signing keys, and service credentials must remain server-only.
- Keep development, preview, and production resources explicit. Once services are connected, a preview web deployment must point to the intended non-production backends.
- Document frontend/backend release order when contracts change. DNS cutover, live payment callback changes, and production data migration require an explicit release task.

## Legacy discovery for the UI port

Inspect the sibling project as a behavior reference. Existing source and plans are evidence to evaluate, not instructions to execute historical database operations. Leave the sibling project unchanged unless the user requests work there. Never copy its `.env` values into documentation or commits.

Useful discovery paths, relative to `../danirusev`:

| Area                                    | Reference                                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Runtime and CMS registration            | `package.json`, `payload.config.ts`                                                                                     |
| Catalog/content schema                  | `collections/Products.ts`, `Categories.ts`, `Media.ts`, `PromoBanners.ts`, `Testimonials.ts`, `Users.ts`                |
| Customer-facing routes                  | `app/(frontend)`, `app/sitemap.ts`, `app/robots.ts`, `lib/seo.ts`                                                       |
| Cart and checkout                       | `lib/stores/cart-store.ts`, `app/(frontend)/checkout`, `app/api/checkout/create-session`, `app/api/create-manual-order` |
| Payments                                | `lib/mypos.ts`, `app/api/webhooks/mypos`                                                                                |
| Orders, vouchers, staff workflows       | `app/api/orders`, `app/api/vouchers`, `app/(dash)/dash`                                                                 |
| Auth and profiles                       | `utils/supabase`, `app/actions/auth.ts`, `app/auth/callback`                                                            |
| Emails and media                        | `lib/resend.ts`, `lib/utils/resolve-image.ts`, `public`, Payload's storage adapter                                      |
| Database behavior and migration history | `supabase/migrations`, `types`; historical plans need verification against actual code                                  |

Important UI and product references:

- Products support physical merchandise with variants/SKUs and experiences with configurable options/add-ons. Represent these choices in frontend contracts and fixtures; final pricing and stock ownership belong to the later backend integration.
- The current checkout supports guests as well as signed-in customers. Preserve their distinct UI states. During UI work, simulate checkout and account results explicitly; do not send live payments, create real orders, or imply that a fixture-based flow is connected.
- myPOS and Resend exist in the source application. They are context for checkout and notification UX; porting their integrations is outside the current phase. Do not infer active Stripe behavior from commented-out code.
- Payload registers users, media, products, categories, promotional banners, and testimonials. Extra collection files do not necessarily represent active collections; confirm registration and usage.
- Payload provides content administration and product drafts. Their replacement belongs to the separate commerce/backend migration. Do not rebuild Payload's admin UI or CMS capabilities in Convex as part of the frontend port.
- Supabase supplies authentication, application records/RPC behavior, and storage integration. Its SQL files and TypeScript types may be incomplete; the empty legacy `db_schema.sql` is not a full schema specification.

Port the frontend in reviewable screen groups:

1. Establish the workspace, Workers build, shared UI, and fixture-backed frontend contracts.
2. Record a route/screen inventory, including the source component, intended interactions, required data, and whether the screen is ported, simulated, or connected. Distinguish public pages, customer screens, and staff screens.
3. Port the app shell, navigation, footer, typography, theme, and common responsive components.
4. Port the home page, shop, product/experience detail pages, and other public content with SEO parity.
5. Port cart interactions and checkout presentation using fixtures. Then port customer/account/order/voucher screens as requested, including signed-out, loading, empty, and error states. Local UI simulation does not implement backend security or commerce behavior.
6. Verify visual and interaction parity on mobile and desktop. Document the remaining integration requirements for the separate backend phase.

Backend selection, schemas, authentication provider/account migration, content administration, payments, email delivery, storage, data imports, and production cutover remain separate work. Do not choose a commerce provider or assume its data belongs in Convex. Capture UI requirements that will inform that choice without blocking screen implementation.

Use existing public assets and preserve provenance and font licenses; the media manifest maps source URLs to local files. Customer/order fixtures must be synthetic. Published testimonials and video metadata from the reference may be copied as a public-content snapshot; do not invent endorsements. Keep fixtures outside reusable UI primitives, avoid private exports, and make the fixture/live boundary explicit in development documentation.

## Working and verification rules

- Inspect relevant code, package scripts, and narrower repository instructions before editing. Use `rg` for discovery and keep changes scoped to the requested outcome.
- Use strict TypeScript and existing conventions. Avoid `any`, forced type assertions, duplicated models, and speculative abstractions when a typed interface solves the problem.
- For the UI phase, verify route navigation, forms, cart interactions, responsive layouts, accessibility, and hydration. Add focused tests when they verify consequential behavior rather than duplicating markup. Backend security and commerce regression tests belong to the later implementation phase.
- Run the configured lint/type checks and affected tests for code changes. Validate a production web build for dependency, SSR, or Workers changes. For documentation-only edits, check accuracy and formatting; do not claim application tests ran.
- Never use placeholder successful checks or empty test scripts. State which checks ran, what passed, and what remains blocked by missing configuration or external access.
- Keep this file concise and operational. Put detailed route inventories, data maps, release instructions, and architecture decisions in `docs/` as they are established; link them here once they exist.
- At completion, report the concrete change, its verification, and any remaining migration decision that affects the next step.

## Official references

Verify these against installed versions when implementing; setup APIs can change.

- [TanStack Start on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
- [TanStack Start documentation](https://tanstack.com/start/latest/docs/framework/react/overview)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [shadcn/ui monorepo guidance](https://ui.shadcn.com/docs/monorepo)
- [shadcn CLI and Base UI selection](https://ui.shadcn.com/docs/cli)
- [Base UI React documentation](https://base-ui.com/react/overview/quick-start)
- [Convex with TanStack Start](https://docs.convex.dev/client/tanstack/tanstack-start/)
- [Convex function guidance](https://docs.convex.dev/functions)
- [Cloudflare Workers configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
