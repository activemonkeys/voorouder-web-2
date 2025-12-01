// apps/web/lib/schemas.ts
import {z} from 'zod';

// --- Content Schemas ---

export const ContentItemSchema = z.object({
  slug: z.string(),
  type: z.enum(['page', 'article', 'research', 'other', 'service']),
  path: z.string(),
  title: z.string(),
  lastUpdated: z.string().optional(), // ISO date string
  date: z.string().optional(),
  summary: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().default(''),
    })
    .optional(),
});

export type ContentItem = z.infer<typeof ContentItemSchema>;

export const ContentConfigSchema = z.object({
  pages: z.array(ContentItemSchema),
});

// --- Album Schemas ---

export const AlbumImageSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  title: z.string().optional(),
  alt: z.string().optional(),
  blurDataURL: z.string().optional(),
  year: z.string().optional(),
  medium: z.string().optional(),
  srcSet: z
    .array(
      z.object({
        src: z.string(),
        width: z.number(),
        height: z.number(),
      }),
    )
    .optional(),
});

export type AlbumImage = z.infer<typeof AlbumImageSchema>;

export const AlbumDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(AlbumImageSchema),
});

export type AlbumData = z.infer<typeof AlbumDataSchema>;

export const AlbumConfigItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnailPath: z.string(),
  imagesPath: z.string(),
  jsonFile: z.string(),
  featured: z.boolean().optional(),
  featureOrder: z.number().optional(),
});

export type AlbumConfig = z.infer<typeof AlbumConfigItemSchema>;

export const AlbumConfigSchema = z.object({
  albums: z.array(AlbumConfigItemSchema),
});

// --- Dataset Schemas ---

export const DatasetColumnSchema = z
  .object({
    field: z.string(),
    headerName: z.string(),
    // AANGEPAST: minWidth is nu optioneel
    minWidth: z.number().optional(),
    sort: z.string().optional(),
    sortIndex: z.number().optional(),
  })
  .passthrough();

export const DatasetRowSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.null(), z.boolean()]).optional(),
);

export const DatasetFileSchema = z.object({
  columns: z.array(DatasetColumnSchema),
  rows: z.array(DatasetRowSchema),
});

export type DatasetFile = z.infer<typeof DatasetFileSchema>;
export type DatasetColumn = z.infer<typeof DatasetColumnSchema>;
export type DatasetRow = z.infer<typeof DatasetRowSchema>;
