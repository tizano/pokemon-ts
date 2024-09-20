import { env } from '@/env/server';
import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: {
    url: `${env.DATABASE_URL}?sslmode=require`,
  },
  verbose: true,
  strict: true,
}) satisfies Config;
