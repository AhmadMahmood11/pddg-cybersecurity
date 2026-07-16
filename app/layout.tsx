import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Chrome';
import { MotionController } from '@/components/Motion';
import { site } from '@/lib/content';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'PDDG | Risk-Driven Cybersecurity Assessments', template: '%s | PDDG' },
  description: 'Risk-driven cybersecurity assessments, threat monitoring, training, policy reviews, and physical-security evaluations from Columbia, Maryland.',
  applicationName: 'Pinnacle Digital Defense Group',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'PDDG', title: 'PDDG | Risk-Driven Cybersecurity Assessments', description: 'Know where your organization is exposed—and what to fix first.', images: [`${basePath}/images/social-card.svg`] },
  twitter: { card: 'summary_large_image', title: 'PDDG | Risk-Driven Cybersecurity Assessments', description: 'Know where your organization is exposed—and what to fix first.', images: [`${basePath}/images/social-card.svg`] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structured = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name: site.name, url: site.url,
    telephone: site.phone, email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: '5457 Twin Knolls Rd, Ste 300, PMB 1019', addressLocality: 'Columbia', addressRegion: 'MD', postalCode: '21045', addressCountry: 'US' },
    areaServed: ['Maryland', 'United States'],
    serviceType: 'Cybersecurity assessment and consulting'
  };
  return <html lang="en"><body><Header/><MotionController/><main id="main-content">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}/></body></html>;
}
