import type { MetadataRoute } from 'next';
import { requiredPaths, site } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return requiredPaths.map(path => ({ url: `${site.url}${path === '/' ? '' : path}`, lastModified: new Date(), changeFrequency: path === '/' ? 'weekly' : path.startsWith('/resources/') ? 'monthly' : 'yearly', priority: path === '/' ? 1 : path.split('/').length === 2 ? 0.8 : 0.7 }));
}
