// apps/web/services/album-service.ts
import fs from 'fs';
import path from 'path';
import {cache} from 'react';
import {
  AlbumConfig,
  AlbumConfigSchema,
  AlbumData,
  AlbumDataSchema,
} from '@/lib/schemas';

const ALBUMS_CONFIG_PATH = path.join(
  process.cwd(),
  'config',
  'albums',
  'config.json',
);
const ALBUMS_DATA_DIR = path.join(process.cwd(), 'config', 'albums');

/**
 * Haalt de globale album configuratie op.
 * Gebruikt cache() om file reads te minimaliseren.
 */
export const getAllAlbums = cache((): AlbumConfig[] => {
  try {
    const fileContent = fs.readFileSync(ALBUMS_CONFIG_PATH, 'utf8');
    const json = JSON.parse(fileContent);
    const parsed = AlbumConfigSchema.parse(json);
    return parsed.albums;
  } catch (error) {
    console.error('Failed to load albums config:', error);
    return [];
  }
});

/**
 * Haalt specifieke data op voor één album.
 */
export const getAlbumData = cache((albumId: string): AlbumData | null => {
  // Beveiliging: Voorkom directory traversal door te checken of de ID valide karakters bevat
  if (!/^[a-zA-Z0-9-_]+$/.test(albumId)) {
    console.error(`Invalid album ID requested: ${albumId}`);
    return null;
  }

  try {
    const filePath = path.join(ALBUMS_DATA_DIR, `${albumId}.json`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContent);

    // Valideer de data structuur met Zod
    const parsed = AlbumDataSchema.safeParse(json);

    if (!parsed.success) {
      console.error(`Validation failed for album ${albumId}:`, parsed.error);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error(`Error loading album ${albumId}:`, error);
    return null;
  }
});

/**
 * Haalt albums op die gemarkeerd zijn als 'featured'.
 */
export const getFeaturedAlbums = cache((limit: number = 3): AlbumConfig[] => {
  const allAlbums = getAllAlbums();
  return allAlbums
    .filter((album) => album.featured)
    .sort((a, b) => (a.featureOrder || 999) - (b.featureOrder || 999))
    .slice(0, limit);
});
