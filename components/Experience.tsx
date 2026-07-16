'use client';

import Link from 'next/link';
import { useState } from 'react';
import { industries, services } from '@/lib/content';
import { Icon } from './Elements';

const serviceIcons = ['pentest', 'vulnerability', 'management', 'webapp', 'threat', 'awareness', 'physical', 'policy', 'wireless'];

export function ServiceIntelligenceMap() {
  const [active, setActive] = useState(0);
  const selected = services[active];
  return <div className="service-intelligence-map">
    <div className="service-map-canvas" aria-label="Interactive map of PDDG security services">
      <div className="service-map-core"><Icon name="shield"/><b>PDDG</b><span>Risk-driven assessment</span></div>
      <svg viewBox="0 0 900 560" aria-hidden="true"><g>{services.map((service, index) => <path className={index === active ? 'active' : ''} key={service.slug} d={`M450 280 L${[120,250,450,650,780,720,560,330,160][index]} ${[100,55,55,70,180,410,505,505,405][index]}`}/>)}</g></svg>
      <div className="service-map-nodes">{services.map((service, index) => <Link key={service.slug} href={`/services/${service.slug}`} className={`service-map-node node-${index + 1} ${index === active ? 'active' : ''}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}><span><Icon name={serviceIcons[index]}/></span><b>{service.name}</b></Link>)}</div>
    </div>
    <div className="service-map-context" aria-live="polite"><span className="eyebrow">Selected service</span><div className="context-icon"><Icon name={serviceIcons[active]}/></div><h3>{selected.name}</h3><p>{selected.summary}</p><Link href={`/services/${selected.slug}`} className="text-link light-link">View service <Icon name="arrow"/></Link><div className="context-index"><b>{String(active + 1).padStart(2,'0')}</b><span>/ {String(services.length).padStart(2,'0')}</span></div></div>
  </div>;
}

const industryIcons = ['health', 'finance', 'government', 'education', 'manufacturing', 'hospitality'];
export function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const selected = industries[active];
  return <div className="industry-explorer">
    <div className="industry-list" role="tablist" aria-label="Industries served">{industries.map((industry, index) => <button key={industry.slug} role="tab" aria-selected={active === index} aria-controls="industry-explorer-panel" id={`industry-tab-${index}`} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)}><span>{String(index + 1).padStart(2,'0')}</span><b>{industry.name}</b><Icon name="arrow"/></button>)}</div>
    <div className={`industry-scene industry-scene-${active + 1}`} id="industry-explorer-panel" role="tabpanel" aria-labelledby={`industry-tab-${active}`}>
      <div className="scene-grid" aria-hidden="true"/><div className="scene-path p1"/><div className="scene-path p2"/><div className="scene-path p3"/>
      <div className="scene-core"><span className="scene-radar"/><Icon name={industryIcons[active]}/></div>
      <div className="scene-node n1"><i/>IDENTITY</div><div className="scene-node n2"><i/>SYSTEMS</div><div className="scene-node n3"><i/>OPERATIONS</div>
      <div className="scene-copy"><span className="card-kicker">Industry</span><h3>{selected.name}</h3><p>{selected.summary}</p><Link href={`/industries/${selected.slug}`} className="card-link">View industry <Icon name="arrow"/></Link></div>
    </div>
  </div>;
}

const reportViews = [
  { label: 'Executive summary', title: 'Findings by priority', line: 'Risk distribution using synthetic data' },
  { label: 'Prioritized findings', title: 'Illustrative finding register', line: 'Priority, owner, and target sequence' },
  { label: 'Technical evidence', title: 'Synthetic evidence reference', line: 'Affected component and validation context' },
  { label: 'Remediation plan', title: 'Illustrative action sequence', line: 'Recommended remediation order' },
  { label: 'Retesting status', title: 'Validation status', line: 'Illustrative status only' }
];
export function ReportPreview() {
  const [active, setActive] = useState(0);
  const view = reportViews[active];
  return <div className="report-preview assessment-workspace">
    <div className="report-bar"><span><b>PDDG</b> / ASSESSMENT WORKSPACE</span><span>SYNTHETIC DEMONSTRATION</span></div>
    <div className="report-body"><aside aria-label="Report categories">{reportViews.map((item, index) => <button key={item.label} className={active === index ? 'active' : ''} onClick={() => setActive(index)} aria-pressed={active === index}>{item.label}</button>)}</aside><main aria-live="polite"><div className="report-head"><div><small>RISK OVERVIEW / {String(active + 1).padStart(2,'0')}</small><h3>{view.title}</h3><p>{view.line}</p></div><span>SYNTHETIC DATA</span></div><div className="report-chart"><div className="donut"><span>12<small>illustrative<br/>findings</small></span></div><div className="legend"><span><i className="critical"/>Critical <b>2</b></span><span><i className="high"/>High <b>3</b></span><span><i className="medium"/>Medium <b>4</b></span><span><i className="low"/>Low <b>3</b></span></div></div><div className="report-findings"><div><span className="severity high">HIGH</span><b>Illustrative finding title</b><em>Owner: Application</em></div><div><span className="severity medium">MEDIUM</span><b>Illustrative control gap</b><em>Target: 30 days</em></div></div></main></div>
  </div>;
}
