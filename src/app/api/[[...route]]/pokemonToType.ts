import { Hono } from 'hono';

const pokemonToTypeApp = new Hono();

pokemonToTypeApp.get('/', (c) => c.json({ message: 'List of pokemonToType!' }));
pokemonToTypeApp.post('/', (c) => c.json('create an pokemonToType', 201));
pokemonToTypeApp.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default pokemonToTypeApp;
