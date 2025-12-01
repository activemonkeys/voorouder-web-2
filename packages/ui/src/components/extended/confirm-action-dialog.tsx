// packages/ui/src/components/extended/confirm-action-dialog.tsx
'use client';

import React from 'react';
import {Loader2} from 'lucide-react';

import {cn} from '@workspace/ui/lib/utils';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../shadcn/alert-dialog';
import {Button, buttonVariants} from '../shadcn/button';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | null
  | undefined;

interface ConfirmActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  title: string;
  description: React.ReactNode;
  confirmButtonText: string;
  confirmButtonVariant?: ButtonVariant;
  cancelButtonText: string;
  loadingText?: string;
}

export default function ConfirmActionDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title,
  description,
  confirmButtonText,
  confirmButtonVariant = 'default', // Default variant
  cancelButtonText,
  loadingText = 'Loading...', // Default loading text
}: ConfirmActionDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {/* Render description only if provided */}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Cancel Button uses AlertDialogCancel */}
          <AlertDialogCancel onClick={onClose} disabled={isLoading}>
            {cancelButtonText}
          </AlertDialogCancel>

          {/* Confirm Button uses standard Button for variant control */}
          <Button
            // Use buttonVariants to get the classes for the specified variant
            className={cn(
              buttonVariants({variant: confirmButtonVariant}),
              'min-w-[80px]', // Add min-width for consistency
            )}
            onClick={(e) => {
              e.preventDefault(); // Prevent default form submission if wrapped
              onConfirm();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
              </>
            ) : (
              confirmButtonText
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
