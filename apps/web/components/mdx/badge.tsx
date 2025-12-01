import {Badge as UIBadge} from '@workspace/ui/components/shadcn/badge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
}

export function Badge({children, variant = 'default', className}: BadgeProps) {
  return (
    <UIBadge variant={variant} className={className}>
      {children}
    </UIBadge>
  );
}
