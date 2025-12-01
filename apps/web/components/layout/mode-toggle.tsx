// apps/web/components/layout/mode-toggle.tsx
'use client';

import * as React from 'react';
import {Moon, Sun} from 'lucide-react';

import {useTheme} from '@workspace/providers';
import {Button} from '@workspace/ui/components/shadcn/button'; // Gebruik Shadcn button

export function ModeToggle() {
  const {setMode, mode} = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      className="text-accent-foreground"
    >
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
      <span className="sr-only">Wissel tussen licht en donker thema</span>
    </Button>
  );
}
