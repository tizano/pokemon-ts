import { Hono } from 'hono';

const cardTypeRoute = new Hono();

cardTypeRoute.get('/', (c) => c.json({ message: 'List of cardType!' }));
cardTypeRoute.post('/', (c) => c.json('create an cardType', 201));
cardTypeRoute.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default cardTypeRoute;
