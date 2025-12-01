// apps/web/components/mdx/table.tsx
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from '@workspace/ui/components/shadcn/table';
import {cn} from '@workspace/ui/lib/utils';

interface ColumnConfig {
  header: string;
  align?: 'left' | 'center' | 'right';
  headerClassName?: string;
  cellClassName?: string;
}

interface TableProps {
  headers: (string | ColumnConfig)[];
  rows: string[][];
  className?: string;
}

export function Table({headers, rows, className}: TableProps) {
  const normalizeHeader = (header: string | ColumnConfig): ColumnConfig => {
    if (typeof header === 'string') {
      return {header: header, align: 'left'};
    }
    return {align: 'left', ...header};
  };

  const columns = headers.map(normalizeHeader);

  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center!';
      case 'right':
        return 'text-right!';
      default:
        return 'text-left!';
    }
  };

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <UITable>
        <TableHeader>
          <TableRow>
            {columns.map((column, i) => (
              <TableHead
                key={i}
                className={cn(
                  getAlignmentClass(column.align),
                  column.headerClassName,
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell
                  key={j}
                  className={cn(
                    getAlignmentClass(columns[j]?.align),
                    columns[j]?.cellClassName,
                    i === rows.length - 1 ? 'font-semibold' : '',
                    'text-base',
                    'py-3',
                  )}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </UITable>
    </div>
  );
}
