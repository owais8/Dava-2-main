import type { MetadataRoute } from 'next';

import constants from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${constants.shared.APP.URL}/sitemap.xml`,
  };
}
