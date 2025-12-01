import {cn} from '@/lib/utils';

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({children, className}: KbdProps) {
  return (
    <kbd
      className={cn(
        'border-border bg-muted rounded-md border px-2 py-1 font-mono text-sm',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
