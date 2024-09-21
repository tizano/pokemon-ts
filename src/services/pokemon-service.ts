'use server';
import { db } from '@/db/connect';
import { pokemon } from '@/db/schema/schema';
import { ListWithPagination, NewPokemon, Pokemon } from '@/db/schema/schema.type';
import { asc, count, eq } from 'drizzle-orm';

export const getPokemons = async (
  page: number = 1,
  itemsPerPage: number = 10,
): Promise<ListWithPagination<Pokemon[]>> => {
  try {
    // use db.select
    const data = await db.query.pokemon.findMany({
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      orderBy: [asc(pokemon.name)],
    });

    const totalPages = await db.select({ count: count(pokemon.id) }).from(pokemon);

    return { data, page, itemsPerPage, count: totalPages[0].count };
  } catch (error) {
    throw new Error(`Unable to fetch Pokemon cards : ${error}`);
  }
};

export const getPokemon = async (slug: string) => {
  try {
    const data = await db.query.pokemon.findFirst({
      where: eq(pokemon.slug, slug),
    });
    return { data };
  } catch (error) {
    return { error: `Failed to load a single Pokemon : ${error}` };
  }
};

export const createPokemon = async (pokemonToInsert: NewPokemon) => {
  try {
    const data = await db.insert(pokemon).values(pokemonToInsert);
    return { data };
  } catch (error) {
    return { error: `Failed to create Pokemon : ${error}` };
  }
};

export const updatePokemon = async (id: string, pokemonToUpdate: NewPokemon) => {
  try {
    const data = await db.update(pokemon).set(pokemonToUpdate).where(eq(pokemon.id, id));
    return { data };
  } catch (error) {
    return { error: `Failed to update Pokemon : ${error}` };
  }
};

export const deletePokemon = async (id: string) => {
  try {
    const data = await db.delete(pokemon).where(eq(pokemon.id, id));
    return { data };
  } catch (error) {
    return { error: `Failed to delete Pokemon : ${error}` };
  }
};
