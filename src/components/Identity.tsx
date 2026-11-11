import { site } from '../content'

export function Mark({ className = '' }: { className?: string }) {
  return <span className={`brand-mark ${className}`} aria-hidden="true"><i /><i /><i /><i /></span>
}

export function Wordmark() {
  return <a className="wordmark" href="#top" aria-label={`${site.name} home`}><Mark /><span>{site.name}<span className="wordmark-period">.</span></span></a>
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>
}

export function SectionLabel({ number, children, light = false }: { number: string, children: React.ReactNode, light?: boolean }) {
  return <p className={`section-label ${light ? 'label-light' : ''}`}><span>{number}</span>{children}</p>
}
