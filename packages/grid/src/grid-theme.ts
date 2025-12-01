// packages/grid/src/grid-theme.ts
import {themeQuartz} from 'ag-grid-community';

export const theme = themeQuartz
  .withParams(
    {
      backgroundColor: 'var(--background)',
      foregroundColor: 'var(--foreground)',
      borderColor: 'var(--border)',
      accentColor: 'var(--border)',
      headerBackgroundColor: 'var(--card)',
      selectedRowBackgroundColor:
        'color-mix(in oklch, var(--primary) 15%, transparent)',
      rowHoverColor: 'var(--accent)',
      fontFamily: 'var(--font-sans)',
      browserColorScheme: 'light',
    },
    'light',
  )
  .withParams(
    {
      backgroundColor: 'var(--background)',
      foregroundColor: 'var(--foreground)',
      borderColor: 'var(--border)',
      accentColor: 'var(--border)',
      headerBackgroundColor: 'var(--card)',
      selectedRowBackgroundColor:
        'color-mix(in oklch, var(--primary) 25%, transparent)',
      rowHoverColor: 'var(--accent)',
      fontFamily: 'var(--font-sans)',
      browserColorScheme: 'dark',
    },
    'dark',
  );
