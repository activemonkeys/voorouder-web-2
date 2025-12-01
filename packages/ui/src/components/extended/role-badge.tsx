// packages/ui/src/components/extended/role-badge.tsx
import React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {UserCog} from 'lucide-react'; // Of ShieldAlert als je die altijd wilt?

import {cn} from '@workspace/ui/lib/utils';

// CVA met alleen de benodigde varianten
const roleBadgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80', // Standaard
        admin:
          'border-transparent bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300', // Specifiek voor Admin
        outline: 'text-foreground', // Voor andere gevallen
      },
      size: {
        default: 'h-6',
        sm: 'h-5 text-[10px]',
        lg: 'h-7 text-sm px-3',
      },
    },
    defaultVariants: {
      variant: 'secondary', // Standaard is nu 'secondary'
      size: 'default',
    },
  },
);

// Interface ZONDER roleKey voor styling
export interface RoleBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof roleBadgeVariants> {
  // Nu inclusief 'variant'
  showIcon?: boolean;
}

export function RoleBadge({
  className,
  variant, // Accepteer 'secondary', 'admin', 'outline' of laat defaulten naar 'secondary'
  size,
  children,
  showIcon = false, // Misschien standaard uitzetten?
  ...props
}: RoleBadgeProps) {
  return (
    <div
      className={cn(
        roleBadgeVariants({variant, size}), // Gebruik de meegegeven of default variant
        className,
      )}
      {...props}
    >
      {showIcon && <UserCog className="mr-1 h-3 w-3 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}
