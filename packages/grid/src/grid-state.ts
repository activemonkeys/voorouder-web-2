// packages/grid/src/grid-state.ts
import {ColumnState, GridApi} from 'ag-grid-enterprise';
import {toast} from 'sonner';

import {error as logError} from './lib/logger';
import {ErrorMessage} from './types/core';

interface GridState {
  page: number;
  pageSize: number;
  filterModel?: any;
  columnState?: ColumnState[];
  timestamp?: number;
}

export interface GridStateConfig {
  saveFilters?: boolean;
  saveSorting?: boolean;
  saveColumns?: boolean;
  savePagination?: boolean;
  serverSide?: boolean;
  cacheDurationHours?: number;
}

const defaultConfig: Required<GridStateConfig> = {
  saveFilters: true,
  saveSorting: true,
  saveColumns: true,
  savePagination: true,
  serverSide: false,
  cacheDurationHours: 24,
};

const defaultState: GridState = {
  page: 0,
  pageSize: 10,
  filterModel: null,
  columnState: [],
  timestamp: Date.now(),
};

const LOG_SOURCE = 'GridState';

const createStorageKey = (gridId: string) => `grid_state_${gridId}`;

export const useGridState = (
  gridId: string,
  t: (key: string) => string,
  userConfig: GridStateConfig = {},
) => {
  const config = {...defaultConfig, ...userConfig};
  const storageKey = createStorageKey(gridId);

  const handleStateUpdate = (event: {api: GridApi}) => {
    try {
      const currentState: GridState = {
        page: config.savePagination
          ? event.api.paginationGetCurrentPage()
          : defaultState.page,
        pageSize: config.savePagination
          ? event.api.paginationGetPageSize()
          : defaultState.pageSize,
        filterModel: config.saveFilters
          ? event.api.getFilterModel()
          : defaultState.filterModel,
        columnState:
          config.saveColumns || config.saveSorting
            ? event.api.getColumnState()
            : defaultState.columnState,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(currentState));
    } catch (error) {
      logError('Error saving grid state', LOG_SOURCE, {gridId, error});
    }
  };

  const resetState = (api: GridApi) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({...defaultState, timestamp: Date.now()}),
      );

      if (config.saveFilters) {
        api.setFilterModel(null);
      }
      if (config.saveColumns || config.saveSorting) {
        api.resetColumnState();
      }
      if (config.savePagination) {
        api.paginationGoToPage(defaultState.page);
        api.setGridOption('paginationPageSize', defaultState.pageSize);
      }

      if (config.serverSide) {
        api.onFilterChanged();
      }

      toast.info(t(ErrorMessage.GridStateResetSuccess.toString()));
    } catch (error) {
      logError('Error resetting grid state', LOG_SOURCE, {gridId, error});
      toast.error(t(ErrorMessage.GridStateResetFailed.toString()));
    }
  };

  const isStateExpired = (timestamp?: number): boolean => {
    if (!timestamp) {
      return true;
    }
    const maxAge = config.cacheDurationHours * 60 * 60 * 1000;
    return Date.now() - timestamp > maxAge;
  };

  const getStoredState = (): GridState | null => {
    try {
      const savedStateJson = localStorage.getItem(storageKey);
      if (!savedStateJson) return null;

      const parsedState: GridState = JSON.parse(savedStateJson);

      if (isStateExpired(parsedState.timestamp)) {
        clearState();
        return null;
      }

      return {
        page: parsedState.page ?? defaultState.page,
        pageSize: parsedState.pageSize ?? defaultState.pageSize,
        filterModel: parsedState.filterModel ?? defaultState.filterModel,
        columnState: parsedState.columnState ?? defaultState.columnState,
        timestamp: parsedState.timestamp,
      };
    } catch (error) {
      logError(`Error getting stored state for ${gridId}`, LOG_SOURCE, {error});
      return null;
    }
  };

  const restoreState = (api: GridApi) => {
    const state = getStoredState() ?? defaultState;

    try {
      if (state.columnState && (config.saveColumns || config.saveSorting)) {
        api.applyColumnState({state: state.columnState, applyOrder: true});
      }
      if (config.savePagination && state.pageSize) {
        api.setGridOption('paginationPageSize', state.pageSize);
      }

      if (state.filterModel && config.saveFilters) {
        if (config.serverSide) {
          // In SSRM, we just prepare the model. The datasource will use it on first load.
        } else {
          api.setFilterModel(state.filterModel);
        }
      }

      if (!config.serverSide && config.savePagination) {
        api.paginationGoToPage(state.page ?? defaultState.page);
      }
    } catch (e) {
      logError(`Error applying state for ${gridId}`, LOG_SOURCE, {error: e});
    }
  };

  const clearState = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      logError(`Error clearing stored state for ${gridId}`, LOG_SOURCE, {
        error,
      });
    }
  };

  return {
    handleStateUpdate,
    restoreState,
    clearState,
    resetState,
  };
};
