// packages/ui/src/components/extended/form-section-header.tsx

'use client';

import {cn} from '@workspace/ui/lib/utils';

interface FormSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function FormSectionHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: FormSectionHeaderProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <h3 className={cn('text-lg font-medium', titleClassName)}>{title}</h3>
      {description && (
        <p
          className={cn('text-muted-foreground text-sm', descriptionClassName)}
        >
          {description}
        </p>
      )}
    </div>
  );
}
