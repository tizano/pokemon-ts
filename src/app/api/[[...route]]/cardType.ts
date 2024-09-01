import { Hono } from 'hono';

const cardTypeApp = new Hono();

cardTypeApp.get('/', (c) => c.json({ message: 'List of cardType!' }));
cardTypeApp.post('/', (c) => c.json('create an cardType', 201));
cardTypeApp.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default cardTypeApp;
