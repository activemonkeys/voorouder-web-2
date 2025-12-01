// packages/grid/src/grid-options.ts

import {
  GetMainMenuItemsParams,
  GetRowIdParams,
  GridApi,
  GridOptions,
} from 'ag-grid-enterprise';

import {getGridOptions} from './grid-settings';

interface CreateGridOptionsParams {
  t: (key: string) => string;
  resetState: (api: GridApi) => void;
  isServerSide: boolean;
}

export const createGridOptions = ({
  t,
  resetState,
  isServerSide,
}: CreateGridOptionsParams): GridOptions => ({
  ...getGridOptions(isServerSide),

  getRowId: ({data}: GetRowIdParams): string => {
    return data?.id?.toString() ?? `fallback_${Math.random()}`;
  },

  getMainMenuItems: (params: GetMainMenuItemsParams) => {
    const defaultItems =
      params.defaultItems?.filter((item) => item !== 'resetColumns') ?? [];

    return [
      ...defaultItems,
      'separator',
      {
        name: t('common.grid.reset'),
        icon: '<span class="ag-icon ag-icon-filter"></span>',
        action: () => resetState(params.api),
      },
    ];
  },
});
