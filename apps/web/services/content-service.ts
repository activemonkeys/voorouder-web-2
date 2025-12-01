// apps/web/services/content-service.ts
import {cache} from 'react';
import {contentConfig} from '@/config/content';
import {ContentItem, ContentItemSchema} from '@/lib/schemas';

/**
 * Haalt alle content items op uit de configuratie.
 * Gebruikt React cache voor deduplicatie van requests.
 */
export const getAllContent = cache((): ContentItem[] => {
  // Valideer de config runtime om zeker te weten dat data integer is
  const validatedItems = contentConfig.pages.map((item) => {
    const result = ContentItemSchema.safeParse(item);
    if (!result.success) {
      console.error(
        `Invalid content item found: ${item.slug}`,
        result.error.format(),
      );
      return null;
    }
    return result.data;
  });

  return validatedItems.filter((item) => item !== null) as ContentItem[];
});

/**
 * Haalt een specifiek content item op basis van de slug.
 */
export const getContentBySlug = cache(
  (slug: string): ContentItem | undefined => {
    const allContent = getAllContent();
    return allContent.find((item) => item.slug === slug);
  },
);

/**
 * Haalt content items op gefilterd op type.
 */
export const getContentByType = cache((type: ContentItem['type']) => {
  return getAllContent().filter((item) => item.type === type);
});
