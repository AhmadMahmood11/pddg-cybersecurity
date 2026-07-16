import Link from 'next/link';
import { industries, services } from '@/lib/content';

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

export function Icon({ name = 'shield' }: { name?: string }) {
  const paths: Record<string, React.ReactNode> = {
    shield: <><path d="M12 3 5 6v5c0 4.5 2.7 8.1 7 10 4.3-1.9 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></>,
    scan: <><path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4"/><circle cx="12" cy="12" r="3"/></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="m16 8 5-5M17 3h4v4"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2"/></>,
    building: <><path d="M4 21V7l8-4 8 4v14M2 21h20M8 9h1M15 9h1M8 13h1M15 13h1M10 21v-4h4v4"/></>,
    file: <><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/></>,
    signal: <><path d="M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0M11 18a2 2 0 0 1 2 0"/><circle cx="12" cy="21" r="1"/></>,
    pentest: <><path d="M4 18 9 13l3 3 8-9"/><path d="M15 7h5v5"/><circle cx="7" cy="7" r="3"/><path d="M7 10v3M4 21h16"/></>,
    vulnerability: <><path d="M7 4h10l3 5-8 12L4 9z"/><path d="M12 8v5M12 16h.01"/></>,
    management: <><path d="M4 7h11M4 12h16M4 17h9"/><circle cx="18" cy="7" r="2"/><circle cx="15" cy="17" r="2"/></>,
    webapp: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/><path d="m9 15 2 2 4-5"/></>,
    threat: <><circle cx="12" cy="12" r="8"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/><circle cx="12" cy="12" r="2"/></>,
    awareness: <><path d="M9 18h6M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-1.1.8-1 2-1 2H9s.1-1.2-1-2Z"/><path d="M12 2V0M4.9 4.9 3.5 3.5M19.1 4.9l1.4-1.4"/></>,
    physical: <><path d="M4 21V8l8-5 8 5v13M2 21h20"/><rect x="9" y="12" width="6" height="9" rx="1"/><circle cx="13" cy="16" r=".5"/></>,
    policy: <><path d="M6 2h9l3 3v17H6zM15 2v4h4"/><path d="m9 12 2 2 4-5M9 18h6"/></>,
    wireless: <><path d="M4 9a12 12 0 0 1 16 0M7 12a8 8 0 0 1 10 0M10 15a4 4 0 0 1 4 0"/><circle cx="12" cy="19" r="1.5"/></>,
    health: <><path d="M12 21s-8-4.4-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.6-8 11-8 11Z"/><path d="M8 12h2l1-3 2 6 1-3h2"/></>,
    finance: <><path d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M2 20h20M12 3 3 8h18z"/></>,
    government: <><path d="M12 2 3 7v3h18V7zM5 10v8M9 10v8M15 10v8M19 10v8M2 21h20"/></>,
    education: <><path d="m2 9 10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6"/></>,
    manufacturing: <><path d="M3 21V9l6 4V9l6 4V5h6v16zM7 17h2M13 17h2M18 9h3"/></>,
    hospitality: <><path d="M4 20V8h16v12M2 20h20M7 11h3v3H7zM14 11h3v3h-3zM9 20v-3h6v3"/><path d="M7 8V5h10v3"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>
  };
  return <svg className={`icon icon-${name}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.shield}</svg>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item, i) => <span key={item.label}><b>/</b>{item.href && i < items.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function HeroVisual({ variant = 'matrix', label = 'Risk intelligence' }: { variant?: string; label?: string }) {
  const infrastructureVisuals = ['facility', 'health', 'manufacturing', 'government', 'wireless', 'people'];
  const cloudVisuals = ['app', 'policy', 'checklist', 'report', 'finance', 'retail'];
  const visualFile = infrastructureVisuals.includes(variant)
    ? 'secure-infrastructure.svg'
    : cloudVisuals.includes(variant)
      ? 'cloud-defense.svg'
      : 'cyber-operations.svg';
  return <div className={`hero-visual visual-${variant}`} role="img" aria-label={`Abstract ${label.toLowerCase()} visualization`}>
    <img className="visual-image" src={assetPath(`/images/${visualFile}`)} alt="" aria-hidden="true"/>
    <div className="visual-overlay">
      <div className="visual-top"><span>PDDG / {label.toUpperCase()}</span><span className="live-dot">ACTIVE DEFENSE</span></div>
      <div className="tech-bot" aria-hidden="true">
        <span className="bot-signal s1"/><span className="bot-signal s2"/><span className="bot-signal s3"/>
        <span className="bot-antenna"><i/></span>
        <span className="bot-head"><i/><i/><b/></span>
        <span className="bot-neck"/>
        <span className="bot-body"><i/><b>PDDG</b></span>
        <span className="bot-arm arm-left"/><span className="bot-arm arm-right"/>
      </div>
      <div className="tech-orbit" aria-hidden="true"><span><Icon name="shield"/></span><span><Icon name="scan"/></span><span><Icon name="signal"/></span></div>
      <div className="visual-status"><span><small>POSTURE</small><b>Risk mapped</b></span><span><small>PRIORITY</small><b>Action ready</b></span></div>
      <div className="visual-bottom"><span><i/> DIGITAL</span><span><i/> HUMAN</span><span><i/> PHYSICAL</span></div>
    </div>
  </div>;
}

export function PageHero({ eyebrow, title, copy, primary = 'Book a Security Fit Call', primaryHref = '/book-a-security-fit-call', secondary, secondaryHref, visual = 'matrix', children }: { eyebrow: string; title: string; copy: string; primary?: string; primaryHref?: string; secondary?: string; secondaryHref?: string; visual?: string; children?: React.ReactNode }) {
  return <section className="page-hero dark-section"><div className="container"><div className="hero-copy"><span className="eyebrow light">{eyebrow}</span><h1>{title}</h1><p className="hero-lede">{copy}</p><div className="hero-actions"><Link href={primaryHref} className="button">{primary} <span>↗</span></Link>{secondary && secondaryHref && <Link href={secondaryHref} className="button button-ghost">{secondary}</Link>}</div>{children}</div><HeroVisual variant={visual} label={eyebrow}/></div></section>;
}

export function SectionIntro({ eyebrow, title, copy, center = false }: { eyebrow: string; title: string; copy?: string; center?: boolean }) {
  return <div className={`section-intro ${center ? 'center' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

export function ServiceCard({ slug, name, summary, index }: { slug: string; name: string; summary: string; index: number }) {
  const icons = ['pentest', 'vulnerability', 'management', 'webapp', 'threat', 'awareness', 'physical', 'policy', 'wireless'];
  return <Link href={`/services/${slug}`} className="service-card"><div className="card-top"><span className="icon-box"><Icon name={icons[index % icons.length]}/></span><span className="card-number">0{index + 1}</span></div><h3>{name}</h3><p>{summary}</p><span className="card-link">View service <Icon name="arrow"/></span></Link>;
}

export function IndustryCard({ slug, name, summary, index }: { slug: string; name: string; summary: string; index: number }) {
  const art = index % 3 === 0 ? 'secure-infrastructure.svg' : index % 3 === 1 ? 'cloud-defense.svg' : 'cyber-operations.svg';
  const icons = ['health', 'finance', 'government', 'education', 'manufacturing', 'hospitality'];
  return <Link href={`/industries/${slug}`} className={`industry-card industry-${index + 1}`}><div className="industry-art" aria-hidden="true"><img src={assetPath(`/images/${art}`)} alt=""/><span className="industry-radar"/><span className="industry-symbol"><Icon name={icons[index]}/></span><b>{String(index + 1).padStart(2, '0')}</b></div><div><span className="card-kicker">Industry</span><h3>{name}</h3><p>{summary}</p><span className="card-link">View industry <Icon name="arrow"/></span></div></Link>;
}

export function Process({ compact = false }: { compact?: boolean }) {
  const items = [
    ['Discover', 'Understand the environment', 'Clarify objectives, stakeholders, constraints, assets, and authorization.'],
    ['Assess', 'Evaluate the exposure', 'Apply the approved methods and collect proportionate, defensible evidence.'],
    ['Prioritize', 'Connect findings to impact', 'Consider severity, exploitability, business context, urgency, and effort.'],
    ['Remediate', 'Build a practical roadmap', 'Translate findings into owned, sequenced, and measurable actions.'],
    ['Validate', 'Confirm improvement', 'Where included, retest eligible findings and document remaining risk.']
  ];
  return <div className={`process ${compact ? 'compact' : ''}`}>{items.map((item, i) => <div className="process-item" key={item[0]}><div className="process-mark"><span>{String(i + 1).padStart(2, '0')}</span><i/></div><div><span className="process-verb">{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></div></div>)}</div>;
}

export function Credentials() {
  const certs = [
    ['2', 'GIAC Web Application Penetration Tester'], ['3', 'GIAC Mobile Device Security Analyst'], ['4', 'GIAC Reverse Engineering Malware'], ['5', 'Certified Information Systems Security Professional'],
    ['6', 'Certified Ethical Hacker'], ['7', 'Certified Cloud Security Professional'], ['8', 'AWS Certified Cloud Practitioner'], ['9', 'EC-Council Associate Certified Chief Information Security Officer']
  ];
  return <section className="credentials dark-section"><div className="container"><div className="credentials-copy"><span className="eyebrow light">Verified professional credentials</span><h2>Engagements supported by qualified cybersecurity professionals.</h2><p>Credential marks shown here are published on PDDG’s current company website.</p></div><div className="credential-logos">{certs.map(([file, alt]) => <img key={file} src={assetPath(`/logos/cert-${file}.png`)} alt={alt}/>)}</div></div></section>;
}

export function ServiceGrid({ limit }: { limit?: number }) { const list = limit ? services.slice(0, limit) : services; return <div className="service-grid">{list.map((s, i) => <ServiceCard key={s.slug} slug={s.slug} name={s.name} summary={s.summary} index={i}/>)}</div>; }
export function IndustryGrid() { return <div className="industry-grid">{industries.map((item, i) => <IndustryCard key={item.slug} slug={item.slug} name={item.name} summary={item.summary} index={i}/>)}</div>; }

export function ReportPreview() {
  return <div className="report-preview"><div className="report-bar"><span><b>PDDG</b> / SECURITY ASSESSMENT</span><span>Illustrative report preview</span></div><div className="report-body"><aside><span className="active">Executive summary</span><span>Prioritized findings</span><span>Technical evidence</span><span>Remediation plan</span><span>Retesting status</span></aside><main><div className="report-head"><div><small>RISK OVERVIEW</small><h3>Findings by priority</h3></div><span>SYNTHETIC DATA</span></div><div className="report-chart"><div className="donut"><span>12<small>illustrative<br/>findings</small></span></div><div className="legend"><span><i className="critical"/>Critical <b>2</b></span><span><i className="high"/>High <b>3</b></span><span><i className="medium"/>Medium <b>4</b></span><span><i className="low"/>Low <b>3</b></span></div></div><div className="report-findings"><div><span className="severity high">HIGH</span><b>Illustrative finding title</b><em>Owner: Application</em></div><div><span className="severity medium">MEDIUM</span><b>Illustrative control gap</b><em>Target: 30 days</em></div></div></main></div></div>;
}
