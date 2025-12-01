// apps/web/services/dataset-service.ts
import fs from 'fs';
import path from 'path';
import {cache} from 'react';
import {DatasetFile, DatasetFileSchema, DatasetRow} from '@/lib/schemas';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Laadt een JSON dataset bestand in.
 * Bevat beveiliging tegen path traversal en validatie via Zod.
 */
export const loadDataFile = cache(
  async (filename: string): Promise<DatasetFile | null> => {
    // Strict allowlist check of regex check op filename
    if (!/^[a-zA-Z0-9-_]+$/.test(filename)) {
      console.error(`Invalid dataset filename requested: ${filename}`);
      return null;
    }

    const filePath = path.join(DATA_DIR, `${filename}.json`);

    try {
      // Check of bestand bestaat voordat we lezen (geeft duidelijkere error)
      try {
        await fs.promises.access(filePath);
      } catch {
        console.error(`Dataset file not found at path: ${filePath}`);
        return null;
      }

      // Asynchroon lezen is beter voor IO performance in API routes
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      const json = JSON.parse(fileContent);

      // Valideer de structuur
      const parsed = DatasetFileSchema.safeParse(json);

      if (!parsed.success) {
        console.error(
          `Validation failed for dataset ${filename}:`,
          parsed.error,
        );
        // Tip: Uncomment de regel hieronder om de ruwe data te zien als validatie faalt
        // console.log('Raw JSON data:', json);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error(
        `Error loading data file ${filename} at ${filePath}:`,
        error,
      );
      return null;
    }
  },
);

/**
 * Filtert dataset rijen op basis van query parameters.
 */
export function filterData(
  data: DatasetRow[],
  filters: Record<string, string>,
): DatasetRow[] {
  return data.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      // Case-insensitive partial match, handle nulls gracefully
      const fieldValue = row[key];
      if (fieldValue === null || fieldValue === undefined) return false;

      return fieldValue.toString().toLowerCase().includes(value.toLowerCase());
    });
  });
}

/**
 * Pagineert een set data.
 */
export function paginateData(
  data: DatasetRow[],
  page: number = 1,
  pageSize: number = 10,
): DatasetRow[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
}
