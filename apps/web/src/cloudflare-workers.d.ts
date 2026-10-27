// Minimal typing for the Workers runtime module used by server-only code.
// `wrangler types` output (worker-configuration.d.ts) is ignored and not part of
// this program, so only the variables this app reads are declared here.
declare module 'cloudflare:workers' {
  export const env: {
    readonly ECHORAY_GATEWAY_URL?: string
    readonly ECHORAY_STOREFRONT_ID?: string
    readonly ECHORAY_INTEGRATION_ID?: string
    readonly ECHORAY_INTEGRATION_SECRET?: string
    readonly ECHORAY_CONVEX_URL?: string
    // Written by Echoray Connect when this Worker serves the shop's domain.
    readonly STOREFRONT_INTEGRATION_ID?: string
    readonly STOREFRONT_INTEGRATION_SECRET?: string
    readonly STOREFRONT_ORIGIN?: string
  }
}
