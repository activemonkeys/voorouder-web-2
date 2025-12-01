// packages/ui/src/components/extended/buttons.tsx
'use client';

import React from 'react';
import {Loader2} from 'lucide-react';

import {cn} from '../../lib/utils';
import {Button} from '../shadcn/button';

type ButtonVariant =
  | 'secondary'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
  | null
  | undefined;

interface SubmitButtonProps {
  isPending: boolean;
  normalLabel?: string;
  type?: 'submit' | 'button' | 'reset';
  variant?: ButtonVariant;
  size?: 'sm' | 'default' | 'lg' | 'icon' | null | undefined;
  className?: string;
  minWidthClass?: string;
  [x: string]: any;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isPending,
  normalLabel = 'Submit',
  type = 'submit',
  variant = 'default',
  size = 'sm',
  className,
  minWidthClass = 'min-w-[110px]',
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={isPending}
      className={cn(
        'flex items-center justify-center',
        minWidthClass,
        className,
      )}
      {...props}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>{normalLabel}</span>
      )}
    </Button>
  );
};

interface CancelButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'default' | 'lg' | 'icon' | null | undefined;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  [x: string]: any;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  label = 'Cancel',
  variant = 'secondary',
  size = 'sm',

  onClick,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {label}
    </Button>
  );
};

interface SaveAndContinueButtonProps {
  isPending: boolean;
  normalLabel?: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: 'sm' | 'default' | 'lg' | 'icon' | null | undefined;
  className?: string;
  minWidthClass?: string;
  [x: string]: any;
}

export const SaveAndContinueButton: React.FC<SaveAndContinueButtonProps> = ({
  isPending,
  normalLabel = 'Save and Continue',
  onClick,
  variant = 'default',
  size = 'sm',
  className,
  minWidthClass = 'min-w-[160px]',
  ...props
}) => {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={isPending}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center',
        minWidthClass,
        className,
      )}
      {...props}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>{normalLabel}</span>
      )}
    </Button>
  );
};
