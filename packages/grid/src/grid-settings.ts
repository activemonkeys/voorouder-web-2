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
  ValidationModule,
} from 'ag-grid-enterprise';

import { AG_GRID_LOCALE_EN } from './locales/ag-grid-en';
import { AG_GRID_LOCALE_NL } from './locales/ag-grid-nl';

// Nieuwe functie: Alleen gratis modules
export const registerCommunityModules = () => {
  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    AllCommunityModule,
    CsvExportModule, // Community versie
    ValidationModule // Belangrijk voor debugging
  ]);
};

// Bestaande functie: Alles (voor enterprise apps indien nodig)
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

// Base options geoptimaliseerd voor community gebruik
const baseGridOptions: GridOptions = {
  rowHeight: 40, // Iets compacter voor data lijsten
  pagination: true,
  paginationPageSize: 10,
  suppressPaginationPanel: false,
  maintainColumnOrder: true,
  // cellSelection: true, // Enterprise feature, uitzetten voor community
  // copyHeadersToClipboard: true, // Enterprise feature
  animateRows: true,
  suppressMovableColumns: false,
  enableCellTextSelection: true, // Belangrijk: laat gebruikers tekst selecteren/kopiëren
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
  filter: true, // Standaard text/number filter (Community)
  resizable: true,
  sortable: true,
  floatingFilter: false, // Zet uit voor cleanere look icm search bar
};