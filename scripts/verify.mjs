import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'

const baseURL = process.env.QA_URL || 'http://127.0.0.1:5173'
await mkdir('.qa', { recursive: true })
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] })
const page = await context.newPage()
const errors = []
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })

try {
  const response = await page.goto(baseURL, { waitUntil: 'networkidle' })
  assert.equal(response.status(), 200)
  await page.evaluate(() => document.fonts.ready)
  assert.equal(await page.locator('h1').count(), 1)
  assert.match(await page.title(), /Starturi/)
  assert.equal(await page.getByRole('tab').count(), 7)
  await page.screenshot({ path: '.qa/desktop-hero.png' })

  // Reveal every section before taking a complete-page screenshot.
  for (const section of await page.locator('main > section').all()) {
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(80)
  }
  await page.locator('#top').scrollIntoViewIfNeeded()
  await page.screenshot({ path: '.qa/desktop-full.png', fullPage: true })
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  assert.deepEqual(accessibility.violations.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) })), [], 'Desktop accessibility scan')
  const tabs = page.getByRole('tab')
  for (let index = 0; index < 7; index++) {
    await tabs.nth(index).click()
    assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true')
    assert.equal(await page.getByRole('tabpanel').getAttribute('aria-labelledby'), await tabs.nth(index).getAttribute('id'))
    assert.equal(await page.getByRole('tabpanel').locator('h3').innerText(), (await tabs.nth(index).innerText()).replace(/^0\d\s*/, '').trim())
  }
  await tabs.nth(6).focus()
  await page.keyboard.press('ArrowDown')
  assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'true')
  await page.keyboard.press('End')
  assert.equal(await tabs.nth(6).getAttribute('aria-selected'), 'true')
  await page.keyboard.press('Home')
  assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'true')
  await page.locator('#mais-detail').scrollIntoViewIfNeeded()
  await page.screenshot({ path: '.qa/mais-desktop.png' })

  const disclosures = page.locator('.exploration-area')
  for (const detail of await disclosures.all()) {
    await detail.locator('summary').click()
    assert.equal(await detail.getAttribute('open'), '')
    assert.ok(await detail.locator('p').isVisible())
    await detail.locator('summary').click()
  }
  for (const [label, id] of [['What we do', 'premise'], ['Products', 'products'], ['Approach', 'approach'], ['About', 'about'], ['Contact', 'contact']]) {
    await page.getByRole('navigation').getByRole('link', { name: label, exact: true }).click()
    await page.waitForFunction(id => document.querySelector(`nav a[href="#${id}"]`)?.getAttribute('aria-current') === 'location', id)
  }
  const contactTrigger = page.getByRole('button', { name: 'Start a conversation' })
  await contactTrigger.click()
  assert.ok(await page.getByRole('dialog').isVisible())
  const modalAccessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  assert.deepEqual(modalAccessibility.violations.map(issue => issue.id), [], 'Contact dialog accessibility scan')
  await page.getByLabel('Your name').fill('A prospective partner')
  await page.getByLabel('What should work better?', { exact: true }).fill('Our team spends hours comparing evidence from separate internal systems.')
  await page.getByRole('button', { name: 'Copy introduction' }).click()
  await page.getByRole('status').filter({ hasText: 'Introduction copied' }).waitFor()
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /Hello Starturi/)
  await page.screenshot({ path: '.qa/contact.png' })
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('dialog').isVisible(), false)
  assert.ok(await contactTrigger.evaluate(element => document.activeElement === element))

  // Check all content at several widths, including the narrowest supported phone.
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await page.locator('#top').scrollIntoViewIfNeeded()
    await page.waitForTimeout(100)
    const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }))
    assert.ok(dimensions.scroll <= dimensions.viewport, `Overflow at ${width}px: ${JSON.stringify(dimensions)}`)
    const overflow = await page.evaluate(() => [...document.querySelectorAll('main *')].filter(element => {
      if (element.closest('dialog:not([open])') || element.closest('.mais-artwork')) return false
      const box = element.getBoundingClientRect()
      return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1)
    }).map(element => `${element.tagName}.${element.className}`).slice(0, 8))
    assert.deepEqual(overflow, [], `Elements outside viewport at ${width}px`)
    if (width === 390) {
      await page.screenshot({ path: '.qa/mobile-hero.png' })
      await page.screenshot({ path: '.qa/mobile-full.png', fullPage: true })
      await page.locator('#products').scrollIntoViewIfNeeded()
      await page.screenshot({ path: '.qa/products-mobile.png' })
      const mobileAccessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      assert.deepEqual(mobileAccessibility.violations.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) })), [], 'Mobile accessibility scan')
      const toggle = page.getByRole('button', { name: 'Menu' })
      await toggle.click()
      assert.equal(await page.getByRole('button', { name: 'Close', exact: true }).getAttribute('aria-expanded'), 'true')
      await page.getByRole('navigation').getByRole('link', { name: 'Products', exact: true }).click()
      assert.equal(await page.getByRole('button', { name: 'Menu' }).getAttribute('aria-expanded'), 'false')
      await page.waitForFunction(() => document.querySelector('nav a[href="#products"]')?.getAttribute('aria-current') === 'location')
      await page.getByRole('button', { name: 'Menu' }).click()
      await page.keyboard.press('Escape')
      assert.equal(await page.getByRole('button', { name: 'Menu' }).getAttribute('aria-expanded'), 'false')
      await page.locator('#mais-detail').scrollIntoViewIfNeeded()
      await page.screenshot({ path: '.qa/mais-mobile.png' })
    }
  }
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'smooth')
  assert.deepEqual(errors, [], 'No console, runtime or HTTP errors')
  console.log('PASS: desktop/mobile, five viewport widths, seven MAIS tabs, keyboard selection, disclosures, all navigation links, mobile menu, contact clipboard, focus restoration and reduced motion. No browser errors. Zero axe WCAG A/AA violations on desktop, mobile and contact dialog.')
} finally {
  await browser.close()
}
