import { useEffect } from 'react'
import { site } from './content'
import Navigation from './components/Navigation'
import Products from './components/Products'
import IntelligenceShowcase from './components/IntelligenceShowcase'
import Contact from './components/Contact'
import FoundingTeam from './components/FoundingTeam'
import { Arrow, Art, Icon, SectionLabel } from './components/Identity'

function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><div className="container">
    <div className="hero-eyebrow"><span className="micro-label"><span className="accent-square" />{site.hero.eyebrow}</span>{site.parent ? <span className="micro-label hero-location">{site.parent}</span> : null}</div>
    <div className="hero-layout"><div className="hero-main"><h1 id="hero-title"><span className="hero-first">{site.hero.firstLine}</span><span className="hero-serif">{site.hero.secondLine}<br />{site.hero.thirdLine}</span></h1><p className="hero-description">{site.hero.description}</p><div className="hero-actions"><a className="button button-dark" href="#products">See what we build<Arrow diagonal /></a><a className="text-link" href="#approach">How we work<Arrow /></a></div></div><HeroStage /></div>
  </div></section>
}

function HeroStage() {
  return <div className="hero-stage" aria-hidden="true">
    <div className="stage-disc" />
    <Art name="hex-cluster" className="float stage-core" size={360} eager />
    <Art name="globe" className="float float-slow stage-globe" size={150} eager />
    <Art name="server" className="float float-late stage-server" size={120} eager />
  </div>
}

function Premise() {
  return <section id="premise" data-nav="premise" className="premise-section section-space" aria-labelledby="premise-title"><div className="container">
    <SectionLabel number="01">What we do</SectionLabel>
    <div className="premise-layout"><div className="premise-intro reveal"><h2 id="premise-title">{site.premise.heading[0]}<br /><em>{site.premise.heading[1]}</em></h2><p className="premise-lead">{site.premise.lead}</p><p>{site.premise.description}</p><p className="premise-conclusion">{site.premise.conclusion}</p></div>
    <div className="problem-list reveal">{site.premise.problems.map((problem, index) => <div className="problem-row" key={problem.title}><span className="problem-index">0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.description}</p></div><span className="problem-art"><Art name={problem.art} size={88} /></span></div>)}</div></div>
  </div></section>
}

function Approach() {
  return <section id="approach" data-nav="approach" className="approach-section section-space" aria-labelledby="approach-title"><div className="container">
    <SectionLabel number="03">How we build</SectionLabel><div className="section-heading-row reveal"><h2 id="approach-title">{site.approach.heading}</h2></div>
    <div className="process-stages">{site.approach.stages.map((stage, index) => <article className="process-stage reveal" key={stage.title}><div className="stage-top"><span>0{index + 1}</span></div><div className="stage-art"><Art name={stage.art} size={150} /></div><h3>{stage.title}</h3><p>{stage.description}</p></article>)}</div>
  </div></section>
}

function Foundations() {
  return <section className="foundations-section" data-nav="approach" aria-labelledby="foundations-title"><div className="container foundations-layout"><div className="foundations-intro reveal"><SectionLabel number="—">Platform</SectionLabel><h2 id="foundations-title">{site.foundations.heading[0]}<br /><em>{site.foundations.heading[1]}</em></h2><p>{site.foundations.description}</p><div className="foundation-art" aria-hidden="true"><Art name="hex-cluster" size={240} className="float" /><Art name="cube-hex" size={110} className="float float-late" /></div></div><div className="foundations-detail reveal"><ol className="foundation-list">{site.foundations.capabilities.map((capability, index) => <li key={capability.name}><span>{String(index + 1).padStart(2, '0')}</span><Icon name={capability.icon} />{capability.name}</li>)}</ol><p className="foundations-conclusion">{site.foundations.conclusion}</p></div></div></section>
}

function Exploration() {
  return <section id="exploration" data-nav="approach" className="exploration-section section-space" aria-labelledby="exploration-title"><div className="container"><SectionLabel number="04">Exploration</SectionLabel><div className="exploration-layout"><div className="reveal"><h2 id="exploration-title">{site.exploration.heading}</h2><p className="exploration-note">{site.exploration.note}</p></div><div className="exploration-areas reveal">{site.exploration.areas.map((area, index) => <details className="exploration-area" key={area.name}><summary><span className="area-index">0{index + 1}</span><Art name={area.art} size={56} className="area-art" /><h3>{area.name}</h3><span className="details-icon" aria-hidden="true">+</span></summary><p>{area.description}</p></details>)}</div></div></div></section>
}

function About() {
  return <section id="about" data-nav="about" className="about-section section-space" aria-labelledby="about-title"><div className="container"><SectionLabel number="05">About</SectionLabel><div className="about-layout reveal"><h2 id="about-title">{site.about.heading.split('\n').map(line => <span key={line}>{line}</span>)}</h2><div><p className="about-lead">{site.about.description}</p><p>{site.about.detail}</p><span className="about-signoff"><span className="accent-square" />{site.name} · {site.location}</span></div><div className="about-art" aria-hidden="true"><Art name="globe-light" size={320} className="float float-slow" /></div></div><FoundingTeam /></div></section>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    document.documentElement.classList.add('reveal-ready')
    return () => { observer.disconnect(); document.documentElement.classList.remove('reveal-ready') }
  }, [])
  return <><a className="skip-link" href="#main-content">Skip to content</a><div id="top" /><Navigation /><main id="main-content"><Hero /><Premise /><Products /><IntelligenceShowcase /><Approach /><Foundations /><Exploration /><About /><Contact /></main></>
}
