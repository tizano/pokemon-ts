'use server';
import { db } from '@/db/connect';
import { card, cardRarity, pokemon } from '@/db/schema/schema';
import { CardWithPokemonAndRarity } from '@/shared/types/card.type';
import { CustomQuery } from '@/shared/types/query.type';
import { asc, eq } from 'drizzle-orm';

export const getCardsByPokemon = async ({
  pokemonSlug,
}: {
  pokemonSlug: string;
}): Promise<CustomQuery<CardWithPokemonAndRarity[]>> => {
  try {
    const data = await db
      .select({
        id: card.id,
        cardNumber: card.cardNumber,
        imageUrl: card.imageUrl,
        pokedexId: card.pokedexId,
        pokemonId: card.pokemonId,
        rarityId: card.rarityId,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        pokemon: {
          slug: pokemon.slug,
          name: pokemon.name,
        },
        rarity: {
          slug: cardRarity.slug,
          name: cardRarity.name,
        },
      })
      .from(card)
      .leftJoin(pokemon, eq(pokemon.id, card.pokemonId))
      // add left join to get the pokemon card rarity
      .leftJoin(cardRarity, eq(cardRarity.id, card.rarityId))
      .where(eq(pokemon.slug, `${pokemonSlug}`))
      .orderBy(asc(card.cardNumber));
    console.log(`${pokemonSlug}`);

    return {
      data,
    } satisfies CustomQuery<CardWithPokemonAndRarity[]>;
  } catch (error) {
    throw new Error(`Unable to fetch Pokemon : ${error}`);
  }
};
