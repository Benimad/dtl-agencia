import type { MetadataRoute } from 'next';
import { urlSitio } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  const url = urlSitio();
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/es/admin', '/fr/admin', '/ar/admin'] }],
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
