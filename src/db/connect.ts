import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { env } from '@/config/env';

import * as schema from './schema/schema';

export const client = neon(env.DATABASE_URL!);
export const db = drizzle(client, { schema });
