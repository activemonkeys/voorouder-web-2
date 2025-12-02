// apps/web/components/grid/mdx-data-table.tsx
import React from 'react';
import {loadDataFile} from '@/services/dataset-service';

import {DataTable} from './data-table';

interface MdxDataTableProps {
  tableName: string;
  pageSize?: number;
  height?: number | string;
}

export async function MdxDataTable({
  tableName,
  pageSize = 10,
  height,
}: MdxDataTableProps) {
  const dataset = await loadDataFile(tableName);

  if (!dataset) {
    return (
      <div className="bg-destructive/10 text-destructive my-4 w-full rounded-md border p-4">
        <p className="font-semibold">Kan dataset niet laden</p>
        <p className="text-sm">
          Controleer of het bestand &quot;{tableName}.json&quot; bestaat in de
          data map en of de structuur geldig is.
        </p>
      </div>
    );
  }

  // Hier mappen we de JSON kolommen naar de DataTable props
  // We gebruiken nu expliciet 'minWidth' in plaats van 'width'
  // zodat de flex-layout (uitvullen over breedte) actief blijft.
  const columns = dataset.columns.map((col) => ({
    field: col.field,
    headerName: col.headerName,
    minWidth: col.minWidth || 150,
  }));

  return (
    <div className="my-8">
      <DataTable
        data={dataset.rows}
        columns={columns}
        pagination={true}
        paginationPageSize={pageSize}
        domLayout="autoHeight"
        height={height}
      />
    </div>
  );
}
