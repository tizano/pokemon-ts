import { z } from 'zod';

export const createPokemonSchema = z.object({
  slug: z.string(),
  name: z.string(),
  pokedexId: z.number(),
  imageUrl: z.string().url(),
});

export const updatePokemonSchema = createPokemonSchema;
