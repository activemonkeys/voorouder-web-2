// packages/grid/src/hooks/use-grid-setup.ts
import {useMemo} from 'react';
import {GridApi} from 'ag-grid-community';

import {createGridOptions} from './../grid-options';
import {getLocaleText} from './../grid-settings';
import {useGridStateManager} from './../grid-state-manager';

interface UseGridSetupParams {
  gridId: string;
  locale: string;
  t: (key: string) => string;
  serverSide?: boolean;
}

export const useGridSetup = ({
  gridId,
  locale,
  t,
  serverSide = false,
}: UseGridSetupParams) => {
  const {handleStateUpdate, restoreState, resetState} = useGridStateManager({
    gridId,
    t,
    serverSide,
  });

  const gridOptions = useMemo(
    () =>
      createGridOptions({
        t,
        resetState: (api: GridApi) => resetState(api),
        isServerSide: serverSide,
      }),
    [t, resetState, serverSide],
  );

  const localeText = useMemo(() => getLocaleText(locale), [locale]);

  return {
    gridOptions,
    localeText,
    handleStateUpdate,
    restoreState,
    resetState,
  };
};
