import { Hono } from 'hono';

const pokemonTypeApp = new Hono();

pokemonTypeApp.get('/', (c) => c.json({ message: 'List of pokemonType!' }));
pokemonTypeApp.post('/', (c) => c.json('create an pokemonType', 201));
pokemonTypeApp.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default pokemonTypeApp;
