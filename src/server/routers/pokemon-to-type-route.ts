import { Hono } from 'hono';

const pokemonToTypeRoute = new Hono();

pokemonToTypeRoute.get('/', (c) => c.json({ message: 'List of pokemonToType!' }));
pokemonToTypeRoute.post('/', (c) => c.json('create an pokemonToType', 201));
pokemonToTypeRoute.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default pokemonToTypeRoute;
