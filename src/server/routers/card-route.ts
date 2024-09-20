import { Hono } from 'hono';

const cardRoute = new Hono();

cardRoute.get('/', (c) => c.json('list books'));
cardRoute.post('/', (c) => c.json('create an book', 201));
cardRoute.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default cardRoute;
