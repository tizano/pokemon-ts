/* eslint-disable n/no-process-env */
import { createEnv } from '@t3-oss/env-nextjs';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

expand(config());

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
  },
  isServer: typeof window === 'undefined',
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
  onInvalidAccess: (key: string) => {
    console.error(`❌ Invalid access to environment variable: ${key}`);
    process.exit(1);
  },
  onValidationError: (error: ZodError) => {
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
    process.exit(1);
  },
});
