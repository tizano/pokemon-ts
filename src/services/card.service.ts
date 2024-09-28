'use server';
import { db } from '@/db/connect';
import { card, pokemon } from '@/db/schema/schema';
import { CardWithPokemon } from '@/types/card.type';
import { CustomQuery } from '@/types/query.type';
import { asc, eq, ilike } from 'drizzle-orm';

export const getCardsByPokemon = async ({
  pokemonSlug,
}: {
  pokemonSlug: string;
}): Promise<CustomQuery<CardWithPokemon[]>> => {
  try {
    const data = await db
      .select()
      .from(card)
      .leftJoin(pokemon, eq(pokemon.id, card.pokemonId))
      .where(ilike(pokemon.slug, `%${pokemonSlug}%`))
      .orderBy(asc(card.cardNumber));

    return {
      data,
    } satisfies CustomQuery<CardWithPokemon[]>;
  } catch (error) {
    throw new Error(`Unable to fetch Pokemon : ${error}`);
  }
};
