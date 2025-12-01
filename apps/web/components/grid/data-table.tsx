// apps/web/components/grid/data-table.tsx
'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {ColDef} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import {Search} from 'lucide-react';

import {registerCommunityModules} from '@workspace/grid/grid-settings';
import {theme} from '@workspace/grid/grid-theme';
import {useGridSetup} from '@workspace/grid/hooks/use-grid-setup';
import {useTheme} from '@workspace/providers';
import {Input} from '@workspace/ui/components/shadcn/input';

registerCommunityModules();

interface DataTableProps {
  data: any[];
  columns?: {field: string; headerName?: string; width?: number}[];
  height?: number | string;
  pagination?: boolean;
  paginationPageSize?: number;
  filter?: boolean;
  enableSearch?: boolean;
}

export function DataTable({
  data = [],
  columns = [],
  // height prop is verwijderd uit default omdat je domLayout="autoHeight" gebruikt,
  // maar we houden hem optioneel voor backwards compatibility
  height,
  pagination = true,
  paginationPageSize = 10,
  enableSearch = true,
}: DataTableProps) {
  const {resolvedTheme} = useTheme();

  // Hydration fix: We renderen pas het thema attribuut als we mounted zijn
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveThemeMode = mounted
    ? resolvedTheme === 'dark'
      ? 'dark'
      : 'light'
    : undefined; // undefined zorgt dat server en client initieel matchen (geen attribuut)

  const [quickFilterText, setQuickFilterText] = useState('');

  const {gridOptions, localeText} = useGridSetup({
    gridId: 'mdx-data-table',
    locale: 'nl',
    t: (key: string) => key,
    // Belangrijk: We geven nu expliciet aan dat dit GEEN enterprise grid is
    // Dit zorgt ervoor dat createGridOptions (die we zo gaan aanpassen) geen enterprise props injecteert
    serverSide: false,
  });

  const columnDefs = useMemo<ColDef[]>(() => {
    if (!columns || columns.length === 0) {
      if (data.length > 0) {
        return Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          filter: true,
          sortable: true,
          resizable: true,
          flex: 1,
        }));
      }
      return [];
    }

    return columns.map((col) => ({
      field: col.field,
      headerName: col.headerName || col.field,
      width: col.width,
      flex: col.width ? undefined : 1,
      filter: true,
      sortable: true,
      resizable: true,
    }));
  }, [columns, data]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
      suppressHeaderMenuButton: true,
    }),
    [],
  );

  if (columnDefs.length === 0 && data.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 items-center justify-center rounded-md border p-8">
        Geen gegevens beschikbaar om weer te geven.
      </div>
    );
  }

  return (
    <div className="not-prose flex w-full flex-col gap-4">
      {enableSearch && (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              placeholder="Zoeken..."
              value={quickFilterText}
              onChange={(e) => setQuickFilterText(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}

      {/* Grid Wrapper */}
      <div
        className="w-full"
        data-ag-theme-mode={effectiveThemeMode}
        // Als height expliciet is meegegeven, gebruik die, anders autoHeight container stijl
        style={height ? {height} : undefined}
      >
        <AgGridReact
          theme={theme}
          gridOptions={gridOptions}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          localeText={localeText}
          quickFilterText={quickFilterText}
          rowSelection={undefined}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}
