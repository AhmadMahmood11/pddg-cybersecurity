'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { industries, services, site } from '@/lib/content';

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Approach', href: '/approach' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <div className="trust-bar"><span>Risk-driven cybersecurity assessments for regulated and operationally sensitive organizations.</span><span className="trust-contact">Columbia, Maryland · <a href={`tel:${site.phoneHref}`}>{site.phone}</a></span></div>
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo-link" aria-label="PDDG home">
          <img src={assetPath('/logos/pddg-logo.png')} width="195" height="80" alt="Pinnacle Digital Defense Group" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(item => <div className="nav-item" key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            {item.label === 'Services' && <div className="dropdown mega services-menu">
              <div><span className="menu-kicker">Assess</span>{services.slice(0, 5).map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div>
              <div><span className="menu-kicker">Strengthen & monitor</span>{services.slice(5).map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}<Link className="menu-all" href="/services">View all services →</Link></div>
            </div>}
            {item.label === 'Industries' && <div className="dropdown industries-menu"><span className="menu-kicker">Industries served</span>{industries.map(i => <Link key={i.slug} href={`/industries/${i.slug}`}>{i.name}</Link>)}<Link className="menu-all" href="/industries">View all industries →</Link></div>}
          </div>)}
        </nav>
        <Link href="/book-a-security-fit-call" className="button button-small header-cta">Book a Security Fit Call</Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}><span/><span/><span/></button>
      </div>
    </header>
    <div className={`mobile-panel ${open ? 'open' : ''}`} id="mobile-menu" aria-hidden={!open}>
      <nav aria-label="Mobile navigation">
        {nav.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span>↗</span></Link>)}
        <div className="mobile-sub"><span>Security services</span>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)}>{s.name}</Link>)}</div>
        <Link href="/book-a-security-fit-call" className="button" onClick={() => setOpen(false)}>Book a Security Fit Call</Link>
      </nav>
    </div>
  </>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-cta container">
      <div><span className="eyebrow">A clearer next step</span><h2>Start with a clearer view of your security risk.</h2><p>Discuss your concerns, identify an appropriate assessment path, and determine what is required to develop a practical scope.</p></div>
      <Link href="/book-a-security-fit-call" className="button button-light">Book a Security Fit Call <span>↗</span></Link>
    </div>
    <div className="footer-main container">
      <div className="footer-brand"><img src={assetPath('/logos/pddg-logo.png')} width="220" height="90" alt="Pinnacle Digital Defense Group" /><p>Risk-driven cybersecurity assessments, clear reporting, and practical remediation guidance for regulated and operationally sensitive organizations.</p><div className="footer-contact"><a href={`tel:${site.phoneHref}`}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a><span>{site.address}</span><span>{site.hours}</span></div></div>
      <div><h3>Company</h3><Link href="/about">About PDDG</Link><Link href="/approach">Our Approach</Link><Link href="/resources">Resources</Link><Link href="/case-studies">Case Studies</Link><Link href="/frequently-asked-questions">FAQs</Link></div>
      <div><h3>Services</h3>{services.slice(0, 6).map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div>
      <div><h3>Industries</h3>{industries.map(i => <Link key={i.slug} href={`/industries/${i.slug}`}>{i.name}</Link>)}</div>
    </div>
    <div className="footer-bottom container"><span>© {new Date().getFullYear()} Pinnacle Digital Defense Group. All rights reserved.</span><div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link><Link href="/accessibility-statement">Accessibility</Link></div></div>
  </footer>;
}
