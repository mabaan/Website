import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

// Exercise optional configurations without publishing fictional people,
// email addresses or demo URLs, and without changing source files.
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
})
try {
  const { site, products } = await server.ssrLoadModule('/src/content.ts')
  const { renderMetadata } = await server.ssrLoadModule('/src/metadata.ts')
  const { default: Products } = await server.ssrLoadModule('/src/components/Products.tsx')
  const { default: FoundingTeam } = await server.ssrLoadModule('/src/components/FoundingTeam.tsx')
  const { default: Contact } = await server.ssrLoadModule('/src/components/Contact.tsx')
  const render = component => renderToStaticMarkup(createElement(component))

  assert.equal(render(FoundingTeam), '')
  assert.doesNotMatch(render(Products), /View prototype/)
  assert.match(render(Products), /Prototype/)
  assert.doesNotMatch(render(Products), /In development|02<!-- --> \/|Product 02/)
  const originalPrototypeUrl = products[0].prototypeUrl
  try {
    products[0].prototypeUrl = 'https://example.org/prototype'
    const product = render(Products)
    assert.match(product, /href="https:\/\/example.org\/prototype"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/)
    assert.match(product, /View prototype/)
  } finally { products[0].prototypeUrl = originalPrototypeUrl }

  try {
    site.founders.push(
      { name: 'Configuration fixture A', role: 'Test role', description: 'One-line configuration fixture.', linkedinUrl: 'https://www.linkedin.com/in/configuration-fixture' },
      { name: 'Configuration fixture B', role: 'Another test role', description: 'A fixture without a LinkedIn URL.' },
    )
    const team = render(FoundingTeam)
    assert.match(team, /Founding team/)
    assert.match(team, /Configuration fixture A/)
    assert.match(team, /Configuration fixture B/)
    assert.equal((team.match(/<li>/g) || []).length, 2)
    assert.equal((team.match(/href=/g) || []).length, 1)
    assert.match(team, /target="_blank" rel="noopener noreferrer"/)
  } finally { site.founders.splice(0) }

  const originalEmail = site.email
  try {
    assert.match(render(Contact), /Copy introduction/)
    assert.doesNotMatch(render(Contact), /href="mailto:/)
    site.email = 'contact@example.org'
    const contact = render(Contact)
    assert.match(contact, /class="contact-button" href="mailto:contact@example.org\?subject=A%20problem%20worth%20building%20around"/)
    assert.match(contact, />contact@example.org<\/a>/)
    assert.doesNotMatch(contact, /<dialog|Copy introduction/)
  } finally { site.email = originalEmail }

  const unconfigured = renderMetadata(site.seo, site.name)
  assert.doesNotMatch(unconfigured, /rel="canonical"|property="og:url"/)
  assert.match(unconfigured, /name="twitter:card" content="summary_large_image"/)
  const configured = renderMetadata({ ...site.seo, url: 'https://example.org/' }, site.name)
  assert.match(configured, /property="og:url" content="https:\/\/example.org\/"/)
  assert.match(configured, /rel="canonical" href="https:\/\/example.org\/"/)
  assert.match(configured, /property="og:image" content="https:\/\/example.org\/og\/starturi.png"/)
  assert.match(configured, /name="twitter:image" content="https:\/\/example.org\/og\/starturi.png"/)
  assert.throws(() => renderMetadata({ ...site.seo, url: 'unconfirmed-domain' }, site.name))
  assert.throws(() => renderMetadata({ ...site.seo, url: 'javascript:alert(1)' }, site.name))
  console.log('PASS: optional prototype link, multiple founders with optional LinkedIn, empty-state hiding, direct verified-email handoff and canonical/social metadata configuration. Fixtures never enter the published site.')
} finally {
  await server.close()
}
