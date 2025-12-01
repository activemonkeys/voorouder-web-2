// packages/grid/src/grid-options.ts
import {GetRowIdParams, GridOptions} from 'ag-grid-community';

import {getGridOptions} from './grid-settings';

export const createGridOptions = (): GridOptions => {
  return {
    ...getGridOptions(),

    getRowId: ({data}: GetRowIdParams): string => {
      return data?.id?.toString() ?? `fallback_${Math.random()}`;
    },
  };
};
