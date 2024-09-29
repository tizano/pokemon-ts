import { Config, defineConfig } from 'drizzle-kit';

import { env } from '@/config/env';

export default defineConfig({
  schema: './src/db/schema/schema.ts',
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: {
    url: `${env.DATABASE_URL}?sslmode=require`,
  },
  verbose: true,
  strict: true,
}) satisfies Config;
