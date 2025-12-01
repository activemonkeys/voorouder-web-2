// apps/web/types/albums.ts

// We definiëren een eigen Photo interface die compatibel is met de libraries
export interface Photo {
  src: string;
  width: number;
  height: number;
  srcSet?: {src: string; width: number; height: number}[];
}

export interface AlbumImage extends Photo {
  title?: string; // Maak optioneel om flexibeler te zijn
  alt?: string;
  blurDataURL?: string;
}

export interface AlbumData {
  id: string;
  title: string;
  description: string;
  images: AlbumImage[];
}

export interface AlbumConfig {
  id: string;
  title: string;
  description: string;
  thumbnailPath: string;
  imagesPath: string;
  jsonFile: string;
  featured?: boolean;
  featureOrder?: number;
}
