import { Config, defineConfig } from 'drizzle-kit'
import './envConfig'


export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    dialect: 'postgresql',
    out: "./drizzle",
    dbCredentials: {
      url: process.env.DATABASE_URL! + "?sslmode=require",
    },
    verbose: true,
    strict: true,
  }) satisfies Config; 