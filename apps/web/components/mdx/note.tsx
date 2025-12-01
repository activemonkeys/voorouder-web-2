// apps/web/components/mdx/note.tsx
import {cn} from '@workspace/ui/lib/utils';

interface NoteProps {
  children: React.ReactNode;
  type?: 'info' | 'tip' | 'warning';
  className?: string;
}

const noteStyles = {
  info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
  tip: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
  warning:
    'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
};

export function Note({children, type = 'tip', className}: NoteProps) {
  return (
    <div
      className={cn('note rounded-lg border p-4', noteStyles[type], className)}
    >
      <div className="prose-sm">{children}</div>
    </div>
  );
}
