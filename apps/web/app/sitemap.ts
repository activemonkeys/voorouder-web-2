// apps/web/app/sitemap.ts
import {MetadataRoute} from 'next';
import {getAllContent} from '@/lib/content';

type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://voorouder.nl';
  const content = getAllContent();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/onderzoek`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/artikelen`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/albums`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const getChangeFrequency = (type: string): ChangeFreq => {
    if (type === 'page' || type === 'service') return 'monthly';
    return 'yearly';
  };

  const getPriority = (type: string): number => {
    switch (type) {
      case 'page':
      case 'service':
        return 0.7;
      case 'research':
        return 0.6;
      default:
        return 0.5;
    }
  };

  const contentRoutes = content.map((item) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: item.lastUpdated ? new Date(item.lastUpdated) : new Date(),
    changeFrequency: getChangeFrequency(item.type),
    priority: getPriority(item.type),
  }));

  return [...routes, ...contentRoutes];
}
