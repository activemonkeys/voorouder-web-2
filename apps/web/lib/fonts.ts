// apps/web/lib/fonts.ts
import {Inter, Roboto} from 'next/font/google';
import {GeistSans} from 'geist/font/sans';

import {FONT_CONFIG} from '@workspace/ui/lib/fonts';

// Next.js vereist string literals in de loader config.
// We kunnen hier geen imports gebruiken voor de 'variable' property.
const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

// Geist is geen Google font loader maar een lokaal object,
// maar voor consistentie zetten we hem ook hardcoded of via spread.
const customGeist = {
  ...GeistSans,
  variable: '--font-geist-sans',
};

// Hier gebruiken we WEL de config keys om de mapping te garanderen
export const fontObjects = {
  [FONT_CONFIG.geist.key]: customGeist,
  [FONT_CONFIG.inter.key]: fontInter,
  [FONT_CONFIG.roboto.key]: fontRoboto,
};
