// packages/ui/src/components/extended/form-succes.tsx
'use client';

import {cn} from '../../lib/utils';

interface FormSuccessProps {
  message?: string;
  className?: string;
}

export const FormSuccess = ({message, className}: FormSuccessProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        'text-foreground flex items-center gap-x-2 text-sm',
        className,
      )}
      role="status"
    >
      <p className="w-full text-center break-words">{message}</p>
    </div>
  );
};
