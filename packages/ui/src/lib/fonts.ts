// packages/ui/src/lib/fonts.ts
// Single source of truth voor font configuratie keys
export interface FontConfig {
  name: string;
  key: string;
  variableName: string; // De definitie (bijv. "--font-inter")
  cssVariable: string; // Het gebruik (bijv. "var(--font-inter)")
}

export const FONT_CONFIG = {
  geist: {
    name: 'Geist',
    key: 'geist',
    variableName: '--font-geist-sans',
    cssVariable: 'var(--font-geist-sans)',
  },
  inter: {
    name: 'Inter',
    key: 'inter',
    variableName: '--font-inter',
    cssVariable: 'var(--font-inter)',
  },
  roboto: {
    name: 'Roboto',
    key: 'roboto',
    variableName: '--font-roboto',
    cssVariable: 'var(--font-roboto)',
  },
} as const;

export const availableFonts: FontConfig[] = Object.values(FONT_CONFIG);
