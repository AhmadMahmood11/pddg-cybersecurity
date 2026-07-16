'use client';

import { useRef } from 'react';

export function CyberSystemVisual({ label, variant = 'matrix' }: { label: string; variant?: string }) {
  const visual = useRef<HTMLDivElement>(null);
  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || !visual.current) return;
    const box = visual.current.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width - .5) * 2;
    const y = ((event.clientY - box.top) / box.height - .5) * 2;
    visual.current.style.setProperty('--pointer-x', x.toFixed(3));
    visual.current.style.setProperty('--pointer-y', y.toFixed(3));
  }
  function reset() {
    visual.current?.style.setProperty('--pointer-x', '0');
    visual.current?.style.setProperty('--pointer-y', '0');
  }
  const layers = ['External exposure', 'Application security', 'Vulnerability assessment', 'Wireless security', 'Policy assessment', 'Reporting'];
  return <div ref={visual} className={`cyber-system system-${variant}`} onPointerMove={move} onPointerLeave={reset} role="img" aria-label={`${label}: interconnected cyber risk assessment system`}>
    <div className="system-grid" aria-hidden="true"/>
    <div className="system-vignette" aria-hidden="true"/>
    <div className="system-header"><span>PDDG / OPERATIONAL CYBER INTELLIGENCE</span><span><i/>SYSTEM ACTIVE</span></div>
    <svg className="system-paths" viewBox="0 0 760 520" aria-hidden="true">
      <defs><linearGradient id="path-gradient"><stop stopColor="#56A8FF"/><stop offset="1" stopColor="#2CE6D1"/></linearGradient></defs>
      <g className="path-base"><path d="M380 260 175 105M380 260 380 70M380 260 585 105M380 260 620 300M380 260 475 450M380 260 180 420"/></g>
      <g className="path-live"><path d="M380 260 175 105M380 260 380 70M380 260 585 105M380 260 620 300M380 260 475 450M380 260 180 420"/></g>
      <path className="signal-path" d="M40 250C120 250 125 105 175 105L380 260C475 330 520 382 700 382"/>
      <circle className="risk-packet" cx="40" cy="250" r="6"/>
    </svg>
    <div className="system-core"><span className="core-scan"/><span className="core-shield"><i/><b>PDDG</b></span><small>ASSESSMENT CORE</small><em>AUTHORIZED SCOPE</em></div>
    <div className="system-layers">{layers.map((layer, index) => <div className={`system-node node-${index + 1}`} key={layer}><span>{String(index + 1).padStart(2,'0')}</span><b>{layer}</b><i/></div>)}</div>
    <div className="system-input"><small>RISK SIGNAL</small><b>Exposure detected</b><span><i/></span></div>
    <div className="system-output"><small>DECISION OUTPUT</small><b>Prioritized findings</b><span>Evidence → Impact → Action</span></div>
    <div className="system-footer"><span>DISCOVER</span><i/><span>ASSESS</span><i/><span>PRIORITIZE</span><i/><span>REMEDIATE</span><i/><span>VALIDATE</span></div>
  </div>;
}
