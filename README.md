# Ceylon Joyrides: Premium Sri Lanka Travel Website

React + Vite + Tailwind CSS (v3) + React Router + Framer Motion + Lucide icons. Frontend only: no backend,
database or paid APIs. Enquiries are sent by opening **WhatsApp** (or the visitor's email app) with a pre-filled
message. Nothing is ever sent silently.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

Requires Node.js 18 or newer.

## Pages

| Page    | Route      |
| ------- | ---------- |
| Home    | `/`        |
| About   | `/about`   |
| Gallery | `/gallery` |
| Contact | `/contact` |
| Booking | `/booking` |
| 404     | any other path |

### Hosting: SPA rewrites (so refreshing `/booking` works)

Rewrite files are already included:

- **Netlify / Cloudflare Pages**: `public/_redirects` (`/*  /index.html  200`)
- **Vercel**: `vercel.json`
- **Apache**: add to `.htaccess`: `RewriteEngine On` / `RewriteCond %{REQUEST_FILENAME} !-f` / `RewriteRule ^ /index.html [L]`
- **Nginx**: `location / { try_files $uri /index.html; }`

## Where to edit things

| What                                                          | File                          |
| ------------------------------------------------------------- | ----------------------------- |
| WhatsApp, phone, email, address, social links, logo, site URL | `src/config/siteConfig.js`    |
| All page text (headlines, About story, form options)          | `src/data/content.js`         |
| Every photograph used on the site                             | `src/data/images.js`          |
| Service cards / destination cards                             | `src/data/experiences.js`, `src/data/destinations.js` |
| Gallery photos, categories, captions                          | `src/data/gallery.js`         |
| Verified customer reviews (empty by default)                  | `src/data/testimonials.js`    |
| Colours and fonts                                             | `tailwind.config.js`          |

## Before you publish: checklist

**Business details** (`src/config/siteConfig.js`). These are intentionally empty so no invented detail appears:

- [ ] `whatsappNumber`: digits only with country code, e.g. `94771234567` (no `+`, spaces or dashes). Until this is set,
      the booking and contact forms show a "not set up yet" notice with a copy-my-enquiry button instead of opening WhatsApp,
      and WhatsApp buttons link to the Contact page.
- [ ] `phoneDisplay`, `email`
- [ ] `location.streetAddress` and `location.mapUrl` (only once the exact address is confirmed)
- [ ] `socials.facebook` / `tiktok` / `youtube` (leave empty to hide)
- [ ] `siteUrl` (for canonical and Open Graph URLs)
- [ ] `logoImage`: the current wordmark is a placeholder, not an official logo. Put your logo in `/public` and set the path.
- [ ] Replace `public/favicon.svg` with your real icon.

**Images**

- [ ] Open every page and confirm each photo shows what its alt text says. Photos are Unsplash IDs chosen from photo
      titles and could not be loaded or checked while building. Any image that fails to load shows a gradient fallback.
- [ ] Ideally replace them with Ceylon Joyrides' own photos: put files in `public/images/` and set entries in
      `src/data/images.js` and `src/data/gallery.js` to paths like `/images/galle-road.jpg`.
- [ ] Update alt text and captions to match.
- [ ] Unsplash photos are free to use under the Unsplash License. Credit is optional but appreciated (a small credit line is in the footer).
      Remove it once you use your own photos.

**Copy**

- [ ] Read `aboutContent` in `src/data/content.js` and replace it with the real story of the business. It was written without
      a founding year, awards, traveller counts or fleet details. Only add facts you can stand behind.
- [ ] Confirm the destinations and services you actually offer (`destinations.js`, `experiences.js`).
- [ ] Add real testimonials to `testimonials.js` only with the customer's consent. The reviews section appears automatically when entries exist.

**Test**

- [ ] Send a test booking enquiry and a contact message to confirm they open WhatsApp with the right number.
- [ ] Check 360px, 390px, tablet, 1366px and 1440px widths.
- [ ] Refresh `/booking` on your live host to confirm the SPA rewrite works.

## Notes

- The mobile bottom action bar (WhatsApp, Plan a Trip) is hidden on `/booking` so it never covers the form, and the page
  gets bottom padding elsewhere so it never covers the footer.
- Animations respect `prefers-reduced-motion`.
- The footer newsletter box only appears when an email is configured, and it opens the visitor's email app. It does not subscribe anyone.
