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
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.shield}</svg>;
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
  const icons = ['target', 'scan', 'chart', 'shield', 'signal', 'users', 'building', 'file', 'signal'];
  return <Link href={`/services/${slug}`} className="service-card"><div className="card-top"><span className="icon-box"><Icon name={icons[index % icons.length]}/></span><span className="card-number">0{index + 1}</span></div><h3>{name}</h3><p>{summary}</p><span className="card-link">View service <Icon name="arrow"/></span></Link>;
}

export function IndustryCard({ slug, name, summary, index }: { slug: string; name: string; summary: string; index: number }) {
  const art = index % 3 === 0 ? 'secure-infrastructure.svg' : index % 3 === 1 ? 'cloud-defense.svg' : 'cyber-operations.svg';
  return <Link href={`/industries/${slug}`} className={`industry-card industry-${index + 1}`}><div className="industry-art" aria-hidden="true"><img src={assetPath(`/images/${art}`)} alt=""/><span/><b>{String(index + 1).padStart(2, '0')}</b></div><div><span className="card-kicker">Industry</span><h3>{name}</h3><p>{summary}</p><span className="card-link">View industry <Icon name="arrow"/></span></div></Link>;
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
