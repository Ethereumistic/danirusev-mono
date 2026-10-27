# Contact page port

The legacy public contact page is ported at `/contact`. The reference is `../danirusev/app/(frontend)/contact/` and [the published contact page](https://danirusev.com/contact), compared on 2026-10-27. The source project is unchanged.

## Presentation

Preserve the original Bulgarian copy, hero, response statistics, five contact cards, company and bank details, form, and bottom phone/email call to action. Typography, spacing, responsive layouts, glows, borders, buttons, hover states, and entrance/viewport animation settings follow the reference.

The landing and contact pages share `SiteLayout`, header/footer, and the lightweight Motion provider. Contact links in the desktop/mobile navigation identify the current route with `aria-current="page"`. Inputs use Base UI; label and textarea are shared native controls. The route preserves contact metadata, canonical URL, and breadcrumb structured data. Prototype `noindex` remains inherited from the document shell.

## Form boundary

The form has no delivery service, server function, database, authentication autofill, or external submission endpoint. It validates required name, email, phone, and message fields locally, associates errors with their fields, and focuses the first invalid field. A valid submission retains the entered values and explicitly says the message has **not** been sent, with working email and phone alternatives. Never show a delivery confirmation until an actual delivery integration exists.

Submission is disabled before hydration and when JavaScript is unavailable; a no-JavaScript message directs visitors to the public contact details. The form uses POST semantics to avoid exposing form values in a fallback GET URL. No submission request is made by the interactive UI.

## Verification

Desktop comparison at 1440×1000 matched the reference heading and all form controls' measured rectangles and typography. Mobile form captures at 390×844 matched the original layout. Browser checks passed for required/email validation, focus placement, retained values, the unsent notice, zero POST requests, mobile-menu current-route state/dismissal, and navigation between home and contact. No horizontal overflow was found at 320, 390, 768, or 1440 pixels.

Transient browser scripts and captures are under ignored `output/`. Exact reference styling retains existing low-contrast small labels; these visual checks are not a claim of full WCAG conformance. Message delivery and authenticated form prefilling belong to a separate integration phase.
