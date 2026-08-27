# CCS Coaching Center Website Design

## Purpose

Create a welcoming, credible one-page website for CCS (Coaching Center Services), a local coaching center in Tando Muhammad Khan, Sindh. Its primary job is to help parents and students understand the offer and visit the center before limited seats are filled.

## Audience and Success

Students in classes 6–12 and their parents should be able to quickly confirm the location, eligible subjects, fee, capacity, and teaching support. The page succeeds when it makes the center feel approachable and prompts an in-person visit.

## Content Decisions

- Location copy: “Opposite Shell Pump, near Rose Palace Hall, Tando Muhammad Khan, Sindh, Pakistan.”
- Class levels: 6 through 12.
- Subjects: all Sindh Textbook Board subjects except Sindhi, Urdu, and Islamiat.
- Faculty: 7+ teachers; support team: a small dedicated administration and management team (no unsupported headcount claim).
- Price: Rs. 500 per selected subject, so families choose only the subjects they need.
- Capacity: 15 total students per class, welcoming both girls and boys.
- The website must not expose a visitor-facing IP address. It will use a short safe-hosting note instead.

## Experience and Visual Direction

The site uses a modern, high-contrast education look: deep midnight blue, vibrant teal, warm gold highlights, a restrained grid texture, and real-world study imagery. It will use a polished hero, visual study card, and section-specific image panel. Typography is bold and legible, using locally loaded browser-safe fallbacks plus a Google-hosted sans family.

The navigation anchors to About, Learning, Pricing, and Visit. A compact mobile menu prevents navigation from crowding small screens. A reduced-motion-safe reveal treatment adds polish without blocking reading.

## Architecture

This is a dependency-free static site:

- `index.html` provides semantic sections, accessible navigation, and the complete page structure.
- `styles.css` holds responsive layouts, all theme tokens, components, and motion preferences.
- `script.js` provides theme persistence, mobile navigation, dynamic course cards from JSON, intersection reveals, and the capacity counter animation.
- `data/center.json` is the editable source of truth for center details, levels, subjects, benefits, and contact/location copy.
- `script.ts` documents the JavaScript data model and implementation source in TypeScript for future expansion while `script.js` is the browser-ready runtime.

## Theme Behavior

The theme control has System, Light, and Dark choices. System follows the operating-system preference. Light and Dark persist in `localStorage`; selected state is visible and announced to assistive technology. Theme colors meet the site’s contrast and readability goals.

## Interactions and Failure Handling

- Mobile navigation toggles with accessible `aria-expanded` state and closes after selecting a link.
- Center content is fetched from `data/center.json`; if it cannot load (for example, opened directly from a local file), meaningful default HTML content remains visible and the interactive cards are not required to understand the site.
- Users who prefer reduced motion get no entrance or counter animation.
- External map action is an ordinary Google Maps search link, so no embedded key or personal data is needed.

## Verification

Validate HTML syntax and source references, ensure the JSON parses, and run a small static-server/browser check when possible. Check desktop and mobile layout, all three themes, keyboard navigation, and no-console-error behavior.
