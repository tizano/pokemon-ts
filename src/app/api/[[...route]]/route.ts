import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import pokemonApp from './pokemon';
import cardApp from './card';
import cardTypeApp from './cardType';
import pokemonTypeApp from './pokemonType';
import pokemonToTypeApp from './pokemonToType';

export const runtime = 'edge';

const app = new Hono()
  .basePath('/api')
  .route('/pokemons', pokemonApp)
  .route('/pokemon-types', pokemonTypeApp)
  .route('/pokemon-to-type', pokemonToTypeApp)
  .route('/cards', cardApp)
  .route('/card-types', cardTypeApp);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
