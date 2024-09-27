import { Hono } from 'hono';

const pokemonTypeRoute = new Hono();

pokemonTypeRoute.get('/', (c) => c.json({ message: 'List of pokemonType!' }));
pokemonTypeRoute.post('/', (c) => c.json('create an pokemonType', 201));
pokemonTypeRoute.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default pokemonTypeRoute;
