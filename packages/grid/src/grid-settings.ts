// packages/grid/src/grid-settings.ts
import {
  ClientSideRowModelModule,
  ColDef,
  CsvExportModule,
  DateFilterModule,
  GridOptions,
  ModuleRegistry,
  NumberFilterModule,
  PaginationModule,
  QuickFilterModule,
  RenderApiModule,
  TextFilterModule,
  ValidationModule,
} from 'ag-grid-community';

import {AG_GRID_LOCALE_EN} from './locales/ag-grid-en';
import {AG_GRID_LOCALE_NL} from './locales/ag-grid-nl';

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
  ]);
};

export const getLocaleText = (locale: string) => {
  // We maken NL de default als de locale 'nl' is OF als er geen match is.
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
