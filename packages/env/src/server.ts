// packages/env/src/server.ts
import {createEnv} from '@t3-oss/env-nextjs';
import {z} from 'zod';

export const serverSchema = {
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_KEY_SECRET: z.string().min(1),
  API_MAX_REQUESTS_PER_MINUTE: z.coerce.number().default(60),
  API_AUTHORIZATION_ENABLED: z.enum(['true', 'false']).default('true'),
};

export const serverEnv = createEnv({
  server: serverSchema,
  experimental__runtimeEnv: process.env,
});

export type ServerEnv = typeof serverEnv;
