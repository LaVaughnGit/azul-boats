# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
```

For Stripe webhooks during local dev:
```bash
STRIPE_API_KEY=sk_test_... stripe listen --forward-to localhost:3000/api/webhook
```
The CLI prints a webhook signing secret (`whsec_...`) — copy it into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

## Environment Variables (`.env.local`)

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
RESEND_API_KEY=re_...
EMAIL_FROM=Azul Boat Rentals <onboarding@resend.dev>
BUSINESS_EMAIL=azulboats@gmail.com
```

## Architecture

Single-scroll marketing site with a Stripe checkout flow.

**Page composition** — `app/page.tsx` assembles all sections in order: Navbar → Hero → Fleet → Services → HowItWorks → Gallery → Testimonials → FAQ → Footer.

**Booking flow** — all "Book Now" buttons call `useBookingModal().openModal()` from `components/booking-modal-provider.tsx`. That component owns a 4-step modal (date/time → captain/passengers → contact info → confirm), calculates the total, and POSTs to `/api/checkout` which creates a Stripe Checkout session and redirects. On payment success Stripe hits `/api/webhook`, which verifies the signature and sends two emails via Resend: customer confirmation and business notification.

**Email templates** live in `lib/emails.ts` (`sendCustomerConfirmation`, `sendBusinessNotification`).

**Post-payment page** — `app/booking/success/page.tsx` (static, no session data fetched).

## Key Library Quirks

These versions have breaking changes from what most training data reflects:

- **shadcn/ui uses Base UI (`@base-ui/react`), not Radix UI.** `<Accordion>` has no `type` or `collapsible` props. Check `node_modules/next/dist/docs/` and shadcn component source before using any shadcn primitive.
- **Tailwind v4** — no `tailwind.config.js`. All theme tokens defined via `@theme inline` in `app/globals.css`. Custom colors: `mv-pink` (#FF2D78), `mv-cyan` (#00E5FF), `mv-purple` (#7B2FBE), `mv-coral` (#FF6B35), `mv-dark` (#06061A).
- **framer-motion v12** — function-based `Variants` (e.g. `fadeUp(delay)`) are not supported by TS types. Pattern used throughout: define a helper returning `{ initial, animate, transition }` and spread it onto motion elements with `transition` cast `as Transition`.
- **lucide-react v1.14** — no brand icons (Instagram, Facebook, TikTok, etc.). Use custom inline SVG components instead; see `components/footer.tsx` for the pattern.
- **Stripe API version** — `"2026-04-22.dahlia"` (set in `app/api/checkout/route.ts`).

## Design System

Always dark — no light mode. Background `#06061A`. Fonts: Montserrat (`--font-heading`, all headings) + DM Sans (`--font-sans`, body). Gradient accent: pink → purple (`#FF2D78 → #7B2FBE`). Secondary accent: cyan `#00E5FF`.

Boat: 24ft Crownline 235 SS Bowrider. Rates: $80/hr self-drive (max 12 pax), +$25/hr with captain (max 11 pax). Photo: `public/images/crownline1.jpg`.
