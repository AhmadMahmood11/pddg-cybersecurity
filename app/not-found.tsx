import Link from 'next/link';
import { Icon } from '@/components/Elements';

export default function NotFound() {
  return <section className="confirmation-page dark-section"><div className="confirmation-card"><span className="error-code">404</span><span className="eyebrow light">Page not found</span><h1>The route does not lead to a published page.</h1><p>Return to the homepage, browse security services, or contact PDDG for help finding the right information.</p><div className="hero-actions"><Link className="button" href="/">Return home</Link><Link className="button button-ghost" href="/services">Browse services</Link></div><Link href="/contact" className="text-link light-link">Contact PDDG <Icon name="arrow"/></Link></div></section>;
}
