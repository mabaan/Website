import { useRef, useState } from 'react'
import { intelligence, site } from '../content'
import { Arrow, SectionLabel } from './Identity'

export default function IntelligenceShowcase() {
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = intelligence[selected]

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % intelligence.length
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + intelligence.length) % intelligence.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = intelligence.length - 1
    if (next === undefined) return
    event.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  return <section id="mais-detail" data-nav="products" className="intelligence-section" aria-labelledby="intelligence-title">
    <div className="container">
      <SectionLabel number="↳" light>Product 01 / MAIS</SectionLabel>
      <div className="section-heading-row reveal"><h2 id="intelligence-title">{site.showcase.heading}</h2><p>{site.showcase.description}</p></div>
      <div className="intelligence-workbench reveal">
        <div className="investment-question"><span className="micro-label">THE INVESTMENT QUESTION</span><p>“{site.showcase.question}”</p><span className="question-corner" aria-hidden="true">↙</span></div>
        <div className="intelligence-body">
          <div className="intelligence-inputs"><p className="micro-label">COORDINATED CAPABILITIES <span>SELECT TO EXPLORE ↓</span></p><div role="tablist" aria-label="MAIS intelligence capabilities" aria-orientation="vertical">
            {intelligence.map((item, index) => <button type="button" role="tab" key={item.id} id={`tab-${item.id}`} aria-selected={selected === index} aria-controls="capability-panel" tabIndex={selected === index ? 0 : -1} ref={element => { tabRefs.current[index] = element }} onClick={() => setSelected(index)} onKeyDown={event => moveTab(event, index)} className={`intelligence-tab ${selected === index ? 'selected' : ''}`}><span className="tab-number">0{index + 1}</span><span>{item.title}</span><Arrow /></button>)}
          </div></div>
          <div className="intelligence-connection" aria-hidden="true"><span /><i /><span /></div>
          <div id="capability-panel" className="capability-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} tabIndex={0}>
            <div className="capability-content" key={current.id}>
              <p className="micro-label"><span className="live-square" /> {current.annotation}</p>
              <h3>{current.title}</h3><p className="capability-description">{current.description}</p>
              <div className="source-list">{current.sources.map(source => <span key={source}>{source}</span>)}</div>
              <div className="decision-output"><span className="micro-label">↓ DECISION-READY OUTPUT</span><p>{current.output}</p><span className="output-note">Evidence connected. Human judgment retained.</span></div>
            </div>
          </div>
        </div>
        <p className="demo-disclaimer">An illustration of the system’s capabilities, not live investment research.</p>
      </div>
      <ul className="safeguard-list">{site.showcase.safeguards.map(item => <li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul>
    </div>
  </section>
}
