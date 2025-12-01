// packages/grid/src/grid-options.ts
import {GetRowIdParams, GridOptions} from 'ag-grid-community';

import {getGridOptions} from './grid-settings';

// Interface verwijderd omdat hij niet meer gebruikt wordt
// Als je hem later nodig hebt, kun je hem terugplaatsen

export const createGridOptions = (): GridOptions => {
  return {
    ...getGridOptions(),

    getRowId: ({data}: GetRowIdParams): string => {
      return data?.id?.toString() ?? `fallback_${Math.random()}`;
    },
  };
};
