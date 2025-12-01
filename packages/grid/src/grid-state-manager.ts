// packages/grid/src/grid-state-manager.ts
import {GridStateConfig, useGridState} from './grid-state';

interface GridStateManagerConfig extends GridStateConfig {
  gridId: string;
  t: (key: string) => string;
  serverSide?: boolean;
}

export const useGridStateManager = ({
  gridId,
  t,
  ...config
}: GridStateManagerConfig) => {
  const {handleStateUpdate, restoreState, resetState} = useGridState(
    gridId,
    t,
    {
      saveFilters: true,
      saveSorting: true,
      saveColumns: true,
      savePagination: true,
      serverSide: false,
      ...config,
    },
  );

  return {
    handleStateUpdate,
    restoreState,
    resetState,
  };
};
