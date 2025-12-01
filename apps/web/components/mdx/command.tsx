import {cn} from '@/lib/utils';

interface CommandProps {
  children: React.ReactNode;
  className?: string;
}

export function Command({children, className}: CommandProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>{children}</div>
  );
}
