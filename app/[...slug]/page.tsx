import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail, IndustryDetail } from '@/components/DetailPages';
import {
  AboutPage, ApproachPage, BookingPage, CaseStudiesPage, ContactPage, FAQPage, IndustriesPage, LegalPage,
  ResourceArticlePage, ResourcesPage, SampleReportPage, SanitizedCaseStudyPage, ServicesPage, ThankYouPage
} from '@/components/MainPages';
import { findIndustry, findResource, findService, industries, requiredPaths, resources, services, site } from '@/lib/content';

type Props = { params: Promise<{ slug: string[] }> };
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const dynamicParams = false;

const staticMeta: Record<string, [string, string]> = {
  services: ['Cybersecurity Assessment Services', 'Explore PDDG penetration testing, vulnerability assessment, threat monitoring, training, policy, wireless, web application, and physical-security services.'],
  industries: ['Cybersecurity by Industry', 'Risk-driven cybersecurity assessment for healthcare, financial services, government, education, manufacturing, and hospitality organizations.'],
  approach: ['Our Risk-Driven Approach', 'How PDDG develops scope, validates findings, prioritizes business risk, supports remediation, and reports to technical and executive teams.'],
  about: ['About Pinnacle Digital Defense Group', 'Learn about PDDG’s client-focused, risk-driven philosophy, published mission, professional credentials, and approach to clear cybersecurity reporting.'],
  resources: ['Cybersecurity Assessment Resources', 'Practical resources for cybersecurity assessment planning, penetration-test reporting, vulnerability prioritization, wireless security, and awareness.'],
  'case-studies': ['Case Studies and Sample Deliverables', 'Learn how PDDG handles sanitized engagement examples and request an illustrative cybersecurity assessment report.'],
  'case-studies/sanitized-engagement-example': ['Sanitized Cybersecurity Engagement Examples', 'How approved, sanitized engagement examples can communicate scope, methods, and decision value without exposing sensitive client information.'],
  'frequently-asked-questions': ['Cybersecurity Assessment FAQs', 'Answers about choosing an assessment, timing, authorization, system disruption, sensitive findings, reporting, remediation, and retesting.'],
  contact: ['Contact PDDG', 'Contact Pinnacle Digital Defense Group in Columbia, Maryland about cybersecurity assessments, monitoring, training, policy, wireless, and physical security.'],
  'book-a-security-fit-call': ['Book a Security Fit Call', 'Discuss your security concerns, assessment objectives, environment, constraints, and appropriate next steps with PDDG.'],
  'request-a-sample-report': ['Request a Sample Cybersecurity Report', 'Evaluate the executive and technical structure of an illustrative or approved sanitized PDDG assessment deliverable.'],
  'privacy-policy': ['Privacy Policy', 'Read the privacy information for Pinnacle Digital Defense Group and the data-handling limitations of this demonstration site.'],
  'terms-and-conditions': ['Terms and Conditions', 'Read the informational-use, authorization, guarantee, and intellectual-property terms for the PDDG demonstration website.'],
  'accessibility-statement': ['Accessibility Statement', 'Review the accessibility measures, known limitations, and feedback contact for the PDDG website.'],
  'thank-you/contact': ['Contact Request Confirmation', 'Demonstration confirmation page for PDDG contact requests.'],
  'thank-you/security-fit-call': ['Security Fit Call Confirmation', 'Demonstration confirmation page for PDDG Security Fit Call requests.'],
  'thank-you/resource-request': ['Resource Request Confirmation', 'Demonstration confirmation page for PDDG resource requests.']
};

export function generateStaticParams() {
  return requiredPaths.filter(path => path !== '/').map(path => ({ slug: path.slice(1).split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join('/');
  let title: string;
  let description: string;
  if (slug[0] === 'services' && slug[1]) {
    const item = findService(slug[1]); if (!item) return {};
    title = `${item.name} Services`; description = item.summary;
  } else if (slug[0] === 'industries' && slug[1]) {
    const item = findIndustry(slug[1]); if (!item) return {};
    title = `${item.name} Cybersecurity Assessment`; description = item.summary;
  } else if (slug[0] === 'resources' && slug[1]) {
    const item = findResource(slug[1]); if (!item) return {};
    title = item.title; description = item.excerpt;
  } else {
    const item = staticMeta[path]; if (!item) return {};
    [title, description] = item;
  }
  const canonical = `/${path}`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: slug[0] === 'resources' && slug[1] ? 'article' : 'website', images: [`${basePath}/images/social-card.svg`] }, twitter: { card: 'summary_large_image', title, description, images: [`${basePath}/images/social-card.svg`] } };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/');
  if (slug[0] === 'services' && slug[1]) { const item = findService(slug[1]); return item ? <ServiceDetail service={item}/> : notFound(); }
  if (slug[0] === 'industries' && slug[1]) { const item = findIndustry(slug[1]); return item ? <IndustryDetail industry={item}/> : notFound(); }
  if (slug[0] === 'resources' && slug[1]) { const item = findResource(slug[1]); return item ? <ResourceArticlePage slug={item.slug}/> : notFound(); }
  switch (path) {
    case 'services': return <ServicesPage/>;
    case 'industries': return <IndustriesPage/>;
    case 'approach': return <ApproachPage/>;
    case 'about': return <AboutPage/>;
    case 'resources': return <ResourcesPage/>;
    case 'case-studies': return <CaseStudiesPage/>;
    case 'case-studies/sanitized-engagement-example': return <SanitizedCaseStudyPage/>;
    case 'frequently-asked-questions': return <FAQPage/>;
    case 'contact': return <ContactPage/>;
    case 'book-a-security-fit-call': return <BookingPage/>;
    case 'request-a-sample-report': return <SampleReportPage/>;
    case 'privacy-policy': return <LegalPage kind="privacy"/>;
    case 'terms-and-conditions': return <LegalPage kind="terms"/>;
    case 'accessibility-statement': return <LegalPage kind="accessibility"/>;
    case 'thank-you/contact': return <ThankYouPage kind="contact"/>;
    case 'thank-you/security-fit-call': return <ThankYouPage kind="security-fit-call"/>;
    case 'thank-you/resource-request': return <ThankYouPage kind="resource-request"/>;
    default: return notFound();
  }
}
