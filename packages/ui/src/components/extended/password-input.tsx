// packages/ui/src/components/extended/password-input.tsx
'use client';

import * as React from 'react';
import {Eye, EyeOff} from 'lucide-react';

import {cn} from '@workspace/ui/lib/utils';
import {Button} from '../shadcn/button';
import {Input} from '../shadcn/input';

interface PasswordInputProps extends React.ComponentProps<'input'> {
  ariaLabelShowPassword?: string;
  ariaLabelHidePassword?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      ariaLabelShowPassword = 'Show password',
      ariaLabelHidePassword = 'Hide password',
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
          aria-label={
            showPassword ? ariaLabelHidePassword : ariaLabelShowPassword
          }
          onClick={() => setShowPassword((show) => !show)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff aria-hidden className="text-muted-foreground h-4 w-4" />
          ) : (
            <Eye aria-hidden className="text-muted-foreground h-4 w-4" />
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export {PasswordInput};
