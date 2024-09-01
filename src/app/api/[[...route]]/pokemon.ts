import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pokemon } from '@/lib/db/schema';

const pokemonApp = new Hono();

pokemonApp.get('/', async (c) => {
  // use drizzle to fetch pokemon table and get the list of pokemon
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);
  const output = await db.select().from(pokemon);
  return c.json(output);
});
pokemonApp.post('/', (c) => c.json('create an pokemon', 201));
pokemonApp.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default pokemonApp;
