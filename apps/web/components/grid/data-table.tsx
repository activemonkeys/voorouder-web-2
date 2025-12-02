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
  // Aangepast: minWidth toegevoegd aan de interface
  columns?: {
    field: string;
    headerName?: string;
    width?: number;
    minWidth?: number;
  }[];
  height?: number | string;
  pagination?: boolean;
  paginationPageSize?: number;
  filter?: boolean;
  enableSearch?: boolean;
  domLayout?: 'normal' | 'autoHeight' | 'print';
}

export function DataTable({
  data = [],
  columns = [],
  height,
  pagination = true,
  paginationPageSize = 10,
  enableSearch = true,
  domLayout = 'normal',
}: DataTableProps) {
  const {resolvedTheme} = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const effectiveThemeMode = mounted
    ? resolvedTheme === 'dark'
      ? 'dark'
      : 'light'
    : undefined;

  const [quickFilterText, setQuickFilterText] = useState('');

  const {gridOptions, localeText} = useGridSetup({
    gridId: 'mdx-data-table',
    locale: 'nl',
    t: (key: string) => key,
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
      minWidth: col.minWidth, // Geef minWidth door
      // Flex alleen aanzetten als er GEEN harde width is opgegeven.
      // MinWidth mag wel, dat is slechts een ondergrens.
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

  const containerStyle =
    domLayout === 'autoHeight' ? undefined : {height: height || 500};

  return (
    <div className="not-prose flex w-full min-w-0 flex-col gap-4">
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

      <div
        className="w-full min-w-0"
        data-ag-theme-mode={effectiveThemeMode}
        style={containerStyle}
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
          domLayout={domLayout}
        />
      </div>
    </div>
  );
}
