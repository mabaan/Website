import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { site } from '../src/content.ts'
import { escapeHtml } from '../src/metadata.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const font = async (file: string) => (await readFile(path.join(root, 'node_modules', file))).toString('base64')
const sans = await font('@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2')
const serif = await font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')
const destination = path.join(root, 'public', site.seo.image.replace(/^\//, ''))
await mkdir(path.dirname(destination), { recursive: true })

// A code-native typographic composition using the site's own fonts and colors.
// The PNG is checked in; ordinary production builds do not need a browser.
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    @font-face {font-family:DM;src:url(data:font/woff2;base64,${sans}) format('woff2');font-weight:100 1000}
    @font-face {font-family:Instrument;src:url(data:font/woff2;base64,${serif}) format('woff2');font-style:italic}
    * {box-sizing:border-box} body {margin:0;background:#f4f1e9;color:#262721;font-family:DM,Arial,sans-serif;width:1200px;height:630px;padding:48px 62px;position:relative}
    header {display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #cdcabe;padding-bottom:29px}
    .wordmark {display:flex;align-items:center;gap:14px;font-size:35px;font-weight:650;letter-spacing:-1.6px;line-height:1}
    .mark {display:grid;grid-template-columns:repeat(2,10px);grid-template-rows:repeat(2,10px);gap:4px;transform:rotate(-8deg)}
    .mark i {background:#df4b2f} .period {color:#df4b2f}
    .label {font-size:10px;font-weight:500;letter-spacing:1.6px;text-transform:uppercase}
    h1 {margin:78px 0 0;font-size:83px;line-height:1.03;font-weight:450;letter-spacing:-5px}
    h1 em {display:block;font-family:Instrument,Georgia,serif;font-weight:400;font-size:121px;color:#df4b2f;letter-spacing:-4px;line-height:1.05;margin-top:5px}
    .drawing {position:absolute;right:96px;top:156px;width:260px;height:335px}
    footer {position:absolute;bottom:43px;left:62px;right:62px;border-top:1px solid #cdcabe;padding-top:21px;display:flex;justify-content:space-between;align-items:center}
    footer p {margin:0;font-size:12px;font-weight:450;letter-spacing:-.1px} .footer-index {font-size:9px;letter-spacing:1px;color:#65655b}
  </style></head><body>
    <header><div class="wordmark"><span class="mark"><i></i><i></i><i></i><i></i></span><span>${escapeHtml(site.name)}<span class="period">.</span></span></div><span class="label">${escapeHtml(site.hero.eyebrow)}</span></header>
    <h1>Start with<em>the problem.</em></h1>
    <svg class="drawing" viewBox="0 0 260 335" fill="none" aria-hidden="true">
      <path d="M130 5v318M8 85h244M8 219h244" stroke="#cdcabe" stroke-width=".8" stroke-dasharray="3 6"/>
      <path d="M101 100C47 108 44 40 85 34c42-6 95 107 129 72s-80-110-116-79c-38 33 89 108 105 63S85-3 73 48c-13 51 118 106 142 54S137-7 97 34c-40 41 55 94 88 56s-62-85-90-55c-27 29 54 86 82 66s-18-57-42-44c-24 14-8 44 10 45" stroke="#262721" stroke-width="1.1"/>
      <path d="M145 102c12 30-40 31-20 57s20 32 5 51v18m-6-7 6 7 6-7" stroke="#262721" stroke-width="1.3"/>
      <path d="M85 238h90v90H85zm30 0v90m30-90v90m-60-60h90m-90 30h90" stroke="#df4b2f" stroke-width="1.3"/>
      <path d="M115 268h30v30h-30z" fill="#df4b2f"/>
    </svg>
    <footer><p>${escapeHtml(site.hero.principles.join(' '))}</p><span class="footer-index">PROBLEM → PRODUCT</span></footer>
  </body></html>`, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: destination })
  console.log(`Created ${path.relative(root, destination)} (1200 × 630)`)
} finally {
  await browser.close()
}
