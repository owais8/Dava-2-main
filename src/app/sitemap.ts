import type { MetadataRoute } from 'next';

import constants from '@/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${constants.shared.APP.URL}`,
      lastModified: new Date(),
    },
    {
      url: `${constants.shared.APP.URL}/login`,
      lastModified: new Date(),
    },
    {
      url: `${constants.shared.APP.URL}/register`,
      lastModified: new Date(),
    },
  ];
}
