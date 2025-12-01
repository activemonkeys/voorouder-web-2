// packages/grid/src/grid-state-manager.ts
import {GridStateConfig, useGridState} from './grid-state';

interface GridStateManagerConfig extends GridStateConfig {
  gridId: string;
  t: (key: string) => string;
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
      ...config,
    },
  );

  return {
    handleStateUpdate,
    restoreState,
    resetState,
  };
};
