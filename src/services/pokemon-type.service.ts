'use server';

import { db } from '@/db/connect';
import { pokemonType } from '@/db/schema/schema';
import { CustomQuery } from '@/lib/types/query.type';
import { PokemonType } from '@/lib/types/schema.type';
import { asc } from 'drizzle-orm';

export const getPokemonTypes = async (): Promise<CustomQuery<PokemonType[]>> => {
  try {
    const data = await db.select().from(pokemonType).orderBy(asc(pokemonType.name));
    return { data };
  } catch (error) {
    throw new Error(`Unable to fetch Pokemon types : ${error}`);
  }
};
