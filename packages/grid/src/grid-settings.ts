// packages/grid/src/grid-settings.ts

import {
  AllCommunityModule,
  CellSelectionModule,
  ClientSideRowModelModule,
  ClipboardModule,
  ColDef,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  CsvExportModule,
  DateFilterModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  GridOptions,
  GroupFilterModule,
  MasterDetailModule,
  ModuleRegistry,
  MultiFilterModule,
  PivotModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  ServerSideRowModelApiModule,
  ServerSideRowModelModule,
  SetFilterModule,
  TreeDataModule,
} from 'ag-grid-enterprise';

import {AG_GRID_LOCALE_EN} from './locales/ag-grid-en';
import {AG_GRID_LOCALE_NL} from './locales/ag-grid-nl';

export const registerClientSideModules = () => {
  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    AllCommunityModule,
    ClipboardModule,
    ExcelExportModule,
    CsvExportModule,
    ColumnMenuModule,
    ContextMenuModule,
    CellSelectionModule,
    MultiFilterModule,
    SetFilterModule,
    DateFilterModule,
    ColumnsToolPanelModule,
    RowGroupingPanelModule,
    RowGroupingModule,
    GroupFilterModule,
    TreeDataModule,
    PivotModule,
    FiltersToolPanelModule,
    MasterDetailModule,
  ]);
};

export const registerServerSideModules = () => {
  ModuleRegistry.registerModules([
    ServerSideRowModelModule,
    ServerSideRowModelApiModule,
    AllCommunityModule,
    ClipboardModule,
    ExcelExportModule,
    CsvExportModule,
    ColumnMenuModule,
    ContextMenuModule,
    CellSelectionModule,
    MultiFilterModule,
    SetFilterModule,
    DateFilterModule,
    ColumnsToolPanelModule,
    RowGroupingPanelModule,
    RowGroupingModule,
    GroupFilterModule,
    TreeDataModule,
    PivotModule,
    FiltersToolPanelModule,
    MasterDetailModule,
  ]);
};

export const getLocaleText = (locale: string) => {
  switch (locale) {
    case 'nl':
      return AG_GRID_LOCALE_NL;
    default:
      return AG_GRID_LOCALE_EN;
  }
};

const baseGridOptions: GridOptions = {
  rowHeight: 50,
  accentedSort: true,
  paginationPageSizeSelector: [5, 10, 25, 50],
  scrollbarWidth: 12,
  pagination: true,
  paginationPageSize: 10,
  suppressPaginationPanel: false,
  maintainColumnOrder: true,
  cellSelection: true,
  copyHeadersToClipboard: true,
  animateRows: true,
  suppressMovableColumns: true,
  suppressColumnMoveAnimation: false,
};

const serverSideOptions: Partial<GridOptions> = {
  rowModelType: 'serverSide',
  cacheBlockSize: 100,
  maxBlocksInCache: 20,
  suppressScrollOnNewData: true,
  blockLoadDebounceMillis: 300,
};

const clientSideOptions: Partial<GridOptions> = {
  rowModelType: 'clientSide',
};

export const getGridOptions = (isServerSide: boolean): GridOptions => {
  return {
    ...baseGridOptions,
    ...(isServerSide ? serverSideOptions : clientSideOptions),
  };
};

export const defaultColDef: ColDef = {
  flex: 1,
  minWidth: 120,
  filter: true,
  resizable: true,
  sortable: true,
  floatingFilter: true,
  enableCellChangeFlash: false,
  filterParams: {
    buttons: ['reset'],
    debounceMs: 200,
    suppressAndOrCondition: true,
  },
  menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
};
