// apps/web/lib/api-utils.ts
import fs from 'fs';
import path from 'path';
import {DataFile, PersonData} from '@/types/api';

export async function loadDataFile(filename: string): Promise<DataFile | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', `${filename}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading data file ${filename}:`, error);
    return null;
  }
}

export function filterData(
  data: PersonData[],
  filters: Record<string, string>,
): PersonData[] {
  return data.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const fieldValue = row[key]?.toLowerCase();
      return fieldValue?.includes(value.toLowerCase());
    });
  });
}

export function paginateData(
  data: PersonData[],
  page: number = 1,
  pageSize: number = 10,
): PersonData[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
}
