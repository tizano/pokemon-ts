import pokemonRoute from '@/server/routers/pokemon-route';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// export const runtime = env.NODE_ENV === 'development' ? 'edge' : 'nodejs';
// export const runtime = 'edge';

const app = new Hono().basePath('/api');
const appRouter = app.route('/pokemons', pokemonRoute);

export type AppType = typeof appRouter;

export const GET = handle(appRouter);
export const POST = handle(appRouter);
