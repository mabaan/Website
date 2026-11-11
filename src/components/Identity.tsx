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

export function Art({ name, className = '', size = 160, eager = false }: { name: string, className?: string, size?: number, eager?: boolean }) {
  return <img className={`art ${className}`} src={`/brand/3d/${name}.webp`} alt="" width={size} height={size} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
}

export function Icon({ name, className = '' }: { name: string, className?: string }) {
  return <span className={`line-icon ${className}`} style={{ '--icon': `url(/brand/icons/${name}.svg)` } as React.CSSProperties} aria-hidden="true" />
}
