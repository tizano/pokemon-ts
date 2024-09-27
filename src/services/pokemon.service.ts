'use server';
import { db } from '@/db/connect';
import { pokemon, pokemonToType, pokemonType } from '@/db/schema/schema';
import { GetPokemonsProps, PokemonWithType } from '@/types/pokemon.type';
import { QueryWithPagination } from '@/types/query.type';
import { NewPokemon } from '@/types/schema.type';
import { and, asc, count, eq, ilike, SQL } from 'drizzle-orm';

export const getPokemons = async ({
  page = 1,
  itemsPerPage = 10,
  pokemonName,
  pokemonTypeSlug,
}: GetPokemonsProps): Promise<QueryWithPagination<PokemonWithType[]>> => {
  try {
    const where: SQL<unknown>[] = [];
    if (pokemonName) {
      where.push(ilike(pokemon.name, `%${pokemonName}%`));
    }
    if (pokemonTypeSlug) {
      where.push(eq(pokemonType.slug, pokemonTypeSlug));
    }

    const data = await db
      .select()
      .from(pokemon)
      .leftJoin(pokemonToType, eq(pokemon.id, pokemonToType.pokemonId))
      .leftJoin(pokemonType, eq(pokemonToType.typeId, pokemonType.id))
      .where(and(...where))
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage)
      .orderBy(asc(pokemon.name));

    const totalPages = await db
      .select({ count: count(pokemon.id) })
      .from(pokemon)
      .leftJoin(pokemonToType, eq(pokemon.id, pokemonToType.pokemonId))
      .leftJoin(pokemonType, eq(pokemonToType.typeId, pokemonType.id))
      .where(and(...where));

    return {
      data,
      page,
      itemsPerPage,
      count: totalPages[0].count,
    } as QueryWithPagination<PokemonWithType[]>;
  } catch (error) {
    throw new Error(`Unable to fetch Pokemon : ${error}`);
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
