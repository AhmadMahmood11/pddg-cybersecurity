'use client';

import { FormEvent, useId, useState } from 'react';
import type { FAQ } from '@/lib/content';

export function Accordion({ items }: { items: FAQ[] }) {
  const [active, setActive] = useState<number | null>(0);
  const baseId = useId();
  return <div className="accordion">
    {items.map((item, index) => {
      const isOpen = active === index;
      const buttonId = `${baseId}-button-${index}`;
      const panelId = `${baseId}-panel-${index}`;
      return <div className="accordion-item" key={item.q}>
        <h3><button id={buttonId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setActive(isOpen ? null : index)}><span>{item.q}</span><span aria-hidden="true">{isOpen ? '−' : '+'}</span></button></h3>
        <div className={`accordion-panel ${isOpen ? 'open' : ''}`} id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!isOpen}><div><p>{item.a}</p></div></div>
      </div>;
    })}
  </div>;
}

type FormKind = 'contact' | 'booking' | 'report';

export function DemoForm({ kind }: { kind: FormKind }) {
  const [state, setState] = useState<'idle' | 'error' | 'demo'>('idle');
  const id = useId();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { setState('error'); form.reportValidity(); return; }
    setState('demo');
  }
  if (state === 'demo') return <div className="form-result" role="status"><span className="result-icon">✓</span><h3>Form preview complete</h3><p>No information was sent. This demonstration form is not connected to a live submission system. Please call <a href="tel:+13015321463">301-532-1463</a> or email <a href="mailto:Info@pddg.io">Info@pddg.io</a> to contact PDDG.</p><button className="text-link" onClick={() => setState('idle')}>Return to form</button></div>;

  return <form className="lead-form" onSubmit={submit} noValidate>
    <div className="demo-notice"><strong>Demonstration mode</strong><span>This form is not connected to a live submission system.</span></div>
    {state === 'error' && <p className="form-error" role="alert">Please complete the required fields.</p>}
    <div className="form-grid">
      <label htmlFor={`${id}-name`}>Name <span>*</span><input id={`${id}-name`} name="name" required autoComplete="name" /></label>
      <label htmlFor={`${id}-email`}>Work email <span>*</span><input id={`${id}-email`} name="email" type="email" required autoComplete="email" /></label>
      <label htmlFor={`${id}-company`}>Company <span>*</span><input id={`${id}-company`} name="company" required autoComplete="organization" /></label>
      <label htmlFor={`${id}-phone`}>Phone number<input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" /></label>
      {kind !== 'report' && <label htmlFor={`${id}-industry`}>Industry<select id={`${id}-industry`} name="industry" defaultValue=""><option value="" disabled>Select industry</option><option>Healthcare</option><option>Financial services</option><option>Government</option><option>Education</option><option>Manufacturing</option><option>Hospitality</option><option>Other</option></select></label>}
      {kind !== 'report' && <label htmlFor={`${id}-service`}>Service of interest<select id={`${id}-service`} name="service" defaultValue=""><option value="">Not sure yet</option><option>Penetration Testing</option><option>Vulnerability Assessment</option><option>Vulnerability Management</option><option>Web Application Security Assessment</option><option>Threat Intelligence and Monitoring</option><option>Security Awareness Training</option><option>Physical Security Assessment</option><option>Cybersecurity Policy Assessment</option><option>Wireless and Bluetooth Security Audit</option></select></label>}
      {kind === 'contact' && <label htmlFor={`${id}-method`}>Preferred contact method<select id={`${id}-method`} name="method"><option>Email</option><option>Phone</option></select></label>}
      {kind === 'booking' && <label htmlFor={`${id}-timing`}>Preferred timing<select id={`${id}-timing`} name="timing"><option>Within 1–2 weeks</option><option>Within 30 days</option><option>Planning for later</option></select></label>}
      <label className="full" htmlFor={`${id}-message`}>{kind === 'report' ? 'How will you use the sample?' : kind === 'booking' ? 'What would you like to discuss?' : 'Short message'}<textarea id={`${id}-message`} name="message" rows={5} maxLength={1200}/></label>
    </div>
    <p className="form-warning">Please do not include passwords, credentials, protected data, API keys, access tokens, sensitive system information, or vulnerability details.</p>
    <label className="checkbox"><input type="checkbox" required /> <span>I understand this is a demonstration and no information will be submitted. <b>*</b></span></label>
    <button className="button form-submit" type="submit">{kind === 'report' ? 'Preview sample request' : kind === 'booking' ? 'Preview fit-call request' : 'Preview contact request'} <span>↗</span></button>
  </form>;
}
