// packages/env/src/client.ts
import {createEnv} from '@t3-oss/env-nextjs';
import {z} from 'zod';

export const clientSchema = {
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default('nl'),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
};

export const clientEnv = createEnv({
  client: clientSchema,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
});

export type ClientEnv = typeof clientEnv;
