// apps/web/lib/content.ts

// Gebruik require als import faalt of zorg voor resolveJsonModule: true
// import content from '../config/content.json';

// Veilige manier met JSON import (vereist resolveJsonModule)
import contentData from '../config/content.json';

export type ContentItem = {
  title: string;
  date?: string;
  lastUpdated?: string;
  summary?: string;
  type: 'page' | 'article' | 'research' | 'other' | 'service';
  slug: string;
  path: string;
  image?: {
    src: string;
    alt: string;
  };
};

interface ContentJson {
  pages: ContentItem[];
}

// Cast de data
const content = contentData as ContentJson;

function getContent(): ContentItem[] {
  return content.pages;
}

export function getContentBySlug(slug: string): ContentItem | undefined {
  const content = getContent();
  return content.find((item) => item.slug === slug);
}

export function getAllContent(): ContentItem[] {
  return getContent();
}
