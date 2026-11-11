import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import { Arrow, Art, Wordmark } from './Identity'

export default function Contact() {
  const email = site.email.trim()
  const emailHref = `mailto:${email}?subject=${encodeURIComponent('A problem worth building around')}`
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [problem, setProblem] = useState('')
  const [name, setName] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  function close() { setOpen(false); setStatus(''); triggerRef.current?.focus() }
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const message = `Hello ${site.name},\n\n${problem.trim()}\n\n${name.trim()}`
    try {
      await navigator.clipboard.writeText(message)
      setStatus(`Introduction copied. Share it with the person who introduced you to ${site.name}. Nothing has been sent or stored.`)
    } catch {
      setStatus('Clipboard unavailable. You can select and copy the text in the fields above. Nothing has been sent or stored.')
    }
  }

  return <>
    <section className="contact-section" id="contact" data-nav="contact" aria-labelledby="contact-title"><div className="container">
      <p className="section-label"><span>06</span>Contact</p>
      <div className="contact-main reveal"><div className="contact-heading"><h2 id="contact-title">{site.contact.heading}</h2><Art name="envelope" size={200} className="float contact-art" /></div><div className="contact-aside"><p>{site.contact.description}</p>{email ? <><a className="contact-button" href={emailHref}>{site.contact.cta}<Arrow diagonal /></a><a className="contact-email" href={emailHref}>{email}</a></> : <button className="contact-button" ref={triggerRef} type="button" onClick={() => setOpen(true)}>{site.contact.cta}<Arrow diagonal /></button>}</div></div>
    </div></section>
    <footer className="footer"><div className="container footer-top"><Wordmark /><a className="back-top" href="#top">Back to top <span aria-hidden="true">↑</span></a></div><div className="container footer-bottom"><span>{site.parent ? `${site.parent} · ` : ''}{site.location} · {site.year}</span><span>© {site.year} {site.name}</span></div></footer>
    {!email ? <dialog className="contact-dialog" ref={dialogRef} onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }} aria-labelledby="dialog-title">
      <div className="dialog-header"><span className="micro-label">CONTACT</span><button className="close-dialog" type="button" aria-label="Close conversation" onClick={close}>×</button></div>
      <h2 id="dialog-title">Introduce your project</h2>
      <p>Prepare a short introduction to share with your {site.name} contact. Direct email will be available here once a contact address is confirmed.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Your name<input autoComplete="name" id="contact-name" name="name" required maxLength={120} value={name} onChange={event => { setName(event.target.value); setStatus('') }} placeholder="Name" /></label>
        <label htmlFor="contact-problem">What should work better?<textarea id="contact-problem" name="problem" required minLength={10} maxLength={4000} rows={4} value={problem} onChange={event => { setProblem(event.target.value); setStatus('') }} placeholder="The problem, the people it affects, and how it works today…" /></label>
        <button className="button button-dark" type="submit">Copy introduction<Arrow diagonal /></button>
        <p className="form-status" role="status">{status}</p>
      </form>
    </dialog> : null}
  </>
}
