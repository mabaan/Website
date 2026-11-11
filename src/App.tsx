import { useEffect } from 'react'
import { site } from './content'
import Navigation from './components/Navigation'
import ProblemDrawing from './components/ProblemDrawing'
import Products from './components/Products'
import IntelligenceShowcase from './components/IntelligenceShowcase'
import Contact from './components/Contact'
import { Arrow, SectionLabel } from './components/Identity'

function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><div className="container">
    <div className="hero-eyebrow"><span className="micro-label"><span className="accent-square" />{site.hero.eyebrow}</span><span className="micro-label hero-location">INDEPENDENT THINKING. USEFUL PRODUCTS.</span></div>
    <div className="hero-layout"><div className="hero-main"><h1 id="hero-title"><span className="hero-first">{site.hero.firstLine}</span><span className="hero-serif">{site.hero.secondLine}<br />{site.hero.thirdLine}</span></h1><p className="hero-description">{site.hero.description}</p><div className="hero-actions"><a className="button button-dark" href="#products">See what we build<Arrow diagonal /></a><a className="text-link" href="#approach">How we work<Arrow /></a></div></div><ProblemDrawing /></div>
    <div className="hero-bottom"><p>{site.hero.principles.map((word, index) => <span key={word}><i>0{index + 1}</i>{word}</span>)}</p><a href="#premise" className="scroll-note">A little further, a little clearer <span aria-hidden="true">↓</span></a></div>
  </div></section>
}

function Premise() {
  return <section id="premise" data-nav="premise" className="premise-section section-space" aria-labelledby="premise-title"><div className="container">
    <SectionLabel number="01">A simple premise</SectionLabel>
    <div className="premise-layout"><div className="premise-intro reveal"><h2 id="premise-title">{site.premise.heading[0]}<br /><em>{site.premise.heading[1]}</em></h2><p className="premise-lead">{site.premise.lead}</p><p>{site.premise.description}</p><p className="premise-conclusion">{site.premise.conclusion}</p><span className="margin-note">Less spectacle.<br />More substance.<svg viewBox="0 0 100 25" fill="none" aria-hidden="true"><path d="M2 12c28-8 60-8 92-4M9 20c29-8 60-9 88-7" stroke="currentColor" strokeWidth="1.1" /></svg></span></div>
    <div className="problem-list reveal"><p className="micro-label">FAMILIAR PROBLEMS. BETTER POSSIBILITIES.</p>{site.premise.problems.map((problem, index) => <div className="problem-row" key={problem.title}><span className="problem-index">0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.description}</p></div><span className="problem-plus" aria-hidden="true">+</span></div>)}</div></div>
  </div></section>
}

function Approach() {
  return <section id="approach" data-nav="approach" className="approach-section section-space" aria-labelledby="approach-title"><div className="container">
    <SectionLabel number="03">How we build</SectionLabel><div className="section-heading-row reveal"><h2 id="approach-title">{site.approach.heading}</h2><p className="approach-annotation">{site.approach.note}<span aria-hidden="true">↙</span></p></div>
    <div className="process-stages">{site.approach.stages.map((stage, index) => <article className="process-stage reveal" key={stage.title}><div className="stage-top"><span>0{index + 1}</span><span aria-hidden="true">{index < 3 ? '→' : '↺'}</span></div><h3>{stage.title}</h3><p>{stage.description}</p><span className="stage-note">{stage.note}</span></article>)}</div>
  </div></section>
}

function Foundations() {
  return <section className="foundations-section" data-nav="approach" aria-labelledby="foundations-title"><div className="container foundations-layout"><div className="foundations-intro reveal"><SectionLabel number="↳">The foundations</SectionLabel><h2 id="foundations-title">{site.foundations.heading[0]}<br /><em>{site.foundations.heading[1]}</em></h2><p>{site.foundations.description}</p><span className="foundation-symbol" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span></div><div className="foundations-detail reveal"><ol className="foundation-list">{site.foundations.capabilities.map((capability, index) => <li key={capability}><span>{String(index + 1).padStart(2, '0')}</span>{capability}</li>)}</ol><p className="foundations-conclusion">{site.foundations.conclusion}</p></div></div></section>
}

function Exploration() {
  return <section id="exploration" data-nav="approach" className="exploration-section section-space" aria-labelledby="exploration-title"><div className="container"><SectionLabel number="04">An open field</SectionLabel><div className="exploration-layout"><div className="reveal"><h2 id="exploration-title">{site.exploration.heading}</h2><p className="exploration-note">{site.exploration.note}</p></div><div className="exploration-areas reveal">{site.exploration.areas.map((area, index) => <details className="exploration-area" key={area.name}><summary><span className="area-index">0{index + 1}</span><h3>{area.name}</h3><span className="details-icon" aria-hidden="true">+</span></summary><p>{area.description}</p></details>)}</div></div></div></section>
}

function Philosophy() {
  return <section className="philosophy-section" data-nav="about" aria-label="Our philosophy"><div className="container"><div className="philosophy-top"><span className="micro-label">A DIFFERENT STARTING POINT</span><span aria-hidden="true">↘</span></div><div className="philosophy-questions reveal"><p>{site.philosophy.preface}<span>{site.philosophy.firstQuestion}</span></p><p>{site.philosophy.answer}<strong>{site.philosophy.secondQuestion}</strong></p></div><div className="philosophy-bottom"><span className="philosophy-note">Better questions.<br />Better things.</span><p>{site.philosophy.description}</p></div></div></section>
}

function About() {
  return <section id="about" data-nav="about" className="about-section section-space" aria-labelledby="about-title"><div className="container"><SectionLabel number="05">A little about us</SectionLabel><div className="about-layout reveal"><h2 id="about-title">{site.about.heading.split('\n').map(line => <span key={line}>{line}</span>)}</h2><div><p className="about-lead">{site.about.description}</p><p>{site.about.detail}</p><span className="about-signoff"><span className="accent-square" />{site.name} · {site.location}</span></div></div></div></section>
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
  return <><a className="skip-link" href="#main-content">Skip to content</a><div id="top" /><Navigation /><main id="main-content"><Hero /><Premise /><Products /><IntelligenceShowcase /><Approach /><Foundations /><Exploration /><Philosophy /><About /><Contact /></main></>
}
