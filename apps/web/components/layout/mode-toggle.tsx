// apps/web/components/layout/mode-toggle.tsx
'use client';

import * as React from 'react';
import {Moon, Sun} from 'lucide-react';

// We gebruiken de custom hook uit @workspace/providers
import {useTheme} from '@workspace/providers';

export function ModeToggle() {
  const {setMode, mode} = useTheme(); // Aangepast voor de custom provider

  return (
    <button
      className="text-accent-foreground rounded-md p-2 transition-opacity hover:opacity-80 focus:opacity-80"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
      <span className="sr-only">Wissel tussen licht en donker thema</span>
    </button>
  );
}
