import {AlertCircle, AlertTriangle, CheckCircle, Info} from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@workspace/ui/components/shadcn/alert';

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
} as const;

interface CalloutProps {
  type?: keyof typeof icons;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  type = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const Icon = icons[type];

  return (
    <Alert className={className}>
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
