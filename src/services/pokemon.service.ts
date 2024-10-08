'use server';
import { db } from '@/db/connect';
import { pokemon, pokemonToType, pokemonType } from '@/db/schema/schema';
import { GetPokemonsProps, PokemonWithType } from '@/lib/types/pokemon.type';
import { QueryWithPagination } from '@/lib/types/query.type';
import { NewPokemon, PokemonType } from '@/lib/types/schema.type';
import { and, asc, eq, ilike, sql, SQL } from 'drizzle-orm';

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
      .select({
        id: pokemon.id,
        pokedexId: pokemon.pokedexId,
        slug: pokemon.slug,
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
        createdAt: pokemon.createdAt,
        updatedAt: pokemon.updatedAt,
        types: sql<PokemonType[]>`json_agg(
            json_build_object(
              'id', ${pokemonType.id},
              'name', ${pokemonType.name},
              'slug', ${pokemonType.slug}
            )
          )`,
      })
      .from(pokemon)
      .leftJoin(pokemonToType, eq(pokemon.id, pokemonToType.pokemonId))
      .leftJoin(pokemonType, eq(pokemonToType.typeId, pokemonType.id))
      .where(and(...where))
      .groupBy(pokemon.id)
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage)
      .orderBy(asc(pokemon.pokedexId));

    const totalPages = await db
      .select({ count: sql<number>`count(distinct ${pokemon.id})` })
      .from(pokemon)
      .leftJoin(pokemonToType, eq(pokemon.id, pokemonToType.pokemonId))
      .leftJoin(pokemonType, eq(pokemonToType.typeId, pokemonType.id))
      .where(and(...where));

    return {
      data,
      page,
      itemsPerPage,
      count: totalPages[0].count,
    } satisfies QueryWithPagination<PokemonWithType[]>;
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
    if (data.rowCount === 0) {
      return { error: 'Failed to create Pokemon' };
    }
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
