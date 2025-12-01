// apps/web/components/grid/grid-base.tsx
'use client';

import React from 'react';

import {DataTable} from './data-table';

// Een voorbeeld wrapper of specifieke implementatie voor MDX gebruik
// Dit komt overeen met 'GridExample' in je imports
interface GridExampleProps {
  title?: string;
  data: any[];
  // Flexibele kolommen definitie
  columns: any[];
}

export function GridExample({title, data, columns}: GridExampleProps) {
  return (
    <div className="my-8 space-y-4 rounded-lg border p-4 shadow-sm">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default GridExample;
