import {cn} from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}

const gridCols = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
} as const;

export function Grid({children, cols = 2, className}: GridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4', gridCols[cols], className)}>
      {children}
    </div>
  );
}
