// packages/grid/src/grid-storage.ts
'use client';

import {error as logError, warn as logWarn} from './lib/logger';

// Prefix die gebruikt wordt door useGridState
const GRID_STATE_STORAGE_PREFIX = 'grid_state_';
const LOG_SOURCE = 'GridStorage';

/**
 * Clears all items from localStorage that start with the AG-Grid state prefix.
 * This function MUST be called on the client-side.
 */
export function clearGridStatesFromLocalStorage(): void {
  // Extra check of we wel in een browser-omgeving zijn
  if (typeof window === 'undefined' || !window.localStorage) {
    logWarn('Cannot access localStorage (not in browser?)', LOG_SOURCE);
    return;
  }

  try {
    // Efficiëntere manier om keys te verzamelen en te verwijderen
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(GRID_STATE_STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }

    // Verwijder de verzamelde keys
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    // Vang eventuele fouten op (bv. security restrictions, quota)
    logError('Error accessing/clearing localStorage', LOG_SOURCE, {error});
  }
}
