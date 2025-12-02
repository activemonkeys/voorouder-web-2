// packages/grid/src/grid-settings.ts
import {
  ClientSideRowModelModule,
  ColDef,
  CsvExportModule,
  DateFilterModule,
  GridOptions,
  LocaleModule,
  ModuleRegistry,
  NumberFilterModule,
  PaginationModule,
  QuickFilterModule,
  RenderApiModule,
  TextFilterModule,
  ValidationModule,
} from 'ag-grid-community';

import { AG_GRID_LOCALE_EN } from './locales/ag-grid-en';
import { AG_GRID_LOCALE_NL } from './locales/ag-grid-nl';

export const registerCommunityModules = () => {
  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CsvExportModule,
    PaginationModule,
    QuickFilterModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    RenderApiModule,
    ValidationModule,
    LocaleModule,
  ]);
};

export const getLocaleText = (locale: string) => {
  switch (locale) {
    case 'en':
      return AG_GRID_LOCALE_EN;
    case 'nl':
    default:
      return AG_GRID_LOCALE_NL;
  }
};

const baseGridOptions: GridOptions = {
  rowHeight: 40,
  pagination: true,
  paginationPageSize: 10,
  // Hier voegen we de opties toe voor de dropdown.
  // Door 10 toe te voegen, wordt de standaardwaarde correct weergegeven.
  paginationPageSizeSelector: [10, 20, 50, 100],
  suppressPaginationPanel: false,
  maintainColumnOrder: true,
  animateRows: true,
  suppressMovableColumns: false,
  enableCellTextSelection: true,
  rowModelType: 'clientSide',
};

export const getGridOptions = (): GridOptions => {
  return {
    ...baseGridOptions,
  };
};

export const defaultColDef: ColDef = {
  flex: 1,
  minWidth: 120,
  filter: true,
  resizable: true,
  sortable: true,
  floatingFilter: false,
};