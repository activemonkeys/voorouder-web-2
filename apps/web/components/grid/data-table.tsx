// apps/web/components/grid/data-table.tsx
'use client';

import React, {useMemo} from 'react';
import {ColDef} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';

// Importeer de modules en thema vanuit de grid package
import {registerClientSideModules} from '@workspace/grid/grid-settings';
import {theme} from '@workspace/grid/grid-theme';
import {useGridSetup} from '@workspace/grid/hooks/use-grid-setup';

// Registreer modules (eenmalig, of buiten component)
registerClientSideModules();

interface DataTableProps {
  data: any[];
  columns: {field: string; headerName?: string; width?: number}[];
  height?: number | string;
  pagination?: boolean;
  filter?: boolean;
}

export function DataTable({
  data,
  columns,
  height = 500,
  pagination = true,
}: DataTableProps) {
  // Gebruik de hook uit @workspace/grid
  const {gridOptions, localeText} = useGridSetup({
    gridId: 'mdx-data-table',
    locale: 'nl',
    t: (key: string) => key, // Simpele vertaalfunctie fallback
  });

  const columnDefs = useMemo<ColDef[]>(() => {
    return columns.map((col) => ({
      field: col.field,
      headerName: col.headerName || col.field,
      width: col.width,
      flex: col.width ? undefined : 1,
      filter: true,
      sortable: true,
      resizable: true,
    }));
  }, [columns]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    [],
  );

  return (
    <div className="not-prose w-full" style={{height}}>
      <AgGridReact
        theme={theme}
        gridOptions={gridOptions}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={10}
        localeText={localeText}
      />
    </div>
  );
}
