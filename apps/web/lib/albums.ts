// apps/web/lib/albums.ts
import fs from 'fs';
import path from 'path';
import { AlbumConfig } from '@/types/albums';

interface AlbumsConfigFile {
  albums: AlbumConfig[];
}

function loadAlbumsConfig(): AlbumsConfigFile | null {
  const configPath = path.join(
    process.cwd(),
    'config', 
    'albums',
    'config.json',
  );
  try {
    const configFile = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configFile) as AlbumsConfigFile;
  } catch (error) {
    console.error('Error loading albums config:', error);
    return null;
  }
}

export function getAllAlbums(): AlbumConfig[] {
  const config = loadAlbumsConfig();
  return config ? config.albums : [];
}

export function getFeaturedAlbums(limit: number = 3): AlbumConfig[] {
  const allAlbums = getAllAlbums();
  return allAlbums
    .filter((album) => album.featured)
    .sort((a, b) => (a.featureOrder || 999) - (b.featureOrder || 999))
    .slice(0, limit);
}