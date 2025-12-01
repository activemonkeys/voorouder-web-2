// packages/grid/src/hooks/use-grid-setup.ts
import {useMemo} from 'react';

// GridApi import verwijderd want niet meer nodig hier
// import {GridApi} from 'ag-grid-community';

import {createGridOptions} from './../grid-options';
import {getLocaleText} from './../grid-settings';
import {useGridStateManager} from './../grid-state-manager';

interface UseGridSetupParams {
  gridId: string;
  locale: string;
  t: (key: string) => string;
}

export const useGridSetup = ({gridId, locale, t}: UseGridSetupParams) => {
  const {handleStateUpdate, restoreState, resetState} = useGridStateManager({
    gridId,
    t,
  });

  const gridOptions = useMemo(
    () => createGridOptions(), // Geen parameters meer doorgeven
    [], // Geen dependencies meer nodig voor createGridOptions
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
