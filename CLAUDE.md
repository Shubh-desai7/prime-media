# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing and lead-generation website for **Prime Media** (Valsad, Gujarat), an event-experience company. **Scope is two services only: Floor Projection and the MagixPix Photobooth.** Their other legacy products (Prime Touch, Virtual DJ, Jumpido, Home Automation, AR) are deliberately parked. Do not add them unless asked.

Next.js 16 (App Router, React 19, TypeScript) with plain CSS and **GSAP** (`gsap`, `@gsap/react`, ScrollTrigger) for motion, deployed on **Vercel**. There is no database and no backend.

**Read `AGENTS.md` first.** This Next.js version has breaking changes from older releases, and `node_modules/next/dist/docs/` holds the docs for the installed version. `next.config.ts` enables `cacheComponents` and `partialPrefetching`, so avoid `new Date()`, `Math.random()` or other request-time values in server components. (The footer has no year for that reason.)

## Commands

```bash
npm run dev      # dev server on :3000 (also configured in .claude/launch.json as "dev")
npm run build    # production build, also runs the TypeScript check
npm run lint     # eslint
```

There is no test suite.

## Business rules that shape the code

These come from the client and are easy to break by accident. Details live in the three docs at the repo root.

- **Rented service, not a product.** Prime Media brings, sets up and runs the experience for the booked time. Never use "buy", "Book a demo" or product/spec language (Kinect, sensors, and so on). The call to action is **"Check your date"** or **"Get a quote"**.
- **No prices anywhere on the site, and no pricing estimator.** Pricing is handled by the client's point of contact (POC).
- **Photobooth:** printed copies (different paper types, wooden frame and non-frame formats, customisable) **plus** digital copies by **email and WhatsApp only**.
- **Primary audience:** wedding and social-event planners, venues and event-company owners. Secondary: brands/BTL agencies, malls and play zones (permanent installs are "on request", not a listed offer).
- **Proof claim:** "50+ weddings across Gujarat & Maharashtra" (`site.proof`). Don't invent other statistics, client names or testimonials.
- Only show floor effects that appear in the supplied photos (welcome message with petals, patterns, sunflowers). The floor demo's "Ripples / Petals / Sparkles" are a visual preview, not a product list.

## Architecture

- `src/lib/site.ts`: the single source for contact details, the proof line, nav items and the `whatsappLink()` / `mailtoLink()` helpers. Contact values come from env vars (see `.env.example`).
- `src/lib/photos.ts`: the photo registry (`photos`, `byName`). Images live in `public/images/{floor,booth}/`, resized from the client's originals. Add photos here so the gallery and pages pick them up.
- `src/lib/floorRipple.ts`: **framework-free canvas engine** for the interactive floor. Themes: `tiles` (electric dance-floor tiles that light under the pointer, the hero default), `ripples`, `petals`, `sparkles`. `FloorDemo.tsx` and `Hero.tsx` only mount and unmount it. Keep animation logic in the lib file, not in React state. It pauses when the tab is hidden and honours `prefers-reduced-motion`.
- **Motion layer (GSAP).** Import from `@/lib/gsap` (registers plugins; client components only). All motion is wrapped in `gsap.matchMedia()` with `MOTION_OK` (`prefers-reduced-motion: no-preference`) so reduced-motion users get a static page.
  - `Hero.tsx`: the hero background IS the interactive floor; headline words slam in, neon flicker on the green words, floating polaroids with pointer parallax, count-up for "50+". Used on the home page and (compact) on both product pages.
  - `Story.tsx`: pinned scroll-scrubbed sequence (floor lights up, a guest walks across, booth appears, print slides out, keepsake steps forward). Base CSS is the static end state; JS adds `.story--live` for the animated version.
  - `EventsStrip.tsx`: pinned horizontal gallery on desktop (adds `.hs--live`), swipeable row on phones. `Marquee.tsx`: kinetic type band that reacts to scroll velocity.
  - `Interactions.tsx`: site-wide layer driven by data attributes in server-rendered pages: `data-reveal`, `data-reveal-group`, `data-magnetic`, `data-tilt`, `data-cursor="Label"`, plus the glow cursor. **Render `<Interactions />` as the last child inside every page, not in the layout**, otherwise it mutates elements before they hydrate and React logs a hydration mismatch.
- **No server for forms.** `EnquiryForm` builds a message and opens `wa.me` with it (plus a `mailto:` fallback). `KeepsakeBuilder` (a client-side photo-keepsake preview) also links to WhatsApp. If a real backend or email service is added later, it should replace these two places only.
- Pages: `/` (home), `/floor-projection`, `/magixpix`, `/gallery`, `/contact`. Shared client components are in `src/components/`.
- All styling is in `src/app/globals.css` using the brand tokens at the top (violet `#5002B0`, lime `#A3FA04`, and so on). Class-based, mobile-first, no CSS framework.

## Testing motion

The preview browser pane often throttles `requestAnimationFrame` to about 1 fps, so animations look frozen. In dev only, `window.__gsap` and `window.__ST` (ScrollTrigger) are exposed. Step the clock with `__gsap.globalTimeline.totalTime(__gsap.globalTimeline.totalTime() + 8)`, and for scroll-scrubbed sections scroll with `window.scrollTo({ top, behavior: "instant" })`, call `__ST.update()`, then advance the clock again. These hooks are stripped from production builds.

## Brand

The design follows `BRAND_GUIDE.md`. Key points that matter when editing UI:
- Buttons use **lime with dark ink text** (15:1 contrast). Never white text on lime or the logo's green, and never the red tagline on violet.
- The lime "beam" (`.beam`) echoes the logo's horizontal band and is the signature section divider.
- Logo files: `public/logo.png` and `public/logo-sm.png` (from `assets/logo/logo-v2.png`). The logo is a raster image on a white background, so on dark sections place it on a white plate (see `.footer__logo`). A vector/transparent version is still needed.

## Reference docs in this repo

- `PRIME_MEDIA_BRIEF.md`: discovery notes from the client's old site (its TG table is outdated, see the strategy doc).
- `STRATEGY_ICP_AND_WEBSITE.md`: current ICP, problem, site plan and open questions.
- `BRAND_GUIDE.md`: logo, colours, type, voice.
- `assets/`: the client's source logos. `.claude/launch.json` is the dev-server config.

## Deployment (Vercel)

Import the repo in Vercel (framework auto-detected) and set these env vars. Each is public, so only use values meant to be shown on the site:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: POC's WhatsApp number, digits only with country code (for example `919876543210`). **If unset, WhatsApp links open WhatsApp's number picker instead of the POC.**
- `NEXT_PUBLIC_CONTACT_EMAIL` (defaults to the old site's address)
- `NEXT_PUBLIC_SITE_URL`: the production URL (used for metadata)

## Known gaps

- The POC's WhatsApp number and reply time are not yet supplied.
- Photos are low-resolution scans from the old site, and the client has not supplied video or testimonials.
- No SVG or transparent logo yet.
- Domain and Google Business Profile are not set up.
