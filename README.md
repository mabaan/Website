# Moduled AI

A single-page, editorial website for an early-stage AI product company. Built with React, TypeScript, Vite and custom CSS. Fonts are self-hosted through npm; no external APIs, analytics, or backend are needed.

## Develop

```sh
npm install
npm run dev
```

## Check and build

```sh
npm run check
npm run build
```

The production files are written to `dist/`. To serve that build, use `npm run preview`.

## Edit content

- `src/content.ts`: company identity, navigation, contact address, page copy, product status/demo URLs, founders, sharing metadata and MAIS capability descriptions.
- `src/styles.css`: design tokens, layout, responsive styles and reduced-motion behavior.
- `src/components/Products.tsx`: product rendering. Add entries to `products` in the content file to extend the portfolio.
- `public/brand/moduled/`: official visual identity and raster favicons.

The contact email intentionally starts empty: no business email was provided. Until a verified address is added to `site.email`, the contact dialog copies a visitor’s introduction for them to share with their existing Moduled AI contact. It sends and stores nothing. Adding an email address changes the primary contact CTA to a direct `mailto:` link and displays that address below it.

MAIS is labeled **Prototype** via `products[0].stage`. Set its `prototypeUrl` to a real demo URL to show **View prototype**; an empty value hides that link. The unnumbered **What’s next** exploration is configured separately in `site.whatsNext` and is not a second product.

Populate `site.founders` with real people using `name`, `role`, `description` and optional `linkedinUrl`. An empty array renders no founding-team heading or placeholder. Populated entries appear as restrained editorial rows without avatars or cards.

## Social sharing

All title, description, image and canonical settings live in `site.seo` in `src/content.ts`. Set `site.seo.url` to the verified public page URL when the domain is finalized, then rebuild. This emits canonical and `og:url` tags and resolves the Open Graph/Twitter image to an absolute URL. While the domain is unset, those URL tags are omitted and the included image uses its local path. No production domain is guessed. Social crawlers will also need public access to the final page and image.

The Vite metadata plugin writes tags into the initial HTML, so sharing previews do not depend on JavaScript. The checked-in `public/og/moduled-ai.png` is a 1200×630 image using the official logo, near-white background, navy type and restrained purple accents. To regenerate it after changing the identity (requires the development dependencies and Playwright Chromium):

```sh
npm run generate:og
```

Ordinary production builds use the checked-in PNG and do not need Chromium.

The MAIS showcase is an interactive conceptual illustration, not a live investment product. It supports pointer selection, Tab, arrow keys, Home and End. Exploration rows are native accessible disclosure elements. The contact dialog uses native modal focus handling and closes with Escape.

## Browser verification

With the dev server running at `http://127.0.0.1:5173`:

```sh
npx playwright install chromium
npm run test:browser
npm run test:config
```

Checks cover desktop and mobile layout at five widths (320–1440px), console and network errors, all seven MAIS capabilities, keyboard navigation, disclosure rows, every navigation destination, contact behavior, modal focus, reduced motion, product framing and the delivered sharing asset/metadata. Axe checks WCAG A/AA rules on desktop, mobile and the contact dialog. Screenshots are saved to the ignored `.qa/` directory. `test:config` additionally checks populated and empty demo, founder, email and canonical configurations using in-memory fixtures; it does not write fake details into the site.

## Brand assets

- `public/brand/moduled/moduled-ai-source.png` — supplied official raster lockup, retained unchanged. `moduled-ai-logo.png` is a tightly cropped, background-cleared copy. `moduled-ai-mark.png` extracts the official M from the same source. No letterforms or symbol geometry were redrawn.
- `public/brand/moduled/favicon-32.png`, `favicon-192.png` and `apple-touch-icon.png` — proportionally resized official M on square transparent canvases. The logo's purple/cyan colors are preserved. Logo images never receive artwork filters.
- `public/brand/3d/*.webp` — existing illustrations, presented with a shared restrained violet/navy color treatment via `--art-tone`. Neutral materials retain their shading. The hero uses one modular object instead of an orbit of technology objects.
- `public/brand/icons/*.svg` — existing line icons rendered as CSS masks, taking the surrounding interface color.
- Typography: self-hosted **DM Sans** (UI/body), **IBM Plex Mono** (technical labels) and **Instrument Serif** (editorial accents), distributed under the SIL Open Font License. License notices are included in `public/fonts/licenses/`. Proprietary typefaces are not part of the production identity.
- Use `<Art name="hex-cluster" />` and `<Icon name="nodes" />` from `src/components/Identity.tsx`. Section-level illustration and icon choices are in `src/content.ts` (`art` / `icon` fields).
- `site.parent` supports an optional verified relationship in the hero and footer. It is empty; no parent-company affiliation is asserted.
