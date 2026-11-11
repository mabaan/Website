import { site } from '../content'
import { Arrow } from './Identity'

export default function FoundingTeam() {
  if (site.founders.length === 0) return null

  return <section className="founding-team reveal" aria-labelledby="founding-team-title">
    <h3 className="micro-label" id="founding-team-title">Founding team</h3>
    <ul className="founder-list">
      {site.founders.map(person => <li key={`${person.name}-${person.role}`}>
        <div className="founder-heading"><h4>{person.name}</h4><span>{person.role}</span></div>
        <p>{person.description}</p>
        {person.linkedinUrl?.trim() ? <a className="text-link founder-link" href={person.linkedinUrl.trim()} target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /><span className="sr-only"> for {person.name} (opens in a new tab)</span></a> : null}
      </li>)}
    </ul>
  </section>
}
