// apps/web/types/api.ts

// Geen imports hier! Alleen definities.

export interface Column {
  field: string;
  headerName: string;
  minWidth: number;
}

export interface PersonData {
  [key: string]: string;
}

export interface DataFile {
  columns: Column[];
  rows: PersonData[];
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  total?: number;
  page?: number;
  pageSize?: number;
}
