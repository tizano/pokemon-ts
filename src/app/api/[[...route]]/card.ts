import { Hono } from 'hono';

const cardApp = new Hono();

cardApp.get('/', (c) => c.json('list books'));
cardApp.post('/', (c) => c.json('create an book', 201));
cardApp.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default cardApp;
