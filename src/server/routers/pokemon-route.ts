import { db } from '@/db/connect';
import { pokemon } from '@/db/schema/schema';
import { ListWithPagination, NewPokemon, Pokemon } from '@/db/schema/schema.type';
import { getPokemons } from '@/services/pokemon-service';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

const createPokemonSchema = z.object({
  slug: z.string(),
  name: z.string(),
  imageUrl: z.string().url(),
});

const pokemonRoute = new Hono();

pokemonRoute
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        page: z.coerce.number().optional().default(1),
        itemPerPage: z.coerce.number().optional().default(10),
      }),
    ),
    async (c) => {
      const { page, itemPerPage } = c.req.valid('query');
      try {
        const cards: ListWithPagination<Pokemon[]> = await getPokemons(page, itemPerPage);
        return c.json(cards);
      } catch (error) {
        console.error('Error in GET /pokemon:', error);
        return c.json({ message: 'Failed to fetch Pokemon cards' }, 500);
      }
    },
  )
  .get('/:slug', zValidator('param', z.object({ slug: z.string() })), async (c) => {
    const { slug } = c.req.valid('param');
    try {
      const output = await db.select().from(pokemon).where(eq(pokemon.slug, slug));
      return c.json(output, 200);
    } catch (error) {
      return c.json({
        message: `Error fetching pokemon ${slug}`,
        error,
      });
    }
  })
  .post('/', zValidator('json', createPokemonSchema), async (c) => {
    const validPokemon: NewPokemon = await c.req.valid('json');
    try {
      const newPokemon = await db.insert(pokemon).values(validPokemon);
      return c.json({ message: 'Pokemon successfully added', data: newPokemon }, 201);
    } catch (error) {
      return c.json({
        message: 'Error inserting pokemon ',
        error,
      });
    }
  })
  .put(
    '/:id',
    zValidator('param', z.object({ id: z.string() })),
    zValidator('json', createPokemonSchema),
    async (c) => {
      const { id } = c.req.valid('param');
      const validPokemon: NewPokemon = await c.req.valid('json');
      try {
        const updatedPokemon = await db.update(pokemon).set(validPokemon).where(eq(pokemon.id, id));
        return c.json({ message: 'Pokemon successfully updated', data: updatedPokemon }, 200);
      } catch (error) {
        return c.json({
          message: `Error updating pokemon with id ${id}`,
          error,
        });
      }
    },
  )
  .delete('/:id', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.param();
    try {
      await db.delete(pokemon).where(eq(pokemon.id, id));
      return c.json({ message: 'Pokemon successfully deleted' }, 200);
    } catch (error) {
      return c.json(
        {
          message: `Error deleting pokemon with id ${id}`,
          error,
        },
        500,
      );
    }
  });

export default pokemonRoute;
