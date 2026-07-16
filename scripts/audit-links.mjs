const origin = process.env.AUDIT_ORIGIN || 'http://127.0.0.1:3000';
const routes = [
  '/', '/services', '/services/penetration-testing', '/services/vulnerability-assessment', '/services/vulnerability-management', '/services/web-application-security-assessment', '/services/threat-intelligence-and-monitoring', '/services/security-awareness-training', '/services/physical-security-assessment', '/services/cybersecurity-policy-assessment', '/services/wireless-bluetooth-security-audit',
  '/industries', '/industries/healthcare', '/industries/financial-services', '/industries/government', '/industries/education', '/industries/manufacturing', '/industries/hospitality', '/approach', '/about', '/resources', '/resources/penetration-testing-vs-vulnerability-assessment', '/resources/what-a-penetration-test-report-should-include', '/resources/prioritizing-vulnerabilities-by-business-risk', '/resources/cybersecurity-assessment-readiness-checklist', '/resources/wireless-security-weaknesses', '/resources/building-an-effective-security-awareness-program', '/case-studies', '/case-studies/sanitized-engagement-example', '/frequently-asked-questions', '/contact', '/book-a-security-fit-call', '/request-a-sample-report', '/privacy-policy', '/terms-and-conditions', '/accessibility-statement', '/thank-you/contact', '/thank-you/security-fit-call', '/thank-you/resource-request'
];
const expectedAssets = new Set(['/logos/pddg-logo.png', '/images/social-card.svg', '/icon.svg', '/robots.txt', '/sitemap.xml']);
const failures = [];
const seenLinks = new Set();
for (const route of routes) {
  const res = await fetch(origin + route, { redirect: 'manual' });
  const html = await res.text();
  const title = (html.match(/<title[^>]*>(.*?)<\/title>/i) || [])[1];
  const h1Count = (html.match(/<h1[ >]/gi) || []).length;
  if (res.status !== 200) failures.push(`${route}: status ${res.status}`);
  if (!title) failures.push(`${route}: missing title`);
  if (h1Count !== 1) failures.push(`${route}: expected 1 H1, found ${h1Count}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith('/')) seenLinks.add(value.split('#')[0]);
  }
}
for (const asset of expectedAssets) seenLinks.add(asset);
for (const target of seenLinks) {
  if (!target || target.startsWith('/_next/')) continue;
  const res = await fetch(origin + target, { redirect: 'manual' });
  if (res.status !== 200) failures.push(`Linked target ${target}: status ${res.status}`);
}
console.log(`Audited ${routes.length} rendered routes and ${seenLinks.size} internal targets.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('All route, title, H1, linked-target, and core-asset checks passed.');
