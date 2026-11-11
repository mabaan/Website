import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import { Arrow, Wordmark } from './Identity'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.getAttribute('data-nav') ?? '')
      }
    }, { rootMargin: '-18% 0px -48% 0px', threshold: 0 })
    const sections = document.querySelectorAll('[data-nav]')
    sections.forEach(section => observer.observe(section))
    // The last section can be too short to reach the observer band; mark it once the page bottom is reached.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) setActive(sections[sections.length - 1]?.getAttribute('data-nav') ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus() }
    }
    const closeOnResize = () => { if (window.innerWidth > 900) setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnResize)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnResize)
    }
  }, [open])

  return <header className="header">
    <div className="container navigation">
      <Wordmark />
      <button ref={toggleRef} className={`menu-toggle ${open ? 'is-open' : ''}`} type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><span className="menu-lines"><i /><i /></span></button>
      <nav id="main-navigation" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        {site.navigation.map(item => <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Get in touch <Arrow diagonal /></a>
      </nav>
    </div>
  </header>
}
