# VIVRTI 2K27 — EASTOPIA

Responsive multi-page React + Vite website for the cultural festival of Aravali College of Engineering and Management.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Pages

- Home
- About
- Events
- Participant Guidelines
- Festival Schedule
- Gallery (with image lightbox)
- FAQs
- Contact

## Update before publishing

1. Add approved Google Form URLs to `src/data/site.js` in each event's `registrationUrl` field. Registration buttons should only be enabled once the official forms are ready.
2. Update the exact festival dates and venue after confirmation.
3. Add official organiser email/phone, approved event rules, eligibility, team sizes, schedule, sponsor and volunteer information when available.
4. Replace or supplement the provided campus photo collages with original high-resolution individual photos as desired.

## Branding assets

- `public/assets/vivrti-logo.webp`: original full festival emblem used in the hero and favicon.
- `public/assets/vivrti-emblem-crop.webp`: compact emblem crop used in the navigation and footer, preserving the original logo artwork.

All event rules, schedule and contact details that have not been confirmed are explicitly marked as pending rather than invented.
