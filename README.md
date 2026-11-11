# Starturi

A single-page, editorial website for an early-stage AI product company. Built with React, TypeScript, Vite and custom CSS. Fonts are self-hosted through npm; no external APIs, analytics, or backend are needed.

## Develop

```sh
npm install
npm run dev
```

## Check and build

```sh
npm run build
```

The production files are written to `dist/`. To serve that build, use `npm run preview`.

## Edit content

- `src/content.ts`: company identity, navigation, contact address, page copy, products and MAIS capability descriptions.
- `src/styles.css`: design tokens, layout, responsive styles and reduced-motion behavior.
- `src/components/Products.tsx`: product rendering. Add entries to `products` in the content file to extend the portfolio.
- `index.html` and `public/favicon.svg`: browser title, social metadata and favicon. Update these when changing the brand.

The contact email intentionally starts empty: no business email was provided. Until a verified address is added to `site.email`, the contact dialog copies a visitor’s introduction for them to share with their existing Starturi contact. It sends and stores nothing. Adding an email address enables a populated `mailto:` handoff.

The MAIS showcase is an interactive conceptual illustration, not a live investment product. It supports pointer selection, Tab, arrow keys, Home and End. Exploration rows are native accessible disclosure elements. The contact dialog uses native modal focus handling and closes with Escape.

## Browser verification

With the dev server running at `http://127.0.0.1:5173`:

```sh
npx playwright install chromium
npm run test:browser
```

Checks cover desktop and mobile layout at five widths (320–1440px), console and network errors, all seven MAIS capabilities, keyboard navigation, disclosure rows, every navigation destination, contact behavior, modal focus, and reduced motion. Axe checks WCAG A/AA rules on desktop, mobile and the contact dialog. Screenshots are saved to the ignored `.qa/` directory.
