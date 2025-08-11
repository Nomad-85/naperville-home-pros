import { MetadataRoute } from 'next';
import { SEO_CONSTANTS } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${SEO_CONSTANTS.DOMAIN}/sitemap.xml`,
  };
}
