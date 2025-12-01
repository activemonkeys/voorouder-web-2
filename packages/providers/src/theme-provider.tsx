// packages/providers/src/theme-provider.tsx
'use client';

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import {FONT_CONFIG} from '@workspace/ui/lib/fonts';
import {COOKIE_NAMES} from './constants';

// Dynamically create the map from the centralized config
const fontVariableMap = Object.values(FONT_CONFIG).reduce(
  (acc, font) => {
    acc[font.key] = font.cssVariable;
    return acc;
  },
  {} as Record<string, string>,
);

type FontKey = keyof typeof fontVariableMap;

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
  accentColor: string;
  setAccentColor: (color: string) => void;
  font: string;
  setFont: (font: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialMode: ThemeMode;
  initialAccentColor: string;
  initialFont: string;
}

const getThemeScript = (
  modeCookieName: string,
  accentCookieName: string,
  fontCookieName: string,
  fontMapJSON: string,
) => {
  return `
    (function() {
      function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      }

      try {
        const mode = getCookie('${modeCookieName}');
        const accent = getCookie('${accentCookieName}');
        const font = getCookie('${fontCookieName}');
        const root = window.document.documentElement;
        const body = window.document.body;

        // Theme class (dark/light)
        let themeClass = '';
        if (mode === 'light' || mode === 'dark') {
          themeClass = mode;
        } else { 
          themeClass = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        root.classList.remove('light', 'dark');
        root.classList.add(themeClass);

        // Accent color
        body.className = body.className.replace(/theme-\\w+/g, '').trim();
        if (accent) {
          body.classList.add('theme-' + accent);
        }

        // Font variable
        const fontMap = ${fontMapJSON};
        // Default to geist if font is not found or empty
        const fontVar = fontMap[font] || fontMap['geist']; 
        root.style.setProperty('--font-sans', fontVar);
      } catch (e) {
        console.warn('Failed to set initial theme from script.', e);
      }
    })()
  `;
};

export function ThemeProvider({
  children,
  initialMode,
  initialAccentColor,
  initialFont,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [accentColor, setAccentColorState] =
    useState<string>(initialAccentColor);
  const [font, setFontState] = useState<string>(initialFont);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return initialMode === 'dark' ? 'dark' : 'light';
    }
    if (initialMode !== 'system') {
      return initialMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const themeScript = getThemeScript(
    COOKIE_NAMES.MODE,
    COOKIE_NAMES.THEME,
    COOKIE_NAMES.FONT,
    JSON.stringify(fontVariableMap),
  );

  const handleSetMode = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    document.cookie = `${COOKIE_NAMES.MODE}=${newMode}; path=/; max-age=31536000; SameSite=Lax`;
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (newMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    } else {
      root.classList.add(newMode);
      setResolvedTheme(newMode);
    }
  }, []);

  const handleSetAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
    document.cookie = `${COOKIE_NAMES.THEME}=${color}; path=/; max-age=31536000; SameSite=Lax`;

    const body = window.document.body;
    const classesToRemove = Array.from(body.classList).filter((c) =>
      c.startsWith('theme-'),
    );
    body.classList.remove(...classesToRemove);
    body.classList.add(`theme-${color}`);
  }, []);

  const handleSetFont = useCallback((fontKey: string) => {
    setFontState(fontKey);
    document.cookie = `${COOKIE_NAMES.FONT}=${fontKey}; path=/; max-age=31536000; SameSite=Lax`;

    const root = window.document.documentElement;
    const isValidFontKey = (key: string): key is FontKey =>
      key in fontVariableMap;

    // Fallback logic
    const finalFontVariable = isValidFontKey(fontKey)
      ? fontVariableMap[fontKey]
      : fontVariableMap.geist;

    // Use nullish coalescing to ensure we never pass undefined to setProperty
    root.style.setProperty('--font-sans', finalFontVariable ?? '');
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{__html: themeScript}} />
      <ThemeContext.Provider
        value={{
          mode,
          setMode: handleSetMode,
          resolvedTheme,
          accentColor,
          setAccentColor: handleSetAccentColor,
          font,
          setFont: handleSetFont,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
