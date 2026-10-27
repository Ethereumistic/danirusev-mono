# Handoff prompt: Experience vouchers can't be switched on (echoray.io bug)

Copy everything below the line into a new agent session started in `/home/echo/Documents/echoray.io`.

---

**Bug:** the `vouchers` module (Experience vouchers, `packages/commerce/src/modules.ts:88`) can't be turned on from Admin → Settings → Features. It shows as "Experience vouchers: off" in the summary, but nothing on the page can turn it on.

**Cause.** The Features page saves `recommendProfile(answers)` (`packages/ui/src/blocks/commerce-features.tsx:178`), and `packages/commerce/src/questionnaire.ts` never maps an answer to `vouchers`:

- `Answers` (around line 54) has no voucher answer.
- `defaultAnswers()` (around line 66) and `answersFromProfile()` (around line 95) never read `vouchers`.
- `recommendProfile()` (around line 122) never adds `vouchers`. Choosing "What you sell → Experiences and vouchers" only changes `template`.
- The page's toggle list (`commerce-features.tsx`, the `Toggle` type on line 41 and the groups around line 123) has no voucher card. The icon map on line 35 already has `vouchers: TicketCheck`.

Saving the page therefore always stores `vouchers: { on: false }`. The `experiences` template lists `vouchers` (`packages/commerce/src/templates.ts:65`), but the questionnaire throws it away.

**Fix (keep it small):**

1. Add a `vouchers: boolean` answer.
2. Read it in `defaultAnswers` (`on.has("vouchers")`) and in `answersFromProfile` (`on("vouchers")`).
3. In `recommendProfile`, add `if (a.vouchers) on.add("vouchers");`.
4. Add a toggle card in the same group as "Orders by phone, email or in person": title "Experience vouchers", with a hint taken from the module summary.
5. Add a test proving that:
   - toggling it on saves `vouchers.on = true`;
   - `answersFromProfile` round-trips it;
   - `defaultAnswers("experiences")` has it on.

   Check whether any other module in `OPTIONAL_MODULES` has the same gap, and fix those the same way.

**Rules:** follow the root and `packages/commerce` `AGENTS.md` files. Run lint, typecheck and the tests for the touched packages. Release it the way `commerce-experience` was released, then report the release.

**Live shop waiting on this:** Dani Rusev 11 (`ks7c3n9k8akcx2rd19mph4cms18g47hy`). It currently has Variant options, Collections, Stock, Personalisation, Promotions, Returns, Delivery and Draft orders on. Don't change its settings: the owner will switch on Experience vouchers once the fix is live.
