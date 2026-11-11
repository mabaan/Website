import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { site } from '../src/content.ts'
import { escapeHtml } from '../src/metadata.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const base64 = async (file: string) => (await readFile(path.join(root, file))).toString('base64')
const sans = await base64('node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2')
const serif = await base64('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')
const logo = await base64(`public${site.brand.logo}`)
const mark = await base64(`public${site.brand.mark}`)
const destination = path.join(root, 'public', site.seo.image.replace(/^\//, ''))
await mkdir(path.dirname(destination), { recursive: true })

// Typography and the supplied official raster artwork; no reconstructed logo.
// The checked-in PNG keeps ordinary production builds independent of Chromium.
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    @font-face {font-family:DM;src:url(data:font/woff2;base64,${sans}) format('woff2');font-weight:100 1000}
    @font-face {font-family:Instrument;src:url(data:font/woff2;base64,${serif}) format('woff2');font-style:italic}
    * {box-sizing:border-box} body {margin:0;background:#f8f9fc;color:#0b1028;font-family:DM,Arial,sans-serif;width:1200px;height:630px;padding:48px 62px;position:relative}
    header {display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #cdd3e2;padding-bottom:27px}
    .logo {display:block;width:285px;height:auto}
    .label {font-size:10px;font-weight:500;letter-spacing:1.6px;text-transform:uppercase}
    h1 {margin:68px 0 0;font-size:83px;line-height:1.03;font-weight:450;letter-spacing:-5px}
    h1 em {display:block;font-family:Instrument,Georgia,serif;font-weight:400;font-size:121px;color:#5e3af8;letter-spacing:-4px;line-height:1.05;margin-top:5px}
    .mark-panel {position:absolute;right:62px;top:200px;width:280px;height:280px;border:1px solid #dad8ec;background:#efeff9;display:flex;align-items:center;justify-content:center}
    .mark-panel img {width:225px;height:auto}
    footer {position:absolute;bottom:43px;left:62px;right:62px;border-top:1px solid #cdd3e2;padding-top:21px;display:flex;justify-content:space-between;align-items:center}
    footer p {margin:0;font-size:11px;color:#60677c} .footer-index {font-size:9px;letter-spacing:1px;color:#60677c}
  </style></head><body>
    <header><img class="logo" src="data:image/png;base64,${logo}" alt="Moduled.ai"><span class="label">${escapeHtml(site.hero.eyebrow)}</span></header>
    <h1>Start with<em>the problem.</em></h1>
    <div class="mark-panel"><img src="data:image/png;base64,${mark}" alt=""></div>
    <footer><p>Real business problems. Focused AI products.</p><span class="footer-index">${escapeHtml(site.name.toUpperCase())}</span></footer>
  </body></html>`, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: destination })
  console.log(`Created ${path.relative(root, destination)} (1200 × 630)`)
} finally {
  await browser.close()
}
