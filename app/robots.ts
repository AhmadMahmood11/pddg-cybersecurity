import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export const dynamic = 'force-static';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: `${basePath || ''}/`, disallow: [`${basePath}/thank-you/`] }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
