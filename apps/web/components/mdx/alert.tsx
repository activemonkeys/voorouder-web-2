// apps/web/components/mdx/alert.tsx
import {AlertCircle, AlertTriangle, CheckCircle, Info} from 'lucide-react';

import {
  AlertDescription,
  AlertTitle,
  Alert as UIAlert,
} from '@workspace/ui/components/shadcn/alert';

const icons = {
  default: Info,
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
} as const;

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: keyof typeof icons;
  className?: string;
}

export function Alert({
  title,
  children,
  variant = 'default',
  className,
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <UIAlert
      variant={variant === 'error' ? 'destructive' : 'default'}
      className={className}
    >
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </UIAlert>
  );
}
